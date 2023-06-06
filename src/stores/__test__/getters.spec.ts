import { describe, it, expect } from 'vitest'
import type { State } from '@/stores/state'
import { getters } from '../getters'
import topHeadlines from '../__mock__/top-headline.json'
import sourceList from '../__mock__/source-list.json'

describe('getters', () => {
  const mockState = {
    news: new Map([
      ['1', { ...topHeadlines.articles[0] }],
      ['2', { ...topHeadlines.articles[1] }]
    ]),
    histories: new Map<string, Date>([
      ['1', new Date('2023-01-01T00:00:00.000Z')],
      ['2', new Date('2023-02-02T00:00:00.000Z')]
    ]),
    sources: [sourceList.sources[0], sourceList.sources[1]]
  }

  it('latestNews', () => {
    const result = getters.latestNews(mockState as State)
    expect(result).toBeInstanceOf(Map)
    expect(result.get('2')).toEqual(topHeadlines.articles[1])
  })

  it('latestVisitedNews', () => {
    const result = getters.latestVisitedNews(mockState as State)
    expect(result).toBeInstanceOf(Map)
    expect(result.get('2')).toEqual(new Date('2023-02-02T00:00:00.000Z'))
  })

  it('getArticleById', () => {
    const result = getters.getArticleById(mockState as State)
    expect(result('1')).toEqual(topHeadlines.articles[0])
    expect(result('2')).toEqual(topHeadlines.articles[1])
    expect(result('3')).toBeUndefined()
  })

  it('sourceNames', () => {
    const result = getters.sourceNames(mockState as State)
    expect(result).toEqual([
      {
        id: sourceList.sources[0].id,
        name: sourceList.sources[0].name
      },
      { id: sourceList.sources[1].id, name: sourceList.sources[1].name }
    ])
  })
})
