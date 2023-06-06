// @ts-ignore
import { createStore, Store } from 'vuex'
import { describe, it, expect, beforeEach } from 'vitest'
import customMount from '@/test-utils'
import NewsCard from '@/features/TopHeadlines/NewsCard.vue'
import TopHeadlines from '../TopHeadlines.vue'

describe('TopHeadlines.vue', () => {
  let store: Store<any>
  beforeEach(() => {
    store = createStore({
      state: {
        news: []
      },
      getters: {
        latestNews: (state: any) => new Map(state.news.map((news: any) => [`${news.id}`, news]))
      }
    })
  })

  it('renders the component', () => {
    const wrapper = customMount(TopHeadlines, store)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the title correctly', () => {
    const wrapper = customMount(TopHeadlines, store)
    expect(wrapper.find('h1').text()).toBe('Top Headlines')
  })

  it('renders no news cards when there is no news', () => {
    const wrapper = customMount(TopHeadlines, store)
    expect(wrapper.findAllComponents(NewsCard).length).toBe(0)
  })

  describe('when there is news', () => {
    beforeEach(() => {
      store.state.news = [
        {
          id: '1',
          title: 'Title 1',
          description: 'Description 1',
          publishedAt: '2023-06-01',
          urlToImage: 'image1.jpg'
        },
        {
          id: '2',
          title: 'Title 2',
          description: 'Description 2',
          publishedAt: '2023-06-02',
          urlToImage: 'image2.jpg'
        }
      ]
    })

    it('renders the correct number of news cards', () => {
      const wrapper = customMount(TopHeadlines, store)
      expect(wrapper.findAllComponents(NewsCard).length).toBe(2)
    })

    it('passes the correct props to the news cards', () => {
      const wrapper = customMount(TopHeadlines, store)
      const newsCards = wrapper.findAllComponents(NewsCard)
      expect(newsCards[0].props()).toEqual({
        id: '1',
        title: 'Title 1',
        description: 'Description 1',
        publishedAt: '2023-06-01',
        urlToImage: 'image1.jpg'
      })
      expect(newsCards[1].props()).toEqual({
        id: '2',
        title: 'Title 2',
        description: 'Description 2',
        publishedAt: '2023-06-02',
        urlToImage: 'image2.jpg'
      })
    })
  })
})
