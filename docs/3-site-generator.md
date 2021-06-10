# Site Generators

#### Default Build

By default, PlatformKit-API will build a simple documentation website that includes searchable docs for each API endpoint in your `api-schema.json`.

#### Custom Build Commands

If you would like to deploy your own static site builder, using a tool such as [Gridsome](https://gridsome.org) or [Gatsby](https://www.gatsbyjs.com), you may specify the `BUILD_COMMAND` in your `.env` file, and execute it with `npm run build.`

For convenience, when deploying to the cloud you may combine these two steps by running `npm run deploy`.


#### Start the server

```
npm run dev
```

The server is now running on [`http://localhost:3000`](http://localhost:3000). 

You can now use the API , e.g. the api-schema endpoint, [`http://localhost:3000/api`](http://localhost:3000/api).