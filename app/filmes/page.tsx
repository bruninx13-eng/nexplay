import { MediaCatalog } from "@/components/MediaCatalog";

export const metadata = {
  title: "Filmes",
  description: "Catálogo dinâmico de filmes da NEXPLAY com dados do TMDB.",
};

export default function FilmesPage() {
  return (
    <MediaCatalog
      kind="movie"
      title="CATÁLOGO DE FILMES"
      subtitle="Filmes populares, lançamentos e mais bem avaliados. Metadados fornecidos pelo TMDB."
    />
  );
}