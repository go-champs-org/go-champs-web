# RFC: Modularização do Go Champs Front-End

**Status:** Proposta
**Data:** 2026-07-15
**Autor:** Ruan Victor (com apoio de Claude)

## 1. Contexto

O Go Champs front-end é hoje um único aplicativo React (Create React App, sem SSR), servindo simultaneamente:

- Páginas institucionais (About, FAQ, Contact, Privacy, Terms)
- Visualizador público de campeonatos (busca, página do campeonato, times, jogos, placares ao vivo)
- Perfil público de atleta (em desenvolvimento ativo — branch `feat/athlete-career-stats`)
- CMS de organizadores (criação/gestão de campeonatos, organizações, equipes, jogadores, jogos, estatísticas)

A stack atual é antiga em vários pontos: React 16.8, React Router v5, TypeScript 3.4.5, `react-scripts` com `--openssl-legacy-provider` (workaround pra rodar em Node moderno), Bulma 0.7 (sem release desde 2019) como framework CSS. O projeto já vem passando por uma modernização incremental — existe uma convivência V1/V2 (`Pages/` vs `PagesV2/`, `V1Layout`/`V2Layout`) tratando parte das rotas com um design mais novo, mas ainda dentro do mesmo CRA, sem SSR.

O código de domínio (`src/Games`, `src/Players`, `src/Teams`, `src/Tournaments` etc.) já segue um padrão consistente descrito em `ARCHITECTURE.md`: cada domínio tem `components/` (dummy components), `actions.ts` / `reducer.ts` / `selectors.ts` / `effects.ts` (camada Redux) e `dataMappers.ts` / `*HttpClient.ts` (camada de dados). Esse padrão é a base que torna a modularização proposta viável sem reescrita completa.

### Problema

Os quatro grupos de páginas acima têm requisitos técnicos e de produto bem diferentes:

| Grupo | Frequência de mudança | Necessidade de SEO | Necessidade de dado em tempo real |
|---|---|---|---|
| Institucional | Baixa | Alta (maior fonte de SEO orgânico hoje) | Nenhuma |
| Visualizador de campeonato | Alta (times/jogos mudam o tempo todo) | Alta (muito acesso vindo de busca orgânica) | Alta (placares ao vivo) |
| Perfil de atleta | Média | Média/Alta | Baixa |
| CMS | Alta | Nenhuma (autenticado, não indexado) | Baixa (tolera delay) |

Hoje, todos compartilham o mesmo build, o mesmo tempo de deploy, e nenhum se beneficia de SSR — o que é uma desvantagem direta pro SEO das páginas institucionais e do visualizador, que são justamente as que mais dependem de indexação boa no Google.

### Objetivo deste RFC

Propor uma divisão de módulos que:

1. Separe requisitos técnicos incompatíveis (SEO + SSR vs CMS client-side autenticado).
2. Seja operável por um time de 1-2 pessoas — isso descarta qualquer solução que multiplique repositórios, pipelines de CI ou stacks a manter sem necessidade real.
3. Permita migração gradual, sem parar o desenvolvimento de features (ex: perfil de atleta, atualmente em andamento).
4. Preserve o máximo possível do código de domínio já existente e testado.

Roadmap de execução (ordem exata de migração de cada página) fica fora de escopo deste RFC — será tratado depois, como plano de implementação separado.

## 2. Decisões tomadas

Essas decisões foram validadas em conversa antes deste documento; a seção 3 detalha as alternativas descartadas.

| Decisão | Escolha |
|---|---|
| Horizonte | Migração gradual do monolito atual (não greenfield) |
| Domínio/URL | CMS já isolado por infra (subdomínio próprio); institucional + visualizador + perfil de atleta continuam no domínio principal, compartilhando autoridade de SEO |
| Framework SSR | Next.js (App Router) |
| Nº de apps Next.js | 1 único app, com route groups (`(institucional)`, `(visualizador)`, `(atleta)`) |
| Repositório | Monorepo (pnpm workspaces + Turborepo), não repositórios separados |
| Design system | Extrair pra package compartilhado (`packages/ui`), migrando de Bulma pra Tailwind no código novo |
| Estado no app público | Sem Redux — Server Components + fetch/cache do Next, já que é majoritariamente leitura |

## 3. Arquitetura proposta

### 3.1 Módulos e responsabilidades

