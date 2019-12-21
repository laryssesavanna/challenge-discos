# challenge-passei-direto
Criação de uma aplicação web para catálogo de discos.

## Principais tecnologias utilizadas
Gerenciador de pacotes
- NPM

Backend:
- Node.js
- Node Express

Frontend
- Vue.js
- Axios

Banco de Dados
- MySQL

## Instruções para executar o projeto:

### Clonando o projeto:

```
git clone https://github.com/laryssesavanna/challenge-passei-direto.git
cd challenge-passei-direto
```

### Criando o banco de dados e tabelas

O script SQL encontra-se disponível no diretório /challenge-passei-direto/database/scripts_catalog.sql

1- Abra o MySQL

2- Clique na opção para abrir um arquivo de Script SQL

3- Selecione o arquivo scripts_catalog.sql

4- Execute o script

5- Atualize a lista de Schemas

### Executando o backend:

Na pasta raiz do projeto execute:
```
cd catalog-backend
npm install
node server.js

```
O servidor estará escutando no endereço http://localhost:6001

### Executando o frontend:

Na pasta raiz do projeto execute:
```
cd catalogo-discos
npm install
npm run serve

```
