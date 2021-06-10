# The API Schema

#### Api-Schema.json

PlatformKit-API generates a Rest API and GraphQL API from a single file: `api-schema.json`. 

This file must be in the root directory of your repo.

The structure of this file is simple:

<div class="card api-schema-card bg-dark br-5">
<div class="card-header text-light"><span class="o-50">api-schema.json</span></div>
<div class="card-body">
<pre class="text-light mb-0">
{
    "name": "PlatformKit API",
    "version": "0.0.1",
    "resources": [
     "analytic_events"
    ],
    "links": {
        "github": "https://github.com/platform-kit"
    },
    "schemas": {
        "analytic_events": {
            "add": {
                "input_validation_rules": {
                    "type": "required|string",
                    "data": "string",
                    "id": "integer"
                }
            }
        }
    }
}
</pre>
</div>
</div>

#### The GraphQL API

The GraphQL API is fully self-documenting. You can explore it locally at [http://localhost:3000/graphql](http://localhost:3000/graphql).

#### The Rest API

For each table - aka `resource` - defined in your prisma schema, you can access the REST API at the following set of endpoints:

##### Schema
- `GET /api/{resource}/schema`: Fetch the JSON Schema for the `resource` 

##### Browse
- `GET /api/{resource}/browse?take={take}&skip={skip}&orderBy={orderBy}&orderField={orderField}`: Fetch an array of items from the `resource` table
  - Query Parameters  
    - `take` (optional): This specifies how many objects should be returned in the list
    - `skip` (optional): This specifies how many of the returned objects in the list should be skipped
    - `orderBy` (optional): The sort order for posts in either ascending or descending order. The value can either `asc` or `desc`
    - `orderField` (optional): The sort field - defaults to `id`

##### Read 
- `GET /api/{resource}/:id`: Fetch a single `resource` by its `id`

##### Add

- `POST /api/{resource}`: Create a new `resource`  

##### Edit

- `POST /api/{resource}/:id`: Update an existing `resource`

##### Delete

- `DELETE /{resource}/:id`: Delete a `resource` by its `id`