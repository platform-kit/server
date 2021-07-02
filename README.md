## PlatformKit API

- Deploy **serverless functions** on any major cloud provider (DigitalOcean, Heroku, Render, etc).

- Provision a **PostgreSQL database**.

- Built with [Express](https://expressjs.com), [Apollo](https://www.apollographql.com), [Prisma](https://www.prisma.io), and [TypeScript](https://www.typescriptlang.org/).


### Benefits

- Prevents vendor lock-in (easily move from AWS / Netlify to other platforms)
- Deploy your front-end, back-end, and database in one place
- Predictable billing

### 1-Click Deployment

<a href="https://heroku.com/deploy?template=https://github.com/platform-kit/platformkit-api" target="_blank"><img src="https://www.herokucdn.com/deploy/button.svg" height="35"></a> <a href="https://render.com/deploy?repo=https://github.com/platform-kit/platformkit-api" target="_blank"><img src="https://render.com/images/deploy-to-render-button.svg" height="35"></a> <a href="https://cloud.digitalocean.com/apps/new?repo=https://github.com/platform-kit/platformkit-api/tree/main" target="_blank"><img src="https://www.deploytodo.com/do-btn-blue.svg" height="35"></a>

### Screenshot

<img src="docs/screenshot.png" style="border-radius:5px"/>

## Quick Start
### 1. Clone the repo

```
git clone https://github.com/platform-kit/platformkit-api api
```

### 2. Install dependencies:

```
cd api
npm install
```

### 3. Configure environment variables

```
GITHUB_REPOSITORY=platform-kit/platformkit-ui
GITHUB_TOKEN=STRING

BUILD_COMMAND=npm i; npm run build;
PUBLIC_DIRECTORY=dist
```

### 4. Serve

Run `npm run start`.