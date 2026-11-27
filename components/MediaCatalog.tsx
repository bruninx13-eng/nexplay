"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  Star,
  X,
} from "lucide-react";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

type TmdbGenre = { id: number; name: string };

type TmdbItem = {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  media_type?: string;
};

type TmdbListResponse = {
  page: number;
  total_pages: number;
  total_results: number;
  results: TmdbItem[];
};

type TmdbDetails = TmdbItem & {
  number_of_seasons?: number;
  number_of_episodes?: number;
  runtime?: number;
  status?: string;
  tagline?: string;
  credits?: { cast?: { name: string; character: string }[] };
};

type Row = {
  key: string;
  title: string;
  endpoint: string; // path for /api/tmdb
  params: Record<string, string>;
  items: TmdbItem[];
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
};

const TMDB_IMG = "https://image.tmdb.org/t/p/w500";

function titleOf(item: TmdbItem): string {
  return item.title || item.name || item.original_title || item.original_name || "Sem título";
}
function yearOf(item: TmdbItem): string {
  const d = item.release_date || item.first_air_date;
  return d ? d.slice(0, 4) : "";
}
const MOVIE_GENRE_ROWS: { id: number; name: string }[] = [
  { id: 28, name: "Ação" },
  { id: 12, name: "Aventura" },
  { id: 35, name: "Comédia" },
  { id: 27, name: "Terror" },
  { id: 878, name: "Ficção científica" },
  { id: 18, name: "Drama" },
  { id: 10749, name: "Romance" },
];

const TV_GENRE_ROWS: { id: number; name: string }[] = [
  { id: 10759, name: "Ação e aventura" },
  { id: 35, name: "Comédia" },
  { id: 18, name: "Drama" },
  { id: 10765, name: "Ficção científica e fantasia" },
  { id: 9648, name: "Mistério" },
  { id: 10768, name: "Guerra e política" },
];

const KIDS_MOVIE_GENRES: { id: number; name: string }[] = [
  { id: 16, name: "Animações" },
  { id: 10751, name: "Família" },
  { id: 12, name: "Aventura" },
  { id: 14, name: "Fantasia" },
];

const KIDS_TV_GENRES: { id: number; name: string }[] = [
  { id: 16, name: "Animações" },
  { id: 10751, name: "Família" },
  { id: 10762, name: "Infantil" },
  { id: 35, name: "Comédia" },
];

async function fetchTmdb(path: string, params: Record<string, string>): Promise<TmdbListResponse> {
  const qs = new URLSearchParams({ path, ...params });
  const res = await fetch(`/api/tmdb?${qs.toString()}`);
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw new Error((j as { error?: string }).error || `Erro ${res.status}`);
  }
  return (await res.json()) as TmdbListResponse;
}

async function fetchDetails(kind: "movie" | "tv", id: number): Promise<TmdbDetails> {
  const path = `${kind === "movie" ? "movie" : "tv"}/${id}`;
  const qs = new URLSearchParams({ path, append_to_response: "credits" });
  const res = await fetch(`/api/tmdb?${qs.toString()}`);
  if (!res.ok) throw new Error("Detalhes indisponíveis.");
  return (await res.json()) as TmdbDetails;
}

