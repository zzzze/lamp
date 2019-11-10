import React from 'react'
import clsx from 'clsx'
import InputBase from '@material-ui/core/InputBase'
import NotchedOutline from './NotchedOutline'
import { withStyles, makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tagContainer: {
      margin: theme.spacing(2),
      borderTop: '1px gray dotted',
      paddingTop: theme.spacing(2),
      marginTop: 0,
      display: 'flex',
      flexWrap: 'wrap',
    },
    tag: {
      display: 'flex',
      margin: theme.spacing(0.5),
    },
  })
)

export const styles = theme => {
  const borderColor = theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'

  return {
    /* Styles applied to the root element. */
    root: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      '&:hover $notchedOutline': {
        borderColor: theme.palette.text.primary,
      },
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        '&:hover $notchedOutline': {
          borderColor,
        },
      },
      '&$focused $notchedOutline': {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
      '&$error $notchedOutline': {
        borderColor: theme.palette.error.main,
      },
      '&$disabled $notchedOutline': {
        borderColor: theme.palette.action.disabled,
      },
    },
    /* Styles applied to the root element if the color is secondary. */
    colorSecondary: {
      '&$focused $notchedOutline': {
        borderColor: theme.palette.secondary.main,
      },
    },
    /* Styles applied to the root element if the component is focused. */
    focused: {},
    /* Styles applied to the root element if `disabled={true}`. */
    disabled: {},
    /* Styles applied to the root element if `startAdornment` is provided. */
    adornedStart: {
      paddingLeft: 14,
    },
    /* Styles applied to the root element if `endAdornment` is provided. */
    adornedEnd: {
      paddingRight: 14,
    },
    /* Styles applied to the root element if `error={true}`. */
    error: {},
    /* Styles applied to the `input` element if `margin="dense"`. */
    marginDense: {},
    /* Styles applied to the root element if `multiline={true}`. */
    multiline: {
      padding: '18.5px 14px',
      '&$marginDense': {
        paddingTop: 10.5,
        paddingBottom: 10.5,
      },
    },
    /* Styles applied to the `NotchedOutline` element. */
    notchedOutline: {
      borderColor,
    },
    /* Styles applied to the `input` element. */
    input: {
      padding: '18.5px 14px',
      '&:-webkit-autofill': {
        WebkitBoxShadow: theme.palette.type === 'dark' ? '0 0 0 100px #266798 inset' : null,
        WebkitTextFillColor: theme.palette.type === 'dark' ? '#fff' : null,
        borderRadius: 'inherit',
      },
    },
    /* Styles applied to the `input` element if `margin="dense"`. */
    inputMarginDense: {
      paddingTop: 10.5,
      paddingBottom: 10.5,
    },
    /* Styles applied to the `input` element if `select={true}`. */
    inputSelect: {
      paddingRight: 24,
    },
    /* Styles applied to the `input` element if `multiline={true}`. */
    inputMultiline: {
      padding: 0,
    },
    /* Styles applied to the `input` element if `startAdornment` is provided. */
    inputAdornedStart: {
      paddingLeft: 0,
    },
    /* Styles applied to the `input` element if `endAdornment` is provided. */
    inputAdornedEnd: {
      paddingRight: 0,
    },
  }
}

const OutlinedInput = React.forwardRef(function OutlinedInput(props: any, ref) {
  const {
    classes,
    fullWidth = false,
    inputComponent = 'input',
    labelWidth = 0,
    multiline = false,
    notched,
    type = 'text',
    ...other
  } = props as any
  const [suffixState, setSuffixState] = React.useState({})
  const customClasses = useStyles()
  const _tags = [
    '123',
    '456',
    '123',
    '456',
    '123',
    '456',
    '123',
    '456',
    '123',
    '456',
    '123',
    '456',
    '123',
    '456',
    '123',
    '456',
    '123',
    '456',
    '123',
    '456',
    '123',
    '456',
    '123',
    '456',
    '123',
    '456',
    '123',
    '456',
    '123',
    '456',
    '123',
    '456',
  ]
  const handleDeleteTag = () => {}

  return (
    <>
      <InputBase
        key="input"
        renderSuffix={state =>
          React.useMemo(() => {
            console.log(state)
            setSuffixState(state)
          }, [JSON.stringify(state)])
        }
        classes={{
          ...classes,
          root: clsx(classes.root, classes.underline),
          notchedOutline: null,
        }}
        fullWidth={fullWidth}
        inputComponent={inputComponent}
        multiline={multiline}
        ref={ref}
        type={type}
        {...other}
      />
      <div className={customClasses.tagContainer} key="tag-container">
        {_tags.map(tag => (
          <Chip
            className={customClasses.tag}
            variant="outlined"
            size="small"
            label={tag}
            key={tag}
            onDelete={handleDeleteTag}
          />
        ))}
      </div>
      <NotchedOutline
        key="outline"
        className={classes.notchedOutline}
        labelWidth={labelWidth}
        notched={
          typeof notched !== 'undefined'
            ? notched
            : Boolean(
                (suffixState as any).startAdornment || (suffixState as any).filled || (suffixState as any).focused
              )
        }
      />
    </>
  )
})

export default withStyles(styles as any, { name: 'CustomOutlinedInput' })(OutlinedInput)
