import anyTest, { TestInterface, ExecutionContext } from 'ava'
import * as Hexo from 'hexo'
import * as path from 'path'
import * as EventEmitter from 'events'
import {
  hexoInit,
  getArticleData,
  createArticle,
  updateArticle,
  withGetArticleData,
  moveArticle,
  publishArticle,
  withdrawArticle,
} from '../../src/hexoApi/'
import withWatcher from '../../src/hexoApi/withWatcher'
import { IArticleData } from '../../src/hexoApi/types'
import * as chaiSubset from 'chai-subset'
import * as chai from 'chai'
import { createBlogProject, createPost } from './utils'
import * as fsEx from 'fs-extra'
import * as sinon from 'sinon'

chai.use(chaiSubset)
let { expect } = chai

interface IContext {
  blogPath: string
  articleData: IArticleData
}

const test = anyTest as TestInterface<IContext>

function assertArticalData(
  t: ExecutionContext<IContext>,
  hexo: Hexo,
  { postLength = 1, draftLength = 0, partialArticalData = [] } = {}
) {
  let articleData = getArticleData(hexo)
  t.context.articleData = articleData
  t.is(articleData.posts.length, postLength)
  t.is(articleData.drafts.length, draftLength)
  expect(Object.keys(articleData.data)).to.containSubset(
    [].concat(articleData.posts, articleData.drafts)
  )
  expect(Object.values(articleData.data)).to.containSubset([
    { title: 'Hello World' },
    ...partialArticalData,
  ])
}

test.beforeEach(t => {
  t.context.blogPath = path.resolve(
    __dirname,
    `./tmp/blog-${Math.random()
      .toString(36)
      .slice(2)}`
  )
  createBlogProject(t.context.blogPath)
})

test.afterEach.always(async t => {
  await new Promise(resolve => setTimeout(resolve, 500))
  fsEx.removeSync(t.context.blogPath)
})

test('#hexoInit - should be invoked successfully', async t => {
  let hexo = await hexoInit(t.context.blogPath)
  expect(hexo.config).to.containSubset({ title: 'Hexo' })
})

test('#hexoInit - should not cache "hexo"', async t => {
  let hexo_1 = await hexoInit(t.context.blogPath)
  let hexo_2 = await hexoInit(t.context.blogPath)
  t.notDeepEqual(hexo_1, hexo_2)
})

test('#getArticleData - should be invoked successfully', async t => {
  let hexo = await hexoInit(t.context.blogPath)
  assertArticalData(t, hexo)
})

test('#withWatcher', async t => {
  class HexoMock extends EventEmitter {}
  let hexoMock = new HexoMock()
  let data = { foo: 'foo' }
  let fn = sinon.stub().returns(data)
  t.true(withWatcher(fn)(hexoMock as any) instanceof Promise)
  process.nextTick(() => {
    hexoMock.emit('generateAfter')
  })
  let result = await withWatcher(fn)(hexoMock as any)
  t.deepEqual(data, result)
})

test('#hexoInit', async t => {
  let hexo = await hexoInit(t.context.blogPath)
  assertArticalData(t, hexo)
  await new Promise(resolve => {
    hexo.once('generateAfter', () => {
      assertArticalData(t, hexo, {
        postLength: 2,
        partialArticalData: [
          {
            title: 'Post 01',
            slug: 'post-01',
            _content: '## Lamp\n\nA hexo blog editor.\n\n',
          },
        ],
      })
      resolve()
    })
    createPost(t.context.blogPath, 'post-01')
  })
})

test('#createNewPost #watch - should be invoked successfully', async t => {
  let hexo = await hexoInit(t.context.blogPath)
  await createArticle(hexo, { slug: 'post-test' })
  assertArticalData(t, hexo, {
    draftLength: 1,
    partialArticalData: [
      {
        title: 'post-test',
        slug: 'post-test',
      },
    ],
  })
})

test('#createNewPost #slug - should be invoked successfully', async t => {
  let hexo = await hexoInit(t.context.blogPath)
  await createArticle(hexo, { slug: 'post-test' })
  assertArticalData(t, hexo, {
    draftLength: 1,
    partialArticalData: [
      {
        title: 'post-test',
        slug: 'post-test',
      },
    ],
  })
})

test('#createNewPost #title - should be invoked successfully', async t => {
  let hexo = await hexoInit(t.context.blogPath)
  await createArticle(hexo, { title: '你好' })
  assertArticalData(t, hexo, {
    draftLength: 1,
    partialArticalData: [
      {
        title: '你好',
        slug: 'e4bda0e5a5bd',
      },
    ],
  })
})

