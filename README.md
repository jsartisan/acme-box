This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Steps to run 
1. Install dependencies using yarn

```
yarn
```

2. Create .env file in packages/api and add following values:

```
APP_PORT=4000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=27017
DB_DATABASE=acme
```

Make sure you have mongo installed on your system and port is same as above value.

2. Create .env.development.local in packages/app and add following values:

```
NODE_PATH=src/

REACT_APP_GRAPHQL_URL=http://localhost:4000/graphql
```

3. Run the servers

```
yarn run dev
```

API: http://localhost:4000/graphql
CLIENT: http://localhost:3000


