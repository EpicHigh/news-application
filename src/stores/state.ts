import type { Article } from '@/types'
// @ts-ignore
import type { StoreOptions } from 'vuex'

export interface State {
  error: string
  isLoading: boolean
  topHeadlines: Article[]
  histories: Map<number, Article>
}

export const state: StoreOptions<State>['state'] = () => ({
  error: '',
  isLoading: false,
  topHeadlines: [],
  histories: new Map()
})
