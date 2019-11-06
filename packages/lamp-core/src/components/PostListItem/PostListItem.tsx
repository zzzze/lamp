import * as React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    container: {
      width: 200,
      '&:hover .action-custom': {
        display: 'block',
        color: 'red',
      },
    },
  })
)

const useActionStyles = makeStyles((_theme: Theme) =>
  createStyles({
    action: {
      display: 'none',
    },
  })
)

interface PostListItemProps {
  data: any
}

const PostListItem: React.FC<PostListItemProps> = ({ data }) => {
  const classes = useStyles()
  const actionClasses = useActionStyles()
  return (
    <ListItem classes={classes}>
      <ListItemText primary={data.title} />
      <ListItemSecondaryAction
        className={actionClasses.action + ' action-custom'}
      >
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default PostListItem
