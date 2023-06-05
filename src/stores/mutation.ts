import type { Article } from '@/types'
import { hashUrl } from '@/utils'
import type { UpdatedTopHeadlinePayload } from './types'
import type { State } from './state'

export enum MutationTypes {
  SET_ERROR = 'SET_ERROR',
  SET_LOADING = 'SET_LOADING',
  SET_TOP_HEADLINES = 'SET_TOP_HEADLINES',
  UPDATE_TOP_HEADLINE_TITLE = 'UPDATE_TOP_HEADLINE_TITLE',
  PUSH_TO_HISTORY = 'PUSH_TO_HISTORY'
}

export type Mutations<S = State> = {
  [MutationTypes.SET_ERROR](state: S, payload: string): void
  [MutationTypes.SET_LOADING](state: S, payload: boolean): void
  [MutationTypes.SET_TOP_HEADLINES](state: S, payload: Article[]): void
  [MutationTypes.UPDATE_TOP_HEADLINE_TITLE](state: S, payload: UpdatedTopHeadlinePayload): void
  [MutationTypes.PUSH_TO_HISTORY](state: S, payload: string): void
}

export const mutations: Mutations = {
  [MutationTypes.SET_ERROR](state, payload) {
    state.error = payload
  },
  [MutationTypes.SET_LOADING](state, payload) {
    state.isLoading = payload
  },
  [MutationTypes.SET_TOP_HEADLINES](state, payload) {
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
    state.histories.push(payload)
  }
}
