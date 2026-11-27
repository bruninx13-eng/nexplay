import { siteConfig } from "../config/site.ts";

const EXPECTED_MESSAGES = {
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
};

const EXPECTED_PLANS = [
  { id: "mensal", priceCents: 2500, months: 1, durationLabel: "1 mês", event: "plan_monthly_click", messageKey: "monthly" },
  { id: "trimestral", priceCents: 7000, months: 3, durationLabel: "3 meses", event: "plan_quarterly_click", messageKey: "quarterly" },
  { id: "semestral", priceCents: 13200, months: 6, durationLabel: "6 meses", event: "plan_semestral_click", messageKey: "semiannual" },
  { id: "anual", priceCents: 24000, months: 12, durationLabel: "12 meses", event: "plan_annual_click", messageKey: "annual" },
];

const errors = [];

if (siteConfig.whatsapp.number !== "553491871674") {
  errors.push("Número oficial do WhatsApp divergente.");
}

if (siteConfig.whatsapp.baseUrl !== "https://wa.me/553491871674") {
  errors.push("URL base do WhatsApp divergente.");
}

for (const [key, expected] of Object.entries(EXPECTED_MESSAGES)) {
  if (siteConfig.whatsapp.messages[key] !== expected) {
    errors.push(`Mensagem "${key}" divergente do texto aprovado.`);
  }
}

for (const [key, message] of Object.entries(siteConfig.whatsapp.messages)) {
  const url = `https://wa.me/553491871674?text=${encodeURIComponent(message)}`;
  const decoded = decodeURIComponent(new URL(url).searchParams.get("text") ?? "");

  if (decoded !== message) {
    errors.push(`Codificação inválida para a mensagem "${key}".`);
  }
}

for (const expected of EXPECTED_PLANS) {
  const plan = siteConfig.plans.items.find((item) => item.id === expected.id);

  if (!plan) {
    errors.push(`Plano "${expected.id}" não encontrado.`);
    continue;
  }

  for (const field of ["priceCents", "months", "durationLabel", "event", "messageKey"]) {
    if (plan[field] !== expected[field]) {
      errors.push(`Plano "${expected.id}": campo "${field}" divergente.`);
    }
  }

  const price = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  })
    .format(plan.priceCents / 100)
    .replace(/\u00a0/g, " ");

  if (!siteConfig.whatsapp.messages[plan.messageKey].includes(price)) {
    errors.push(`Mensagem do plano "${expected.id}" não contém o preço ${price}.`);
  }
}

const expectedMonthly = {
  trimestral: "R$ 23,33",
  semestral: "R$ 22,00",
  anual: "R$ 20,00",
};

for (const [id, expected] of Object.entries(expectedMonthly)) {
  const plan = siteConfig.plans.items.find((item) => item.id === id);
  if (!plan) continue;

  const value = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  })
    .format(Math.round(plan.priceCents / plan.months) / 100)
    .replace(/\u00a0/g, " ");

  if (value !== expected) {
    errors.push(`Equivalente mensal do plano "${id}" incorreto: ${value}.`);
  }
}

if (errors.length > 0) {
  console.error("Falhas na verificação:\n- " + errors.join("\n- "));
  process.exitCode = 1;
} else {
  console.log("OK: WhatsApp, mensagens, preços e equivalentes mensais verificados.");
}
