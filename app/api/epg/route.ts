import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

export const runtime = "nodejs";

type EpgProgramme = {
  title: string;
  description: string;
  category: string;
  start: string; // ISO
  stop: string; // ISO
};

type EpgChannel = {
  id: string;
  name: string;
  icon: string | null;
  programmes: EpgProgramme[];
};

function parseXmltvTime(value: string): string | null {
  // Formato XMLTV: "YYYYMMDDHHmmss +HHMM" (ou -HHMM, ou Z).
  const m = value.trim().match(/^(\d{14})\s*([+-]\d{4}|Z)?$/);
  if (!m) return null;
  const t = m[1];
  const year = t.slice(0, 4);
  const month = t.slice(4, 6);
  const day = t.slice(6, 8);
  const hour = t.slice(8, 10);
  const min = t.slice(10, 12);
  const sec = t.slice(12, 14);
  const tz = m[2] || "+0000";
  if (tz === "Z") {
    return `${year}-${month}-${day}T${hour}:${min}:${sec}Z`;
  }
  const sign = tz[0];
  const oh = tz.slice(1, 3);
  const om = tz.slice(3, 5);
  return `${year}-${month}-${day}T${hour}:${min}:${sec}${sign}${oh}:${om}`;
}

function textOf(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null && "#text" in (value as Record<string, unknown>)) {
    return String((value as Record<string, unknown>)["#text"] ?? "");
  }
  return String(value);
}

function toArray<T>(value: T | T[] | undefined | null): T[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

export async function GET() {
  const sourceUrl = process.env.EPG_SOURCE_URL?.trim();
  const sourceType = (process.env.EPG_SOURCE_TYPE || "xmltv").trim().toLowerCase();

  // Modo demonstração (apenas para desenvolvimento/testes). Nunca usar em produção.
  if (!sourceUrl && process.env.EPG_DEMO === "1") {
    const now = new Date();
    const demoChannels = [
      { id: "demo-1", name: "Canal Demo 1", programmes: [] as EpgProgramme[] },
      { id: "demo-2", name: "Canal Demo 2", programmes: [] as EpgProgramme[] },
      { id: "demo-3", name: "Canal Demo 3", programmes: [] as EpgProgramme[] },
      { id: "demo-4", name: "Canal Demo 4", programmes: [] as EpgProgramme[] },
    ];
    const titles = ["Jornal da Manhã", "Sessão de Filmes", "Série em Episódios", "Esporte ao Vivo", "Programa Infantil", "Documentário", "Variedades", "Noticiário"];
    const categories = ["Notícias", "Filmes", "Séries", "Esportes", "Infantil", "Documentário", "Entretenimento", "Notícias"];
    for (const ch of demoChannels) {
      let cursor = new Date(now.getTime() - 90 * 60 * 1000);
      for (let i = 0; i < 8; i++) {
        const dur = (30 + (i % 3) * 30) * 60 * 1000;
        const end = new Date(cursor.getTime() + dur);
        ch.programmes.push({
          title: `${titles[i % titles.length]} (demo)`,
          description: "Dados de demonstração para testes. Não representam programação real.",
          category: categories[i % categories.length],
          start: cursor.toISOString(),
          stop: end.toISOString(),
        });
        cursor = end;
      }
    }
    return NextResponse.json(
      {
        available: true,
        demo: true,
        channels: demoChannels,
        serverNow: now.toISOString(),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  if (!sourceUrl) {
    return NextResponse.json(
      {
        available: false,
        message:
          "A programação ao vivo está temporariamente indisponível. Configure EPG_SOURCE_URL para habilitar a grade.",
        serverNow: new Date().toISOString(),
      },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
    );
  }

  try {
    const res = await fetch(sourceUrl, { cache: "no-store" });
    if (!res.ok) throw new Error(`Fonte EPG retornou ${res.status}.`);
    const xml = await res.text();

    if (sourceType === "json") {
      // Pass-through de API JSON configurada.
      const data = JSON.parse(xml);
      return NextResponse.json(
        { available: true, ...data, serverNow: new Date().toISOString() },
        { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
      );
    }

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      textNodeName: "#text",
      parseTagValue: false,
      trimValues: true,
    });
    const parsed = parser.parse(xml) as { tv?: Record<string, unknown> };
    const tv = parsed?.tv || {};

    const channels: EpgChannel[] = toArray(tv.channel as unknown).map((ch) => {
      const c = ch as Record<string, unknown>;
      const id = String(c["@_id"] ?? "");
      const displayNames = toArray(c["display-name"]);
      const name = displayNames.length
        ? textOf(displayNames[0])
        : id;
      const iconObj = c.icon as Record<string, unknown> | undefined;
      const icon = iconObj && typeof iconObj === "object" ? String(iconObj["@_src"] ?? "") || null : null;
      return { id, name, icon: icon || null, programmes: [] };
    });

    const channelMap = new Map(channels.map((c) => [c.id, c]));

    for (const prog of toArray(tv.programme as unknown)) {
      const p = prog as Record<string, unknown>;
      const channelId = String(p["@_channel"] ?? "");
      const start = parseXmltvTime(String(p["@_start"] ?? ""));
      const stop = parseXmltvTime(String(p["@_stop"] ?? ""));
      if (!start || !stop) continue;
      const title = textOf(p.title);
      const description = textOf(p.desc);
      const catRaw = p.category;
      const category = Array.isArray(catRaw)
        ? textOf(catRaw[0])
        : textOf(catRaw);
      const programme: EpgProgramme = { title, description, category, start, stop };
      const ch = channelMap.get(channelId);
      if (ch) ch.programmes.push(programme);
      else {
        // Canal não declarado: cria entrada genérica.
        const generic: EpgChannel = {
          id: channelId,
          name: channelId,
          icon: null,
          programmes: [programme],
        };
        channels.push(generic);
        channelMap.set(channelId, generic);
      }
    }

    // Janela de exibição: 2h antes até 6h depois do "agora", para reduzir payload.
    const windowStart = Date.now() - 2 * 60 * 60 * 1000;
    const windowEnd = Date.now() + 6 * 60 * 60 * 1000;
    for (const ch of channels) {
      ch.programmes = ch.programmes.filter((p) => {
        const s = new Date(p.start).getTime();
        const e = new Date(p.stop).getTime();
        return e > windowStart && s < windowEnd;
      });
      ch.programmes.sort((a, b) => (a.start < b.start ? -1 : 1));
    }
    // Remove canais sem programas na janela.
    const filtered = channels.filter((ch) => ch.programmes.length > 0);
    channels.length = 0;
    channels.push(...filtered);

    return NextResponse.json(
      {
        available: true,
        channels,
        serverNow: new Date().toISOString(),
      },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido.";
    return NextResponse.json(
      {
        available: false,
        message: `A programação ao vivo está temporariamente indisponível. ${message}`,
        serverNow: new Date().toISOString(),
      },
      { status: 502, headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } },
    );
  }
}