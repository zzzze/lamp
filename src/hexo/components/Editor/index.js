import React from 'react'
import ReactDOM from 'react-dom'
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
import './index.scss'

let defaultBtnFilter = (item, index, btns) => (
  // hide '|' and 'help' and 'info'
  index !== btns.length - 1 && index !== btns.length - 2 && index !== btns.length - 3
  // hide others
  && item !== 'fullscreen' && item !== 'pagebreak' && item !== 'emoji'
)

editormd.toolbarModes = {
  ...editormd.toolbarModes,
  full: editormd.toolbarModes.full.filter(defaultBtnFilter),
  simple: editormd.toolbarModes.simple.filter(defaultBtnFilter),
  mini: editormd.toolbarModes.mini.filter(defaultBtnFilter)
}

export default class Editor extends React.Component {
  customBtnContainer = document.createElement('ul')

  componentDidMount () {
    const {value, onChange} = this.props
    this.mditor = editormd('editor-wrapper', {
      value,
      onchange: () => onChange && onChange(this.mditor ? this.mditor.getMarkdown() : ''),
      autoLoadModules: false,
      onload : function() {
        console.log("onloaded =>", this, this.id, this.settings);
      }
    })
    this.$menuContainer = $('.editormd-menu')
    this.customBtnContainer.className = 'editormd-menu custom-btn-container'
    this.$menuContainer.append(this.customBtnContainer)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.mditor.setMarkdown(this.props.value)
    }
  }

  handleSave = () => {
    const {onSave} = this.props
    onSave && onSave(this.mditor.getMarkdown())
  }

  render() {
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          <React.Fragment>
            <li className='divider' unselectable='on'>|</li>
            <li>
              <a onClick={this.handleSave}><i className='fa fa-save' name='save' /></a>
            </li>
          </React.Fragment>,
          this.customBtnContainer,
        )}
        <div id="editor-wrapper" />
      </React.Fragment>
    )
  }
}
