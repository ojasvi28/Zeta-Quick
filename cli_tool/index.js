#! /usr/bin/env node
const { program } = require('commander')
const login = require("./commands/login")
const init = require("./commands/init")
const publish =require("./commands/publish")
const update =require("./commands/update")
program
    .command('login')
    .description('Login to zeta via cli')
    .action(()=>login())

program
    .command('init')
    .description('Create a new project')
    .action(()=>init())

program
    .command('publish')
    .description('publish a new project')
    .action(()=>publish())


program
    .command('update')
    .description('Update existing project')
    .action(()=>update())

program.parse()