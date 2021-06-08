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


## Evolving the app

Evolving the application typically requires two steps:

1. Migrate your database using Prisma Migrate
1. Update your application code

For the following example scenario, assume you want to add a "profile" feature to the app where users can create a profile and write a short bio about themselves.

### 1. Migrate your database using Prisma Migrate

The first step is to add a new table, e.g. called `Profile`, to the database. You can do this by adding a new model to your [Prisma schema file](./prisma/schema.prisma) file and then running a migration afterwards:

```diff
// ./prisma/schema.prisma

model User {
  id      Int      @default(autoincrement()) @id
  name    String?
  email   String   @unique
  posts   Post[]
+ profile Profile?
}

model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String
  content   String?
  published Boolean  @default(false)
  viewCount Int      @default(0)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}

+model Profile {
+  id     Int     @default(autoincrement()) @id
+  bio    String?
+  user   User    @relation(fields: [userId], references: [id])
+  userId Int     @unique
+}
```

Once you've updated your data model, you can execute the changes against your database with the following command:

```
npx prisma migrate dev --name add-profile
```

This adds another migration to the `prisma/migrations` directory and creates the new `Profile` table in the database.

### 2. Update your application code

You can now use your `PrismaClient` instance to perform operations against the new `Profile` table. Those operations can be used to implement API endpoints in the REST API.

#### 2.1 Add the API endpoint to your app

Update your `index.ts` file by adding a new endpoint to your API:

```ts
app.post('/user/:id/profile', async (req, res) => {
  const { id } = req.params
  const { bio } = req.body

  const profile = await prisma.profile.create({
    data: {
      bio,
      user: {
        connect: {
          id: Number(id)
        }
      }
    }
  })

  res.json(profile)
})
```

#### 2.2 Testing out your new endpoint

Restart your application server and test out your new endpoint.

##### `POST`

- `/user/:id/profile`: Create a new profile based on the user id
  - Body:
    - `bio: String` : The bio of the user

## Next Steps

- Check out the [Prisma docs](https://www.prisma.io/docs)