- **`apps/cms`** — o CRA atual, movido para dentro do monorepo praticamente sem mudança estrutural. Mantém Redux, mantém os domain folders com `actions/reducer/selectors/effects`. Só passa a importar tipos e cliente HTTP de packages compartilhados em vez de manter cópias locais.
- **`apps/public`** — Next.js novo, App Router, cobrindo institucional + visualizador + perfil de atleta como route groups do mesmo app. Sem Redux; leitura de dados via Server Components chamando `packages/api-client` diretamente, com cache do próprio Next (ISR / `revalidate` / cache tags).
- **`packages/domain-types`** — tipos de entidade (`Game`, `Player`, `Team`, `Tournament`, `Athlete`...) compartilhados pelos dois apps.
- **`packages/api-client`** — cliente HTTP + `dataMappers`, extraídos dos domain folders atuais. Usado tanto pelos `effects.ts` do CMS quanto pelos Server Components do app público.
- **`packages/ui`** — design tokens + componentes visuais compartilhados, com preset Tailwind. CMS pode continuar em Bulma por um tempo; app público nasce 100% no novo design system.
- **`packages/config`** — ESLint, tsconfig base, Prettier compartilhados entre os apps.

A estrutura de pastas completa foi detalhada na conversa que precede este RFC e está reproduzida no Apêndice A.

### 3.2 Fluxo de dados entre CMS e site público

O CMS grava dados via API backend (Elixir/Phoenix, fora do escopo deste repo). O app público lê os mesmos dados via `packages/api-client`. Para o visualizador (que precisa refletir mudanças de placar rapidamente), o CMS deve notificar o Next.js via um endpoint de revalidação on-demand (`app/(visualizador)/revalidate/route.ts`) sempre que um resultado for publicado — evitando esperar o próximo ciclo de ISR.

### 3.3 O que não muda no curto prazo

- Backend/API permanece o mesmo.
- Autenticação do CMS permanece como está (o app público não precisa de sessão de usuário, exceto talvez ações pontuais como "favoritar time" — a definir).
- CMS continua em Bulma/Redux/CRA até haver motivo concreto pra migrá-lo (ver seção 5, riscos).

## 4. Alternativas consideradas

### 4.1 Greenfield por módulo (descartada)

Cada módulo novo nasce em stack nova e o monolito atual é congelado até ser totalmente substituído por partes.

- **Prós:** ganho de SEO/performance mais rápido; menos código "de transição" convivendo.
- **Contras:** duplica esforço de manutenção durante a transição (dois lugares pra corrigir o mesmo bug), e com time de 1-2 pessoas isso é risco real de nunca terminar a migração.
- **Por que não:** o horizonte gradual escolhido evita ter duas versões inteiras do produto ativas ao mesmo tempo.

### 4.2 Subdomínios para todos os módulos públicos (descartada)

`institucional.gochamps.com`, `campeonatos.gochamps.com`, `atleta.gochamps.com`, além do `app.gochamps.com` do CMS.

- **Prós:** deploy 100% independente por módulo; isolamento total de infraestrutura.
- **Contras:** Google trata subdomínios com menos afinidade de autoridade de domínio do que paths — fragmenta o SEO justamente nos módulos (institucional, visualizador) que mais dependem dele hoje.
- **Por que não:** o ganho de SEO é justamente um dos motivadores centrais desta modularização; subdomínios trabalham contra esse objetivo.

### 4.3 Multi-zone: 2 ou 3 apps Next.js separados sob o mesmo domínio (descartada)

Institucional, visualizador e perfil de atleta como projetos Next.js independentes, unidos via rewrites/multi-zone.

- **Prós:** deploys e releases isolados por módulo; se um módulo quebrar, os outros continuam no ar; permite futuramente atribuir um módulo a outra pessoa/stack sem tocar nos demais.
- **Contras:** triplica configuração (CI, `next.config`, dependências, versionamento) pra um time que já está no limite de capacidade com 1-2 pessoas. O ganho de isolamento não compensa o overhead operacional nesse estágio.
- **Por que não agora:** o critério de "quem mantém" pesou mais que o de "isolamento de deploy". Fica como evolução natural se o time crescer — a separação em route groups já deixa os limites claros o suficiente pra migrar para multi-zone depois, se necessário, sem redesenho do zero.

### 4.4 Astro para o módulo institucional (descartada, mas registrada como opção futura)

Astro com ilhas React só onde há interação.

