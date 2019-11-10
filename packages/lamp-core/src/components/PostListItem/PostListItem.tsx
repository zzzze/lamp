import * as React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import EditAttributesIcon from '@material-ui/icons/EditAttributes'
import PublishIcon from '@material-ui/icons/Publish'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { IArticle } from 'hexoApi/types'
import { ARTICLE_TYPE } from 'utils/constants'
import { useDispatch } from 'react-redux'
import { PUBLISH_ARTICLE_REQUEST, WITHDRAW_ARTICLE } from 'redux/types/hexo.type'

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    container: {
      width: 200,
      '& .action-custom': {
        right: 0,
      },
      '&:hover .action-custom': {
        display: 'block',
        color: 'red',
      },
      '& .MuiListItem-secondaryAction': {
        paddingRight: '16px',
      },
      '&:hover .MuiListItem-secondaryAction': {
        paddingRight: '48px',
      },
    },
  })
)

const useActionStyles = makeStyles((_theme: Theme) =>
  createStyles({
    action: {
      display: 'none',
    },

    text: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  })
)

interface PostListItemProps {
  data: IArticle
  selectedId: string | null
  onSelectPost: (article: IArticle) => void
  selectedPostType: ARTICLE_TYPE
  onOpenEditMetaDialog: (title: string, slug: string, tags: string[]) => void
}

const PostListItem: React.FC<PostListItemProps> = ({
  data,
  onSelectPost,
  selectedId,
  selectedPostType,
  onOpenEditMetaDialog,
}) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const actionClasses = useActionStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handlePublish = () => {
    dispatch({ type: PUBLISH_ARTICLE_REQUEST, payload: data.full_source })
  }
  const handleWithdraw = () => {
    dispatch({ type: WITHDRAW_ARTICLE, payload: data.full_source })
  }
  const handleEditMeta = () => {
    onOpenEditMetaDialog(data.title, data.slug, (data as any).tags)
  }

  const renderEditMenuItem = () => (
    <MenuItem key="edit-meta" onClick={handleEditMeta}>
      <ListItemIcon>
        <EditAttributesIcon fontSize="small" />
      </ListItemIcon>
      <Typography variant="inherit">编辑元信息</Typography>
    </MenuItem>
  )

  return (
    <Tooltip title={data.title}>
      <ListItem classes={classes} selected={selectedId === data._id} divider onClick={() => onSelectPost(data)}>
        <ListItemText className={actionClasses.text} primary={data.title} />
        <ListItemSecondaryAction className={actionClasses.action + ' action-custom'}>
          <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: 200,
              },
            }}
          >
            {selectedPostType === ARTICLE_TYPE.POST && [
              renderEditMenuItem(),
              <MenuItem key="withdraw" onClick={handleWithdraw}>
                <ListItemIcon>
                  <RemoveCircleOutlineIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">撤回</Typography>
              </MenuItem>,
            ]}
            {selectedPostType === ARTICLE_TYPE.DRAFT && [
              <MenuItem key="publish" onClick={handlePublish}>
                <ListItemIcon>
                  <PublishIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">发布</Typography>
              </MenuItem>,
              renderEditMenuItem(),
              <MenuItem key="delete">
                <ListItemIcon>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">删除</Typography>
              </MenuItem>,
            ]}
          </Menu>
        </ListItemSecondaryAction>
      </ListItem>
    </Tooltip>
  )
}

export default PostListItem
