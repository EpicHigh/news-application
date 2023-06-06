import { nextTick } from 'vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import type { Mock } from 'vitest'
import customMount from '@/test-utils'
import { ActionTypes } from '@/stores/action'
// @ts-ignore
import { createStore, Store } from 'vuex'
import { useRoute } from 'vue-router'
import NewDetail from '../NewsDetail.vue'

vi.mock('vue-router', () => {
  const actual = vi.importActual('vue-router')
  return {
    ...actual,
    createWebHistory: vi.fn(),
    createRouter: vi.fn(),
    useRoute: vi.fn(),
    useRouter: vi.fn(() => ({
      push: vi.fn()
    }))
  }
})

describe('NewsDetail', () => {
  let store: Store<any>
  beforeEach(() => {
    store = createStore({
      state: {
        articles: [
          {
            id: 1,
            title: 'Article 1',
            description: 'Desc 1',
            content: 'Content 1',
            publishedAt: new Date(),
            urlToImage: 'https://example.com/image1.jpg'
          },
          {
            id: 2,
            title: 'Article 2',
            description: 'Desc 2',
            content: 'Content 2',
            publishedAt: new Date(),
            urlToImage: 'https://example.com/image2.jpg'
          }
        ],
        history: []
      },
      getters: {
        getArticleById: (state: any) => (id: any) => {
          return state.articles.find((article: any) => article.id === id)
        }
      },
      actions: {
        [ActionTypes.PUSH_TO_HISTORY]: vi.fn()
      }
    })
  })

  it('renders the correct article', async () => {
    ;(useRoute as Mock).mockImplementationOnce(() => ({
      params: {
        id: 1
      }
    }))
    const wrapper = customMount(NewDetail, store)
    expect(wrapper.text()).toContain('Article 1')
    expect(wrapper.text()).toContain('Desc 1')
    expect(wrapper.text()).toContain('Content 1')
  })

  it('truncates long titles', () => {
    ;(useRoute as Mock).mockImplementationOnce(() => ({
      params: {
        id: 1
      }
    }))
    store.state.articles[0].title = 'a'.repeat(101)
    const wrapper = customMount(NewDetail, store)
    expect(wrapper.text()).toContain(`${'a'.repeat(100)}...`)
  })

  it('adds the article to history on mount', async () => {
    store.dispatch = vi.fn()
    ;(useRoute as Mock).mockImplementationOnce(() => ({
      params: {
        id: 1
      }
    }))
    customMount(NewDetail, store)
    await nextTick()
    expect(store.dispatch).toHaveBeenCalledWith(ActionTypes.PUSH_TO_HISTORY, 1)
  })
})
