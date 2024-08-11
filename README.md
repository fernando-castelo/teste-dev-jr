# Cloudged - Desafio Técnico Desenvolvedor

## Python Script

Script criado para extração de conteúdo em um arquivo .txt para .xlsx com python e as bibliotecas pandas e openpyxl

## Backend

Desenvolvimento de uma API RESTful utilizando NestJS. A API gerencia operações CRUD (Create, Read, Update, Delete) para uma entidade chamada "User".

## Frontend

Desenvolvimento de uma aplicação frontend com React.js e Chakra UI, focada em uma interface intuitiva e responsiva. A aplicação interage com a API desenvolvida no backend para permitir aos usuários visualizar uma lista de usuários, adicionar novos usuários, atualizar informações de usuários existentes e remover usuários. Utiliza componentes estilizados do Chakra UI para uma experiência de usuário moderna.

## Como usar

## Pré-requisitos

Para iniciar, você precisa ter as seguintes ferramentas instaladas em seu sistema:

-  [Python](https://www.python.org/downloads/) (Versão 3.12 ou superior)
-  [Node.js](https://nodejs.org/en/download/) (Versão 18 ou superior)
-  [NPM](https://www.npmjs.com/get-npm)
-  Docker: [Ubuntu](https://docs.docker.com/engine/install/ubuntu/) ou [Windows](https://docs.docker.com/desktop/install/windows-install/)


## Python Script

Na pasta raiz, execute o arquivo: 

```bash
python .\desafio01.py
```

## Backend

Na pasta raiz, acesse o diretorio backend: 

```bash
cd backend
```

Instale as dependências: 

```bash
npm install
```

Inicie o Docker:

```bash
docker compose up
```

Inice a Aplicação:

```bash
npm run start:dev
```

Acesse a pgAdmin no endereço http://localhost:8080/ e crie o banco com os dados do arquivo .env

Acesse a api no endereço http://localhost:3000/

## Frontend
Na pasta raiz, acesse o diretorio frontend: 

```bash
cd frontend
```

Instale as dependências: 

```bash
npm install
```

Inice a Aplicação:

```bash
npm run dev
```
Acesse a aplicação no endereço http://localhost:5173/


