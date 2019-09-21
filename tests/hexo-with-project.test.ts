import anyTest, {TestInterface, ExecutionContext} from 'ava'
import * as Hexo from 'hexo'
import * as path from 'path'
import {
  hexoInit,
  getArticleData,
  createArticle,
  updateArticle,
} from '../src/hexo'
import {IArticleData} from '../src/hexo/types'
import * as chaiSubset from 'chai-subset'
import * as chai from 'chai'
import {createBlogProject, createPost} from './utils'
import * as fsEx from 'fs-extra'

chai.use(chaiSubset)
let {expect} = chai

interface IContext {
  blogPath: string
  articleData: IArticleData
}

const test = anyTest as TestInterface<IContext>

function assertArticalData(t: ExecutionContext<IContext>, hexo: Hexo, {postLength = 1, draftLength = 0, partialArticalData = []} = {}) {
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

test('#hexoInit - should be invoked successfully', async t => {
  let hexo = await hexoInit(t.context.blogPath, {
    debug: false,
    draft: true,
    silent: true,
    cache: false,
  })
  expect(hexo.config).to.containSubset({title: 'Hexo'})
})

test('#hexoInit - should cache "hexo"', async t => {
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

test('#hexoInit - should not cache "hexo"', async t => {
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

test('#getArticleData - should be invoked successfully', async t => {
  let hexo = await hexoInit(t.context.blogPath, {
    debug: false,
    draft: true,
    silent: true,
    cache: false,
  })
  assertArticalData(t, hexo)
})

test('#hexoInit with watch', async t => {
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

test('#hexoInit with load', async t => {
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

test('#updateActicle #post - should be invoked successfully', async t => {
  createPost(t.context.blogPath, 'post-02')
  let hexo = await hexoInit(t.context.blogPath, {
    debug: false,
    draft: true,
    silent: true,
    cache: false,
  })

  // modify article
  let articleData = getArticleData(hexo)
  let article = articleData.posts.reduce((result: any, id) => {
    if (articleData.data[id].slug === 'post-02') {
      result = articleData.data[id]
    }
    return result
  }, null)
  article._content += 'Test content.'

  // update
  updateArticle(hexo, article)

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
      _content: '## Lamp\n\nA hexo blog editor.\n\nTest content.',
    },
  ]})
})

test('#updateActicle #draft - should be invoked successfully', async t => {
  createPost(t.context.blogPath, 'post-02', 'draft')
  let hexo = await hexoInit(t.context.blogPath, {
    debug: false,
    draft: true,
    silent: true,
    cache: false,
  })

  // modify article
  let articleData = getArticleData(hexo)
  let article = articleData.data[articleData.drafts[0]]
  let newArticle = {
    ...article,
    full_source: article.full_source.replace('post-02', 'post-04'),
    _content: article._content + 'Test content.' ,
    tags: ['tag-1', 'tag-2'],
  }

  // update
  updateArticle(hexo, newArticle, article)

  hexo = await hexoInit(t.context.blogPath, {
    debug: false,
    draft: true,
    silent: true,
    cache: false,
  })
  assertArticalData(t, hexo, {draftLength: 1, partialArticalData: [
    {
      title: 'Post 02',
      slug: 'post-04',
      _content: '## Lamp\n\nA hexo blog editor.\n\nTest content.',
      tags: ['tag-1', 'tag-2']
    },
  ]})
})
