import { describe, it, expect } from 'vitest'
import type { Article, Source } from '@/types'
import { mutations, MutationTypes } from '../mutation'
import type { State } from '../state'
import topHeadlines from '../__mock__/top-headline.json'
import sourceList from '../__mock__/source-list.json'

describe('mutations', () => {
  // Prepare some mock data
  const initialState: State = {
    error: '',
    isLoading: false,
    news: new Map<string, Article>(),
    histories: new Map<string, Date>(),
    sources: [] as Source[]
  }

  it(MutationTypes.SET_ERROR, () => {
    const payload = 'test error'
    mutations[MutationTypes.SET_ERROR](initialState, payload)
    expect(initialState.error).toBe(payload)
  })

  it(MutationTypes.SET_LOADING, () => {
    const payload = true
    mutations[MutationTypes.SET_LOADING](initialState, payload)
    expect(initialState.isLoading).toBe(payload)
  })

  it(MutationTypes.SET_NEWS, () => {
    const payload = [...topHeadlines.articles] as Article[]
    mutations[MutationTypes.SET_NEWS](initialState, payload)
    setTimeout(() => {
      expect(initialState.news.size).toBe(payload.length)
    }, 10)
  })

  it(MutationTypes.UPDATE_TOP_HEADLINE_TITLE, async () => {
    const id = 'hashedUrl1'
    initialState.news.set(id, { title: 'old title' } as Article)
    const payload = { id, title: 'new title' }
    await mutations[MutationTypes.UPDATE_TOP_HEADLINE_TITLE](initialState, payload)
    expect(initialState.news.get(id)?.title).toBe(payload.title)
  })

  it(MutationTypes.PUSH_TO_HISTORY, () => {
    const payload = 'http://test.com'
    mutations[MutationTypes.PUSH_TO_HISTORY](initialState, payload)
    expect(initialState.histories.has(payload)).toBe(true)
  })

  it(MutationTypes.SET_SOURCES, () => {
    const payload = sourceList.sources as Source[]
    mutations[MutationTypes.SET_SOURCES](initialState, payload)
    expect(initialState.sources).toEqual(payload)
  })
})
