import { NextRequest, NextResponse } from "next/server";
import { tmdbFetch } from "@/lib/tmdb-server";

export const runtime = "nodejs";

const ALLOWED_PATH = /^[a-zA-Z0-9/_-]+$/;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");
  if (!path || !ALLOWED_PATH.test(path) || path.includes("..")) {
    return NextResponse.json({ error: "Caminho inválido." }, { status: 400 });
  }

  // Coleta parâmetros adicionais (exceto "path").
  const params: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    if (key === "path") continue;
    params[key] = value;
  }

  try {
    const data = await tmdbFetch(path, { params });
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido.";
    const status = message.includes("não configurada") ? 503 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}