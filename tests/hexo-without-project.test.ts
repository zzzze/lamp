import anyTest, {TestInterface} from 'ava'
import * as proxyquire from 'proxyquire'
import {stub} from 'sinon'

const test = anyTest as TestInterface<{blogPath: string}>

test('#renameFile - should rename', async t => {
  let fsExtra = {
    pathExistsSync: stub()
      .onCall(0).returns(true)
      .onCall(1).returns(true)
      .onCall(2).returns(false)
  }
  let renameFile = proxyquire.noCallThru().load('../src/hexo/renameFile', {
    'fs-extra': fsExtra,
  }).default
  let newName = renameFile('/source/_drafts/post-01.md')
  t.is(newName, '/source/_drafts/post-3.md')
})

test('#renameFile - should not rename', async t => {
  let fsExtra = {
    pathExistsSync: stub().returns(false)
  }
  let renameFile = proxyquire.noCallThru().load('../src/hexo/renameFile', {
    'fs-extra': fsExtra,
  }).default
  let newName = renameFile('/source/_drafts/post-01.md')
  t.is(newName, '/source/_drafts/post-01.md')
})
