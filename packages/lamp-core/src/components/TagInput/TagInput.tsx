import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import OutlinedInput from 'components/TagInput/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    // root: {
    //   '& legend': {
    //     paddingLeft: (paddingLeft: number) => `${theme.spacing(paddingLeft)}px`,
    //   },
    // },
    // legend: {
    //   paddingLeft: 50,
    // },
  })
})

interface TagInput {
  error: boolean
  disabled: boolean
}

const ArticleCreationDialog: React.FC<Partial<TagInput>> = ({ error, disabled }) => {
  const classes = useStyles()
  const [labelWidth, setLabelWidth] = React.useState(32)
  const [notched, setNotched] = React.useState(false)

  const measuredRef = React.useCallback(node => {
    if (node !== null) {
      setLabelWidth(node.offsetWidth)
    }
  }, [])

  return (
    <FormControl error={error} disabled={disabled} fullWidth margin="dense" variant="outlined">
      <InputLabel htmlFor="tag" ref={measuredRef}>
        标签
      </InputLabel>
      <OutlinedInput
        classes={classes}
        id="tag"
        labelWidth={labelWidth}
        notched={notched}
        inputProps={{
          onFocus: () => {
            setNotched(true)
          },
          onBlur: () => {
            setNotched(false)
          },
        }}
        // placeholder="添加标签"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              // onClick={handleClickShowPassword}
              // onMouseDown={handleMouseDownPassword}
            >
              <AddIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export default ArticleCreationDialog
