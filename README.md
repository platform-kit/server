# PlatformKit API

### Features
- Deploy **serverless functions** on any major cloud provider.
- Deploy **static site generator** with custom build commands.
- Deploy a **PostgreSQL database** with zero config.

### Benefits
- Prevents vendor lock-in (easily move to/from hosting platforms).
- Deploy your front-end, back-end, and database in one place.
- Predictable billing + configurable auto-scaling.

Built with [Express](https://expressjs.com) and [TypeScript](https://www.typescriptlang.org/).
### 1-Click Deployment

To deploy to the cloud, simply click one of the buttons below...

<a href="https://heroku.com/deploy?template=https://github.com/platform-kit/platformkit-api" target="_blank"><img src="https://www.herokucdn.com/deploy/button.svg" height="35"></a> <a href="https://render.com/deploy?repo=https://github.com/platform-kit/platformkit-api" target="_blank"><img src="https://render.com/images/deploy-to-render-button.svg" height="35"></a> <a href="https://cloud.digitalocean.com/apps/new?repo=https://github.com/platform-kit/platformkit-api/tree/main" target="_blank"><img src="https://www.deploytodo.com/do-btn-blue.svg" height="35"></a>

### Quick Start

To install locally...
#### 1. Clone the repo

```
git clone https://github.com/platform-kit/platformkit-api api
```

#### 2. Install dependencies:

```
cd api
npm install
```

#### 3. Configure environment variables

The `GITHUB_REPOSITORY` variable is the repo containing your static site generator.

The `BUILD_COMMAND` is the command that is used to install/run your site generator.

The `PUBLIC_DIRECTORY` variable specifies which directory to serve.

The `GITHUB_TOKEN` is only necessary if your repo is private.

```
GITHUB_REPOSITORY=platform-kit/platformkit-ui
GITHUB_TOKEN=STRING

BUILD_COMMAND=npm i; npm run build;
PUBLIC_DIRECTORY=dist
```

#### 4. Serve

Run `npm run start`.