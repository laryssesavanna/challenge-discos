# challenge-passei-direto
Criação de uma aplicação web para catálogo de discos.

## Funcionalidades da aplicação
* Cadastrar, editar e remover discos do banco de dados;
* Cadastrar e remover coleções do banco de dados;
* Inserir novos discos em uma coleção;
* Excluir discos da coleção;
* Listar todos os discos de uma coleção;
* Listar todos os discos do banco de dados;
* Listar todas as coleções do banco de dados;
* Busca dinâmica na listagem de discos;
* Busca dinâmica na listagem de coleções.


## Principais tecnologias utilizadas
Gerenciador de pacotes
- NPM

Backend:
- Node.js
- Node Express

Frontend
- Vue.js
- Axios
- Flex para o layout

Banco de Dados
- MySQL

## Instruções para executar o projeto:

### Clonando o projeto:
No terminal execute:
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

Na pasta raiz do projeto, execute no terminal:
```
cd catalog-backend
npm install

```
Utilizando um editor de texto, altere as credenciais do banco de dados, caso seja necessário, no arquivo /src/config/connection.js
```
const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'catalog'
});
```

No terminal, execute o projeto com o comando:
```
node server.js
```
O servidor estará escutando no endereço http://localhost:6001

### Executando o frontend:

Na pasta raiz do projeto, execute:

```
cd catalogo-discos
npm install
npm run serve

```

A aplicação estará disponível em http://localhost:8080/

### API Backend

## Gerenciar discos
* 1- URL: GET /discs
  * Lista todos os discos do banco de dados
  * Exemplo de resposta:
  ```
  {
    "status": "Success",
    "data": [
        {
            "idDisc": 1,
            "title": "Nevermind",
            "artist_name": "Nirvana",
            "genre": "Rock Grunge",
            "year": "1991-07-04T03:00:00.000Z"
        },
        {
            "idDisc": 2,
            "title": "Construção",
            "artist_name": "Chico Buarque",
            "genre": "MPB",
            "year": "1971-04-07T03:00:00.000Z"
        }
    ],
    "message": "Query executed successfully."
    }
  ```
 * 2- URL: GET /discs/:idDisc
    * Retorna o disco com id = :idDisc
 * 3- URL: POST /discs/
    * Registra um novo disco no banco de dados
    * Exemplo de corpo da requisição:
    ```
    {
      "title": "Ten",
      "artist_name": "Pearl Jam",
      "genre": "Rock Grunge",
      "year": "1991-10-11"
    }
    ```
  * 4- URL: PUT /discs/
    * Edita um disco no banco de dados
    * Exemplo de corpo da requisição: exibido no Item 3
  * 5- URL: DELETE /discs/:idDisc
    * Remove um disco do banco de dados com id = :idDisc
  
  ## Gerenciar coleções
  
  * 1- URL: GET /collections
    * Lista todas as coleções do banco de dados
    * Exemplo de resposta:
    ```
    {
      "status": "Success",
      "data": [
          {
              "idCollection": 1,
              "name": "Antigas",
              "description": "Bandas dos anos 90"
          },
          {
              "idCollection": 2,
              "name": "Variadas",
              "description": "Só as preferidas"
          }
      ],
      "message": "Query executed successfully."
      }
    ```
    
  * 2- URL: GET /collections/:idColl
    * Retorna a coleção com id = :idColl
  * 3- URL: POST /collections
    * Cadastra uma coleção no banco de dados
    * Exemplo de corpo da requisição:
    ```
    {
      "name": "As melhores da MPB",
      "description": "Diversos artistas da MPB"
    }
    ```
  * 4- URL: PUT /collections/:idColl
    * Edita os dados de uma coleção
    * Exemplo de corpo da requisição: exibido no item 3
  * 5- URL: DELETE /collections/:idColl
    * Remove uma coleção do banco de dados
  * 6- URL: GET /collections/addDiscToColl/idDisc=:idDisc&idColl=:idColl
    * Adiciona um disco em uma coleção, onde :idDisc é o id do disco e :idColl é o id da coleção
  * 7- URL: DELETE /collections/removeDiscColl/idDisc=:idDisc&idColl=:idColl
    * Remove um disco de uma coleção, onde :idDisc é o id do disco e :idColl é o id da coleção
  * 8- URL: GET /collections/collecDisc/:idCollec
    * Lista todos os discos de uma coleção, onde :idCollec é o id da coleção
