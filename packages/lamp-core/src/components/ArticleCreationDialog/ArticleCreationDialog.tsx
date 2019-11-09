import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useDispatch } from 'react-redux'
import { CREATE_ARTICLE } from 'redux/types/hexo.type'

interface ArticleCreationDialogProps {
  open: boolean
  handleToggle: (open: boolean) => void
}

const ArticleCreationDialog: React.FC<ArticleCreationDialogProps> = ({ open, handleToggle }) => {
  const [title, setTitle] = React.useState('')
  const [errorMsg, setErrorMsg] = React.useState('')
  const dispatch = useDispatch()
  const handleClose = () => {
    setTitle('')
    setErrorMsg('')
    handleToggle(false)
  }
  const validateInput = () => {
    if (!title) {
      setErrorMsg('请填写标题')
      return false
    }
    return true
  }
  const handleCreate = () => {
    if (validateInput()) {
      dispatch({ type: CREATE_ARTICLE, payload: { title } })
      handleClose()
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">创建文章</DialogTitle>
      <DialogContent>
        <DialogContentText>请填写文章的标题，例如“我的第一篇文章”。</DialogContentText>
        <TextField
          required
          error={!!errorMsg}
          helperText={errorMsg}
          autoFocus
          inputProps={{
            onFocus: () => setErrorMsg(''),
            onBlur: () => setTimeout(validateInput, 300),
          }}
          margin="dense"
          id="title"
          value={title}
          label="标题"
          type="text"
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          取消
        </Button>
        <Button onClick={handleCreate} color="primary">
          创建
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ArticleCreationDialog
