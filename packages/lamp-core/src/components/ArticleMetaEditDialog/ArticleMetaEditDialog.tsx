import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useDispatch } from 'react-redux'
import { CREATE_ARTICLE, UPDATE_ARTICLE } from 'redux/types/hexo.type'
import TagInput from 'components/TagInput'

interface ArticleCreationDialogProps {
  open: boolean
  handleToggle: (open: boolean) => void
  edit?: boolean
  title?: string
  slug?: string
  tags?: string[]
}

const ArticleMetaEditDialog: React.FC<ArticleCreationDialogProps> = ({
  open,
  handleToggle,
  edit = false,
  title = '',
  slug = '',
  tags = [],
}) => {
  const [_title, setTitle] = React.useState(title)
  const [_slug, setSlug] = React.useState(slug)
  const [_tags, setTags] = React.useState(tags)
  const [titleError, setTitleError] = React.useState(false)
  const [slugError, setSlugError] = React.useState(false)
  const dispatch = useDispatch()

  React.useEffect(() => {
    setTitle(title)
  }, [title, open])

  React.useEffect(() => {
    setSlug(slug)
  }, [slug, open])

  React.useEffect(() => {
    setTags(tags)
  }, [Array.isArray(tags) ? tags.join(',') : '', open])

  const handleClose = () => {
    setTitle('')
    setSlug('')
    setTags([])
    setTitleError(false)
    setSlugError(false)
    handleToggle(false)
  }
  const validateTitle = () => {
    setTitleError(!_title)
    return !!_title
  }
  const validateSlug = () => {
    const invalidSlug = !/^[\w-]{0,20}$/.test(_slug)
    setSlugError(invalidSlug)
    return !invalidSlug
  }
  const handleSubmit = () => {
    if (!edit) {
      return handleCreate()
    }
    return handleUpdate()
  }
  const handleCreate = () => {
    if (validateTitle() && validateSlug()) {
      dispatch({ type: CREATE_ARTICLE, payload: { title: _title, slug: _slug } })
      handleClose()
    }
  }
  const handleUpdate = () => {
    if (validateTitle() && validateSlug()) {
      dispatch({ type: UPDATE_ARTICLE, payload: { title: _title, slug: _slug, tags: _tags } })
      handleClose()
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }
  const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(event.target.value)
  }

  const handleTagsChange = (tags: string[]) => {
    setTags(tags)
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{edit ? '编辑文章元信息' : '创建文章'}</DialogTitle>
      <DialogContent>
        {!edit && <DialogContentText>请填写文章的标题，例如“我的第一篇文章”。</DialogContentText>}
        <TextField
          required
          error={titleError}
          autoFocus
          inputProps={{
            onFocus: () => setTitleError(false),
            onBlur: () => setTimeout(validateTitle, 300),
          }}
          margin="dense"
          id="title"
          value={_title}
          label="标题"
          type="text"
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          error={slugError}
          margin="dense"
          helperText='20 个字符，仅支持字符、数组以及符号 "-"、"_"'
          id="slut"
          inputProps={{
            onFocus: () => setSlugError(false),
            onBlur: () => setTimeout(validateSlug, 300),
          }}
          value={_slug}
          label="别名"
          type="text"
          onChange={handleSlugChange}
          variant="outlined"
          fullWidth
        />
        {edit && <TagInput value={_tags} onChange={handleTagsChange} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          取消
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {edit ? '保存' : '创建'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ArticleMetaEditDialog
