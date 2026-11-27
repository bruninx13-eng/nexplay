import { MediaCatalog } from "@/components/MediaCatalog";

export const metadata = {
  title: "Séries",
  description: "Catálogo dinâmico de séries da NEXPLAY com dados do TMDB.",
};

export default function SeriesPage() {
  return (
    <MediaCatalog
      kind="tv"
      title="CATÁLOGO DE SÉRIES"
      subtitle="Séries populares, lançamentos e mais bem avaliadas. Metadados fornecidos pelo TMDB."
    />
  );
}