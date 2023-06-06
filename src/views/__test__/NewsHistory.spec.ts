import { describe, it, expect, beforeEach, vi } from 'vitest'
import customMount from '@/test-utils'
import NewsCard from '@/features/TopHeadlines/NewsCard.vue'
// @ts-ignore
import { createStore } from 'vuex'
import History from '../NewsHistory.vue'

describe('History', () => {
  let store: any
  beforeEach(() => {
    store = createStore({
      state: {
        histories: new Map(),
        articles: [
          {
            id: '1',
            title: 'Article 1',
            description: 'Desc 1',
            content: 'Content 1',
            publishedAt: '2021-01-01',
            urlToImage: 'https://example.com/image1.jpg'
          },
          {
            id: '2',
            title: 'Article 2',
            description: 'Desc 2',
            content: 'Content 2',
            publishedAt: '2021-01-01',
            urlToImage: 'https://example.com/image2.jpg'
          }
        ]
      },
      getters: {
        latestVisitedNews: vi.fn(() => new Map().set('1', new Date()).set('2', new Date())),
        getArticleById: (state: any) => (id: any) => {
          return state.articles.find((article: any) => article.id === id)
        }
      }
    })
  })

  it('renders "There is no history" if there is no history', () => {
    const wrapper = customMount(History, store)
    expect(wrapper.text()).toContain('There is no history')
  })

  it('renders the news card for each visited news if there is history', () => {
    store.state.histories = new Map().set('1', new Date()).set('2', new Date())
    const wrapper = customMount(History, store)
    expect(wrapper.findAllComponents(NewsCard)).toHaveLength(2)
  })
})
