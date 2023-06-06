import { ActionTypes } from '@/stores/action'
import { nextTick } from 'vue'
import customMount from '@/test-utils'
// @ts-ignore
import { createStore, Store } from 'vuex'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import NewsFilters from '../NewsFilters.vue'

describe('NewsFilters', () => {
  let store: Store<any>

  beforeEach(() => {
    store = createStore({
      state: { sources: [] },
      getters: {
        sourceNames: () => [
          { id: 'source-1', name: 'Source 1' },
          { id: 'source-2', name: 'Source 2' }
        ]
      },
      actions: {
        [ActionTypes.FETCH_TOP_HEADLINES_BY_SOURCE]: vi.fn()
      }
    })
  })

  it('initializes with correct data', () => {
    const wrapper = customMount(NewsFilters, store)
    expect(wrapper.vm.menu).toBe(false)
    expect(wrapper.vm.sources).toEqual([])
  })

  it('dispatches FETCH_TOP_HEADLINES_BY_SOURCE action when applyFilters is called', async () => {
    store.dispatch = vi.fn()
    const wrapper = customMount(NewsFilters, store)
    wrapper.vm.sources = ['source-1', 'source-2']
    wrapper.vm.applyFilters()
    await nextTick()
    expect(store.dispatch).toHaveBeenCalledWith(ActionTypes.FETCH_TOP_HEADLINES_BY_SOURCE, [
      'source-1',
      'source-2'
    ])
    expect(wrapper.vm.menu).toBe(false)
  })

  it('resets sources value and calls applyFilters when resetFilters is called', async () => {
    store.dispatch = vi.fn()
    const wrapper = customMount(NewsFilters, store)
    wrapper.vm.sources = ['source-1', 'source-2']
    wrapper.vm.resetFilers()
    await nextTick()
    expect(wrapper.vm.sources).toEqual([])
    expect(store.dispatch).toHaveBeenCalledWith(ActionTypes.FETCH_TOP_HEADLINES_BY_SOURCE, [])
  })
})
