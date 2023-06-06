import { ActionTypes } from '@/stores/action'
import customMount from '@/test-utils'
// @ts-ignore
import { createStore } from 'vuex'
import { describe, it, expect, vi } from 'vitest'
import ErrorDialog from '../ErrorDialog.vue'

const store = createStore({
  state: {
    error: ''
  },
  mutations: {
    [ActionTypes.SET_ERROR](state: any, error: any) {
      state.error = error
    }
  },
  actions: {
    [ActionTypes.SET_ERROR](context: any, error: any) {
      context.commit(ActionTypes.SET_ERROR, error)
    }
  }
})

describe('ErrorDialog', () => {
  it('should be visible when there is an error message in the store', async () => {
    await store.dispatch(ActionTypes.SET_ERROR, 'Test Error Message')
    const wrapper = customMount(ErrorDialog, store)
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'v-dialog' }).isVisible()).toBe(true)
  })

  it('should display the error message from the store', () => {
    const errorMessage = 'Test Error Message'
    store.dispatch(ActionTypes.SET_ERROR, errorMessage)
    const wrapper = customMount(ErrorDialog, store)
    expect(wrapper.findComponent({ name: 'v-card-text' }).html()).toContain(errorMessage)
  })

  it('should dispatch SET_ERROR action with empty string when Close button is clicked', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch')

    const wrapper = customMount(ErrorDialog, store)
    await wrapper.findComponent({ name: 'v-btn' }).trigger('click')

    expect(dispatchSpy).toHaveBeenCalledWith(ActionTypes.SET_ERROR, '')
  })
})
