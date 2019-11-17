import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { remote } from 'electron'
import appService from 'services/app.service'

interface ProjectInitDialogProps {
  onSelectProject: () => void
  open: boolean
}

const ProjectInitDialog: React.FC<ProjectInitDialogProps> = ({ onSelectProject, open }) => {
  const [projectRoot, setProjectRoot] = React.useState('')

  const handleSubmit = React.useCallback(() => {
    appService.setProjectRoot(projectRoot)
    onSelectProject()
  }, [projectRoot])

  const handleProjectRootChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectRoot(event.target.value)
  }, [])

  const handleSelectProject = React.useCallback(() => {
    remote.dialog.showOpenDialog(
      {
        properties: ['openDirectory'],
        title: '选择项目路径',
      },
      (filepath: string[] = []) => {
        if (filepath.length) {
          setProjectRoot(filepath.pop() || '')
        }
      }
    )
  }, [])

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <DialogTitle id="project-init">打开项目</DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            required
            autoFocus
            margin="dense"
            id="title"
            value={projectRoot}
            label="项目路径"
            type="text"
            onChange={handleProjectRootChange}
            variant="outlined"
            style={{ width: 300 }}
          />
          <Button variant="contained" style={{ marginLeft: 10 }} onClick={handleSelectProject}>
            选择项目
          </Button>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          打开
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProjectInitDialog
