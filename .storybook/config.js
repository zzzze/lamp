import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
const storiesReq = require.context('../stories', true, /\.stories\.(js|ts|tsx)$/);
const srcReq = require.context('../src', true, /\.stories\.(js|ts|tsx)$/);
function loadStories() {
  storiesReq.keys().forEach(filename => storiesReq(filename));
  srcReq.keys().forEach(filename => srcReq(filename));
}

configure(loadStories, module);