- **Prós:** performance superior pra conteúdo majoritariamente estático; zero JS por padrão.
- **Contras:** mais um framework pra manter no ecossistema (custo desproporcional pra ganho concentrado em só 1 dos 3 módulos); islands architecture têm menos flexibilidade pra páginas mais dinâmicas, o que descartaria Astro pro visualizador de qualquer forma — teríamos dois frameworks SSR diferentes convivendo sem necessidade.
- **Por que não:** o critério de "1 app único, menor overhead" elimina a vantagem de usar uma ferramenta especializada só pra 1/3 do escopo.

### 4.5 Remix / React Router v7 (descartada)

- **Prós:** SSR forte, bom pra dados dinâmicos.
- **Contras:** ecossistema e comunidade menores que Next.js hoje; suporte a ISR/estático puro (necessário pro institucional) menos maduro.
- **Por que não:** Next.js cobre bem tanto o caso estático (institucional) quanto o dinâmico (visualizador) sem precisar de duas ferramentas.

### 4.6 Manter Bulma no app novo (descartada)

- **Prós:** zero esforço de redesenho; visual idêntico ao CMS.
- **Contras:** carrega dívida técnica (framework sem manutenção desde 2019) pro código novo, perdendo a oportunidade natural de modernizar durante a criação do app público.
- **Por que não:** o app público é conteúdo novo do zero — é o momento mais barato pra trocar de design system, comparado a fazer isso depois com páginas já em produção.

### 4.7 Repositórios separados (descartada)

- **Prós:** histórico git isolado; permissões de acesso podem ser diferentes por repo; builds/CI totalmente independentes desde o início.
- **Contras:** compartilhar `domain-types`, `api-client` e `ui` exigiria publicar pacotes npm (ainda que privados) e sincronizar versões manualmente a cada mudança — fricção alta pra 1-2 pessoas fazendo mudanças que tocam os dois lados com frequência (ex: campo novo na API que precisa refletir em tipo + CMS + app público).
- **Por que não:** monorepo com workspaces resolve o compartilhamento de código sem esse overhead, ao custo de um único checkout maior — aceitável no tamanho de time atual.

## 5. Riscos e pontos em aberto

- **CMS "auth-gated" hoje mistura páginas públicas e privadas na mesma rota.** Exemplo: `OrganizationHome`/`OrganizationView` no `App.tsx` atual têm variantes autenticada e pública na mesma família de rota. Esse RFC assume que essas variantes públicas migram pro `apps/public` e as autenticadas ficam no `apps/cms` — mas o levantamento fino rota a rota ainda precisa ser feito (fica pro plano de implementação).
- **Fluxos híbridos (ex: convite de registro de time via `/Invite/:registrationInviteId`, `TeamRosterInvites`)** misturam formulário público com fluxo que depois exige autenticação. Precisa decisão caso a caso: fica no app público (com submissão via API) ou seria mais simples deixar no CMS por enquanto.
- **Cache do visualizador em tempo real** depende de um mecanismo de revalidação on-demand vindo do backend (ou do CMS) — se o backend não tiver como disparar webhook, cai pra polling/revalidate curto, o que é pior pra "placar ao vivo". Precisa validar com o backend antes de comprometer a UX de jogos ao vivo.
- **Duplicação temporária de lógica de autenticação/tema:** enquanto o CMS não migra pra Next, `ThemeProvider`/`i18next`/lógica de sessão vivem duplicadas (uma versão em cada app) até serem também extraídas pra `packages/`, se fizer sentido.
- **TypeScript 3.4.5 no CMS é uma versão muito antiga** (de 2019) — não é possível compartilhar `packages/domain-types` com sintaxe TS moderna sem primeiro atualizar o TS do CMS a uma versão compatível. Isso é um pré-requisito técnico, não citado nas decisões acima, que precisa entrar no plano de implementação antes de criar os packages compartilhados.
- **Sem dado real de analytics** confirmando de onde vem o tráfego orgânico (a resposta "institucional" foi um chute informado, não medição) — vale instrumentar Google Search Console/Analytics antes de finalizar a ordem de prioridade de migração no plano de implementação.

## 6. Apêndice A — Estrutura de pastas proposta

