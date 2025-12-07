# 💇‍♀️ Salon Time — Frontend (React + Vite)

Bem-vindo ao frontend do Salon Time — aplicação em **React** usando **Vite**.
Esta interface fornece telas de cadastro/login, agendamento, dashboard administrativo, gerenciamento de serviços, histórico e muito mais.

Resumo rápido:
- Framework: React (hooks)
- Bundler/dev server: Vite
- Rotas: React Router
- Gráficos: Chart.js (react-chartjs-2)
- Calendário: react-big-calendar
- Gerenciamento de estado: hooks locais (useState/useEffect)

---

## Pré-requisitos
- Node.js 18+ (ou 16+ compatível)
- npm (ou yarn)
- Backend da API rodando (endpoints usados no código apontam para `http://localhost:8080` por padrão)

## Instalação
1. Clone o repositório e entre na pasta do projeto:

```bash
git clone <REPO_URL>
cd salontime-front-end-react
```

2. Instale dependências:

```
npm install
```
```
npm install axios
```
```
npm install moment
```
```
npm install chart.js react-chartjs-2
```
```
npm install react-big-calendar moment
```
```
npm install sweetalert2
```
```
npm install tailwindcss @tailwindcss/vite
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O servidor de desenvolvimento padrão do Vite abrirá em `http://localhost:5173` (ou porta disponível). Certifique-se de que o backend esteja ativo em `http://localhost:8080` ou ajuste os endpoints no cliente conforme necessário.

---

## Scripts úteis (package.json)
- `npm run dev` — inicia o servidor de desenvolvimento (Vite)
- `npm run build` — gera a build de produção
- `npm run preview` — preview da build gerada
- `npm run lint` — executa ESLint (se configurado)

---

## Dependências importantes
- `react`, `react-dom` — biblioteca UI
- `vite` — dev server/bundler
- `react-router-dom` — rotas
- `axios` — chamadas HTTP
- `react-chartjs-2` / `chart.js` — gráficos
- `react-big-calendar` — calendário
- `sweetalert2` — alerts/confirm dialogs
- `moment` — manipulação de datas (usado em partes do projeto)
- `tailwindcss` — utilitários CSS

---

## Ponto de atenção / configuração
O frontend assume que a API está disponível em `http://localhost:8080`. Se seu backend estiver em outra URL, atualize os helpers em `src/js/api/*` (há um axios instance em `src/js/api/api_port.js` — use-o para centralizar a baseURL).

