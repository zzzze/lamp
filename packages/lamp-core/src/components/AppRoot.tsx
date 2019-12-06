import * as React from 'react'
import appService from 'services/app.service'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles'
import Tabbar from 'components/Tabbar'
import Sidebar from 'components/Sidebar'
import { IArticle } from 'hexoApi/types'
import { ARTICLE_TYPE } from 'utils/constants'
import { UPDATE_ARTICLE } from 'redux/types/hexo.type'
import { useSelector, useDispatch } from 'react-redux'
import { SWITCH_ACTIVE_TABBAR_REQUEST } from 'redux/types/app.type'
// import logo from 'assets/test'
// import * as logo from 'assets/logo-01.png'
// const logo = require('assets/logo-01.png')

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(0),
      height: '100vh',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
    },
    mainContainer: {
      flex: 1,
      width: '100%',
      overflow: 'hidden',
    },
    content: {
      flex: 1,
      position: 'relative',
    },
    logo: {
      width: 300,
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      filter: 'grayscale(1)',
      mixBlendMode: 'multiply',
    },
  })
)

const AppRoot: React.FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const Editor = appService.getEditor()
  const [selectedPost, setSelectedPost] = React.useState<Partial<IArticle>>({})
  const theme = useTheme()
  const articleData = useSelector((state: any) => ({
    posts: state.hexo.posts,
    drafts: state.hexo.drafts,
    data: state.hexo.data,
  }))
  const state = useSelector((state: any) => ({
    activeTabbarKey: state.app.activeTabbarKey,
  }))
  const handleSelectedPostTypeChange = (postType: ARTICLE_TYPE) => {
    dispatch({ type: SWITCH_ACTIVE_TABBAR_REQUEST, payload: postType })
  }
  const handleSelectPost = (article: IArticle) => {
    setSelectedPost(article)
  }
  const post = articleData.data[selectedPost._id || '']
  if (!post) {
    const postIds = state.activeTabbarKey === ARTICLE_TYPE.POST ? articleData.posts : articleData.drafts
    postIds.forEach((id: string) => {
      if (articleData.data[id].slug === selectedPost.slug) {
        setSelectedPost(articleData.data[id])
      }
    })
  }

  const handleSave = (content: string) => {
    const postData = {
      ...selectedPost,
      _content: content,
    }
    dispatch({ type: UPDATE_ARTICLE, payload: postData })
  }

  return (
    <Grid container direction="column" spacing={0} className={classes.container}>
      <Tabbar />
      <Grid item container justify="center" spacing={0} className={classes.mainContainer}>
        <Sidebar
          selectedId={selectedPost._id || null}
          onSelectPost={handleSelectPost}
          selectedPostType={state.activeTabbarKey}
          onSelectedPostTypeChange={handleSelectedPostTypeChange}
        />
        <Grid item className={classes.content}>
          {post ? (
            <Editor value={(post && post._content) || ''} onSave={handleSave} theme={theme.palette.type} />
          ) : (
            <img className={classes.logo} src="../assets/logo-01.png" />
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}
export default AppRoot
