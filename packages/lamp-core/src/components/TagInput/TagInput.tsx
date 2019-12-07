import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import OutlinedInput from 'components/TagInput/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    tag: {
      display: 'flex',
      margin: theme.spacing(0.5),
    },
  })
})

interface TagInputProps {
  error: boolean
  disabled: boolean
  helperText: string
  FormHelperTextProps: object
  id: string
  value: string[]
  renderDataPreview: (() => React.ReactElement[]) | null
  onChange: (tags: string[]) => void
}

const TagInput: React.FC<Partial<TagInputProps>> = ({
  error,
  disabled,
  helperText,
  FormHelperTextProps,
  id,
  value = [],
  onChange,
  ...others
}) => {
  const classes = useStyles()
  const [labelWidth, setLabelWidth] = React.useState(32)
  const [notched, setNotched] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')
  const helperTextId = helperText && id ? `${id}-helper-text` : undefined

  const measuredRef = React.useCallback(node => {
    if (node !== null) {
      setLabelWidth(node.offsetWidth)
    }
  }, [])

  const handleDeleteTag = (index: number, _event: React.MouseEvent<HTMLElement>) => {
    const newTags = value.slice()
    newTags.splice(index, 1)
    onChange && onChange(newTags)
  }

  const handleValueChange = (event: any) => {
    setInputValue(event.target.value)
  }

  const handleAddTag = () => {
    if (!inputValue) return
    const newTags = value.slice().concat(inputValue)
    onChange && onChange(newTags)
    setInputValue('')
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const renderDataPreview = () =>
    value.map((tag: string, index: number) => (
      <Chip
        className={classes.tag}
        variant="outlined"
        size="small"
        label={tag}
        key={tag}
        onDelete={handleDeleteTag.bind(null, index)}
      />
    ))

  return (
    <FormControl error={error} disabled={disabled} fullWidth margin="dense" variant="outlined">
      <InputLabel htmlFor="tag" ref={measuredRef}>
        标签
      </InputLabel>
      <OutlinedInput
        id="tag"
        labelWidth={labelWidth}
        notched={!!inputValue || notched}
        value={inputValue}
        onChange={handleValueChange}
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
            <IconButton size="small" onClick={handleAddTag} onMouseDown={handleMouseDown}>
              <AddIcon />
            </IconButton>
          </InputAdornment>
        }
        renderDataPreview={value.length ? renderDataPreview : null}
        {...others}
      />
      {helperText && (
        <FormHelperText id={helperTextId} {...FormHelperTextProps}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default TagInput
