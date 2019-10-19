import anyTest, {TestInterface} from 'ava'
import {stub} from 'sinon'
import * as proxyquire from 'proxyquire'
import {
  urlSlash,
  makePath,
  normalizePath,
  isSpecialArticle,
  isDraftPath,
  isPostPath,
} from '../../src/utils/path'
import {testInChildProcess} from './utils'
import * as path from 'path'

const test = anyTest as TestInterface<null>

test('test in child process', async t => {
  testInChildProcess(t, path.join(__dirname, 'utils.test.cp.ts'))
})

test('#urlSlash - should be invoked successfully', async t => {
  t.is(urlSlash(), '/')
})

test('#makePath', t => {
  let pathname = '/abc/def/ghi'
  t.is(makePath(pathname), '/abc/def/ghi')
  pathname = '\\\\abc/def/ghi'
  t.is(makePath(pathname), '/abc/def/ghi')
  pathname = '/abc\\\\def/ghi'
  t.is(makePath(pathname), '/abc/def/ghi')
  pathname = '/abc/def\\\\ghi'
  t.is(makePath(pathname), '/abc/def/ghi')
  pathname = '\\\\abc\\\\def\\\\ghi'
  t.is(makePath(pathname), '/abc/def/ghi')
})

test('#normalizePath', t => {
  let pathname = 'abc\\\\def\\\\ghi'
  t.is(normalizePath(pathname), 'abc/def/ghi')
  pathname = 'abc\\\\def/ghi'
  t.is(normalizePath(pathname), 'abc/def/ghi')
  pathname = 'abc/def/ghi'
  t.is(normalizePath(pathname), 'abc/def/ghi')
})

test('#isSpecialArticle', t => {
  let pathname = '/abc/def/ghi/source/_tests/test.md'
  t.true(isSpecialArticle(pathname, 'test'))
  pathname = '/abc/def/ghi/source/_abcs/test.md'
  t.true(isSpecialArticle(pathname, 'abc'))
})

test('#isPostPath', t => {
  let pathname = '/abc/def/ghi/source/_posts/test.md'
  t.true(isPostPath(pathname))
  pathname = '/abc/def/ghi/source/_drafts/test.md'
  t.false(isPostPath(pathname))
})

test('#isDraftPath', t => {
  let pathname = '/abc/def/ghi/source/_posts/test.md'
  t.false(isDraftPath(pathname))
  pathname = '/abc/def/ghi/source/_drafts/test.md'
  t.true(isDraftPath(pathname))
})

test('#renameFile - should rename', async t => {
  let fsExtra = {
    pathExistsSync: stub()
      .onCall(0).returns(true)
      .onCall(1).returns(true)
      .onCall(2).returns(false)
  }
  let renameFile = proxyquire.noCallThru().load('../../src/utils/renameFile', {
    'fs-extra': fsExtra,
  }).default
  let newName = renameFile('/source/_drafts/post-01.md')
  t.is(newName, '/source/_drafts/post-3.md')
})

test('#renameFile - should not rename', async t => {
  let fsExtra = {
    pathExistsSync: stub().returns(false)
  }
  let renameFile = proxyquire.noCallThru().load('../../src/utils/renameFile', {
    'fs-extra': fsExtra,
  }).default
  let newName = renameFile('/source/_drafts/post-01.md')
  t.is(newName, '/source/_drafts/post-01.md')
})
