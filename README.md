# NEXPLAY — Landing page de vendas

Landing page oficial da NEXPLAY, marca de entretenimento digital. O projeto foi
construído com foco em conversão para WhatsApp, experiência mobile-first,
identidade visual cinematográfica e publicação estática.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide Icons
- Renderização híbrida (páginas estáticas + rotas de API para TMDB/EPG)
- Sem banco de dados e sem serviços pagos obrigatórios

## Como rodar

Requisitos: Node.js 20.9 ou superior e npm.

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

### Scripts disponíveis

```bash
npm run dev          # ambiente local
npm run typecheck    # verificação de tipos
npm run lint         # análise estática
npm run build        # build de produção (saída em ./.next)
npm run verify:links # valida WhatsApp, mensagens, preços e equivalentes
npm run verify:build # valida os links e assets no HTML gerado
npm run check        # typecheck + build + verificações
npm run generate:assets # regenera OG image e ícones PNG a partir dos SVGs
```

## Estrutura

```text
app/                 páginas, metadata, sitemap, robots e manifest
components/          seções e componentes reutilizáveis
components/icons/    ícones de marca (WhatsApp)
config/site.ts       configuração central da marca, textos, planos, FAQ e WhatsApp
lib/                 WhatsApp, analytics, formatação e utilitários
assets/              fonte SVG da imagem de compartilhamento
public/              OG image e ícones gerados
scripts/             geração de assets e testes de links
```

Tudo o que é comercial fica centralizado em `config/site.ts`: número do
WhatsApp, mensagens, preços, categorias, textos, FAQ, links legais e eventos de
rastreamento. Evite duplicar esses valores nos componentes.

## WhatsApp

Número oficial configurado: `553491871674`.

Os links são gerados por `lib/whatsapp.ts` com validação do número e
`encodeURIComponent` na mensagem. Os botões usam o componente
`components/WhatsAppLink.tsx`, que também dispara o evento de conversão
correspondente.

Mensagens disponíveis:

- geral;
- plano mensal;
- plano trimestral;
- plano semestral;
- plano anual;
- compatibilidade;
- suporte.

Os testes `verify:links` e `verify:build` confirmam número, mensagens e preços.

## Preços

Os valores oficiais estão em `config/site.ts`:

- Mensal: R$ 25,00 — 1 mês
- Trimestral: R$ 70,00 — 3 meses — R$ 23,33/mês
- Semestral: R$ 132,00 — 6 meses — R$ 22,00/mês
- Anual: R$ 240,00 — 12 meses — R$ 20,00/mês — “MELHOR ECONOMIA”

O equivalente mensal é calculado a partir do preço total e da duração. Os testes
conferem os valores arredondados exibidos na página.

## SEO e compartilhamento

- Título, descrição e palavras-chave em `app/layout.tsx`.
- Open Graph e Twitter Card configurados.
- Imagem de compartilhamento em `public/og-image.png` (1200 × 630).
- `app/sitemap.ts` e `app/robots.ts`.
- HTML semântico, headings hierárquicos e JSON-LD de Organization, WebSite e
  FAQPage.
- Favicon SVG em `app/icon.svg` e ícones PNG em `public/icons/`.

Antes de publicar, configure a URL final:

```env
NEXT_PUBLIC_SITE_URL=https://seudominio.com.br
```

Isso atualiza canonical, sitemap, robots, Open Graph e dados estruturados.

## Rastreamento e consentimento

A estrutura suporta:

- Google Analytics 4;
- Google Tag Manager;
- Meta Pixel.

As IDs são opcionais e ficam em `.env`:

