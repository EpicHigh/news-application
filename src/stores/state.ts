import type { Article, Source } from '@/types'
// @ts-ignore
import type { StoreOptions } from 'vuex'

export interface State {
  error: string
  isLoading: boolean
  news: Map<string, Article>
  histories: Map<string, Date>
  sources: Source[]
}

export const state: StoreOptions<State> = () => ({
  error: '',
  isLoading: false,
  news: new Map<string, Article>(),
  histories: new Map<string, Date>(),
  sources: []
})
