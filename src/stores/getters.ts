import type { State } from '@/stores/state'
import { compareDesc } from 'date-fns'
import type { Article } from '@/types'

export interface Getters<S = State> {
  latestNews(state: S): State['news']

  latestVisitedNews(state: S): State['histories']

  getArticleById(state: S): (id: string) => Article | undefined
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
    return (id: string) => {
      return state.news.get(id)
    }
  }
}