```env
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

Nenhum script é carregado sem consentimento explícito. O visitante pode aceitar
ou recusar no aviso de privacidade e revisar a escolha em “Preferências de
cookies” no rodapé. A preferência fica no armazenamento local do navegador.

Eventos preparados:

- `whatsapp_click`
- `plan_monthly_click`
- `plan_quarterly_click`
- `plan_semestral_click`
- `plan_annual_click`
- `compatibility_click`
- `support_click`

Os eventos são enviados para `dataLayer` (GTM), `gtag` (GA4) e `fbq` (Meta
Pixel), quando disponíveis. Se GTM e GA4 forem configurados juntos, evite
duplicar a configuração de pageview no GTM.

## Integrações (TMDB e EPG)

Variáveis opcionais em `.env`:

```env
TMDB_API_KEY=            # chave de API v3 do TMDB (server-side)
TMDB_API_READ_TOKEN=     # token de leitura (opcional)
EPG_SOURCE_URL=          # URL de uma fonte XMLTV/API de programação
EPG_SOURCE_TYPE=xmltv    # xmltv | json
EPG_API_KEY=             # chave da fonte EPG, se aplicável
EPG_DEMO=                # 1 para modo demonstração (somente desenvolvimento)
```

A chave do TMDB nunca é exposta ao frontend: as requisições passam por
`/api/tmdb`. A programação ao vivo usa `/api/epg`. Se `EPG_SOURCE_URL` estiver
vazio e `EPG_DEMO` não for `1`, a grade exibe “programação temporariamente
indisponível”.

Metadados, capas e sinopses do catálogo são fornecidos pelo TMDB. O catálogo
não disponibiliza vídeos ou links de reprodução. A atribuição do TMDB consta no
rodapé e nos modais de detalhes.

## Publicação

### Vercel

1. Importe o repositório na Vercel.
2. Framework preset: Next.js.
3. Build command: `npm run build`.
4. Configure `NEXT_PUBLIC_SITE_URL` e, se desejar, as IDs de rastreamento.
5. Publique.

O projeto usa rotas de API (TMDB/EPG) e renderização no servidor. Para
Cloudflare Pages, utilize o adaptador oficial do Next.js
(`@cloudflare/next-on-pages`) ou publique as rotas de API em um Worker.

### Cloudflare Pages

1. Conecte o repositório no Cloudflare Pages.
2. Build command: `npm run build`.
3. Build output directory: `.next` (com adaptador Next.js para Cloudflare).
4. Adicione as variáveis de ambiente de produção, incluindo `TMDB_API_KEY`.
5. Publique.

### Netlify

1. Crie/importe o repositório no Netlify (site criado: `nexplaytv.netlify.app`).
2. Build command: `npm run build`.
3. O diretório de publicação é gerenciado pela integração oficial do Next.js
   (`@netlify/plugin-nextjs`).
4. Configure as variáveis de ambiente de produção (incluindo `TMDB_API_KEY` e,
   se desejar, `EPG_SOURCE_URL`).
5. Deploy automático a cada push na branch `main`.

### Domínio próprio

No painel da Vercel ou Cloudflare, adicione o domínio e siga as instruções de
DNS. Depois, atualize `NEXT_PUBLIC_SITE_URL` com o domínio final e faça um novo
deploy para atualizar canonical, sitemap e Open Graph.

## Identificação legal

A landing page não usa “Alfa Tecnologia” na comunicação comercial principal. A
identificação aparece no rodapé e nas páginas legais, como responsável pela
comercialização e prestação do serviço.

O nome da empresa está configurado em `siteConfig.legal.companyName`. Os dados
cadastrais completos (CNPJ, endereço e demais informações oficiais) não foram
fornecidos no briefing e não foram inventados. Antes de publicar em produção,
insira esses dados nas páginas `app/politica-de-privacidade/page.tsx` e
`app/termos-de-uso/page.tsx`, ou centralize-os em `config/site.ts`, para atender
integralmente às exigências de identificação do fornecedor.

## Checklist antes de publicar

- [ ] Rodar `npm run check`.
- [ ] Configurar `NEXT_PUBLIC_SITE_URL` com o domínio final.
- [ ] Inserir dados cadastrais oficiais do responsável.
- [ ] Revisar textos comerciais, FAQ e condições com a operação.
- [ ] Testar todos os botões de WhatsApp em celular e desktop.
- [ ] Configurar IDs de analytics apenas se houver consentimento e política
      adequada.
- [ ] Validar a imagem de compartilhamento em um preview de link.
- [ ] Revisar acessibilidade, contraste e navegação por teclado.
- [ ] Confirmar disponibilidade de conteúdos e categorias antes de publicar.

## Performance e acessibilidade

- Sem imagens externas: as ilustrações são vetoriais e originais.
- SVGs leves, sem bibliotecas de animação.
- Fontes via `next/font` com `display: swap`.
- Imagens com dimensões explícitas e carregamento nativo.
- Menu mobile com controle de foco, `aria-expanded` e fechamento por Escape.
- FAQ com botões, `aria-expanded`, `aria-controls` e regiões nomeadas.
- Respeito a `prefers-reduced-motion`.
- Links externos com `rel="noopener noreferrer"`.
- Sem rastreadores antes do consentimento.
