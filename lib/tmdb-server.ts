/**
 * Integração server-side com a API do TMDB.
 *
 * A chave de API nunca é exposta ao cliente: todas as requisições passam por
 * esta camada/rotas de API. O idioma e a região são fixados em pt-BR / BR.
 */

const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export const TMDB_IMAGE = {
  poster: `${TMDB_IMAGE_BASE}/w500`,
  posterLarge: `${TMDB_IMAGE_BASE}/w780`,
  backdrop: `${TMDB_IMAGE_BASE}/w1280`,
  profile: `${TMDB_IMAGE_BASE}/w185`,
};

function apiKey(): string {
  const key = process.env.TMDB_API_KEY;
  if (!key) throw new Error("TMDB_API_KEY não configurada.");
  return key;
}

export type TmdbFetchOptions = {
  params?: Record<string, string | number | boolean | undefined>;
};

export async function tmdbFetch<T = unknown>(
  path: string,
  options: TmdbFetchOptions = {},
): Promise<T> {
  const { params = {} } = options;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${TMDB_BASE}${normalizedPath}`);
  url.searchParams.set("api_key", apiKey());
  url.searchParams.set("language", "pt-BR");
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    url.searchParams.set(k, String(v));
  }
  // Região BR quando aplicável (discover/search endpoints aceitam region).
  if (
    normalizedPath.startsWith("/discover") ||
    normalizedPath.startsWith("/movie") ||
    normalizedPath.startsWith("/tv")
  ) {
    if (!url.searchParams.has("region")) url.searchParams.set("region", "BR");
  }

  const res = await fetch(url.toString(), {
    // Evita o cache de dados do Next.js em ambientes serverless (Netlify),
    // que pode retornar respostas cruzadas entre URLs diferentes.
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`TMDB ${res.status}: ${text.slice(0, 200)}`);
  }
  return (await res.json()) as T;
}

export function tmdbImageUrl(path: string | null | undefined, size = "w500"): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}