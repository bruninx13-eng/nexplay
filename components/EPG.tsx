"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loader2, RefreshCw, Search, Tv } from "lucide-react";


type EpgProgramme = {
  title: string;
  description: string;
  category: string;
  start: string;
  stop: string;
};

type EpgChannel = {
  id: string;
  name: string;
  icon: string | null;
  programmes: EpgProgramme[];
};

type EpgData = {
  available: boolean;
  demo?: boolean;
  message?: string;
  channels?: EpgChannel[];
  serverNow?: string;
};

const PIXELS_PER_MINUTE = 3.2;
const WINDOW_HOURS = 4;

function roundDown(date: Date, minutes: number): Date {
  const d = new Date(date);
  d.setSeconds(0, 0);
  d.setMinutes(Math.floor(d.getMinutes() / minutes) * minutes);
  return d;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  });
}

function formatHourLabel(date: Date): string {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  });
}

export function EPG() {
  const [data, setData] = useState<EpgData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [now, setNow] = useState<Date>(new Date());
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const hasScrolledRef = useRef(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/epg", { cache: "no-store" });
      const json = (await res.json()) as EpgData;
      setData(json);
      if (!json.available) setError(json.message || "Programação indisponível.");
    } catch {
      setError("Não foi possível carregar a programação.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initial = window.setTimeout(load, 0);
    const interval = window.setInterval(load, 5 * 60 * 1000);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(interval);
    };
  }, [load]);

  // Atualiza "agora" a cada minuto para progresso.
  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 60 * 1000);
    return () => window.clearInterval(interval);
  }, []);

  const channels = useMemo(() => data?.channels ?? [], [data]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const ch of channels) for (const p of ch.programmes) if (p.category) set.add(p.category);
    return ["all", ...Array.from(set).sort()];
  }, [channels]);

  const filteredChannels = useMemo(() => {
    const q = search.trim().toLowerCase();
    return channels.filter((ch) => {
      if (q && !ch.name.toLowerCase().includes(q) && !ch.id.toLowerCase().includes(q)) return false;
      if (category !== "all") {
        const has = ch.programmes.some((p) => p.category === category);
        if (!has) return false;
      }
      return true;
    });
  }, [channels, search, category]);

  // Janela de tempo com antecipação de 15 minutos.
  const windowStart = useMemo(() => {
    const rounded = roundDown(now, 30);
    const start = new Date(rounded.getTime() - 15 * 60 * 1000);
    return start;
  }, [now]);

  const windowEnd = useMemo(
    () => new Date(windowStart.getTime() + WINDOW_HOURS * 60 * 60 * 1000),
    [windowStart],
  );

  // Auto-scroll para "agora" na primeira carga.
  useEffect(() => {
    if (!scrollRef.current || hasScrolledRef.current || loading) return;
    const offset = (now.getTime() - windowStart.getTime()) * (PIXELS_PER_MINUTE / 60000);
    scrollRef.current.scrollLeft = Math.max(0, offset - 120);
    hasScrolledRef.current = true;
  }, [loading, now, windowStart]);

  const timeTicks = useMemo(() => {
    const ticks: Date[] = [];
    const start = new Date(windowStart);
    // arredonda para próxima meia hora para ticks
    const first = roundDown(start, 30);
    // se start não alinhado, começa no próximo tick
    let cursor = first.getTime() < start.getTime() ? new Date(first.getTime() + 30 * 60 * 1000) : first;
    // garante início <= windowStart+30
    while (cursor.getTime() < windowStart.getTime()) cursor = new Date(cursor.getTime() + 30 * 60 * 1000);
    while (cursor.getTime() <= windowEnd.getTime()) {
      ticks.push(new Date(cursor));
      cursor = new Date(cursor.getTime() + 30 * 60 * 1000);
    }
    return ticks;
  }, [windowStart, windowEnd]);

  const nowOffsetPx = (now.getTime() - windowStart.getTime()) * (PIXELS_PER_MINUTE / 60000);

  return (
    <section className="section">
      <div className="shell">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="section-heading">
              <span className="eyebrow">Programação ao vivo</span>
              <h1 className="display-title text-3xl sm:text-4xl">
                GRADE DE <span className="text-gradient-blue">PROGRAMAÇÃO</span>
              </h1>
              <p className="text-sm text-mist">
                Horários em America/Sao_Paulo. Atualização automática a cada 5 minutos.
              </p>
              {data?.demo && (
                <p className="text-xs font-semibold text-yellow-300">
                  Modo demonstração: dados fictícios para testes. Configure EPG_SOURCE_URL para programação real.
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={load}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-mist transition hover:border-neon/40 hover:text-white disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Atualizar
            </button>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar canal..."
                className="w-full rounded-full border border-white/15 bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-mist/60 focus:border-neon/50 focus:outline-none"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white focus:border-neon/50 focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="bg-ink">
                  {c === "all" ? "Todas as categorias" : c}
                </option>
              ))}
            </select>
          </div>

          {loading && !data && (
            <div className="flex items-center justify-center gap-2 py-16 text-mist">
              <Loader2 className="h-5 w-5 animate-spin" />
              Carregando programação...
            </div>
          )}

          {error && !loading && (
            <div className="glass-panel rounded-2xl p-6 text-center">
              <Tv className="mx-auto h-8 w-8 text-mist" />
              <p className="mt-3 text-sm text-mist">{error}</p>
              <p className="mt-1 text-xs text-mist/70">
                Configure EPG_SOURCE_URL no ambiente para habilitar a grade.
              </p>
            </div>
          )}

          {!loading && data?.available && filteredChannels.length === 0 && (
            <div className="glass-panel rounded-2xl p-6 text-center text-sm text-mist">
              Nenhum canal encontrado.
            </div>
          )}

          {!loading && data?.available && filteredChannels.length > 0 && (
            <div className="glass-panel overflow-hidden rounded-2xl">
              <div
                ref={scrollRef}
                className="relative overflow-x-auto overflow-y-auto"
                style={{ maxHeight: "70vh" }}
              >
                <div className="relative" style={{ width: (WINDOW_HOURS * 60 * PIXELS_PER_MINUTE) + 180 }}>
                  {/* Time header */}
                  <div className="sticky top-0 z-20 flex h-10 border-b border-white/[0.08] bg-ink/95 backdrop-blur">
                    <div className="sticky left-0 z-30 w-[180px] shrink-0 border-r border-white/[0.08] bg-ink/95 px-3 text-xs font-bold uppercase tracking-widest text-mist flex items-center">
                      Canais
                    </div>
                    <div className="relative flex-1" style={{ width: WINDOW_HOURS * 60 * PIXELS_PER_MINUTE }}>
                      {timeTicks.map((t) => {
                        const left = (t.getTime() - windowStart.getTime()) * (PIXELS_PER_MINUTE / 60000);
                        return (
                          <div
                            key={t.getTime()}
                            className="absolute top-0 flex h-full items-center border-l border-white/[0.08] px-2 text-[0.65rem] font-semibold text-mist"
                            style={{ left }}
                          >
                            {formatHourLabel(t)}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Now line */}
                  {nowOffsetPx >= 0 && nowOffsetPx <= WINDOW_HOURS * 60 * PIXELS_PER_MINUTE && (
                    <div
                      className="pointer-events-none absolute top-10 z-10 w-px bg-neon shadow-[0_0_8px_rgba(40,185,255,0.8)]"
                      style={{ left: 180 + nowOffsetPx, height: "100%" }}
                    />
                  )}

                  {/* Channels */}
                  {filteredChannels.map((ch) => (
                    <div key={ch.id} className="flex border-b border-white/[0.05]">
                      <div className="sticky left-0 z-10 flex w-[180px] shrink-0 items-center gap-2 border-r border-white/[0.08] bg-ink/90 px-3 py-2">
                        {ch.icon ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={ch.icon} alt="" className="h-6 w-6 rounded object-contain" />
                        ) : (
                          <Tv className="h-4 w-4 text-mist" />
                        )}
                        <span className="truncate text-xs font-semibold text-frost">{ch.name}</span>
                      </div>
                      <div className="relative" style={{ width: WINDOW_HOURS * 60 * PIXELS_PER_MINUTE, height: 52 }}>
                        {ch.programmes
                          .filter((p) => {
                            const s = new Date(p.start).getTime();
                            const e = new Date(p.stop).getTime();
                            return e > windowStart.getTime() && s < windowEnd.getTime();
                          })
                          .map((p, idx) => {
                            const s = Math.max(new Date(p.start).getTime(), windowStart.getTime());
                            const e = Math.min(new Date(p.stop).getTime(), windowEnd.getTime());
                            const left = (s - windowStart.getTime()) * (PIXELS_PER_MINUTE / 60000) + 180;
                            const width = Math.max(24, (e - s) * (PIXELS_PER_MINUTE / 60000));
                            const isNow = new Date(p.start).getTime() <= now.getTime() && new Date(p.stop).getTime() > now.getTime();
                            const progress = isNow
                              ? ((now.getTime() - new Date(p.start).getTime()) / (new Date(p.stop).getTime() - new Date(p.start).getTime())) * 100
                              : 0;
                            return (
                              <div
                                key={`${ch.id}-${idx}`}
                                className={`absolute top-1 bottom-1 overflow-hidden rounded-md border px-2 py-1 text-[0.62rem] ${
                                  isNow
                                    ? "border-neon/60 bg-electric/25 text-white"
                                    : "border-white/10 bg-white/[0.05] text-frost/90"
                                }`}
                                style={{ left: left - 180, width }}
                                title={`${p.title} — ${formatTime(new Date(p.start))} a ${formatTime(new Date(p.stop))}`}
                              >
                                <div className="truncate font-semibold">{p.title}</div>
                                <div className="truncate text-[0.55rem] text-mist">
                                  {formatTime(new Date(p.start))}–{formatTime(new Date(p.stop))}
                                  {p.category ? ` · ${p.category}` : ""}
                                </div>
                                {isNow && (
                                  <div className="absolute bottom-0 left-0 h-0.5 bg-neon" style={{ width: `${progress}%` }} />
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}