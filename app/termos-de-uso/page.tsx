import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { formatBRL } from "@/lib/format";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Termos de uso",
  description:
    "Consulte os termos de uso do site da NEXPLAY, informações sobre planos, contratação, instalação e suporte.",
  alternates: {
    canonical: "/termos-de-uso/",
  },
};

const planSummary = siteConfig.plans.items
  .map(
    (plan) =>
      `${plan.name.charAt(0)}${plan.name.slice(1).toLowerCase()} — ${formatBRL(plan.priceCents)} por ${plan.durationLabel}`,
  )
  .join("; ");

const sections: LegalSection[] = [
  {
    id: "identificacao",
    title: "Identificação",
    paragraphs: [
      "A NEXPLAY é uma marca comercial operada por Alfa Tecnologia, responsável pela comercialização e prestação do serviço de entretenimento digital licenciado divulgado neste site.",
      siteConfig.legal.identificationNote,
    ],
  },
  {
    id: "objeto",
    title: "Objeto do site",
    paragraphs: [
      "Este site tem finalidade informativa e comercial: apresentar a NEXPLAY, divulgar categorias de entretenimento, exibir planos e direcionar interessados ao atendimento oficial pelo WhatsApp.",
      "As informações publicadas não substituem as condições confirmadas pela equipe no momento da contratação.",
    ],
  },
  {
    id: "planos",
    title: "Planos e valores",
    paragraphs: [
      `Os planos divulgados nesta página são: ${planSummary}.`,
      "Os valores e prazos apresentados podem ser atualizados. A contratação está sujeita à confirmação de disponibilidade, compatibilidade e condições comerciais vigentes no atendimento.",
    ],
  },
  {
    id: "contratacao",
    title: "Contratação e pagamento",
    paragraphs: [
      "A contratação é iniciada pelo WhatsApp comercial. A equipe confirma o plano escolhido, as condições aplicáveis e as formas de pagamento disponíveis.",
      "Nenhum pagamento deve ser realizado por meio deste site. Conclua a contratação somente após receber as orientações do canal oficial de atendimento.",
    ],
  },
  {
    id: "instalacao",
    title: "Instalação e compatibilidade",
    paragraphs: [
      "Após a contratação, a equipe orienta sobre a instalação de acordo com o dispositivo informado. A compatibilidade depende do modelo, do sistema operacional e das condições do aparelho.",
      "Consulte a NEXPLAY antes de contratar caso tenha dúvidas sobre o seu dispositivo.",
    ],
  },
  {
    id: "uso-suporte",
    title: "Uso do serviço e suporte",
    paragraphs: [
      "O uso do serviço depende de conexão à internet adequada, dispositivo compatível e demais condições técnicas informadas no atendimento.",
      "O suporte é prestado pelo WhatsApp comercial da NEXPLAY, com orientações sobre acesso, instalação e dúvidas relacionadas ao serviço contratado.",
    ],
  },
  {
    id: "conteudo",
    title: "Conteúdo e disponibilidade",
    paragraphs: [
      "As categorias divulgadas nesta página estão sujeitas à disponibilidade e às condições do serviço licenciado. Catálogos, canais e conteúdos específicos podem variar e devem ser confirmados com a equipe.",
    ],
  },
  {
    id: "cancelamento",
    title: "Cancelamento e reembolso",
    paragraphs: [
      "Solicitações de cancelamento ou reembolso serão analisadas de acordo com as condições contratadas, o período de vigência do plano e a legislação aplicável. Para solicitar, entre em contato pelo canal oficial de atendimento.",
    ],
  },
  {
    id: "propriedade-intelectual",
    title: "Propriedade intelectual",
    paragraphs: [
      "A marca NEXPLAY, o logotipo, os textos, as ilustrações e os elementos visuais deste site são protegidos pela legislação aplicável. Não é permitida a reprodução, modificação ou uso comercial sem autorização.",
      "Marcas, conteúdos e tecnologias de terceiros eventualmente mencionados pertencem aos seus respectivos titulares.",
    ],
  },
  {
    id: "privacidade",
    title: "Privacidade",
    paragraphs: [
      "O tratamento de dados pessoais é descrito na Política de privacidade da NEXPLAY, disponível no rodapé deste site.",
    ],
  },
  {
    id: "alteracoes-termos",
    title: "Alterações destes termos",
    paragraphs: [
      "Estes termos podem ser atualizados para refletir mudanças no serviço, no site ou na legislação. A data da última atualização será indicada no início desta página.",
    ],
  },
  {
    id: "contato-termos",
    title: "Contato",
    paragraphs: [
      `Dúvidas sobre estes termos podem ser encaminhadas ao atendimento oficial da NEXPLAY pelo WhatsApp ${siteConfig.whatsapp.display}. Eventuais controvérsias serão tratadas conforme a legislação brasileira aplicável.`,
    ],
  },
];

export default function TermsOfUsePage() {
  return (
    <LegalPage
      kind="terms"
      eyebrow="Condições e transparência"
      title="Termos de uso"
      description="Informações sobre o site da NEXPLAY, planos divulgados, contratação, instalação, suporte e uso do serviço."
      sections={sections}
    />
  );
}
