
require('dotenv-flow').config()
const Git = require("nodegit")
const token = process.env.GITHUB_TOKEN;
const fs = require("fs");
const fse = require("fs-extra");

var path = "app";
var repo = process.env.GITHUB_REPOSITORY;

    if(!repo.includes('://')) {
      repo = 'https://github.com/' + repo;
    }
    console.log(repo)

    if(token != null && typeof token != 'undefined'){
      console.log('get private repo...');
      
      var opts = {
        fetchOpts: {
          callbacks: {
            credentials: function() {
              return Git.Cred.userpassPlaintextNew(token, "x-oauth-basic");
            },
            certificateCheck: function() {
              return 1;
            }
          }
        }
      };
      
      fse.remove(path).then(function() {
        Git.Clone(repo, path, opts).catch()
          .then(function(repo) {
            if (repo instanceof Git.Repository) {
              console.info("We cloned the repo!");
            }
            else {
              console.error("Something borked :(");
            }
          });
      });
    } else {
      Git.Clone(repo, path + "/").catch().then(function(repository) {
        // Work with the repository object here.
        //console.log(repository)
      })
    }
