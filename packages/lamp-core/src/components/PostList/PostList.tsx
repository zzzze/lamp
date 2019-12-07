import * as React from 'react'
import List from '@material-ui/core/List'
import PostListItem from 'components/PostListItem'
import { IArticle } from 'hexoApi/types'
import { ARTICLE_TYPE } from 'utils/constants'
import ArticleMetaEditDialog from 'components/ArticleMetaEditDialog'

interface PostListProps {
  articleData: {
    postIds: string[]
    data: IArticle[]
  }
  selectedId: string | null
  onSelectPost: (article: IArticle) => void
  selectedPostType: ARTICLE_TYPE
}

const PostList: React.FC<PostListProps> = ({ articleData, onSelectPost, selectedId, selectedPostType }) => {
  const [openDialog, setOpenDialog] = React.useState(false)
  const [selectedArticleData, setSelectedArticleData] = React.useState<{}>({})
  const handleToggleDialog = (open: boolean) => {
    setOpenDialog(open)
  }
  const handleOpenEditMetaDialog = (data?: { title: string; slug: string; tags: string[]; _content: string }) => {
    setOpenDialog(true)
    setSelectedArticleData(data || {})
  }
  return (
    <List component="nav" aria-label="secondary mailbox folders">
      {articleData.postIds.map((postId: string, index: number) => (
        <PostListItem
          key={index}
          selectedPostType={selectedPostType}
          selectedId={selectedId}
          onSelectPost={onSelectPost}
          data={articleData.data[postId]}
          onOpenEditMetaDialog={handleOpenEditMetaDialog}
        />
      ))}
      <ArticleMetaEditDialog
        edit
        data={selectedArticleData}
        key={(selectedArticleData as any).slug}
        open={openDialog}
        handleToggle={handleToggleDialog}
      />
    </List>
  )
}

export default PostList
