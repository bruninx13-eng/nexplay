import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const candidatePaths = [
  path.join(root, ".next", "server", "app", "index.html"),
  path.join(root, "out", "index.html"),
];
let htmlPath = candidatePaths[0];
for (const candidate of candidatePaths) {
  try {
    await stat(candidate);
    htmlPath = candidate;
    break;
  } catch {
    // tenta o próximo
  }
}

let html;
try {
  html = await readFile(htmlPath, "utf8");
} catch {
  console.error("Build não encontrado. Execute `npm run build` antes de verificar.");
  process.exit(1);
}

const errors = [];
const hrefs = [...html.matchAll(/href="(https:\/\/wa\.me\/[^"]+)"/g)].map(
  (match) => match[1],
);

if (hrefs.length < 10) {
  errors.push(`Poucos links de WhatsApp encontrados no HTML: ${hrefs.length}.`);
}

const expectedMessages = new Set([
  "Olá! Conheci a NEXPLAY pelo site e gostaria de conhecer os planos e as opções de entretenimento disponíveis.",
  "Olá! Tenho interesse no plano mensal da NEXPLAY de R$ 25,00. Gostaria de contratar.",
  "Olá! Tenho interesse no plano trimestral da NEXPLAY de R$ 70,00. Gostaria de contratar.",
  "Olá! Tenho interesse no plano semestral da NEXPLAY de R$ 132,00. Gostaria de contratar.",
  "Olá! Tenho interesse no plano anual da NEXPLAY de R$ 240,00. Gostaria de contratar.",
  "Olá! Gostaria de saber se meu dispositivo é compatível com o serviço da NEXPLAY.",
  "Olá! Estou no site da NEXPLAY e gostaria de tirar uma dúvida.",
]);

const foundMessages = new Set();

for (const href of hrefs) {
  if (!href.startsWith("https://wa.me/553491871674?text=")) {
    errors.push(`Link de WhatsApp com número ou formato incorreto: ${href}`);
    continue;
  }

  const url = new URL(href);
  const message = decodeURIComponent(url.searchParams.get("text") ?? "");

  if (!message) {
    errors.push(`Link de WhatsApp sem mensagem: ${href}`);
    continue;
  }

  if (!expectedMessages.has(message)) {
    errors.push(`Mensagem inesperada em link de WhatsApp: ${message}`);
  }

  foundMessages.add(message);
}

for (const message of expectedMessages) {
  if (!foundMessages.has(message)) {
    errors.push(`Mensagem não encontrada no build: ${message}`);
  }
}

const trackingEvents = [
  "plan_monthly_click",
  "plan_quarterly_click",
  "plan_semestral_click",
  "plan_annual_click",
  "compatibility_click",
];

for (const event of trackingEvents) {
  if (!html.includes(`data-tracking-event="${event}"`)) {
    errors.push(`Evento de rastreamento ausente no HTML: ${event}`);
  }
}

for (const file of ["og-image.png", "icons/icon-192.png", "icons/icon-512.png"]) {
  try {
    await stat(path.join(root, "public", file));
  } catch {
    errors.push(`Asset ausente: public/${file}`);
  }
}

if (errors.length > 0) {
  console.error("Falhas na verificação do build:\n- " + errors.join("\n- "));
  process.exitCode = 1;
} else {
  console.log(
    `OK: ${hrefs.length} links de WhatsApp, ${foundMessages.size} mensagens e eventos de planos verificados no build.`,
  );
}
