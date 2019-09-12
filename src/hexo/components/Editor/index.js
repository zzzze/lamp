import React from 'react'
import 'editor.md/lib/codemirror/lib/codemirror.css'
import 'editor.md/lib/codemirror/addon/dialog/dialog.css'
import 'editor.md/lib/codemirror/addon/search/matchesonscrollbar.css'
import 'editor.md/lib/codemirror/lib/codemirror.js'
import 'editor.md/lib/codemirror/addons.min.js'
import 'editor.md/lib/codemirror/modes.min.js'
import 'editor.md/lib/marked.min.js'
import 'editor.md/lib/prettify.min.js'
import 'jquery'
import 'editor.md/scss/editormd.scss'
import editormd from 'editor.md/editormd.js'

export default class Editor extends React.Component {
  componentDidMount () {
    this.mditor = editormd('editor-wrapper', {
      width: '100%',
      height: 700,
      autoLoadModules: false,
      onload : function() {
        console.log("onloaded =>", this, this.id, this.settings);
      }
    })
  }
  render() {
    return (
      <div>
        <div id="editor-wrapper" />
      </div>
    )
  } 
}
