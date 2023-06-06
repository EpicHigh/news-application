// @ts-ignore
import { ActionContext, ActionTree } from 'vuex'
import { newsService, TOP_HEADLINES, SOURCE_LIST } from '@/services'
import type { SourceListResponse, TopHeadlineResponse } from '@/types'
import { AxiosError } from 'axios'
import type { UpdatedTopHeadlinePayload } from './types'
import type { State } from './state'
import { MutationTypes } from './mutation'

export enum ActionTypes {
  FETCH_TOP_HEADLINES = 'FETCH_TOP_HEADLINES',
  UPDATE_TOP_HEADLINE_TITLE = 'UPDATE_TOP_HEADLINE_TITLE',
  PUSH_TO_HISTORY = 'PUSH_TO_HISTORY',
  SET_ERROR = 'SET_ERROR',
  FETCH_SOURCES = 'FETCH_SOURCES',
  FETCH_TOP_HEADLINES_BY_SOURCE = 'FETCH_TOP_HEADLINES_BY_SOURCE',
  SEARCH_NEWS = 'SEARCH_NEWS',
  FETCH_WITHOUT_API_KEY = 'FETCH_WITHOUT_API_KEY'
}

const errorMessage = 'Unknown error'

export const actions: ActionTree<State, State> = {
  async [ActionTypes.FETCH_TOP_HEADLINES]({ commit, dispatch }: ActionContext<State>) {
    commit(MutationTypes.SET_LOADING, true)
    try {
      const { data } = await newsService.get<TopHeadlineResponse>(TOP_HEADLINES, {
        params: {
          country: 'us'
        }
      })
      commit(MutationTypes.SET_NEWS, data.articles)
    } catch (error: unknown) {
      await dispatch(ActionTypes.SET_ERROR, error)
    } finally {
      commit(MutationTypes.SET_LOADING, false)
    }
  },
  [ActionTypes.UPDATE_TOP_HEADLINE_TITLE](
    { commit }: ActionContext<State>,
    payload: UpdatedTopHeadlinePayload
  ) {
    commit(MutationTypes.UPDATE_TOP_HEADLINE_TITLE, payload)
  },
  [ActionTypes.PUSH_TO_HISTORY]({ commit }: ActionContext<State>, payload: string) {
    commit(MutationTypes.PUSH_TO_HISTORY, payload)
  },
  [ActionTypes.SET_ERROR]({ commit }: ActionContext<State>, payload: unknown) {
    if (payload instanceof AxiosError) {
      commit(MutationTypes.SET_ERROR, payload.response?.data.message || errorMessage)
    } else if (payload instanceof Error) {
      commit(MutationTypes.SET_ERROR, payload.message)
    } else {
      commit(MutationTypes.SET_ERROR, errorMessage)
    }
  },
  async [ActionTypes.FETCH_SOURCES]({ commit, dispatch }: ActionContext<State>) {
    commit(MutationTypes.SET_LOADING, true)
    try {
      const { data } = await newsService.get<SourceListResponse>(SOURCE_LIST)
      commit(MutationTypes.SET_SOURCES, data.sources)
    } catch (error: unknown) {
      await dispatch(ActionTypes.SET_ERROR, error)
    } finally {
      commit(MutationTypes.SET_LOADING, false)
    }
  },
  async [ActionTypes.FETCH_TOP_HEADLINES_BY_SOURCE](
    { commit, dispatch }: ActionContext<State>,
    payload: string[]
  ) {
    commit(MutationTypes.SET_LOADING, true)
    try {
      const { data } = await newsService.get<TopHeadlineResponse>(TOP_HEADLINES, {
        params: {
          sources: payload,
          ...(payload.length === 0 ? { country: 'us' } : {})
        }
      })
      commit(MutationTypes.SET_NEWS, data.articles)
    } catch (error: unknown) {
      await dispatch(ActionTypes.SET_ERROR, error)
    } finally {
      commit(MutationTypes.SET_LOADING, false)
    }
  },
  async [ActionTypes.SEARCH_NEWS]({ commit, dispatch }: ActionContext<State>, payload: string) {
    commit(MutationTypes.SET_LOADING, true)
    try {
      const { data } = await newsService.get<TopHeadlineResponse>(TOP_HEADLINES, {
        params: {
          q: payload
        }
      })
      commit(MutationTypes.SET_NEWS, data.articles)
    } catch (error: unknown) {
      await dispatch(ActionTypes.SET_ERROR, error)
    } finally {
      commit(MutationTypes.SET_LOADING, false)
    }
  },
  async [ActionTypes.FETCH_WITHOUT_API_KEY]({ commit, dispatch }: ActionContext<State>) {
    try {
      const { data } = await newsService.get<SourceListResponse>(SOURCE_LIST, {
        params: {
          apiKey: ''
        }
      })
    } catch (error: unknown) {
      await dispatch(ActionTypes.SET_ERROR, error)
    }
  }
}
