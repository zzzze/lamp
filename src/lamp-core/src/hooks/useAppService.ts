import {useState} from 'react'

export interface ITab {
  name: string
}

export interface IAddTab {
  (newTab: ITab): void
}

export interface IAppService {
  addTab: IAddTab
}

export default function useAppService(defaultTabs: ITab[] = []): [ITab[], IAppService] {
  const [tabs, setTabs] = useState<ITab>(defaultTabs)
  let addTab: IAddTab = newTab => setTabs([...tabs, newTab])
  let appService: IAppService = {addTab}
  return [tabs, appService]
}
