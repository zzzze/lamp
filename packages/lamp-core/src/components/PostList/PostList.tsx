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
  const [selectedTitle, setSelectedTitle] = React.useState('')
  const [selectedSlug, setSelectedSlug] = React.useState('')
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])
  const handleToggleDialog = (open: boolean) => {
    setOpenDialog(open)
  }
  const handleOpenEditMetaDialog = (title: string, slug: string, tags: string[]) => {
    setSelectedTitle(title)
    setSelectedSlug(slug)
    setSelectedTags(tags)
    setOpenDialog(true)
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
        title={selectedTitle}
        slug={selectedSlug}
        open={openDialog}
        tags={selectedTags}
        handleToggle={handleToggleDialog}
      />
    </List>
  )
}

export default PostList
