import type { Article } from '@/types'
import type { State } from './state'

export enum MutationTypes {
  SET_ERROR = 'SET_ERROR',
  SET_LOADING = 'SET_LOADING',
  SET_TOP_HEADLINES = 'SET_TOP_HEADLINES'
}

export type Mutations<S = State> = {
  [MutationTypes.SET_ERROR](state: S, payload: string): void
  [MutationTypes.SET_LOADING](state: S, payload: boolean): void
  [MutationTypes.SET_TOP_HEADLINES](state: S, payload: Article[]): void
}

export const mutations: Mutations = {
  [MutationTypes.SET_ERROR](state, payload) {
    state.error = payload
  },
  [MutationTypes.SET_LOADING](state, payload) {
    state.isLoading = payload
  },
  [MutationTypes.SET_TOP_HEADLINES](state, payload) {
    state.topHeadlines = payload
  }
}
