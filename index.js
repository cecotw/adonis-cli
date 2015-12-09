#!/usr/bin/env node
'use strict'

const cli = require('./src/cli')
const minimist = require('minimist')
const Lineup = require('lineup')
const path = require('path')
const argv = minimist(process.argv.slice(2))
const command = argv._
const lineup = new Lineup()

if(!command || !command[0] || command[0] !== 'new'){
  return lineup.log.warn('Only one command named new is supported by this tiny life.')
}

if(!command[1]){
  return lineup.log.warn('Specify project name')
}

const projectPath = '"' + path.join(process.cwd(),command[1]) + '"';

lineup.progress.start('setting up project files ....')

cli.clone(projectPath, function (err,repo) {

  lineup.progress.stop()

  if(err){
    lineup.log.error(err.message)
    return
  }

  lineup.progress.start('installing project dependencies ....')
  cli.npminstall(projectPath, function (err,response) {
    lineup.progress.stop()
    if(err){
      return lineup.log.error(err)
    }
    else{

      cli.removeGit(projectPath, function (err) {

        if(err){
          return lineup.log.error(err)
        }

        lineup.sticker.note("Installed successfully , run below commands");
        lineup.sticker.note(`cd ${command[1]}`);
        lineup.sticker.note(`node ace server:start`);
        lineup.sticker.show({align:'left'})


      })
    }
  })

})
