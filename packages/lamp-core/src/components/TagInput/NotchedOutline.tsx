import React from 'react'
import clsx from 'clsx'
import { withStyles, useTheme } from '@material-ui/core/styles'

export const styles = theme => {
  const align = theme.direction === 'rtl' ? 'right' : 'left'

  return {
    /* Styles applied to the root element. */
    root: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      top: -5,
      left: 0,
      margin: 0,
      padding: 0,
      pointerEvents: 'none',
      borderRadius: theme.spacing(0.5),
      borderStyle: 'solid',
      borderWidth: 1,
      // Match the Input Label
      transition: theme.transitions.create([`padding-${align}`, 'border-color', 'border-width'], {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut,
      }),

      '.Mui-error ~ &': {
        borderColor: theme.palette.error.main,
      },

      '.Mui-disabled ~ &': {
        borderColor: theme.palette.action.disabled,
      },
    },
    /* Styles applied to the legend element. */
    legend: {
      textAlign: 'left',
      padding: 0,
      lineHeight: '11px',
      transition: theme.transitions.create('width', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut,
      }),
    },
  }
}

/**
 * @ignore - internal component.
 */
const NotchedOutline = React.forwardRef(function NotchedOutline(props: any, ref) {
  const { children, classes, className, labelWidth: labelWidthProp, notched, style, ...other } = props as any
  const theme = useTheme()
  const align = theme.direction === 'rtl' ? 'right' : 'left'
  const labelWidth = labelWidthProp > 0 ? labelWidthProp * 0.75 + 8 : 0

  return (
    <fieldset
      aria-hidden
      style={{
        [`padding${align === 'left' ? 'Left' : 'Right'}`]: 8 + (notched ? 0 : labelWidth / 2),
        ...style,
      }}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      <legend
        className={classes.legend}
        style={{
          // IE 11: fieldset with legend does not render
          // a border radius. This maintains consistency
          // by always having a legend rendered
          width: notched ? labelWidth : 0.01,
        }}
      >
        {/* Use the nominal use case of the legend, avoid rendering artefacts. */}
        {/* eslint-disable-next-line react/no-danger */}
        <span dangerouslySetInnerHTML={{ __html: '&#8203;' }} />
      </legend>
    </fieldset>
  )
})

export default withStyles(styles as any, { name: 'CustomNotchedOutline' })(NotchedOutline)
