import { MediaCatalog } from "@/components/MediaCatalog";

export const metadata = {
  title: "Infantil",
  description: "Área infantil da NEXPLAY: animações, filmes e séries para a família.",
};

export default function InfantilPage() {
  return (
    <>
      <MediaCatalog
        kind="movie"
        kids
        title="FILMES INFANTIS"
        subtitle="Animações, aventuras em família e conteúdo para crianças. Metadados fornecidos pelo TMDB."
      />
      <MediaCatalog
        kind="tv"
        kids
        title="SÉRIES INFANTIS"
        subtitle="Desenhos e séries para a criançada. Metadados fornecidos pelo TMDB."
      />
    </>
  );
}