// Imports
import { json } from 'body-parser';
import express from 'express';

// Vars
require('dotenv').config();
var jwtMiddleware = require('express-jwt');
var JWT = require('jsonwebtoken');
var cors = require('cors')
var fs = require('fs');
var path = require('path');
const bearerToken = require('express-bearer-token');
const bodyParser = require('body-parser');
const lambdaLocal = require("lambda-local");

// Auth Config
var authCert = Buffer.from(String(process.env.AUTH0_CERT), 'base64');

// Express Config
const app = express();
app.use(cors())
app.use(express.json());
app.use(bearerToken());
app.use(bodyParser.json());

// Static File Routes
console.log('Public Directory: app/' + process.env.PUBLIC_DIRECTORY)
if (process.env.PUBLIC_DIRECTORY != undefined) {
  app.use(express.static('app/' + process.env.PUBLIC_DIRECTORY))
} else {
  app.use(express.static('ssg/dist'))
}

// Serverless Functions
app.get('/api/:function', function (req, res) {
  var fn = req.params.function;
  //res.send(fn);
  var result = { body: null };
  lambdaLocal.execute({
    event: { queryStringParameters: req.query },
    lambdaPath: path.join(__dirname, '../app/functions/' + fn + '/' + fn + '.js'),
    profileName: 'default',
    timeoutMs: 3000,
    callback: function (err: any, data: any) {
      if (err) {
        console.log('Error: \n');
        console.log(err);
        var output = {
          "status" : 500,
          "error": "Something went wrong."
        };
        res.json(output);
      } else {
        console.log('Function Result: \n');
        console.log(data);
        result = data;
        var processed = '';
        var isJson = null;
        try { processed = data.body; processed = JSON.parse(processed); if (processed != null) { isJson = true; } } catch (err) { }
        if (isJson) {
          console.log("JSON Response.");        
          res.json(processed);
        }
        else {
          res.send(processed);
        }
      }
    }
  });

})

app.post('/api/:function', function (req, res) {
  var fn = req.params.function;
  //res.send(fn);
  var result = { body: null };
  lambdaLocal.execute({
    event: { queryStringParameters: req.query },
    lambdaPath: path.join(__dirname, '../app/functions/' + fn + '/' + fn + '.js'),
    profileName: 'default',
    timeoutMs: 3000,
    callback: function (err: any, data: any) {
      if (err) {
        console.log('Error: \n');
        console.log(err);
        var output = {
          "status" : 500,
          "error": "Something went wrong."
        };
        res.json(output);
      } else {
        console.log('Function Result: \n');
        console.log(data);
        result = data;
        var processed = '';
        var isJson = null;
        try { processed = data.body; processed = JSON.parse(processed); if (processed != null) { isJson = true; } } catch (err) { }
        if (isJson) {
          console.log("JSON Response.");        
          res.json(processed);
        }
        else {
          res.send(processed);
        }
      }
    }
  });

})

// Start Server
const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => console.log(`🚀 Server ready at: http://localhost:` + PORT,),)