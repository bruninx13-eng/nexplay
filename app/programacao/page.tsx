import { EPG } from "@/components/EPG";

export const metadata = {
  title: "Programação ao Vivo",
  description: "Grade de programação ao vivo da NEXPLAY em horário de Brasília.",
};

export default function ProgramacaoPage() {
  return (
    <main>
      <EPG />
      <section className="section pt-0">
        <div className="shell">
          <p className="text-xs text-mist/70">
            Programação fornecida pela fonte de EPG configurada. Horários em America/Sao_Paulo.
            Atualização automática a cada 5 minutos.
          </p>
        </div>
      </section>
    </main>
  );
}