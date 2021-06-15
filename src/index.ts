// Imports
import { Prisma, PrismaClient } from '@prisma/client';
import express from 'express';
import { Resource } from '../models/resource'

// Vars
require('dotenv').config();
var ApiSpec = require('../lib/apiSpec');
const { ApolloServer, gql } = require('apollo-server-express');
var jwt = require('express-jwt');
var JWT = require('jsonwebtoken');
const bearerToken = require('express-bearer-token');
var cors = require('cors')
var fs = require('fs');
var pluralize = require('pluralize')
const bodyParser = require('body-parser');

// Auth Config
var auth0cert = Buffer.from(String(process.env.AUTH0_CERT), 'base64');

// Express Config
const app = express();
app.use(cors())
app.use(express.json());
app.use(bearerToken());
app.use(bodyParser.json());

// Static File Routes
console.log('Public Directory: ' + process.env.PUBLIC_DIRECTORY)
if (process.env.PUBLIC_DIRECTORY != undefined) {
  app.use(express.static('app/' + process.env.PUBLIC_DIRECTORY))
} else {
  app.use(express.static('ssg/dist'))
}

// GraphQL
var apiSchema = fs.readFileSync('./app/api-schema.json', { encoding: 'utf8', flag: 'r' })
apiSchema = JSON.parse(apiSchema);
if (apiSchema != null && apiSchema.schemas != null && apiSchema.schemas.length > 0) {
  var gqlSchema = ApiSpec.getGraphQLSchemas()
  console.log(gqlSchema)

  const typeDefs = gqlSchema

  //var data = new Resource('analytic_events');
  console.log(ApiSpec.getGraphQLResolvers())
  var generatedResolvers = ApiSpec.getGraphQLResolvers();

  // Resolvers define the technique for fetching the types defined in the
  // schema. This resolver retrieves books from the "books" array above.
  const resolvers = generatedResolvers;
  var ApolloServerInstance = new ApolloServer({ typeDefs, resolvers, introspection: true, playground: true }
  )
  ApolloServerInstance.start();
  ApolloServerInstance.applyMiddleware({ app });
}


// Rest API Schema
app.get('/api', function (req, res) {
  var apiSchema = fs.readFileSync('./app/api-schema.json', { encoding: 'utf8', flag: 'r' })
  apiSchema = JSON.parse(apiSchema)
  var output = {
    apiSchema: apiSchema
  }
  var routes = new Array
  apiSchema.resources.forEach(function (value: string) {
    var output = {
      resource: value,
      endpoints: {
        "schema": String("GET /api/" + value + "/schema"),
        "browse": String("GET /api/" + value + "/browse"),
        "read": String("GET /api/" + value + "/{id}"),
        "add": String("POST /api/" + value),
        "edit": String("POST /api/" + value + "/{id}"),
        "delete": String("DELETE /api/" + value + "/{id}"),
      }
    }
    routes.push(output)
  });
  output.apiSchema.routes = routes
  delete output.apiSchema.resources
  res.json(output)
})

// JWT Testing (Development Only)
if (process.env.ENVIRONMENT == 'development') {
  app.get('/protected',
    jwt({ secret: auth0cert, algorithms: ['RS256'] }),
    function (req, res) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token = req.headers.authorization.split(' ')[1];
        try {
          var jwtUser = JWT.verify(token, auth0cert);
          var result = { result: jwtUser };
          res.json(result);
        }
        catch (err) { res.json(err) }
      }

    });
}

// API Resource - Schema
app.get('/api/:resource/schema', function (req, res) {
  const { resource } = req.params
  var jsonSchema = fs.readFileSync('./temp/json-schema.json', { encoding: 'utf8', flag: 'r' })
  jsonSchema = JSON.parse(jsonSchema)
  var type = resource.charAt(0).toUpperCase() + resource.slice(1)
  type = pluralize.singular(type)
  res.json(jsonSchema.definitions[type])
})

// API Resource - Browse
app.get('/api/:resource/browse', async function (req, res) {
  const { resource } = req.params
  var skip = req.query.skip
  var take = req.query.take
  var options = new Object
  if (skip != null || take != null) {
    options = {
      skip: Number(skip || 0),
      take: Number(take || 10)
    }
  }
  else {
    options = {}
  }
  var model = new Resource(resource)
  try {
    var output = await model.browse(options)
    res.json(output);
  }
  catch (err) { res.json(err) }
})

// API Resource - Read
app.get('/api/:resource/:id', async function (req, res) {
  const { resource } = req.params
  var itemId = Number(req.params.id)
  var optionsParam = req.query.options
  console.log(itemId)

  var options = new Object
  if (optionsParam != null) {
    options = optionsParam
  }
  else {
    options =
    {
      where: {
        id: itemId
      }
    }
  }
  var model = new Resource(resource)
  try {
    var output = await model.read(options)
    res.json(output);
  }
  catch (err) { res.json(err) }
})

// API Resource - Add
app.post('/api/:resource', async function (req, res) {
  const { resource } = req.params
  var data = req.body
  //console.log(typeof data)
  var model = new Resource(resource)

  try {
    var output = await model.add(data)
    res.json(output);
  }
  catch (err) {
    console.log(err)
    res.json(err)
  }
})

// API Resource - Edit
app.post('/api/:resource/:id', async function (req, res) {
  const { resource } = req.params
  var itemId = Number(req.params.id)
  var data = req.body
  console.log(data)
  var model = new Resource(resource)

  try {
    var output = await model.edit(itemId, data)
    res.json(output);
  }
  catch (err) {
    console.log(err)
    res.json(err)
  }
})

// API Resource - Delete
app.delete('/api/:resource/:id', async function (req, res) {
  const { resource } = req.params
  var itemId = Number(req.params.id)
  var model = new Resource(resource)
  try {
    var output = await model.delete(itemId)
    res.json(output);
  }
  catch (err) {
    console.log(err)
    res.json(err)
  }
})

// Start Server
const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => console.log(`🚀 Server ready at: http://localhost:` + PORT,),)