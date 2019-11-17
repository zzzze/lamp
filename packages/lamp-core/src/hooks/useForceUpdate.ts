import * as React from 'react'

export default () => {
  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => {
    updateState({})
  }, [])
  return forceUpdate
}
