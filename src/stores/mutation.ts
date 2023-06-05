import type { Article, Source } from '@/types'
import { hashUrl } from '@/utils'
import type { UpdatedTopHeadlinePayload } from './types'
import type { State } from './state'

export enum MutationTypes {
  SET_ERROR = 'SET_ERROR',
  SET_LOADING = 'SET_LOADING',
  SET_NEWS = 'SET_NEWS',
  UPDATE_TOP_HEADLINE_TITLE = 'UPDATE_TOP_HEADLINE_TITLE',
  PUSH_TO_HISTORY = 'PUSH_TO_HISTORY',
  SET_SOURCES = 'SET_SOURCES',
  SET_NEWS_BY_SOURCE = 'SET_NEWS_BY_SOURCE'
}

export interface Mutations<S = State> {
  [MutationTypes.SET_ERROR](state: S, payload: string): void

  [MutationTypes.SET_LOADING](state: S, payload: boolean): void

  [MutationTypes.SET_NEWS](state: S, payload: Article[]): void

  [MutationTypes.UPDATE_TOP_HEADLINE_TITLE](state: S, payload: UpdatedTopHeadlinePayload): void

  [MutationTypes.PUSH_TO_HISTORY](state: S, payload: string): void

  [MutationTypes.SET_SOURCES](state: S, payload: Source[]): void
}

export const mutations: Mutations = {
  [MutationTypes.SET_ERROR](state, payload) {
    state.error = payload
  },
  [MutationTypes.SET_LOADING](state, payload) {
    state.isLoading = payload
  },
  [MutationTypes.SET_NEWS](state, payload) {
    state.news.clear()
    payload.forEach(async (article) => {
      const id = await hashUrl(article.url)
      if (!state.news.has(id)) {
        state.news.set(id, article)
      }
    })
  },
  [MutationTypes.UPDATE_TOP_HEADLINE_TITLE](state, payload) {
    const article = state.news.get(payload.id)
    if (article) {
      state.news.set(payload.id, { ...article, title: payload.title })
    }
  },
  [MutationTypes.PUSH_TO_HISTORY](state, payload) {
    state.histories.set(payload, new Date())
  },
  [MutationTypes.SET_SOURCES](state, payload) {
    state.sources = payload
  }
}
