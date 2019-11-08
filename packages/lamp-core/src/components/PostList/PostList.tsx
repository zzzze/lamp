import * as React from 'react'
import List from '@material-ui/core/List'
import PostListItem from 'components/PostListItem'
import { IArticle } from 'hexoApi/types'
import { ARTICLE_TYPE } from 'utils/constants'

interface PostListProps {
  articleData: {
    postIds: string[]
    data: IArticle[]
  }
  selectedId: string | null
  onSelectPost: (article: IArticle) => void
  selectedPostType: ARTICLE_TYPE
}

const PostList: React.FC<PostListProps> = ({
  articleData,
  onSelectPost,
  selectedId,
  selectedPostType,
}) => {
  return (
    <List component="nav" aria-label="secondary mailbox folders">
      {articleData.postIds.map((postId: string, index: number) => (
        <PostListItem
          key={index}
          selectedPostType={selectedPostType}
          selectedId={selectedId}
          onSelectPost={onSelectPost}
          data={articleData.data[postId]}
        />
      ))}
    </List>
  )
}

export default PostList
