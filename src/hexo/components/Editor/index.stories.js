import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Editor from './index.js'

storiesOf('Editor', module)
  .add('with some emoji', () => (
    <Editor />
  ));
