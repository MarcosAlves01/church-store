# Church Store — Sistema de Gestão de Vendas

Sistema de gestão de vendas criado para a lojinha do retiro da igreja. Permite controlar pessoas, produtos e vendas, além de acompanhar faturamento e o status de pagamento de cada pessoa em um painel de resumo.

Este é o **front-end** da aplicação (Next.js). A API é um projeto separado, desenvolvido em **NestJS**.

> ⚙️ Projeto tratado como **MVP**: o escopo foi reduzido ao essencial para ser utilizado em produção durante o evento. Melhorias como paginação, filtros avançados e otimizações de performance fazem parte do roadmap de evolução.

## ✨ Funcionalidades

- **Autenticação** com JWT e controle de sessão
- **Pessoas** — cadastro, edição e exclusão
- **Produtos** — cadastro, edição e exclusão
- **Vendas** — registro de vendas vinculadas a pessoas e produtos
- **Resumo** — painel com indicadores:
  - Faturamento total e ticket médio (valor médio por venda)
  - Total de vendas, pessoas e produtos
  - Controle de pagamento por pessoa (pago / pendente)
  - Detalhe das compras de cada pessoa
- **Tema claro/escuro**

## 🧱 Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) + [Radix/Base UI](https://www.radix-ui.com)
- [lucide-react](https://lucide.dev) (ícones)
- [sonner](https://sonner.emilkowal.ski) (notificações)
- [next-themes](https://github.com/pacocoursey/next-themes) (tema)

## 🏛️ Arquitetura

O projeto adota o padrão **BFF (Backend for Frontend)**:

- O navegador se comunica apenas com as rotas internas do Next.js (`/api/...`).
- Essas rotas repassam as requisições para a API em NestJS, enviando o token via header `Authorization: Bearer <token>`.
- O token é armazenado em um cookie **HttpOnly** definido pelo Next após o login, reduzindo a exposição no cliente.

```
Navegador  ──►  Next.js (rotas /api + cookie HttpOnly)  ──►  API NestJS
```

Organização por módulos de domínio em `src/app/modules` (Auth, Login, People, Products, Sales, Summary, Users), cada um com sua separação entre camadas de serviço e repositório.

## 🚀 Como rodar localmente

Pré-requisitos: Node.js (ver versão em `.nvmrc`) e a API NestJS em execução.

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/church-store.git
   cd church-store
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente. Copie o `.env.example` para `.env` e preencha os valores:

   ```bash
   cp .env.example .env
   ```

4. Rode o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Acesse [http://localhost:3000](http://localhost:3000).

## 🔑 Variáveis de ambiente

Veja o arquivo `.env.example` para a lista completa. As principais:

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_API_URL` | URL base da API NestJS |

> ⚠️ Nunca commite o arquivo `.env` com valores reais. Apenas o `.env.example` deve ser versionado.

## 📜 Scripts

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o ambiente de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Inicia o servidor em produção |
| `npm run lint` | Executa o linter |

## 🗺️ Roadmap

- [ ] Paginação nas listagens
- [ ] Filtros e busca mais avançados
- [ ] Otimizações de performance
- [ ] Testes automatizados

## 📄 Licença

Projeto de uso pessoal/comunitário.
