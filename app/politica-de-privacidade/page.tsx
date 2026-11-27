import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description:
    "Saiba como a NEXPLAY trata dados pessoais, cookies e informações de navegação em seu site.",
  alternates: {
    canonical: "/politica-de-privacidade/",
  },
};

const sections: LegalSection[] = [
  {
    id: "quem-somos",
    title: "Quem somos",
    paragraphs: [
      "A NEXPLAY é uma marca comercial operada por Alfa Tecnologia, responsável pela comercialização e prestação do serviço. Esta política explica, de forma clara, como tratamos dados pessoais relacionados ao uso deste site e ao atendimento comercial.",
      siteConfig.legal.identificationNote,
    ],
  },
  {
    id: "dados-coletados",
    title: "Quais dados podemos coletar",
    paragraphs: [
      "Coletamos apenas os dados necessários para atender sua solicitação e prestar as informações sobre o serviço.",
    ],
    list: [
      "Dados fornecidos por você no atendimento pelo WhatsApp, como nome, telefone e informações necessárias para orientar a contratação, a instalação e o suporte.",
      "Dados de navegação e interação com o site, como páginas visitadas e cliques em botões, somente quando você autoriza o uso de ferramentas de medição.",
      "Registro local da sua escolha de consentimento, para que o site respeite sua preferência.",
    ],
  },
  {
    id: "uso-dos-dados",
    title: "Como usamos os dados",
    paragraphs: [
      "Os dados podem ser utilizados para responder solicitações, apresentar planos e condições, orientar a contratação, auxiliar na instalação e no suporte, melhorar a experiência do site e cumprir obrigações legais aplicáveis.",
      "Não utilizamos os dados para finalidades incompatíveis com aquelas informadas no momento da coleta.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies e ferramentas de medição",
    paragraphs: [
      "O site não carrega Google Analytics 4, Google Tag Manager ou Meta Pixel antes do seu consentimento. Essas ferramentas são opcionais, dependem de configuração técnica e só são ativadas depois que você aceita a medição.",
      "Você pode recusar ou revisar sua escolha a qualquer momento em “Preferências de cookies”, disponível no rodapé do site. A recusa não impede o acesso às informações nem o atendimento pelo WhatsApp.",
    ],
  },
  {
    id: "compartilhamento",
    title: "Compartilhamento de dados",
    paragraphs: [
      "Ao clicar em um botão de WhatsApp, você será direcionado ao aplicativo ou site do WhatsApp, que possui políticas próprias de privacidade. Também podemos utilizar provedores de hospedagem e, quando autorizado, ferramentas de medição para operar e melhorar o site.",
      "Não vendemos dados pessoais.",
    ],
  },
  {
    id: "retencao",
    title: "Por quanto tempo mantemos os dados",
    paragraphs: [
      "Mantemos os dados pelo tempo necessário para atender à finalidade da coleta, cumprir obrigações legais ou regulatórias e exercer direitos. Quando não forem mais necessários, os dados serão eliminados ou anonimizados, observadas as hipóteses legais de conservação.",
    ],
  },
  {
    id: "direitos",
    title: "Seus direitos",
    paragraphs: [
      "Nos termos da Lei Geral de Proteção de Dados (LGPD), você pode solicitar confirmação de tratamento, acesso, correção, anonimização, bloqueio ou eliminação de dados desnecessários, portabilidade quando aplicável, informação sobre compartilhamentos e revogação do consentimento.",
      siteConfig.legal.privacyContact,
    ],
  },
  {
    id: "seguranca",
    title: "Segurança",
    paragraphs: [
      "Adotamos medidas razoáveis para proteger os dados contra acesso não autorizado, perda, alteração ou divulgação indevida. Nenhum ambiente digital é completamente imune a riscos, por isso recomendamos que você também proteja seus dispositivos e não compartilhe informações sensíveis em canais não oficiais.",
    ],
  },
  {
    id: "alteracoes",
    title: "Alterações desta política",
    paragraphs: [
      "Esta política pode ser atualizada para refletir mudanças no site, no serviço ou na legislação aplicável. A data da última atualização será sempre indicada no início desta página.",
    ],
  },
  {
    id: "contato-privacidade",
    title: "Contato",
    paragraphs: [
      `Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, fale com o atendimento oficial da NEXPLAY pelo WhatsApp ${siteConfig.whatsapp.display}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      kind="privacy"
      eyebrow="Privacidade e transparência"
      title="Política de privacidade"
      description="Entenda quais dados podem ser tratados no site da NEXPLAY, como eles são usados e quais são os seus direitos."
      sections={sections}
    />
  );
}
