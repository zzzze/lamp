export interface EditorProps {
  onChange?: (content: string) => void
  onSave?: (content: string) => void
  value?: string
  theme?: string
}
