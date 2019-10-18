export default {}
const providers = {
  toolbarButtonProvidor: app => ({
    name: 'settings',
    click: () => app.addTab([{ name: 'test-02' }]),
  }),
}
export { providers }
