import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withKnobs, text } from '@storybook/addon-knobs'
import Editor from './index.js'

let stories = storiesOf('Editor', module)
stories.addDecorator(withKnobs)
stories.add('Default', () => {
  let value = text('Value', '##Hello World!\n')
  let onChange = value => {
    action('change')(value)
  }
  let onSave = value => {
    action('save')(value)
  }
  return <Editor value={value} onChange={onChange} onSave={onSave} />
})