```
go-champs-web/                          # monorepo root (pnpm workspaces)
├── package.json                        # workspace root, scripts orquestrados (turbo run build etc)
├── pnpm-workspace.yaml
├── turbo.json                          # cache de build/test entre apps
│
├── apps/
│   ├── cms/                             # CRA atual, movido pra cá quase sem mudança
│   │   ├── src/
│   │   │   ├── Games/                   # domain folders atuais (Redux completo)
│   │   │   │   ├── components/
│   │   │   │   ├── actions.ts
│   │   │   │   ├── reducer.ts
│   │   │   │   ├── selectors.ts
│   │   │   │   ├── effects.ts
│   │   │   │   └── ...
│   │   │   ├── Players/  Teams/  Tournaments/  Organizations/  ...
│   │   │   ├── Pages/                   # smart components, rotas do CMS
│   │   │   ├── store.ts
│   │   │   └── App.tsx
│   │   ├── package.json                 # depende de @gochamps/domain-types, @gochamps/api-client, @gochamps/ui
│   │   └── ...                          # config CRA como hoje, deploy em app.gochamps.com
│   │
│   └── public/                          # Next.js novo, App Router
│       ├── app/
│       │   ├── (institucional)/
│       │   │   ├── sobre/page.tsx
│       │   │   ├── faq/page.tsx
│       │   │   ├── contato/page.tsx
│       │   │   ├── privacidade/page.tsx
│       │   │   └── page.tsx             # home institucional (ou landing)
│       │   │
│       │   ├── (visualizador)/
│       │   │   ├── buscar/page.tsx
│       │   │   ├── [organizationSlug]/
│       │   │   │   ├── page.tsx         # OrganizationView público
│       │   │   │   └── [tournamentSlug]/
│       │   │   │       ├── page.tsx     # TournamentHome
│       │   │   │       ├── times/page.tsx
│       │   │   │       ├── jogos/page.tsx
│       │   │   │       └── jogos/[gameId]/page.tsx
│       │   │   └── revalidate/route.ts  # webhook do CMS pra invalidar cache on-demand
│       │   │
│       │   ├── (atleta)/
│       │   │   └── atleta/[slug]/page.tsx
│       │   │
│       │   └── layout.tsx               # layout raiz compartilhado (nav, footer, tema)
│       │
│       ├── domains/                     # camada de leitura de dados por domínio (sem Redux)
│       │   ├── tournaments/
│       │   │   ├── getTournament.ts     # server-side fetch + cache tags
│       │   │   └── TournamentView.tsx
│       │   ├── athletes/
│       │   └── organizations/
│       │
│       └── package.json                 # depende de @gochamps/domain-types, @gochamps/api-client, @gochamps/ui
│
├── packages/
│   ├── domain-types/                    # tipos de entidade compartilhados
│   │   └── src/
│   │       ├── game.ts   player.ts   team.ts   tournament.ts   athlete.ts
│   │
│   ├── api-client/                      # cliente HTTP + dataMappers, sem Redux
│   │   └── src/
│   │       ├── httpClient.ts            # extraído dos *HttpClient.ts atuais
│   │       ├── games/  players/  tournaments/  athletes/
│   │       │   ├── dataMappers.ts       # migrado direto dos domain folders atuais
│   │       │   └── endpoints.ts
│   │
│   ├── ui/                              # design system compartilhado
│   │   ├── src/
│   │   │   ├── tokens/                  # cores, spacing, tipografia (Tailwind config gerado daqui)
│   │   │   ├── components/              # Button, Card, Badge, Table — usados por cms E public
│   │   │   └── icons/
│   │   └── tailwind-preset.js           # cada app importa esse preset no seu tailwind.config
│   │
│   └── config/                          # eslint, tsconfig base, prettier compartilhados
│       ├── eslint-preset.js
│       └── tsconfig.base.json
│
├── docs/
│   ├── OVERVIEW.md
│   └── ARCHITECTURE.md                  # atualizado pra descrever monorepo
│
└── .devcontainer/                       # continua servindo os 2 apps
```

## 7. Próximos passos

Fora do escopo deste RFC, mas necessários em seguida:

1. Levantamento rota a rota do `App.tsx` atual, classificando cada rota em institucional / visualizador / perfil / CMS / híbrida (ver riscos, seção 5).
2. Plano de implementação (via skill `writing-plans`) para a primeira fatia de migração, uma vez definida a ordem de prioridade.
3. Validar com o backend a viabilidade de webhook de revalidação on-demand pro visualizador.
4. Atualizar TypeScript do `apps/cms` como pré-requisito pra criação dos packages compartilhados.
