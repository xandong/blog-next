# Share4 (Dev.to client) 📢

Este projeto é uma aplicação Next.js que consome a [API do Dev.to](https://developers.forem.com/api/) e permite autenticação, criação, edição e leitura de artigos, com foco em boas práticas, responsividade e usabilidade. Foi desenvolvido pensando em praticidade e buscas rápidas de artigos.

Acesse a aplicação em produção: [**https://www.share4.us**](https://www.share4.us)

---

## 📊 Motivação e Escolhas Técnicas

### 🤔 Por que Next.js?

Apesar de ter mais experiência com React com Vite, e gerenciamento com Redux. Eu escolhi o **Next.js** para esse projeto para ser de fato um desafio pessoal, e brincar um pouco com o framework. Além, claro de:

- Suporte nativo a **roteamento** via App Router;
- Otimização automática (SSR, SSG, ISR);
- Ecossistema maduro e suporte first-class a TypeScript;
- Facilidade de deploy na Vercel;
- Excelente DX com suporte a features modernas como `use client`, `use server`, Server Actions etc.

### 🧩 Stack utilizada

| Item         | Tecnologia                                                   |
| ------------ | ------------------------------------------------------------ |
| Linguagem    | TypeScript                                                   |
| Framework    | Next.js (App Router)                                         |
| UI           | Tailwind CSS + shadcn/ui                                     |
| Tipagem      | Gerado com OpenAPI                                           |
| Estado/Dados | useState + Server Actions (parcial)                          |
| Roteamento   | Next.js App Router                                           |
| Testes       | Jest + React Testing Library                                 |
| E2E          | Cypress                                                      |
| Qualidade    | ESLint + Prettier + Husky + lint-staged + commits semânticos |
| Deploy       | Vercel                                                       |

* Obs.: Por ter apenas uma entidade, decidi usar apenas states do React. Outro ponto é, ainda estou procurando uma maneira 'preferida' para lidar com o estados no Next de forma global, já que o Redux não é tão interessante assim para o contexto.

---

## ⚙️ Funcionalidades

### ✉️ Autenticação

- Login via token pessoal (API key do Dev.to);
- O token é persistido via `iron-session` e controlado pelo gerenciamento de cookie do next.

### 🏠 Dashboard

- Listagem paginada dos artigos mais recentes;
- Filtro por termos (título, descrição e tags);
- Paginação ao chegar no final da página.

### 🧑‍💻 Artigos do usuário

- Card do User.
- Listagem paginada dos artigos do usuário;
- Filtro por termos (título, descrição e tags);
- Paginação ao chegar no final da página.

### ✍️ CRUD de artigos

- Criar novo artigo com campos de título, markdown, imagem e tags;
- Atualizar artigo existente;
- ~~Excluir artigo com confirmação.~~ *A api não expõe rotas de delete
- Trocar o status do artigo com confirmação (draft/publish).
  - (Isso faz o artigo não ser mais visível para edição no nosso App, então não recomendo haha)

### 📄 Página de detalhe

- Visualização do artigo renderizado diretamente do Dev.to com dados atualizados;
- Card para Author do artigo.

### 📱 Responsividade e feedback visual

- Aplicação que se adapta aos breakpoints;
- Indicadores de loading e estado vazio;
- Toasts para erros e confirmações com `sonner`.

### ☁️ Adicional (AWS/S3)

- O endpoint para upload de arquivos também não é fornecido na API para a `cover_image`. Então temos duas opções no projeto, caso definirmos as credenciais e a env para o S3, é renderizado um display que faz o upload para um bucket. Caso contrário, aceitamos URLs públicas.

---

## 🌟 Extras implementados

- Lazy loading de artigos com limite de requisições por segundo (anti-loop);
- Fallbacks inteligentes para filtragens sem resultado;
- Design System reutilizável com `shadcn/ui`;
- CI com GitHub Actions para lint, testes e build;
- Testes unitários e de integração para o fluxo de artigo.

---

## ⚡ Como rodar localmente

### 1. Clone o projeto

```bash
git clone https://github.com/seu-usuario/share4.git
cd share4
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` baseado em `.env.example`:

```env
NEXT_PUBLIC_FOREM_BASE_URL=https://dev.to/api
SECRET_COOKIE_PASSWORD=<string para criptografar apiKey>

# Caso queira usar s3
NEXT_PUBLIC_USE_S3_BUCKET="1"
AWS_ACCOUNT_ID=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
NEXT_PUBLIC_REGION=
NEXT_PUBLIC_BUCKET_NAME=
```

### 4. Gere a tipagem com OpenAPI

```bash
npm run generate:types
```

### 5. Inicie o projeto

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## 📅 Scripts principais

| Comando           | Descrição                      |
| ----------------- | ------------------------------ |
| `dev`             | Inicia o servidor local        |
| `generaty:types`  | Gera a tipagem com OpenAPI     |
| `lint`            | Roda ESLint                    |
| `test`            | Roda os testes unitários       |
| `storybook`       | Inicia Storybook               |
| `plop`            | Gera componentes com templates |

---

## 🚀 Deploy

O deploy é feito automaticamente na **Vercel** com cada push para a branch `main`.

URL de produção: [**https://www.share4.us**](https://www.share4.us)

---

## 🔗 Links úteis

- [Documentação da API Dev.to](https://developers.forem.com/api/)
- [Documentação Next.js](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Jest](https://jestjs.io)
- [Testing Library](https://testing-library.com)

---

## ✉️ Contato

Se quiser trocar uma ideia ou dar feedback:

- [linkedin.com/in/xandongurgel](https://www.linkedin.com/in/xandongurgel/)

---

Feito com ❤️ por Alexandre Gurgel — 2025.

