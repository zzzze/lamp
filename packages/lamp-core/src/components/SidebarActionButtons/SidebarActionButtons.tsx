import * as React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import AddIcon from '@material-ui/icons/Add'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import RefreshIcon from '@material-ui/icons/Refresh'
import ArticleCreationDialog from 'components/ArticleCreationDialog'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    more: {
      width: 'auto',
    },
  })
)

export default function SplitButton() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [openCreationDialog, setOpenCreationDialog] = React.useState(false)
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  const handleAddItemClick = () => {
    handleToggleCreationDialog(true)
    // alert(`You clicked`)
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  const handleToggleCreationDialog = (open: boolean) => {
    setOpenCreationDialog(open)
  }

  const handleRefresh = () => {
    dispatch({ type: 'FETCH_REQUESTED', payload: { refresh: true } })
  }

  return (
    <>
      <ButtonGroup variant="contained" color="primary" fullWidth ref={anchorRef} aria-label="split button">
        <Button onClick={handleAddItemClick}>
          <AddIcon /> 新建
        </Button>
        <Button
          className={classes.more}
          color="primary"
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-end" transition style={{ zIndex: 100 }}>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  <MenuItem onClick={handleRefresh}>
                    <RefreshIcon /> 刷新
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <ArticleCreationDialog open={openCreationDialog} handleToggle={handleToggleCreationDialog} />
    </>
  )
}
