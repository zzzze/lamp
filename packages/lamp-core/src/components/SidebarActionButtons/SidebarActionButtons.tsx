import React from 'react'
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
import ArticleMetaEditDialog from 'components/ArticleMetaEditDialog'
import hexoService from 'services/hexo.service'

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    buttonGroup: {
      borderRadius: 0,
      '& button': {
        borderRadius: 0,
      },
    },
    more: {
      width: 'auto',
    },
  })
)

export default function SplitButton() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)
  const anchorRef = React.useRef<HTMLDivElement>(null)

  const handleAddItemClick = () => {
    handleToggleDialog(true)
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

  const handleToggleDialog = (open: boolean) => {
    setOpenDialog(open)
  }

  const handleRefresh = () => {
    hexoService.dispatchFetchArticleSage({ refresh: true })
    setOpen(false)
  }

  return (
    <>
      <ButtonGroup
        className={classes.buttonGroup}
        variant="contained"
        color="primary"
        fullWidth
        ref={anchorRef}
        aria-label="split button"
      >
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
      <ArticleMetaEditDialog open={openDialog} handleToggle={handleToggleDialog} />
    </>
  )
}
