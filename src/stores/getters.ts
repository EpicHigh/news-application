import type { State } from '@/stores/state'
import { compareDesc } from 'date-fns'
import type { Article } from '@/types'

interface SourceNews {
  id: string
  name: string
}

export interface Getters<S = State> {
  latestNews(state: S): State['news']

  latestVisitedNews(state: S): State['histories']

  getArticleById(state: S): (id: string) => Article | undefined

  sourceNames(state: S): SourceNews[]
}

export const getters: Getters = {
  latestNews(state) {
    return new Map(
      [...state.news.entries()].sort((a, b) =>
        compareDesc(new Date(a[1].publishedAt), new Date(b[1].publishedAt))
      )
    )
  },
  latestVisitedNews(state) {
    return new Map([...state.histories.entries()].sort((a, b) => compareDesc(a[1], b[1])))
  },
  getArticleById(state) {
    return (id) => {
      return state.news.get(id)
    }
  },
  sourceNames(state) {
    return state.sources.map(({ id, name }) => ({ id, name }))
  }
}
