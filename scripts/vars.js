const path = require('path')
const fs = require('fs')
const semver = require('semver')
const childProcess = require('child_process')

const appInfo = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../packages/app/package.json')))
const electronInfo = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../node_modules/electron/package.json')))

// exports.version = childProcess.execSync('git describe --tags', {encoding:'utf-8'})
// exports.version = exports.version.substring(1).trim()
// exports.version = exports.version.replace('-', '-c')
//
// if (exports.version.includes('-c')) {
//   exports.version = semver.inc(exports.version, 'prepatch').replace('-0', '-nightly.0')
// }

exports.builtinPlugins = [
  'lamp-core',
  'lamp-settings',
]
exports.bundledModules = [
  // '@angular',
  // '@ng-bootstrap',
]
exports.electronVersion = electronInfo.version
