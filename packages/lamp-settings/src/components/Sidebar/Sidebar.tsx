import * as React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import TuneIcon from '@material-ui/icons/Tune'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 200,
      borderRightColor: theme.palette.divider,
      borderRightStyle: 'solid',
      borderRightWidth: 1,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  })
)

const useStylesForPanel = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderBottomColor: theme.palette.divider,
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
      boxShadow: 'none',
      borderRadius: 'unset !important',
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 0,
      },
    },
    expanded: {},
  })
)

const useStylesForSummary = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      minHeight: 'unset !important',
      '& $content': {
        overflow: 'hidden',
        '& p': {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      },
    },
    content: {
      margin: '12px 0 !important',
    },
  })
)

const useStylesForDetails = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0 10px',
      backgroundColor: theme.palette.background.default,
      borderTopColor: theme.palette.divider,
      borderTopStyle: 'solid',
      borderTopWidth: 1,
    },
  })
)

const useStylesForMenuList = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    padding: {},
  })
)

const Sidebar = () => {
  const classes = useStyles()
  const classesForPanel = useStylesForPanel()
  const classesForSummary = useStylesForSummary()
  const classesForDetails = useStylesForDetails()
  const classesForMenuList = useStylesForMenuList()

  return (
    <div className={classes.root}>
      <ExpansionPanel classes={classesForPanel}>
        <ExpansionPanelSummary
          classes={classesForSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading} noWrap>
            通用
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={classesForDetails}>
          <MenuList classes={classesForMenuList}>
            <MenuItem>
              <ListItemIcon>
                <SettingsApplicationsIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                项目
              </Typography>
            </MenuItem>
          </MenuList>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel classes={classesForPanel}>
        <ExpansionPanelSummary
          classes={classesForSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>其他</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={classesForDetails}>
          <MenuList classes={classesForMenuList}>
            <MenuItem>
              <ListItemIcon>
                <TuneIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                其他
              </Typography>
            </MenuItem>
          </MenuList>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

export default Sidebar
