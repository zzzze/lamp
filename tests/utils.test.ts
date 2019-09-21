import anyTest, {TestInterface} from 'ava'
import {
  urlSlash,
  makePath,
  normalizePath,
  isSpecialArticle,
  isDraftPath,
  isPostPath,
} from '../src/utils/path'
import {testInChildProcess} from './utils'

const test = anyTest as TestInterface<null>

test('test in child process', async t => {
  testInChildProcess(t, 'tests/utils.test.cp.ts')
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
