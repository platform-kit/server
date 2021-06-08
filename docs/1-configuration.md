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

## Using the REST API

For each table - aka `resource` - defined in your prisma schema, you can access the REST API at the following set of endpoints:

### `Schema` 
- `GET /api/{resource}/schema`: Fetch the JSON Schema for `posts` 

### `Browse`
- `GET /api/{resource}/browse?take={take}&skip={skip}&orderBy={orderBy}&orderField={orderField}`: Fetch an array of items from the `resource` table
  - Query Parameters  
    - `take` (optional): This specifies how many objects should be returned in the list
    - `skip` (optional): This specifies how many of the returned objects in the list should be skipped
    - `orderBy` (optional): The sort order for posts in either ascending or descending order. The value can either `asc` or `desc`
    - `orderBy` (optional): The sort field - defaults to `id`

### `Read` 
- `GET /api/{resource}/:id`: Fetch a single `resource` by its `id`

### `Add`

- `POST /api/{resource}`: Create a new `resource`  

### `Edit`

- `POST /api/{resource}/:id`: Update an existing `resource`

### `Delete`

- `DELETE /{resource}/:id`: Delete a `resource` by its `id`

## Next Steps

- Check out the [Development Guide](docs/../2-development.md)