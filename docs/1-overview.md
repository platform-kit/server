# Overview

PlatformKit API is a **Node App** built with [Express](https://expressjs.com), [Apollo](https://www.apollographql.com), [Prisma](https://www.prisma.io), and [TypeScript](https://www.typescriptlang.org/).

[Get the source on GitHub](https://github.com/platform-kit/platformkit-api).
#### Features

- Automatically generate a self-documenting **GraphQL** /  **REST API** from an existing database.

- Maintain API endpoints and validation rules with a **single config file**.

- Deploy & serve any **static site generator**.


#### Installation

##### 1. Clone the repo

```
git clone https://github.com/platform-kit/platformkit-api api
```

##### 2. Install dependencies

```
cd api
npm install
```

##### 3. Add the config

Specify the `GITHUB_REPOSITORY`, `GITHUB_TOKEN`, and `BUILD_COMMAND` environment variables in your `.env` file. 

Then run `npm run pull` to clone the repo into the local workspace and `npm run build` to execute the build command.

#### 4. Start the server

```
npm run dev
```

The server is now running on [`http://localhost:3000`](http://localhost:3000). 

Any static files that have been output by the site genreator into the output directory will be made public.

The output directory defaults to `/dist` but you can specify another one via the `PUBLIC_DIRECTORY` environment variable.

Serverless node.js functions in the `/functions` directory will be served at `/api/{function-name.js}`
