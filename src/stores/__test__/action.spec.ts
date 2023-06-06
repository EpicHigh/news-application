import { describe, it, expect, vi } from 'vitest'
import { newsService } from '@/services'
import createMockActions from './test-utils'
import { ActionTypes } from '../action'
import type { UpdatedTopHeadlinePayload } from '../types'

vi.mock('@/services')

describe('actions', () => {
  it(ActionTypes.UPDATE_TOP_HEADLINE_TITLE, async () => {
    const store = createMockActions()
    const payload: UpdatedTopHeadlinePayload = {
      title: 'test',
      id: 'test'
    }
    await store.dispatch(ActionTypes.UPDATE_TOP_HEADLINE_TITLE, payload)
    expect(store.commit).toHaveBeenCalledWith(ActionTypes.UPDATE_TOP_HEADLINE_TITLE, payload)
  })

  it(ActionTypes.PUSH_TO_HISTORY, async () => {
    const store = createMockActions()
    const payload = 'test'
    await store.dispatch(ActionTypes.PUSH_TO_HISTORY, payload)
    expect(store.commit).toHaveBeenCalledWith(ActionTypes.PUSH_TO_HISTORY, payload)
  })

  it(ActionTypes.SET_ERROR, async () => {
    const store = createMockActions()
    const payload = new Error('test error')
    await store.dispatch(ActionTypes.SET_ERROR, payload)
    expect(store.commit).toHaveBeenCalledWith(ActionTypes.SET_ERROR, payload.message)
  })

  it(ActionTypes.FETCH_SOURCES, async () => {
    const store = createMockActions()
    await store.dispatch(ActionTypes.FETCH_SOURCES)
    expect(newsService.get).toHaveBeenCalled()
  })

  it(ActionTypes.FETCH_TOP_HEADLINES_BY_SOURCE, async () => {
    const store = createMockActions()
    const payload: string[] = ['source1', 'source2']
    await store.dispatch(ActionTypes.FETCH_TOP_HEADLINES_BY_SOURCE, payload)
    expect(newsService.get).toHaveBeenCalled()
  })

  it(ActionTypes.SEARCH_NEWS, async () => {
    const store = createMockActions()
    const payload = 'keyword'
    await store.dispatch(ActionTypes.SEARCH_NEWS, payload)
    expect(newsService.get).toHaveBeenCalled()
  })

  it(ActionTypes.FETCH_WITHOUT_API_KEY, async () => {
    const store = createMockActions()
    await store.dispatch(ActionTypes.FETCH_WITHOUT_API_KEY)
    expect(newsService.get).toHaveBeenCalled()
  })
})
