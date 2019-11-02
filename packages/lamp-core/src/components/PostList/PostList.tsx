import * as React from 'react'
import List from '@material-ui/core/List'
import PostListItem from 'components/PostListItem'


const PostList: React.FC = () => {
  return (
    <List component="nav" aria-label="secondary mailbox folders">
      <PostListItem />
    </List>
  )
}

export default PostList
