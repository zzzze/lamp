import * as React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: 200,
      '&:hover $action': {
        display: 'block',
        color: 'red',
      },
    },
    action: {
      display: 'none',
    },
  })
)

const PostList: React.FC = () => {
  const classes = useStyles()

  return (
    <ListItem classes={classes}>
      <ListItemText primary="Single-line item" />
      <ListItemSecondaryAction className={classes.action}>
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

export default PostList
