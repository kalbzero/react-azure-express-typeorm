# API Classroom

Este proejto foi criado para gerenciar as informações dos cursos e arquivos no sistema NLClassroom.

Programador Criador: Edward Ramos

## Executando o projeto

Após clonar o projeto do gitlab, entrar na pasta do projeto (server), executar `npm run dev`, o backend irá rodar na porta 7000.

## Documentação

A base dessa API foi feita através desse <a href="https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/">tutotial</a>.

### 0. Erros

### 0.1 QueryFailedError: Table 'nl_cr_categories_files' already exists

No arquivo ormconfig, altere a variável `syncronize` para `false` enquanto estiver em desenvolvimento. Quando quiser recriar as tabelas, apague as tabelas no banco e altere essa variável para `true`. Essa variável fica dentro da configuração do Banco, então em cada objeto do array vai ter essa variavel, altere apenas no banco que estiver usando.

### 1. Linguagens e ferramentas

<a href="https://nodejs.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> <a href="https://www.oracle.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/oracle/oracle-original.svg" alt="oracle" width="40" height="40"/> </a>

### 1.1 TypeORM

Ao instalar o typeorm, foi necessário instalar outra biblioteca e importada no index.ts `import "reflect-metadata";`, ela é improtante para o funcioanemnto do TypeORm, não apague!

No arquivo `tsconfig.json`, descomente esses dois campos:

- "emitDecoratorMetadata": true,
- "experimentalDecorators": true,

Existe um arquivo que fica na raiz do projeto chamado `ormconfig.json`, este arquivo fica armazenado os dados de conexão com o banco de dados, para teste eu deixei a configuração do MySQL e para produção a configuração do Oracle.

Quando estiver usando multiplas conexões, precisa indicar qual delas irá usar, com isso, passando essa informaçaõ no parâmetro `createConnection(/* 'prod' */ )`, neste exemplo o parâmetro está comentado, pois por default ele carrega o arquivo que não tem um atributo `name` ou que tenha um atributo `name` com o valor `default`. Este comando é chamado uma vez no `index.ts` e nos services é usado o `getRepository()` para fazer as consultas e inserções no banco de dados.

### 1.2 Oracle

A configuração do Oracle no backend é bem peculiar, tendo uma configuração mais complexa que está neste <a href="https://github.com/oracle/node-oracledb">link</a> e neste <a href="https://oracle.github.io/node-oracledb/INSTALL.html#windowsinstallation">link</a> para rodar no Windows.

### 1.3 MySQL2

Existem duas bibliotecas para MySQl, o `mysql` e o `mysql2`, a segunda biblioteca possui uma perfomance melhor do que a primeira, segundo esse <a href="https://stackoverflow.com/questions/25344661/what-is-the-difference-between-mysql-mysql2-considering-nodejs">link</a>.

Para rodar local, crie a database `nlclassroom` e o TypeORM irá fazer o resto do serviço.

### 2. Entity

A pasta entity armazena as classes usadas pelo TypeORM para criar as tabelas, colunas e os relacionamentos. Esses arquivos são usados no Service para especificar a tabela a ser consultada. Os comandos mais comuns nestes arquivos são:

- Entity: Define que o arquivo irá ser uma tabela.
- Column: Define que aquele atributo será usado como coluna na tabela a ser criada.
- PrimaryGeneratedColumn: Define a coluna como chave primária e auto geradora.
- JoinTable: Define que essa tabela tem relação com outra, a coluna irá armazenar a chave estrangeira, ter uma lista de chaves estrangeiras ou definir a tabela que é proprietária da relação (no caso de um `@ManyToMany`).
- OneToMany: A coluna irá armazenar uma lista de chaves estrangeiras.
- ManyToOne: A coluna armazena a chave estrangeira (aqui não precisa colocar `@JoinEntity`).
- ManyToMany: Cria uma terceira tabela com esse relacionamento. Ambos os arquivos Entity devem ter esse comando e em apenas um deles deve ter o `@JoinEntity`.

### 2.1 Migration

A migration é apenas um único arquivo com consultas sql para atualizar um esquema de banco de dados e aplicar novas alterações a um banco de dados existente (alterar tabela, coluna ...). Neste projeto não será necessário utilizar, pois as tabelas da NL são gerenciadas pelo CS.

### 2.2 Subscriber

O <a href="https://github.com/typeorm/typeorm/blob/master/docs/listeners-and-subscribers.md">subscriber</a> é o comando para escutar(listener) os eventos. Se você quer escutar os eventos de uma classe da Entity, crie um arquivo (ex:log.subscriber.ts) e coloque o comando `@EventSubscriber()` logo acima do `export class LogSubscriber implements EntitySubscriberInterface<Log>`, importando a Entity a ser escutada.

Nos arquivos Entity, coloca-se a marcação do evento a ser escutado:

```
@Entity()
export class Log {

    @BeforeRemove()
    updateStatus() {
        this.status = "removed";
    }
}
```

Os tipos de eventos são:

- @AfterLoad
- @BeforeInsert
- @AfterInsert
- @BeforeUpdate
- @AfterUpdate
- @BeforeRemove
- @AfterRemove

No arquivo Subscriber, insira o comando `listenTo()` para saber qual entity deve escutar. Logo abaixo, coloque as funções a serem executadas quando o método for chamado. Se não colocar o método `listenTo()`, este arquivo irá escutar todos os eventos do backend de qualquer Entity.

### 3. Interfaces

A pasta interfaces possui os arquivos utilizados nas requisições como usuario, arquivos, categorias, cursos e logs; com uma interface para o objeto em si (tendo id ou não) e outra para um array de objetos.

### 4. Services

A pasta Service possui as requisições pro banco de dados, com as funções find(), findAll(), create(), update() e remove().

### 5. Routes

A pasta routes armazena os caminhos das operações CRUD para cada assunto a ser requisitado.
Por padrão, todos tem as mesmas URL's, sendo elas:

- GET '/': Para pegar todos os itens.
- GET '/:id': Para pegar um item pelo identificador.
- POST '/': Para criar um objeto daquele item.
- PUT '/:id': Para atualizar o item com aquele identificador, se não achar o objeto, cria um novo.
- DELETE '/:id': Para deletar o item com aquele identificador.

No arquivo `index.ts`, esses routes são importados para definir o caminho base de cada um deles, sendo:

- "/api/nlclassroom/categories"
- "/api/nlclassroom/courses"
- "/api/nlclassroom/files"
- "/api/nlclassroom/logs"

Outros dois arquivos foram criados para tratar os erros de requisição, ambos devem ficar sempre no final destas requisições acima, pois eles funcionam como uma ideia de try/catch, caso alguma das URL's acima não sejam iguais a da requisição recebida, irá disparar um desses dois arquivos:

- errorHandler: Para tratar os erros do tipo 400 e 500.
- notFoundHandler: Para tratar o erro 404.
