import * as React from 'react'
import appService from 'services/app.service'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Tabbar from 'components/Tabbar'
import Sidebar from 'components/Sidebar'
import { IArticle } from 'hexoApi/types'
import { ARTICLE_TYPE } from 'utils/constants'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(0),
      height: '100vh',
    },
    mainContainer: {
      flex: 1,
      width: '100%',
      overflow: 'hidden',
    },
    content: {
      flex: 1,
    },
  })
)

const AppRoot: React.FC = () => {
  const classes = useStyles()
  const Editor = appService.getEditor()
  const [selectedPost, setSelectedPost] = React.useState<Partial<IArticle>>({})
  const [selectedPostType, setSelectedPostType] = React.useState<ARTICLE_TYPE>(ARTICLE_TYPE.POST)
  const articleData = useSelector((state: any) => ({
    posts: state.hexo.posts,
    drafts: state.hexo.drafts,
    data: state.hexo.data,
  }))
  const handleSelectedPostTypeChange = (postType: ARTICLE_TYPE) => {
    setSelectedPostType(postType)
  }
  const handleSelectPost = (article: IArticle) => {
    setSelectedPost(article)
  }
  const post = articleData.data[selectedPost._id || '']
  if (!post) {
    const postIds = selectedPostType === ARTICLE_TYPE.POST ? articleData.posts : articleData.drafts
    postIds.forEach((id: string) => {
      if (articleData.data[id].slug === selectedPost.slug) {
        setSelectedPost(articleData.data[id])
      }
    })
  }
  return (
    <div>
      <Grid container direction="column" spacing={0} className={classes.container}>
        <Tabbar />
        <Grid item container justify="center" spacing={0} className={classes.mainContainer}>
          <Sidebar
            selectedId={selectedPost._id || null}
            onSelectPost={handleSelectPost}
            selectedPostType={selectedPostType}
            onSelectedPostTypeChange={handleSelectedPostTypeChange}
          />
          <Grid item className={classes.content}>
            <Editor value={(post && post._content) || ''} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
export default AppRoot
