// @ts-ignore https://github.com/trim21/vuex-ts-bug
import { createStore, Store as VuexStore } from 'vuex'
import { getters } from '@/stores/getters'
import type { InjectionKey } from 'vue'
import { state } from './state'
import type { State } from './state'
import { mutations } from './mutation'
import { actions } from './action'

export const store = createStore({
  state,
  mutations,
  actions,
  getters
})

export const key: InjectionKey<VuexStore<State>> = Symbol('vuex-key')

export type Store = ReturnType<typeof store>
