#!/usr/bin/env node

const builder = require('electron-builder').build
const vars = require('./vars')

const isTag = (process.env.GITHUB_REF || '').startsWith('refs/tags/')
const isCI = !!process.env.GITHUB_REF

builder({
  dir: true,
  mac: ['pkg', 'zip'],
  config: {
    extraMetadata: {
      name: 'Lamp',
      main: './dist/main.js',
      version: vars.version,
    },
  },
  publish: isTag ? 'always' : 'onTag',
}).catch(err => {
  console.log(err)
  process.exit(1)
})
