# ⏱️ Ignite Pomodoro

Aplicação web de timer no estilo Pomodoro para organizar o tempo de foco em tarefas. O usuário informa no que vai trabalhar e por quantos minutos, acompanha a contagem regressiva e consulta o histórico de todos os ciclos realizados.

Projeto desenvolvido durante o Ignite ReactJS (2022) da Rocketseat.

---

## ✨ Funcionalidades

- [x] Criar um novo ciclo informando o nome da tarefa e a duração (de 5 a 60 minutos)
- [x] Acompanhar a contagem regressiva em tempo real
- [x] Exibir o tempo restante no título da aba do navegador
- [x] Interromper um ciclo em andamento
- [x] Marcar automaticamente o ciclo como concluído ao fim do tempo
- [x] Listar o histórico de ciclos com status (em andamento, interrompido ou concluído)
- [x] Persistir os ciclos no `localStorage`, mantendo os dados ao recarregar a página
- [x] Sugestões de nomes de tarefas já usadas anteriormente

---

## 🛠️ Tecnologias

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — build e servidor de desenvolvimento
- [styled-components](https://styled-components.com/) — estilização com temas
- [React Router](https://reactrouter.com/) — navegação entre páginas
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) — formulário e validação
- [Context API](https://react.dev/reference/react/useContext) + [useReducer](https://react.dev/reference/react/useReducer) — estado global dos ciclos
- [Immer](https://immerjs.github.io/immer/) — atualizações imutáveis no reducer
- [date-fns](https://date-fns.org/) — cálculo de tempo e datas relativas
- [Phosphor Icons](https://phosphoricons.com/) — ícones
- [ESLint](https://eslint.org/) — padronização de código

---

## 🏗️ Estrutura

```
src/
├── @types/          # tipagem do tema do styled-components
├── components/      # componentes compartilhados (Header)
├── contexts/        # CyclesContext (estado global dos ciclos)
├── layouts/         # layout padrão com Header
├── pages/
│   ├── Home/        # formulário de novo ciclo e countdown
│   └── History/     # histórico de ciclos
├── reducers/
│   └── cycles/      # reducer e actions dos ciclos
├── styles/          # tema e estilos globais
├── App.tsx
├── Router.tsx
└── main.tsx
```

O estado dos ciclos fica centralizado em um contexto com `useReducer`, e as actions (criar, interromper, concluir ciclo) ficam separadas do componente. A cada mudança, o estado é salvo no `localStorage`.

---

## 🚀 Como rodar

### Pré-requisitos

- Node.js 18+

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/erickgarcia/ignite-pomodoro.git
cd ignite-pomodoro

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Build para produção

```bash
npm run build
npm run preview
```

---

## 📌 Páginas

| Rota       | Descrição                                          |
| ---------- | -------------------------------------------------- |
| `/`        | Formulário de novo ciclo e contagem regressiva     |
| `/history` | Histórico de ciclos com duração, início e status   |

---

## 👤 Autor

**Erick Garcia** — Backend Developer

[GitHub](https://github.com/erickgarcia)
