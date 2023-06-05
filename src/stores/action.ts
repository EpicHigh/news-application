// @ts-ignore
import { ActionContext, ActionTree } from 'vuex'
import { newsService, TOP_HEADLINES } from '@/services'
import type { TopHeadlineResponse } from '@/types'
import { AxiosError } from 'axios'
import type { TopHeadlinePayload, HistoryPayload } from './types'
import type { State } from './state'
import { MutationTypes } from './mutation'

export enum ActionTypes {
  FETCH_TOP_HEADLINES = 'FETCH_TOP_HEADLINES',
  UPDATE_TOP_HEADLINE_TITLE = 'UPDATE_TOP_HEADLINE_TITLE',
  PUSH_TO_HISTORY = 'PUSH_TO_HISTORY'
}

const errorMessage = 'Unknown error'

export const actions: ActionTree<State, State> = {
  async [ActionTypes.FETCH_TOP_HEADLINES]({ commit }: ActionContext<State>) {
    commit(MutationTypes.SET_LOADING, true)
    try {
      const { data } = await newsService.get<TopHeadlineResponse>(TOP_HEADLINES)
      commit(MutationTypes.SET_TOP_HEADLINES, data.articles)
    } catch (error: unknown) {
      if (error instanceof Error) {
        commit(MutationTypes.SET_ERROR, error.message)
      } else if (error instanceof AxiosError) {
        commit(MutationTypes.SET_ERROR, error.response?.data.message || errorMessage)
      } else {
        commit(MutationTypes.SET_ERROR, errorMessage)
      }
    } finally {
      commit(MutationTypes.SET_LOADING, false)
    }
  },
  [ActionTypes.UPDATE_TOP_HEADLINE_TITLE](
    { commit }: ActionContext<State>,
    payload: TopHeadlinePayload
  ) {
    commit(MutationTypes.UPDATE_TOP_HEADLINE_TITLE, payload)
  },
  [ActionTypes.PUSH_TO_HISTORY]({ commit }: ActionContext<State>, payload: HistoryPayload) {
    commit(MutationTypes.PUSH_TO_HISTORY, payload)
  }
}
