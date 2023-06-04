// @ts-ignore https://github.com/trim21/vuex-ts-bug
import { createStore } from 'vuex'
import { state } from './state'
import { mutations } from './mutation'
import { actions } from './action'

export const store = createStore({
  state,
  mutations,
  actions
})

export type Store = ReturnType<typeof store>
