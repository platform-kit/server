# Development

The workflow for making changes to your API is simple:

- Add or change the **database** tables (through whatever methdod you like).
- Add or change the **schemas** in the API Schema file.
- Add or change the **models** that the api executes.

For the following example scenario, we'll use Node & Prisma, but you're free to use the language and framework of your choice, since PlatformKit-API works independently of your migrations and your application code, through the magic of Prisma's [Introspection](https://www.prisma.io/docs/concepts/components/introspection).

Let's assume you want to add a "profile" feature to your app, so users can write a short bio about themselves.

#### 1. Migrate your database

The first step is to add a new table. In this example, we'll add a model called called `Profile` to our [Prisma Schema](https://www.prisma.io/docs/concepts/components/prisma-schema) file, which will produce a `profiles` table once we run the migration command:

```diff
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

#### 2. Update your API schema

The app can now use `PrismaClient` internally to perform operations against the new `profile` table. However, we must define the API Schema via the `api-schema.json` file in order to expose API the Browse/Read/Edit/Add/Delete operations in the GraphQL and REST APIs.

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

### 4. Update your code

If you want to apply custom business logic to your model you must create a [Javascript Module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) with the same name as your schema (in this case, `profiles`) in your app's repo. This module must export methods that correspond to the REST API endpoints (`browse`, `read`, `edit`, `add`, `delete`).

### 4. Test your API

Restart your application server by running `npm run dev`

Test your new endpoint by opening up [http://localhost:3000/graphql](http://localhost:3000/graphql). You should see your new `profiles` type in the schema.

#### 5. Next Steps

- Check out the [Prisma docs](https://www.prisma.io/docs) for more on maintaining the database
- Check out the [Apollo docs](https://www.apollographql.com/docs/apollo-server/) for more on GraphQL