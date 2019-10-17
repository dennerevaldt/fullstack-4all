# API Ekki

## Iniciando API

- Criar arquivo com nome ".env" na raiz do projeto contendo informações do ambiente, seguindo o arquivo de exemplo ".env.example";

- Database:

  - Importar em uma base criada o arquivo dump na pasta `docs/dump`, ou rodar os scripts abaixo do Sequelize para criação das tabelas:
    - NPM: `npx sequelize db:migrate`;
    - YARN: `yarn sequelize db:migrate`;

- Instalar dependências:

  - `NPM` npm install
  - `YARN` yarn;

- Gerar build:

  - `NPM` npm run build;
  - `YARN` yarn build;

- Iniciar (DEV):

  - `NPM` npm run dev;
  - `YARN` yarn dev;

- Iniciar (TESTES):

  - `NPM` npm run test;
  - `YARN` yarn test;

- Iniciar (PROD):

  - `NPM` npm start;
  - `YARN` yarn start;

- Documentação:

  - [Postman](https://www.getpostman.com/) - Documentação e coleção dos endpoints;
  - [Documentação online](https://documenter.getpostman.com/view/3040338/SVtSWUuf?version=latest)
