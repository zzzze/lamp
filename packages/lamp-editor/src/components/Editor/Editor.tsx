import React from 'react'
import ReactDOM from 'react-dom'
import * as path from 'path'
import 'editor.md/lib/codemirror/lib/codemirror.css'
import 'editor.md/lib/codemirror/addon/dialog/dialog.css'
import 'editor.md/lib/codemirror/addon/search/matchesonscrollbar.css'
import 'editor.md/lib/codemirror/theme/pastel-on-dark.css'
import 'editor.md/lib/codemirror/theme/base16-light.css'
import 'editor.md/lib/codemirror/lib/codemirror.js'
import 'editor.md/lib/codemirror/addons.min.js'
import 'editor.md/lib/codemirror/modes.min.js'
import 'editor.md/lib/marked.min.js'
import 'editor.md/lib/prettify.min.js'
import 'editor.md/scss/editormd.scss'
import { EditorProps } from '@lamp/shared/types/editor'
import './Editor.scss'

if (typeof module === 'object') {
  window.module = module
  ;(module as any) = undefined
}
require('jquery')
const editormd = require('editor.md/editormd.js')
if (window.module) (module as any) = window.module

const defaultBtnFilter = (item: string, index: number, btns: string[]) =>
  // hide '|' and 'help' and 'info'
  index !== btns.length - 1 &&
  index !== btns.length - 2 &&
  index !== btns.length - 3 &&
  // hide others
  item !== 'fullscreen' &&
  item !== 'pagebreak' &&
  item !== 'emoji'

editormd.toolbarModes = {
  ...editormd.toolbarModes,
  full: editormd.toolbarModes.full.filter(defaultBtnFilter),
  simple: editormd.toolbarModes.simple.filter(defaultBtnFilter),
  mini: editormd.toolbarModes.mini.filter(defaultBtnFilter),
}

class Editor extends React.Component<EditorProps> {
  customBtnContainer = document.createElement('ul')
  mditor: any
  $menuContainer: any
  componentDidMount() {
    const { value, onChange } = this.props
    this.mditor = editormd('editor-wrapper', {
      value,
      theme: (this.props as any).theme,
      previewTheme: (this.props as any).theme,
      editorTheme: (this.props as any).theme === 'dark' ? 'pastel-on-dark' : 'base16-light',
      path: path.join(__dirname, '../../node_modules/editor.md/lib/'),
      pluginPath: __webpack_public_path__ + 'public/plugins/', // eslint-disable-line
      onchange: () => onChange && onChange(this.mditor ? this.mditor.getMarkdown() : ''),
      autoLoadModules: false,
      // watch: false,
      onload: function() {
        console.log('onloaded =>', this, this.id, this.settings)
      },
    })
    ;(window as any).mditor = this.mditor
    this.$menuContainer = (global as any).$('.editormd-menu')
    this.customBtnContainer.className = 'editormd-menu custom-btn-container'
    this.$menuContainer.append(this.customBtnContainer)
  }

  componentDidUpdate(prevProps: EditorProps) {
    if (prevProps.value !== this.props.value) {
      this.mditor.setMarkdown(this.props.value)
    }
    if (this.props.theme !== prevProps.theme) {
      this.mditor.setTheme(this.props.theme)
      this.mditor.setPreviewTheme(this.props.theme)
      this.mditor.setCodeMirrorTheme((this.props as any).theme === 'dark' ? 'pastel-on-dark' : 'base16-light')
    }
  }

  handleSave = () => {
    const { onSave } = this.props
    onSave && onSave(this.mditor.getMarkdown())
  }

  render() {
    return (
      <>
        {ReactDOM.createPortal(
          <>
            <li className="divider" unselectable="on">
              |
            </li>
            <li>
              <a onClick={this.handleSave}>
                <i className="fa fa-save" {...{ name: 'save' }} />
              </a>
            </li>
          </>,
          this.customBtnContainer
        )}
        <div id="editor-wrapper" />
      </>
    )
  }
}

export default Editor
