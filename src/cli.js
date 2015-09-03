'use strict'

const gift = require('gift')
const npm = require('npm')
const path = require('path')
const repo = 'https://github.com/adonisjs/adonis-app.git'

module.exports = {

  clone: function (toPath,cb) {
    gift.clone(repo, toPath, cb)
  },

  npminstall: function (projectPath,cb) {
    const packageFile = require(path.join(projectPath,'./package.json'))
    const packages = Object.keys(packageFile.dependencies)

    npm.load({loglevel:'silent'}, function (err){
      if(err) return cb(err);
      npm.commands.install(projectPath,packages,cb)
    })

  }

}
