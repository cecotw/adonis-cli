'use strict'

/**
 * adonis-cli
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const gift = require('gift')
const npm = require('npm')
const remove = require('remove')
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

  },

  removeGit: function (projectPath,cb){
    remove(path.join(projectPath,'.git'),cb)
  }

}
