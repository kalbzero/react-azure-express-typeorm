# NL Classroom

Esse projeto foi criado para unir todas as video-aulas, pdf's e todo material que está nos servidores e outros programas da NL.

Programador Criador: Amon Peres
Programador Atual: Edward Ramos

## Executando o projeto

Após clonar o projeto do gitlab, entrar na pasta do projeto (Web), executar `yarn install` e,0 após a instalação, executar o comando `yarn start`, após uma aba no navegador irá se abrir com o endereço `localhost:3000`.

## Documentação

### 0. Erros

### 0.1 findDOMNode is deprecated in StrictMode.

Alguns métodos dão esse erro ao utilizar as bibliotecas do Material UI.
Para resolver, segundo a documentação, basta atualizar "@material-ui/core": "^4.12.3" para "@material-ui/core": "^5.0.0" (versão beta).

### 1. Linguagens e ferramentas

<a href="https://www.typescriptlang.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://tailwindcss.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a>

### 1.1 Configurações dos Plugins do VCS

- ESlint
  A configuração dele se dá pela instalação no projeto através dos comandos `yarn add -D eslint`, após iniciar a configuração dele pelo comando `yarn run eslint --init`, após selecionará as seguintes opções:
- **To check syntax, find problems and enforce code style**
- **JavaScript modules (import/export)**
- **React**
- **Yes**
- **Browser**
- **Use a popular style guide**
- **Airbnb**
- **JSON**
- **No**

Após instalar as bibliotecas pedidas com yarn, só cuidar a versão dita na msg, aqui é um exemplo: `yarn add -D babel-eslint eslint-plugin-react@^7.21.5 eslint-config-airbnb@latest eslint-plugin-import@^2.22.1 eslint-plugin-jsx-a11y@^6.4.1 eslint-plugin-react-hooks@^4`

Criar o arquivo `.eslintignore` e incluir `node_modules`.
Editar o arquivo `.eslintrc.json` com a seguinte configuração:

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "plugin:react/recommended",
    "plugin:import/typescript",
    "airbnb",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["react", "@typescript-eslint", "prettier"],
  "rules": {
    "arrow-parens": [2, "as-needed"],
    "camelcase": "off",
    "global-require": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "import/no-named-as-default": 0,
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "no-use-before-define": "off",
    "no-console": ["error", { "allow": ["tron"] }],
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [
      1,
      { "extensions": [".js", ".jsx", "ts", "tsx"] }
    ],
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-props-no-spreading": "off",
    "react-native/no-raw-text": "off",
    "react/prop-types": 0,
    "@typescript-eslint/no-use-before-define": ["error"],
    "import/extensions": [
      "error",
      "always",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".ts", ".tsx", ".js", ".jsx"]
      }
    }
  }
}
```

Por último, instale o plugin do ESlint, recarregue a janela do VSC e reinicie o projeto.

### 1.2 Prettier

Executar o seguinte comando: `yarn add prettier eslint-config-prettier eslint-plugin-prettier -D`
Criar o arquivo `.prettierrc` e adicionar o seguinte comando:

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "arrowParens": "avoid"
}
```

Instale o plugin Prettier no seu projeto, após isso, basta abrir os arquivos e salvá-los para que o prettier os padronize ou execute o comando `npm run pretty`.

### 1.3 EditorConfig

Instalar o plugin no projeto, após, na raiz do projeto, clique com o botão direito do mouse e selecione a opção `Generate .editorconfig`.

Edite o arquivo gerado com os seguintes comandos:

```
root = true

[*]
end_of_line = lf
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

### 1.4 Tailwind Css

Após fazer a instalação das biliotecas `npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9`, é necessário instalar depois o `npm install @craco/craco --save`.

Agora irá precisar alterar o `package.json`:

```
// trocar isso
"start": "react-scripts start",
"build": "react-scripts build",
"test": "react-scripts test",

