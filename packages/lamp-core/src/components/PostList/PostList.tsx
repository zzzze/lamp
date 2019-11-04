import * as React from 'react'
import List from '@material-ui/core/List'
import PostListItem from 'components/PostListItem'
import { useSelector, useDispatch } from 'react-redux'

const PostList: React.FC = () => {
  const posts = useSelector((state: any) => state.hexo.posts)
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch({ type: 'FETCH_REQUESTED' })
  }, [])
  console.log('posts', posts)
  return (
    <List component="nav" aria-label="secondary mailbox folders">
      <PostListItem />
    </List>
  )
}

export default PostList
