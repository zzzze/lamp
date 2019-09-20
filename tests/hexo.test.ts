import anyTest, {TestInterface} from 'ava'
import * as path from 'path'
import {
  hexoInit,
  getArticleData,
  createArticle,
} from '../src/hexo'
import * as chaiSubset from 'chai-subset'
import * as chai from 'chai'
import {createBlogProject, createPost} from './utils'
import * as fsEx from 'fs-extra'

const test = anyTest as TestInterface<{blogPath: string}>

chai.use(chaiSubset)
let {expect} = chai

test.beforeEach(t => {
  t.context.blogPath = path.resolve(__dirname, `./tmp/blog-${Math.random().toString(36).slice(2)}`)
  createBlogProject(t.context.blogPath)
})

test.afterEach(t => {
  fsEx.removeSync(t.context.blogPath)
})

test.serial('hexoInit - should be invoked successfully', async t => {
  let hexo = await hexoInit(t.context.blogPath, {
    debug: false,
    draft: true,
    silent: true,
  })
  expect(hexo.config).to.containSubset({title: 'Hexo'})
})

test.serial('getArticleData - should be invoked successfully', async t => {
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
  createPost(t.context.blogPath, 'post-01')
  await new Promise(resolve => setTimeout(resolve, 300))
  articleData = getArticleData(hexo)
  t.is(articleData.posts.length, 2)
  expect(Object.values(articleData.data)).to.containSubset([
    {title: 'Hello World'},
    {
      title: 'Post 01',
      slug: 'post-01',
      _content: '## Lamp\n\nA hexo blog editor.\n\n',
    },
  ])
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
  createPost(t.context.blogPath, 'post-02')
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
    {
      title: 'Post 02',
      slug: 'post-02',
      _content: '## Lamp\n\nA hexo blog editor.\n\n',
    },
  ])
})

test.serial('#createNewPost - should be invoked successfully', async t => {
  let hexo = await hexoInit(t.context.blogPath, {
    reload: true,
    debug: false,
    draft: true,
    silent: true,
  })
  const result = createArticle(hexo, 'post-test')
  t.is(result, 'success')
  hexo = await hexoInit(t.context.blogPath, {
    reload: true,
    debug: false,
    draft: true,
    silent: true,
  })
  let articleData = getArticleData(hexo)
  t.is(articleData.drafts.length, 1)
  t.is(articleData.posts.length, 1)
  expect(Object.values(articleData.data)).to.containSubset([
    {title: 'Hello World'},
    {
      title: 'post-test',
      slug: 'post-test',
    },
  ])
})
