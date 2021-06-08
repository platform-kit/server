# Using the REST API

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

- Check out the [Development Guide](docs/../3-development.md)