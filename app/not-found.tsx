import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[78vh] items-center overflow-hidden pb-16 pt-[calc(var(--header-height)+3rem)]">
      <div
        className="grid-surface absolute inset-0 -z-10 opacity-60"
        aria-hidden="true"
      />
      <div className="shell text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-neon/25 bg-electric/10 text-neon">
          <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden="true" />
        </span>
        <p className="mt-6 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-neon">
          Erro 404
        </p>
        <h1 className="display-title mx-auto mt-3 max-w-2xl text-[clamp(2rem,6vw,3.6rem)] text-white">
          Essa tela não faz parte da nossa programação.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-mist">
          O endereço acessado não foi encontrado. Volte ao início para conhecer
          os planos e falar com a NEXPLAY.
        </p>
        <Link href="/" className="cta cta-primary mt-8">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}
