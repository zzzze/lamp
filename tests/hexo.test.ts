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

chai.use(chaiSubset)
let {expect} = chai

const test = anyTest as TestInterface<{blogPath: string}>

function assertArticalData(t, hexo, {postLength = 1, draftLength = 0, partialArticalData = []} = {}) {
  let articleData = getArticleData(hexo)
  t.context.articleData = articleData
  t.is(articleData.posts.length, postLength)
  t.is(articleData.drafts.length, draftLength)
  expect(Object.keys(articleData.data)).to.containSubset([].concat(articleData.posts, articleData.drafts))
  expect(Object.values(articleData.data)).to.containSubset([
    {title: 'Hello World'},
    ...partialArticalData,
  ])
}

test.beforeEach(t => {
  t.context.blogPath = path.resolve(__dirname, `./tmp/blog-${Math.random().toString(36).slice(2)}`)
  createBlogProject(t.context.blogPath)
})

test.afterEach.always(t => {
  fsEx.removeSync(t.context.blogPath)
})

test('hexoInit - should be invoked successfully', async t => {
  let hexo = await hexoInit(t.context.blogPath, {
    debug: false,
    draft: true,
    silent: true,
    cache: false,
  })
  expect(hexo.config).to.containSubset({title: 'Hexo'})
})

test('hexoInit - should cache "hexo"', async t => {
  let hexo_1 = await hexoInit(t.context.blogPath, {
    debug: false,
    draft: true,
    silent: true,
  })
  let hexo_2 = await hexoInit(t.context.blogPath, {
    debug: false,
    draft: true,
    silent: true,
  })
  t.deepEqual(hexo_1, hexo_2)
})

test('hexoInit - should not cache "hexo"', async t => {
  let hexo_1 = await hexoInit(t.context.blogPath, {
    debug: false,
    draft: true,
    silent: true,
    cache: false,
  })
  let hexo_2 = await hexoInit(t.context.blogPath, {
    debug: false,
    draft: true,
    silent: true,
    cache: false,
  })
  t.notDeepEqual(hexo_1, hexo_2)
})

test('getArticleData - should be invoked successfully', async t => {
  let hexo = await hexoInit(t.context.blogPath, {
    debug: false,
    draft: true,
    silent: true,
    cache: false,
  })
  assertArticalData(t, hexo)
})

test('hexoInit with watch', async t => {
  let hexo = await hexoInit(t.context.blogPath, {
    debug: false,
    draft: true,
    silent: true,
    cache: false,
  }, true)
  assertArticalData(t, hexo)
  createPost(t.context.blogPath, 'post-01')
  await new Promise(resolve => setTimeout(resolve, 300))
  assertArticalData(t, hexo, {postLength: 2, partialArticalData: [
    {
      title: 'Post 01',
      slug: 'post-01',
      _content: '## Lamp\n\nA hexo blog editor.\n\n',
    },
  ]})
})

test('hexoInit with load', async t => {
  let hexo = await hexoInit(t.context.blogPath, {
    debug: false,
    draft: true,
    silent: true,
    cache: false,
  })
  assertArticalData(t, hexo)
  createPost(t.context.blogPath, 'post-02')
  hexo = await hexoInit(t.context.blogPath, {
    debug: false,
    draft: true,
    silent: true,
    cache: false,
  })
  assertArticalData(t, hexo, {postLength: 2, partialArticalData: [
    {
      title: 'Post 02',
      slug: 'post-02',
      _content: '## Lamp\n\nA hexo blog editor.\n\n',
    },
  ]})
})

test('#createNewPost - should be invoked successfully', async t => {
  let hexo = await hexoInit(t.context.blogPath, {
    debug: false,
    draft: true,
    silent: true,
    cache: false,
  })
  const result = createArticle(hexo, 'post-test')
  t.is(result, 'success')
  hexo = await hexoInit(t.context.blogPath, {
    debug: false,
    draft: true,
    silent: true,
    cache: false,
  })
  assertArticalData(t, hexo, {draftLength: 1, partialArticalData: [
    {
      title: 'post-test',
      slug: 'post-test',
    },
  ]})
})
