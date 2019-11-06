import * as React from 'react'
import List from '@material-ui/core/List'
import PostListItem from 'components/PostListItem'

interface PostListProps {
  articleData: {
    postIds: string[]
    data: any
  }
}

const PostList: React.FC<PostListProps> = ({ articleData }) => {
  return (
    <List component="nav" aria-label="secondary mailbox folders">
      {articleData.postIds.map((postId: string, index: number) => (
        <PostListItem key={index} data={articleData.data[postId]} />
      ))}
    </List>
  )
}

export default PostList
