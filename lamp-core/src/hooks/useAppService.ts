import { useState } from 'react'

export interface Tab {
  name: string
}

export type AddTab = (newTab: Tab) => void

export interface AppService {
  addTab: AddTab
}

export default function useAppService(defaultTabs: Tab[] = []): [Tab[], AppService] {
  const [tabs, setTabs] = useState<Tab[]>(defaultTabs)
  let addTab: AddTab = newTab => setTabs([...tabs, newTab])
  let appService: AppService = { addTab }
  return [tabs, appService]
}