// por isso
"start": "craco start",
"build": "craco build",
"test": "craco test",
```

Crie um arquivo de configuração na raiz do projeto chamado `/craco.config.js`, e dentro dele cole o seguinte código:

```
module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};
```

Agora precisa criar a configuração do tailwind com o comando `npx tailwindcss-cli@latest init`. Este comando irá criar um arquivo na raiz do projeto chamado `tailwind.config.ts`, se o tailwind já foi instalado, então esse arquivo já deve existir.

Neste arquivo você pode adicionar um comando para remover o código css que não é utilizado, basta adicionar ` purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],`.

Importe as bibliotecas do tailwind no arquivo `src/index.css` na raiz do projeto, com o comando:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

PS: Se aparecer uma mensagem de erro dizendo que a regra @tailwind é desconhecida, instale esse plugin: <a href="https://marketplace.visualstudio.com/items?itemName=csstools.postcss">PostCSS Language</a>. Após instalar o plugin, precisa acessar o comando do VSC `Preferences: Open Settings (JSON)` e adicionar o comando:

```
"emmet.includeLanguages": {
        "postcss": "css"
    }
```

PS2: Se aparecer o erro `PostCSS plugin tailwindcss requires PostCSS 8.`, desinstale as bibliotecas `npm uninstall tailwindcss postcss autoprefixer` e re-instale `npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9`.

### 1.5 Microsoft Graph REST API v1.0

Para fazer uma listagem e pegar os items da nuvem do OneDrive, será necessário fazer uma série de configurações:

1. Instale as <a href="https://docs.microsoft.com/pt-br/graph/sdks/sdk-installation">bibliotecas</a> `npm install @microsoft/microsoft-graph-client --save` e
   `npm install @microsoft/microsoft-graph-types --save-dev`.

2. Adicionar as permissões na <a href="https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/CallAnAPI/appId/873e7d84-533f-4f54-a9c2-d1f03114dcf2/isMSAApp/">conta Microsoft </a>seguindo <a href="https://docs.microsoft.com/pt-br/graph/api/driveitem-search?view=graph-rest-1.0&tabs=javascript">esse</a> tutorial.

3. Rota padrão é `https://graph.microsoft.com/v1.0/`, para testar as requisições da APi basta acessar esse <a href="https://developer.microsoft.com/en-us/graph/graph-explorer">link</a> e <a href="https://www.youtube.com/watch?v=f_3wc4UgqTI">aqui</a> tem um tutorial rápido de 5 minutos. Na APi de teste, libere as permissões na aba `Modify Permissions (Preview)` e clique em `Consent` em cada permissão da lista.

4. Precisa salvar o `access_token` do usuário para ter acesso após o mesmo fazer login. Este será usado para ter acesso ao OneDrive. Este token tem a duração de 1 hora.

5. Essa API do MS Graph é bem confusa, sugiro que veja esse <a href="https://docs.microsoft.com/pt-br/onedrive/developer/rest-api/resources/driveitem?view=odsp-graph-online">link</a> para saber mais dsobre o `DriveItem`.

### 2. Login / Autenticação

A autentiação é feita utilizando a conta da microsoft, através da ferramenta azure authetication. Tutotial de como foi feito através deste <a href="https://docs.microsoft.com/pt-br/azure/developer/javascript/tutorial/single-page-application-azure-login-button-sdk-msal">link</a>

No <a href="https://portal.azure.com/?quickstart=True#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps">portal azure</a>, algumas configurações devem ser feitas para receber os dados do usuário logado:
1- No menu lateral esquerdo, clique na opção "Autenticação/Authentication".
2- Clique em " + Adicionar plataforma" (caso não tenha alguma) e selecione "Single-Page-Application".
3- Dentro das opções dessa plataforma, adicione a URL de redirecionamento "http://localhost:3000", mude essa URL quando for para produção ou adicione outra URL.
4- Informe uma URL para Logout: "https://localhost:3000" ou a URL de produção.
5- Na opção "Select the tokens you would like to be issued by the authorization endpoint:", selecione as duas opções que são `Access tokens (used for implicit flows)` e `ID tokens (used for implicit and hybrid flows)`.
6- Na opção "Supported account types" selecione a opção `Accounts in any organizational directory (Any Azure AD directory - Multitenant)`.
7- Mais abaixo tem a opção "Advanced settings", selecione a opção `Yes`.
8- Salve as alterações feitas clicando na opção "Save" que está no topo da página.
9- Vá ao menu lateral e selecione a opção "Manifest", essa opção é um arquivo JSON, procure nele o atributo "allowPublicClient" e verifique se está setado como `true`.

