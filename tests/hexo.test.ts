import anyTest, {TestInterface} from 'ava'
import * as path from 'path'
import {hexoInit, getArticleData} from '../src/hexo'
import * as chaiSubset from 'chai-subset'
import * as chai from 'chai'
import * as fs from 'fs'
import createBlogProject from './createBlogProject'
import * as fsEx from 'fs-extra'

const test = anyTest as TestInterface<{blogPath: string}>

chai.use(chaiSubset)
let {expect} = chai

test.before(t => {
  t.context.blogPath = path.resolve(__dirname, './tmp/blog')
  createBlogProject(t.context.blogPath)
})

test.serial('hexoInit', async t => {
  let hexo = await hexoInit(t.context.blogPath, {
    debug: false,
    draft: true,
    silent: true,
  })
  expect(hexo.config).to.containSubset({title: 'Hexo'})
})

test.serial('getArticleData', async t => {
  let hexo = await hexoInit(t.context.blogPath, {
    reload: true,
    debug: false,
    draft: true,
    silent: true,
  })
  const articleData = getArticleData(hexo)
  t.is(articleData.posts.length, 1)
  expect(Object.values(articleData.data)).to.containSubset([
    {title: 'Hello World'},
  ])
})

test.serial('hexoInit with watch', async t => {
  let hexo = await hexoInit(t.context.blogPath, {
    reload: true,
    debug: false,
    draft: true,
    silent: true,
  }, true)
  let articleData = getArticleData(hexo)
  t.is(articleData.posts.length, 1)
  expect(articleData.data[articleData.posts[0]]).to.containSubset({title: 'Hello World'})
  let file = fs.createWriteStream(path.resolve(t.context.blogPath, './source/_posts/test.md'))
  file.write('---\ntitle: Test\n---\n')
  file.end()
  await new Promise(resolve => setTimeout(resolve, 300))
  articleData = getArticleData(hexo)
  t.is(articleData.posts.length, 2)
  expect(Object.values(articleData.data)).to.containSubset([
    {title: 'Hello World'},
    {title: 'Test'},
  ])
  fsEx.removeSync(path.resolve(t.context.blogPath, './source/_posts/test.md'))
})

test.serial('hexoInit with load', async t => {
  let hexo = await hexoInit(t.context.blogPath, {
    reload: true,
    debug: false,
    draft: true,
    silent: true,
  })
  let articleData = getArticleData(hexo)
  t.is(articleData.posts.length, 1)
  expect(articleData.data[articleData.posts[0]]).to.containSubset({title: 'Hello World'})
  let file = fs.createWriteStream(path.resolve(t.context.blogPath, './source/_posts/test_02.md'))
  file.write('---\ntitle: Test 02\n---\n')
  file.end()
  hexo = await hexoInit(t.context.blogPath, {
    reload: true,
    debug: false,
    draft: true,
    silent: true,
  })
  articleData = getArticleData(hexo)
  t.is(articleData.posts.length, 2)
  expect(Object.values(articleData.data)).to.containSubset([
    {title: 'Hello World'},
    {title: 'Test 02'},
  ])
  fsEx.removeSync(path.resolve(t.context.blogPath, './source/_posts/test_02.md'))
})
