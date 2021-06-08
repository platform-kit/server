# Developing your app

## Evolving the database

Evolving the application typically requires two steps:

1. Migrate your database (here, we'll use Prisma Migrate)
2. Update your application code

For the following example scenario, assume you want to add a "profile" feature to the app where users can create a profile and write a short bio about themselves.

### 1. Migrate your database

The first step is to add a new table. In this example, we'll add a model called called `Profile` to our [Prisma schema file](../app/prisma/schema.prisma) file, which will produce a `profiles` table once we run the migration command:

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

Once you've updated the data model, you can execute the migration with the following command:

```
npx prisma migrate dev --name add-profile
```

This adds another migration to the `prisma/migrations` directory and creates the new `profiles` table in the database.

### 2. Update your application code

The app can now use `PrismaClient` internally to perform operations against the new `profile` table. However, we must define the API Schema via the `api-schema.json` file in order to expose API the Browse/Read/Edit/Add/Delete operations in the GraphQL and REST APIs.

### 3 Add API endpoints to your API schema

Update your `api-schema.json` file by adding a new entry to the `schemas` object:

```json
 "profiles": {
            "browse": {
                "input_validation_rules": {
                    "name": "required|string",
                    "oauth_id": "required|string",
                    "email": "required|email|string"
                }                
            }

```

Each endpoint you want to expose (options: `browse`, `read`, `edit`, `add`, `delete`) must include an `input_validation_rules` object which consists of field names and rules.

See [Validator.JS](https://www.npmjs.com/package/validatorjs) package for more details on the available rules.

### 4 Test your new endpoint

Restart your application server by running `npm run dev`

Test your new endpoint by opening up [http://localhost:3000/graphql](http://localhost:3000/graphql). You should see your new `profiles` type in the schema.

## Next Steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Check out the [Apollo docs](https://www.apollographql.com/docs/apollo-server/)