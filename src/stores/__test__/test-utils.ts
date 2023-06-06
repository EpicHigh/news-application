import { mock } from 'vitest-mock-extended'
// @ts-ignore
import { ActionContext, Store } from 'vuex'
import { actions } from '@/stores/action'
import type { State } from '../state'

function createMockActions() {
  const mockStore = mock<Store<State>>()
  mockStore.dispatch.mockImplementation((type: string, payload: unknown) => {
    const action = actions[type]
    if (action) {
      return action(mockStore, payload)
    }
    return null
  })
  return mockStore
}

export default createMockActions