### 2.1 Salvar os dados do usuário logado

Na pasta Page encontra-se o arquivo "login", dentro dele irá ter um `useEffect` que fica monitorando a variavel `currentUser`. Caso tenha um usuário logado, essa função irá salvar os dados de e-mail e nome na `localStorage`, com os nomes `@nlclassroom/username` para o e-mail e `@nlclassroom/name` para o nome.

Essas informações ficam salvas no arquivo `util/index.tsx`, onde tem as funções para verificar se está logado `isLogin()`, sair da página `logout()`, e para pegar e enviar o e-mail e nome do usuário.

No arquivo de rotas, foi separa a rota de login das outras, que serão rotas privadas, tendo acesso após login. A verificação é feita na função `PrivateRoute()`, onde consulta o `localstorage` se tem algum dado salvo.

### 3. Página Categorias

A página de categorias tem 3 rotas, a rota da listagem `category/list`, de criar `category/form` e de editar `category/form:id`.

Dentro da listagem, uma requisição é feita para buscar a lista de categorias que será exibida numa tabela. Nesta tabela o usuário poderá clicar no botão de editar. Acima da tabela tem o botão de criar.

Na página de criar ou editar, está página verifica se tem um `id` na URL, se tem, então exibe o título de edição e faz uma requisição `PUT` ao servidor; caso contrário irá criar uma nova categoria e enviar uma requisição `POST` ao servidor. Após criar ou editar, o usuário volta para a página da listagem. Todos os dados devem ser preenchidos, se não o sistema exibe uma mensagem de aviso.

### 4. Página Cursos

A página de cursos tem 3 rotas, a rota da listagem `category/list`, de criar `category/form` e de editar `category/form:id`.

Dentro da listagem, uma requisição é feita para buscar a lista dos cursos que serão exibidos numa tabela. Nesta tabela o usuário poderá clicar no botão de editar. Acima da tabela tem o botão de criar.

Na página de criar ou editar, está página verifica se tem um `id` na URL, se tem, então exibe o título de edição e faz uma requisição `PUT` ao servidor; caso contrário irá criar um novo curso e enviar uma requisição `POST` ao servidor. Esta página carrega uma lista de categorias para o usuário escolher. Todos os dados devem ser preenchidos, se não o sistema exibe uma mensagem de aviso.

Após criar ou editar, o usuário volta para a página da listagem.

### 5. Página de Arquivo

A página de arquivo tem 3 rotas, a rota da listagem `file/list`, de criar `file/form` e de editar `file/form:id`.

Dentro da listagem, uma requisição é feita para buscar a lista dos arquivos que serão exibidos numa tabela. Nesta tabela o usuário poderá clicar no botão de editar. Acima da tabela tem o botão de criar.

Na página de criar ou editar, está página verifica se tem um `id` na URL, se tem, então exibe o título de edição e faz uma requisição `PUT` ao servidor; caso contrário irá criar um novo curso e enviar uma requisição `POST` ao servidor. Esta página carrega uma lista de cursos para o usuário escolher. Todos os dados devem ser preenchidos, se não o sistema exibe uma mensagem de aviso.

### 6. Home

Após o usuário fazer a autenticação, ele é redirecionado para a Home, onde terá uma barra de pesquisa, a qual irá mostrar os resultados pelo termo pesquisado. A busca irá mostrar os cursos, categorias e arquivos com aquele termo.

### 7. Página da API MG

Esta página é uma automatização de código para pegar os arquivos do OneDrive do `treinamento@nl.com.br` e salvar o link deles no banco de dados. Essa automatização pega os arquivos tanto do OneDrive quanto os compartilhados.
