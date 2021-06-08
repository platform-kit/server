# Configuration

### 1. Add the database config

If you're starting from scratch (an empty database), you can get started quickly by adding a [Prisma schema](https://www.prisma.io/docs/concepts/components/prisma-schema) at `/app/prisma/schema.prisma`.

Alternatively, if you've already got a repository with a `/prisma/` directory (including at least a `prisma.schema` file), specify the `GITHUB_REPOSITORY` and `GITHUB_TOKEN` environment variables in your `.env` file. Then run `npm run pull` to clone the repo.

### 2. Add the build command config

If this repo also includes a static site builder, such as [Gridsome](https://gridsome.org) or [Gatsby](https://www.gatsbyjs.com), you may specify the `BUILD_COMMAND` in your `.env` file, and execute it with `npm run build.`

For convenience, when deploying to the cloud you may combine these two steps by running `npm run deploy`.


### 3. Start the server

```
npm run dev
```

The server is now running on [`http://localhost:3000`](http://localhost:3000). 

You can now use the API , e.g. the api-schema endpoint, [`http://localhost:3000/api`](http://localhost:3000/api).

## Next Steps

- Check out the [Using the REST API Guide](docs/../2-rest-api.md)