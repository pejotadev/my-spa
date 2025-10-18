# 🚀 Como Publicar no GitHub

## Passo 1: Criar Repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique em **"New"** ou **"+"** no canto superior direito
3. Preencha:
   - **Repository name:** `my-spa`
   - **Description:** `Monorepo SPA with NestJS backend and React frontend`
   - **Visibility:** Público ou Privado (sua escolha)
   - **NÃO** marque "Initialize with README" (já temos um)
4. Clique em **"Create repository"**

## Passo 2: Conectar Repositório Local

Após criar o repositório no GitHub, execute os comandos abaixo no terminal:

```bash
# Navegue para o diretório do projeto
cd /Users/pedropaiva/Documents/examples/my-spa

# Adicione o repositório remoto (substitua SEU_USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU_USUARIO/my-spa.git

# Renomeie a branch principal para main (se necessário)
git branch -M main

# Faça o push do código para o GitHub
git push -u origin main
```

## Passo 3: Verificar

Após executar os comandos, acesse:
- https://github.com/SEU_USUARIO/my-spa

Seu código estará disponível no GitHub! 🎉

## 📝 Informações do Projeto

- **Backend:** NestJS + GraphQL + Prisma + SQLite
- **Frontend:** React + Apollo Client + Tailwind CSS
- **Autenticação:** JWT com roles (admin, customer, service provider)
- **Desenvolvimento:** GraphQL Codegen para type safety
- **Portas:** Backend (4000), Frontend (3001), Prisma Studio (5555)

## 🔧 Para Clonar o Projeto

Outros desenvolvedores podem clonar o projeto com:

```bash
git clone https://github.com/SEU_USUARIO/my-spa.git
cd my-spa
npm install
cd backend && npm install
cd ../frontend && npm install
```

## 🚀 Para Executar

```bash
# Backend
cd backend
npm run start:dev

# Frontend (em outro terminal)
cd frontend
npm run dev

# Prisma Studio (opcional)
cd backend
npx prisma studio
```
