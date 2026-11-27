/**
 * Configuração central da NEXPLAY.
 *
 * Tudo o que muda com frequência (WhatsApp, preços, textos comerciais, FAQ e
 * links) deve ser editado neste arquivo. Os componentes consomem estes dados
 * para evitar duplicação e inconsistências.
 */

export const siteConfig = {
  name: "NEXPLAY",
  slogan: "Seu próximo entretenimento começa aqui.",
  segment: "Entretenimento digital",
  description:
    "Conheça a NEXPLAY, consulte nossos planos de entretenimento e fale diretamente com nossa equipe pelo WhatsApp.",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "https://nexplay.com.br",
  whatsapp: {
    number: "553491871674",
    display: "+55 34 9187-1674",
    baseUrl: "https://wa.me/553491871674",
    messages: {
      general:
        "Olá! Conheci a NEXPLAY pelo site e gostaria de conhecer os planos e as opções de entretenimento disponíveis.",
      monthly:
        "Olá! Tenho interesse no plano mensal da NEXPLAY de R$ 25,00. Gostaria de contratar.",
      quarterly:
        "Olá! Tenho interesse no plano trimestral da NEXPLAY de R$ 70,00. Gostaria de contratar.",
      semiannual:
        "Olá! Tenho interesse no plano semestral da NEXPLAY de R$ 132,00. Gostaria de contratar.",
      annual:
        "Olá! Tenho interesse no plano anual da NEXPLAY de R$ 240,00. Gostaria de contratar.",
      compatibility:
        "Olá! Gostaria de saber se meu dispositivo é compatível com o serviço da NEXPLAY.",
      support:
        "Olá! Estou no site da NEXPLAY e gostaria de tirar uma dúvida.",
    },
  },
  navigation: [
    { label: "Início", shortLabel: "Início", href: "/" },
    { label: "Programação ao Vivo", shortLabel: "Ao Vivo", href: "/programacao" },
    { label: "Filmes", shortLabel: "Filmes", href: "/filmes" },
    { label: "Séries", shortLabel: "Séries", href: "/series" },
    { label: "Infantil", shortLabel: "Infantil", href: "/infantil" },
    { label: "Planos", shortLabel: "Planos", href: "/planos" },
    { label: "Contato", shortLabel: "Contato", href: "/contato" },
  ],
  hero: {
    eyebrow: "Entretenimento digital para todos",
    title: "SEU PRÓXIMO ENTRETENIMENTO COMEÇA AQUI.",
    titleLines: ["SEU PRÓXIMO", "ENTRETENIMENTO", "COMEÇA AQUI."],
    titleHighlight: "ENTRETENIMENTO",
    subtitle:
      "Descubra nossas opções de entretenimento e encontre a experiência ideal para você e sua família.",
    primaryCta: "QUERO CONHECER OS PLANOS",
    secondaryCta: "VER PLANOS E PREÇOS",
    supportNote: "Atendimento direto pelo WhatsApp.",
    scrollNote: "Conheça nossos planos e condições.",
    trust: [
      "Atendimento pelo WhatsApp",
      "Planos a partir de R$ 25,00",
      "Orientação para instalação",
    ],
  },
  entertainment: {
    eyebrow: "Para todos os momentos",
    title: "UM UNIVERSO DE ENTRETENIMENTO",
    subtitle: "Opções para diferentes gostos e momentos.",
    disclaimer:
      "A disponibilidade de categorias e conteúdos pode variar. Confirme os detalhes com nossa equipe pelo WhatsApp.",
    categories: [
      {
        id: "filmes",
        title: "Filmes",
        description: "Uma seleção de filmes para maratonar nos momentos livres.",
        icon: "film",
        art: "films",
      },
      {
        id: "series",
        title: "Séries",
        description: "Histórias em episódios para acompanhar no seu ritmo.",
        icon: "series",
        art: "series",
      },
      {
        id: "canais",
        title: "Canais ao vivo",
        description:
          "Programação ao vivo para acompanhar o que acontece agora.",
        icon: "live",
        art: "channels",
      },
      {
        id: "esportes",
        title: "Esportes",
        description:
          "Opções de esportes para quem gosta de acompanhar de perto.",
        icon: "sports",
        art: "sports",
      },
      {
        id: "infantil",
        title: "Conteúdo infantil",
        description:
          "Alternativas de entretenimento pensadas para a criançada.",
        icon: "kids",
        art: "kids",
      },
      {
        id: "familia",
        title: "Entretenimento familiar",
        description:
          "Opções para reunir a família em volta da tela.",
        icon: "family",
        art: "family",
      },
    ],
  },
  benefits: {
    eyebrow: "Uma escolha mais simples",
    title: "POR QUE CONHECER A NEXPLAY?",
    subtitle:
      "Atendimento próximo e informações claras para você escolher com segurança.",
    items: [
      {
        icon: "whatsapp",
        title: "Atendimento pelo WhatsApp",
        description:
          "Fale diretamente com nossa equipe para tirar dúvidas e contratar.",
      },
      {
        icon: "install",
        title: "Orientação para instalação",
        description:
          "Receba orientações de instalação de acordo com o seu dispositivo.",
      },
      {
        icon: "calendar",
        title: "Planos com diferentes durações",
        description:
          "Opções mensal, trimestral, semestral e anual para escolher com calma.",
      },
      {
        icon: "devices",
        title: "Compatibilidade com dispositivos suportados",
        description:
          "Consulte os modelos e sistemas compatíveis antes de contratar.",
      },
      {
        icon: "support",
        title: "Suporte ao cliente",
        description:
          "Conte com orientação pelo WhatsApp durante o uso do serviço.",
      },
      {
        icon: "audience",
        title: "Opções para diferentes públicos",
        description:
          "Categorias para diferentes gostos, momentos e idades.",
      },
    ],
  },
  devices: {
    eyebrow: "Assista onde for compatível",
    title: "SEU ENTRETENIMENTO NOS DISPOSITIVOS COMPATÍVEIS",
    subtitle:
      "Consulte nossa equipe para verificar a compatibilidade do seu dispositivo.",
    cta: "CONSULTAR COMPATIBILIDADE",
    note:
      "A compatibilidade depende do modelo, do sistema operacional e das condições do aparelho. A confirmação é feita no atendimento.",
    items: [
      {
        icon: "tv",
        title: "Smart TVs",
        description: "Consulte modelo e sistema.",
      },
      {
        icon: "box",
        title: "TV Box",
        description: "Verifique a compatibilidade.",
      },
      {
        icon: "phone",
        title: "Smartphones Android",
        description: "Sujeito ao modelo e à versão.",
      },
      {
        icon: "tablet",
        title: "Tablets",
        description: "Consulte as especificações.",
      },
      {
        icon: "monitor",
        title: "Computadores",
        description: "Confirme no atendimento.",
      },
    ],
  },
  plans: {
    eyebrow: "Planos e condições",
    title: "ESCOLHA SEU PLANO NEXPLAY",
    subtitle:
      "Mais tempo de entretenimento com opções que cabem no seu bolso.",
    note:
      "Os valores e as condições acima são confirmados pela equipe no atendimento. Não há cobranças adicionais nesta página.",
    items: [
      {
        id: "mensal",
        name: "MENSAL",
        months: 1,
        priceCents: 2500,
        durationLabel: "1 mês",
        description: "Para experimentar com flexibilidade.",
        messageKey: "monthly",
        event: "plan_monthly_click",
        highlight: false,
        badge: null,
      },
      {
        id: "trimestral",
        name: "TRIMESTRAL",
        months: 3,
        priceCents: 7000,
        durationLabel: "3 meses",
        description: "Mais tempo para aproveitar.",
        messageKey: "quarterly",
        event: "plan_quarterly_click",
        highlight: false,
        badge: null,
      },
      {
        id: "semestral",
        name: "SEMESTRAL",
        months: 6,
        priceCents: 13200,
        durationLabel: "6 meses",
        description: "Equilíbrio entre prazo e economia.",
        messageKey: "semiannual",
        event: "plan_semestral_click",
        highlight: false,
        badge: null,
      },
      {
        id: "anual",
        name: "ANUAL",
        months: 12,
        priceCents: 24000,
        durationLabel: "12 meses",
        description: "O melhor custo por mês.",
        messageKey: "annual",
        event: "plan_annual_click",
        highlight: true,
        badge: "MELHOR ECONOMIA",
      },
    ],
  },
  conversion: {
    eyebrow: "Fale com a NEXPLAY",
    title: "SEU PRÓXIMO ENTRETENIMENTO ESTÁ A UM CLIQUE.",
    description:
      "Conheça nossas opções, consulte os planos e fale diretamente com nossa equipe.",
    cta: "FALAR COM A NEXPLAY AGORA",
  },
  faq: {
    eyebrow: "Dúvidas frequentes",
    title: "TUDO O QUE VOCÊ PRECISA SABER",
    subtitle:
      "Se ainda tiver dúvidas, fale com nossa equipe pelo WhatsApp.",
    items: [
      {
        question: "Como funciona o serviço?",
        answer:
          "A NEXPLAY oferece opções de entretenimento digital licenciado. Ao entrar em contato pelo WhatsApp, nossa equipe apresenta os planos, esclarece dúvidas e orienta sobre a contratação e o uso do serviço.",
      },
      {
        question: "Quais dispositivos são compatíveis?",
        answer:
          "O serviço pode ser utilizado em dispositivos compatíveis, como Smart TVs, TV Box, smartphones Android, tablets e computadores. Como a compatibilidade varia conforme o modelo e o sistema, consulte nossa equipe antes de contratar.",
      },
      {
        question: "Como faço para contratar?",
        answer:
          "Escolha um dos planos nesta página e fale com nossa equipe pelo WhatsApp. O atendimento confirma as condições, orienta sobre o pagamento e finaliza a contratação.",
      },
      {
        question: "Como funciona a instalação?",
        answer:
          "Após a contratação, nossa equipe envia as orientações de instalação adequadas ao seu dispositivo e acompanha as dúvidas pelo WhatsApp.",
      },
      {
        question: "Quais são as formas de pagamento?",
        answer:
          "As formas de pagamento disponíveis são informadas pela equipe no momento do atendimento. Consulte as opções antes de concluir a contratação.",
      },
      {
        question: "Como funciona o suporte?",
        answer:
          "O suporte é feito pelo WhatsApp comercial da NEXPLAY. Nossa equipe orienta sobre acesso, instalação e dúvidas relacionadas ao serviço contratado.",
      },
      {
        question: "Quais conteúdos estão disponíveis?",
        answer:
          "A NEXPLAY trabalha com opções de entretenimento licenciado nas categorias divulgadas nesta página, como filmes, séries, canais ao vivo, esportes, conteúdo infantil e entretenimento familiar. A disponibilidade pode variar; confirme os detalhes no atendimento.",
      },
      {
        question: "Como faço para renovar meu plano?",
        answer:
          "Para renovar, fale com a equipe pelo WhatsApp antes do fim do período contratado. O atendimento informa as condições vigentes e orienta sobre a renovação.",
      },
    ],
  },
  footer: {
    statement:
      "Entretenimento digital com atendimento próximo e condições claras para você escolher.",
    links: [
      { label: "Início", href: "/" },
      { label: "Programação ao Vivo", href: "/programacao" },
      { label: "Filmes", href: "/filmes" },
      { label: "Séries", href: "/series" },
      { label: "Infantil", href: "/infantil" },
      { label: "Planos", href: "/planos" },
      { label: "Contato", href: "/contato" },
    ],
    legalLinks: [
      { label: "Política de privacidade", href: "/politica-de-privacidade/" },
      { label: "Termos de uso", href: "/termos-de-uso/" },
    ],
  },
  legal: {
    brand: "NEXPLAY",
    companyName: "Alfa Tecnologia",
    responsibility:
      "A NEXPLAY é uma marca comercial operada por Alfa Tecnologia, responsável pela comercialização e prestação do serviço.",
    identificationNote:
      "A identificação cadastral completa do responsável pode ser solicitada pelo canal oficial de atendimento.",
    lastUpdated: "27 de novembro de 2026",
    privacyContact:
      "Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, fale com nosso atendimento pelo WhatsApp.",
  },
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
    gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
    consentStorageKey: "nexplay-consent-v1",
  },
} as const;

export type SiteConfig = typeof siteConfig;
export type Plan = (typeof siteConfig.plans.items)[number];
export type Category = (typeof siteConfig.entertainment.categories)[number];
export type Benefit = (typeof siteConfig.benefits.items)[number];
export type Device = (typeof siteConfig.devices.items)[number];
export type FaqItem = (typeof siteConfig.faq.items)[number];