// test('#createNewPost #undefined - should be invoked successfully', async t => {
//   let hexo = await hexoInit(t.context.blogPath)
//   await createArticle(hexo, {})
//   assertArticalData(t, hexo, {
//     draftLength: 1,
//     partialArticalData: [
//       {
//         title: 'undefined',
//         slug: 'undefined',
//       },
//     ],
//   })
// })

test('#createNewPost - should fail', async t => {
  let hexo = await hexoInit(t.context.blogPath)
  createPost(t.context.blogPath, 'post-02', 'draft')
  const result = await createArticle(hexo, { slug: 'post-02' })
  t.is((result as any).message, '40001: 文件已存在')
})

test('#updateActicle #post - should be invoked successfully', async t => {
  createPost(t.context.blogPath, 'post-02')
  let hexo = await hexoInit(t.context.blogPath)

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
  await updateArticle(hexo, article)

  assertArticalData(t, hexo, {
    postLength: 2,
    partialArticalData: [
      {
        title: 'Post 02',
        slug: 'post-02',
        _content: '## Lamp\n\nA hexo blog editor.\n\nTest content.',
      },
    ],
  })
})

test('#updateActicle #draft - should be invoked successfully', async t => {
  createPost(t.context.blogPath, 'post-02', 'draft')
  let hexo = await hexoInit(t.context.blogPath)

  // modify article
  let articleData = getArticleData(hexo)
  let article = articleData.data[articleData.drafts[0]]
  let newArticle = {
    ...article,
    full_source: article.full_source,
    _content: article._content + 'Test content.',
    tags: ['tag-1', 'tag-2'],
  }

  // update
  await updateArticle(hexo, newArticle, article)

  assertArticalData(t, hexo, {
    draftLength: 1,
    partialArticalData: [
      {
        title: 'Post 02',
        slug: 'post-02',
        _content: '## Lamp\n\nA hexo blog editor.\n\nTest content.',
        tags: ['tag-1', 'tag-2'],
      },
    ],
  })
})

test('#moveArticle #post_to_draft - should be invoked successfully', async t => {
  createPost(t.context.blogPath, 'post-01')
  createPost(t.context.blogPath, 'post-02', 'draft')
  let hexo = await hexoInit(t.context.blogPath)

  const fullSource = `${t.context.blogPath}/source/_posts/post-01.md`

  // move
  await moveArticle(
    hexo,
    fullSource.replace('_posts/post-01', '_drafts/post-02'),
    fullSource
  )

  assertArticalData(t, hexo, {
    draftLength: 2,
    partialArticalData: [
      {
        title: 'Post 01',
        slug: 'post-3',
        _content: '## Lamp\n\nA hexo blog editor.\n\n',
      },
      {
        title: 'Post 02',
        slug: 'post-02',
        _content: '## Lamp\n\nA hexo blog editor.\n\n',
      },
    ],
  })
})

test('#publishArticle - should be invoked successfully', async t => {
  createPost(t.context.blogPath, 'post-02', 'draft')
  let hexo = await hexoInit(t.context.blogPath)

  const fullSource = `${t.context.blogPath}/source/_drafts/post-02.md`
  await publishArticle(hexo, fullSource)

  assertArticalData(t, hexo, { postLength: 2 })
})

test('#withdrawArticle - should be invoked successfully', async t => {
  createPost(t.context.blogPath, 'post-02')
  let hexo = await hexoInit(t.context.blogPath)

  const fullSource = `${t.context.blogPath}/source/_posts/post-02.md`
  await withdrawArticle(hexo, fullSource)

  assertArticalData(t, hexo, { draftLength: 1 })
})

test('#withGetArticleData - should be invoked successfully', async t => {
  let hexo = await hexoInit(t.context.blogPath)
  let createArticleEx = withGetArticleData(createArticle)
  const articleData = await createArticleEx(hexo, { title: '你好' })
  t.is(articleData.posts.length, 1)
  t.is(articleData.drafts.length, 1)
  expect(Object.keys(articleData.data)).to.containSubset(
    [].concat(articleData.posts, articleData.drafts)
  )
  expect(Object.values(articleData.data)).to.containSubset([
    { title: 'Hello World' },
    {
      title: '你好',
      slug: 'e4bda0e5a5bd',
    },
  ])
})
