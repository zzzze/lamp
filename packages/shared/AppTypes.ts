export interface BootstrapContext {
  rootNode: HTMLDivElement
}

export interface Plugin {
  name: string
  bootstrap: (context: BootstrapContext) => void
  providers: {
    [key: string]: (service: any) => void
  }
}