export function MediaCatalog({
  kind,
  kids = false,
  title,
  subtitle,
}: {
  kind: "movie" | "tv";
  kids?: boolean;
  title: string;
  subtitle: string;
}) {
  const [genres, setGenres] = useState<TmdbGenre[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TmdbItem[]>([]);
  const [searchPage, setSearchPage] = useState(1);
  const [searchTotalPages, setSearchTotalPages] = useState(1);
  const [searching, setSearching] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [genreResults, setGenreResults] = useState<TmdbItem[]>([]);
  const [genrePage, setGenrePage] = useState(1);
  const [genreTotalPages, setGenreTotalPages] = useState(1);
  const [loadingMoreGenre, setLoadingMoreGenre] = useState(false);
  const [modalItem, setModalItem] = useState<TmdbDetails | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const mediaType = kind === "movie" ? "movie" : "tv";

  // Define rows.
  useEffect(() => {
    let cancelled = false;
    async function init() {
      setLoadingInitial(true);
      setError(null);
      try {
        // genres
        const gRes = (await fetchTmdb(`genre/${mediaType}/list`, {})) as unknown as {
          genres?: TmdbGenre[];
        };
        if (!cancelled) setGenres(gRes.genres || []);
      } catch {
        /* ignore */
      }

      const genreRows = kids
        ? (kind === "movie" ? KIDS_MOVIE_GENRES : KIDS_TV_GENRES)
        : (kind === "movie" ? MOVIE_GENRE_ROWS : TV_GENRE_ROWS);

      const baseRows: { key: string; title: string; endpoint: string; params: Record<string, string> }[] = [];

      if (kids) {
        // Kids: foco em descoberta com filtros.
        if (kind === "movie") {
          baseRows.push({ key: "kid-pop", title: "Filmes infantis em alta", endpoint: "discover/movie", params: { sort_by: "popularity.desc", with_genres: "16,10751", certification_country: "BR", "certification.lte": "12", include_adult: "false" } });
          baseRows.push({ key: "kid-anim", title: "Animações", endpoint: "discover/movie", params: { sort_by: "popularity.desc", with_genres: "16", certification_country: "BR", "certification.lte": "12", include_adult: "false" } });
          baseRows.push({ key: "kid-fam", title: "Aventuras em família", endpoint: "discover/movie", params: { sort_by: "popularity.desc", with_genres: "10751,12", certification_country: "BR", "certification.lte": "12", include_adult: "false" } });
          baseRows.push({ key: "kid-top", title: "Mais bem avaliados", endpoint: "discover/movie", params: { sort_by: "vote_average.desc", "vote_count.gte": "50", with_genres: "16,10751", certification_country: "BR", "certification.lte": "12", include_adult: "false" } });
        } else {
          baseRows.push({ key: "kid-pop", title: "Séries infantis em alta", endpoint: "discover/tv", params: { sort_by: "popularity.desc", with_genres: "16,10762", include_adult: "false" } });
          baseRows.push({ key: "kid-anim", title: "Animações", endpoint: "discover/tv", params: { sort_by: "popularity.desc", with_genres: "16", include_adult: "false" } });
          baseRows.push({ key: "kid-fam", title: "Família", endpoint: "discover/tv", params: { sort_by: "popularity.desc", with_genres: "10751", include_adult: "false" } });
          baseRows.push({ key: "kid-top", title: "Mais bem avaliadas", endpoint: "discover/tv", params: { sort_by: "vote_average.desc", "vote_count.gte": "50", with_genres: "16,10762", include_adult: "false" } });
        }
      } else {
        if (kind === "movie") {
          baseRows.push({ key: "trending", title: "Em alta esta semana", endpoint: "trending/movie/week", params: {} });
          baseRows.push({ key: "popular", title: "Populares", endpoint: "movie/popular", params: {} });
          baseRows.push({ key: "now", title: "Lançamentos", endpoint: "movie/now_playing", params: {} });
          baseRows.push({ key: "top", title: "Mais bem avaliados", endpoint: "movie/top_rated", params: {} });
          for (const g of genreRows) {
            baseRows.push({ key: `g-${g.id}`, title: g.name, endpoint: "discover/movie", params: { with_genres: String(g.id), sort_by: "popularity.desc" } });
          }
        } else {
          baseRows.push({ key: "trending", title: "Em alta esta semana", endpoint: "trending/tv/week", params: {} });
          baseRows.push({ key: "popular", title: "Populares", endpoint: "tv/popular", params: {} });
          baseRows.push({ key: "onair", title: "Lançadas recentemente", endpoint: "tv/on_the_air", params: {} });
          baseRows.push({ key: "top", title: "Mais bem avaliadas", endpoint: "tv/top_rated", params: {} });
          for (const g of genreRows) {
            baseRows.push({ key: `g-${g.id}`, title: g.name, endpoint: "discover/tv", params: { with_genres: String(g.id), sort_by: "popularity.desc" } });
          }
        }
      }

      const initialRows: Row[] = baseRows.map((r) => ({
        key: r.key,
        title: r.title,
        endpoint: r.endpoint,
        params: r.params,
        items: [],
        page: 0,
        totalPages: 1,
        loading: true,
        error: null,
      }));

      if (cancelled) return;
      setRows(initialRows);

      // Load first page for each row (limit concurrency).
      const concurrency = 3;
      const queue = [...initialRows];
      async function worker() {
        while (queue.length) {
          const row = queue.shift();
          if (!row) break;
          try {
            const data = await fetchTmdb(row.endpoint, { ...row.params, page: "1" });
            if (cancelled) return;
            setRows((prev) =>
              prev.map((r) =>
                r.key === row.key
                  ? { ...r, items: data.results || [], page: 1, totalPages: data.total_pages || 1, loading: false }
                  : r,
              ),
            );
          } catch (e) {
            if (cancelled) return;
            setRows((prev) =>
              prev.map((r) =>
                r.key === row.key
                  ? { ...r, loading: false, error: e instanceof Error ? e.message : "Erro" }
                  : r,
              ),
            );
          }
        }
      }
      await Promise.all(Array.from({ length: concurrency }, () => worker()));

      if (!cancelled) setLoadingInitial(false);
    }
    init();
    return () => {
      cancelled = true;
    };
  }, [kind, kids, mediaType]);

  const handleSearch = useCallback(
    async (page = 1) => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }
      setSearching(true);
      try {
        const path = kind === "movie" ? "search/movie" : "search/tv";
        const data = await fetchTmdb(path, { query: searchQuery.trim(), page: String(page) });
        if (page === 1) setSearchResults(data.results || []);
        else setSearchResults((prev) => [...prev, ...(data.results || [])]);
        setSearchPage(data.page || page);
        setSearchTotalPages(data.total_pages || 1);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erro na busca.");
      } finally {
        setSearching(false);
      }
    },
    [kind, searchQuery],
  );

  useEffect(() => {
    const t = setTimeout(() => {
      if (searchQuery.trim()) handleSearch(1);
      else setSearchResults([]);
    }, 400);
    return () => clearTimeout(t);
  }, [searchQuery, handleSearch]);

  const handleGenreSelect = useCallback(
    async (genreId: number | null) => {
      setSelectedGenre(genreId);
      if (genreId === null) {
        setGenreResults([]);
        return;
      }
      setLoadingMoreGenre(true);
      try {
        const path = kind === "movie" ? "discover/movie" : "discover/tv";
        const params: Record<string, string> = {
          with_genres: String(genreId),
          sort_by: "popularity.desc",
          page: "1",
        };
        if (kids) {
          if (kind === "movie") {
            params.certification_country = "BR";
            params["certification.lte"] = "12";
            params.include_adult = "false";
          } else {
            params.include_adult = "false";
          }
        }
        const data = await fetchTmdb(path, params);
        setGenreResults(data.results || []);
        setGenrePage(1);
        setGenreTotalPages(data.total_pages || 1);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erro.");
      } finally {
        setLoadingMoreGenre(false);
      }
    },
    [kind, kids],
  );

  const loadMoreGenre = useCallback(async () => {
    if (selectedGenre === null || genrePage >= genreTotalPages) return;
    setLoadingMoreGenre(true);
    try {
      const path = kind === "movie" ? "discover/movie" : "discover/tv";
      const params: Record<string, string> = {
        with_genres: String(selectedGenre),
        sort_by: "popularity.desc",
        page: String(genrePage + 1),
      };
      if (kids && kind === "movie") {
        params.certification_country = "BR";
        params["certification.lte"] = "12";
        params.include_adult = "false";
      }
      const data = await fetchTmdb(path, params);
      setGenreResults((prev) => [...prev, ...(data.results || [])]);
      setGenrePage((p) => p + 1);
    } catch {
      /* ignore */
    } finally {
      setLoadingMoreGenre(false);
    }
  }, [kind, kids, selectedGenre, genrePage, genreTotalPages]);

  const loadMoreRow = useCallback(async (rowKey: string) => {
    const row = rows.find((r) => r.key === rowKey);
    if (!row || row.page >= row.totalPages) return;
    setRows((prev) => prev.map((r) => (r.key === rowKey ? { ...r, loading: true } : r)));
    try {
      const data = await fetchTmdb(row.endpoint, { ...row.params, page: String(row.page + 1) });
      setRows((prev) =>
        prev.map((r) =>
          r.key === rowKey
            ? { ...r, items: [...r.items, ...(data.results || [])], page: row.page + 1, loading: false }
            : r,
        ),
      );
    } catch {
      setRows((prev) => prev.map((r) => (r.key === rowKey ? { ...r, loading: false } : r)));
    }
  }, [rows]);

  const openModal = useCallback(async (item: TmdbItem) => {
    setModalLoading(true);
    setModalItem({ ...item } as TmdbDetails);
    try {
      const details = await fetchDetails(kind, item.id);
      setModalItem(details);
    } catch {
      /* keep basic */
    } finally {
      setModalLoading(false);
    }
  }, [kind]);

  const showingSearch = searchQuery.trim().length > 0;
  const showingGenre = selectedGenre !== null && !showingSearch;

  return (
    <section className="section">
      <div className="shell">
        <div className="flex flex-col gap-6">
          <div className="section-heading">
            <span className="eyebrow">{kids ? "Área infantil" : kind === "movie" ? "Catálogo de filmes" : "Catálogo de séries"}</span>
            <h1 className="display-title text-3xl sm:text-4xl">
              {title}
            </h1>
            <p className="text-sm text-mist">{subtitle}</p>
          </div>

          {/* Search + genre filter */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Pesquisar ${kind === "movie" ? "filmes" : "séries"}...`}
                className="w-full rounded-full border border-white/15 bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-mist/60 focus:border-neon/50 focus:outline-none"
              />
            </div>
            <select
              value={selectedGenre ?? ""}
              onChange={(e) => handleGenreSelect(e.target.value ? Number(e.target.value) : null)}
              className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white focus:border-neon/50 focus:outline-none"
              disabled={showingSearch}
            >
              <option value="" className="bg-ink">Todos os gêneros</option>
              {(kids
                ? (kind === "movie" ? KIDS_MOVIE_GENRES : KIDS_TV_GENRES)
                : (kind === "movie" ? MOVIE_GENRE_ROWS : TV_GENRE_ROWS)
              ).map((g) => (
                <option key={g.id} value={g.id} className="bg-ink">
                  {g.name}
                </option>
              ))}
              {genres
                .filter((g) => {
                  const ids = (kids
                    ? (kind === "movie" ? KIDS_MOVIE_GENRES : KIDS_TV_GENRES)
                    : (kind === "movie" ? MOVIE_GENRE_ROWS : TV_GENRE_ROWS)
                  ).map((x) => x.id);
                  return !ids.includes(g.id);
                })
                .map((g) => (
                  <option key={g.id} value={g.id} className="bg-ink">
                    {g.name}
                  </option>
                ))}
            </select>
            {(showingSearch || showingGenre) && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedGenre(null);
                  setGenreResults([]);
                  setSearchResults([]);
                }}
                className="rounded-full border border-white/15 px-4 py-2.5 text-xs font-bold text-mist transition hover:border-neon/40 hover:text-white"
              >
                Voltar ao catálogo
              </button>
            )}
          </div>

          {error && (
            <div className="glass-panel rounded-2xl p-6 text-center text-sm text-mist">
              {error}
              <p className="mt-1 text-xs text-mist/70">
                Verifique se TMDB_API_KEY está configurada.
              </p>
            </div>
          )}

          {/* Search results */}
          {showingSearch && (
            <div>
              <h2 className="mb-4 font-display text-lg font-bold text-white">
                Resultados para “{searchQuery}”
              </h2>
              {searching && searchResults.length === 0 && (
                <div className="flex items-center gap-2 py-8 text-mist">
                  <Loader2 className="h-5 w-5 animate-spin" /> Buscando...
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {searchResults.map((item) => (
                  <PosterCard key={item.id} item={item} onOpen={openModal} />
                ))}
              </div>
              {searchPage < searchTotalPages && (
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => handleSearch(searchPage + 1)}
                    disabled={searching}
                    className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold text-mist transition hover:border-neon/40 hover:text-white disabled:opacity-50"
                  >
                    {searching ? "Carregando..." : "Carregar mais"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Genre results */}
          {showingGenre && (
            <div>
              <h2 className="mb-4 font-display text-lg font-bold text-white">
                {genres.find((g) => g.id === selectedGenre)?.name || "Gênero"}
              </h2>
              {loadingMoreGenre && genreResults.length === 0 && (
                <div className="flex items-center gap-2 py-8 text-mist">
                  <Loader2 className="h-5 w-5 animate-spin" /> Carregando...
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {genreResults.map((item) => (
                  <PosterCard key={item.id} item={item} onOpen={openModal} />
                ))}
              </div>
              {genrePage < genreTotalPages && (
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={loadMoreGenre}
                    disabled={loadingMoreGenre}
                    className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold text-mist transition hover:border-neon/40 hover:text-white disabled:opacity-50"
                  >
                    {loadingMoreGenre ? "Carregando..." : "Carregar mais"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Carousels */}
          {!showingSearch && !showingGenre && (
            <>
              {loadingInitial && rows.every((r) => r.items.length === 0) && (
                <div className="flex items-center gap-2 py-8 text-mist">
                  <Loader2 className="h-5 w-5 animate-spin" /> Carregando catálogo...
                </div>
              )}
              {rows.map((row) => (
                <CarouselRow
                  key={row.key}
                  row={row}
                  onLoadMore={() => loadMoreRow(row.key)}
                  onOpen={openModal}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalItem && (
        <MediaModal
          item={modalItem}
          loading={modalLoading}
          kind={kind}
          onClose={() => setModalItem(null)}
        />
      )}
    </section>
  );
}

function PosterCard({ item, onOpen }: { item: TmdbItem; onOpen: (i: TmdbItem) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] text-left transition hover:border-neon/40 hover:-translate-y-1"
    >
      <div className="aspect-[2/3] w-full overflow-hidden bg-navy">
        {item.poster_path ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${TMDB_IMG}${item.poster_path}`}
            alt={titleOf(item)}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-mist">Sem imagem</div>
        )}
      </div>
      <div className="p-2">
        <div className="truncate text-xs font-semibold text-frost">{titleOf(item)}</div>
        <div className="mt-0.5 flex items-center gap-1 text-[0.65rem] text-mist">
          {yearOf(item) && <span>{yearOf(item)}</span>}
          {item.vote_average > 0 && (
            <span className="flex items-center gap-0.5">
              <Star className="h-3 w-3 text-yellow-400" />
              {item.vote_average.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function CarouselRow({
  row,
  onLoadMore,
  onOpen,
}: {
  row: Row;
  onLoadMore: () => void;
  onOpen: (i: TmdbItem) => void;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
  };

  if (!row.loading && row.items.length === 0 && !row.error) return null;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-white">{row.title}</h2>
        <div className="flex items-center gap-2">
          {row.page < row.totalPages && (
            <button
              type="button"
              onClick={onLoadMore}
              disabled={row.loading}
              className="text-[0.7rem] font-semibold text-mist transition hover:text-neon disabled:opacity-50"
            >
              {row.loading ? "..." : "Ver mais"}
            </button>
          )}
          <button
            type="button"
            onClick={() => scroll("left")}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-mist transition hover:border-neon/40 hover:text-white"
            aria-label="Rolar para a esquerda"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-mist transition hover:border-neon/40 hover:text-white"
            aria-label="Rolar para a direita"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      {row.loading && row.items.length === 0 && (
        <div className="flex items-center gap-2 py-6 text-mist">
          <Loader2 className="h-4 w-4 animate-spin" /> Carregando...
        </div>
      )}
      {row.error && (
        <div className="text-sm text-mist">{row.error}</div>
      )}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {row.items.map((item) => (
          <div key={item.id} style={{ scrollSnapAlign: "start" }} className="w-36 shrink-0 sm:w-40">
            <PosterCard item={item} onOpen={onOpen} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MediaModal({
  item,
  loading,
  kind,
  onClose,
}: {
  item: TmdbDetails;
  loading: boolean;
  kind: "movie" | "tv";
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const year = yearOf(item);
  const genres = item.genres?.map((g) => g.name).join(", ") || "";

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#07101d] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white transition hover:bg-white/10"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="relative h-48 w-full overflow-hidden sm:h-64">
          {item.backdrop_path ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : item.poster_path ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`${TMDB_IMG}${item.poster_path}`}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07101d] to-transparent" />
        </div>
        <div className="p-5 sm:p-6">
          <h2 className="font-display text-2xl font-extrabold text-white">
            {titleOf(item)}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-mist">
            {year && <span>{year}</span>}
            {item.vote_average > 0 && (
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 text-yellow-400" />
                {item.vote_average.toFixed(1)}
              </span>
            )}
            {genres && <span>{genres}</span>}
            {kind === "tv" && item.number_of_seasons && (
              <span>{item.number_of_seasons} temporada(s)</span>
            )}
            {item.runtime ? <span>{item.runtime} min</span> : null}
          </div>
          {item.tagline && (
            <p className="mt-3 text-sm italic text-mist">{item.tagline}</p>
          )}
          <p className="mt-4 text-sm leading-relaxed text-frost/90">
            {item.overview || "Sinopse não disponível."}
          </p>
          {loading && (
            <div className="mt-3 flex items-center gap-2 text-xs text-mist">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Carregando detalhes...
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppLink
              messageKey="general"
              eventName="whatsapp_click"
              placement={`catalog_${kind}`}
              variant="primary"
              className="cta cta-primary cta-compact"
              ariaLabel="Falar sobre este título no WhatsApp"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Tenho interesse
            </WhatsAppLink>
            <button
              type="button"
              onClick={onClose}
              className="cta cta-secondary cta-compact"
            >
              Voltar ao catálogo
            </button>
          </div>
          <p className="mt-4 text-[0.65rem] text-mist/70">
            Metadados, capas e sinopses fornecidos pelo TMDB. Este catálogo não
            disponibiliza vídeos ou links de reprodução.
          </p>
        </div>
      </div>
    </div>
  );
}