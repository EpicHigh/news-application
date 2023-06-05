import type { Article } from '@/types'
// @ts-ignore
import type { StoreOptions } from 'vuex'

export interface State {
  error: string
  isLoading: boolean
  news: Map<string, Article>
  histories: string[]
}

export const state: StoreOptions<State>['state'] = () => ({
  error: '',
  isLoading: false,
  news: new Map(),
  histories: []
})
