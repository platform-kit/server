# Site Generators

#### Default Build

By default, PlatformKit-API will build a simple documentation website that includes searchable docs for each API endpoint in your `api-schema.json`.

It will also build pages for any markdown files found in the `DOCS_PATH`. You may set this path via the `DOCS_PATH` environment variable. 

The default is `./docs` (relative to your repository's root).

#### Custom Build Commands

If you would like to deploy your own static site builder, using a tool such as [Gridsome](https://gridsome.org) or [Gatsby](https://www.gatsbyjs.com), you may specify the `BUILD_COMMAND` in your `.env` file, and execute it with `npm run build.`
