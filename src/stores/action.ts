// @ts-ignore
import { ActionContext, ActionTree } from 'vuex'
import axios from '@/services'
import type { TopHeadlineResponse } from '@/types'
import type { State } from './state'
import { MutationTypes } from './mutation'

export enum ActionTypes {
  FETCH_TOP_HEADLINES = 'FETCH_TOP_HEADLINES'
}

export const actions: ActionTree<State, State> = {
  async [ActionTypes.FETCH_TOP_HEADLINES]({ commit }: ActionContext<State>) {
    commit(MutationTypes.SET_LOADING, true)
    try {
      const { data } = await axios.get<TopHeadlineResponse>('/top-headlines')
      commit(MutationTypes.SET_TOP_HEADLINES, data.articles)
    } catch (error: any) {
      commit(MutationTypes.SET_ERROR, error.message)
    } finally {
      commit(MutationTypes.SET_LOADING, false)
    }
  }
}
