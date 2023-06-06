import customMount from '@/test-utils'
import { describe, it, expect } from 'vitest'
import { format } from 'date-fns'
import NewsMenu from '../NewsMenu.vue'
import NewsCard from '../NewsCard.vue'

describe('NewsCard', () => {
  const propsData = {
    title: 'Test title',
    description: 'Test description',
    publishedAt: new Date().toISOString(),
    urlToImage: 'http://example.com/test.jpg',
    id: 'test-id'
  }

  it('renders without crashing', () => {
    const wrapper = customMount(NewsCard, undefined, { props: propsData })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the title, date, and description correctly', async () => {
    const wrapper = customMount(NewsCard, undefined, { props: propsData })

    expect(wrapper.find('.title').text()).toBe(propsData.title)
    expect(wrapper.find('.subtitle').text()).toBe(
      format(new Date(propsData.publishedAt), 'd MMMM yyyy')
    )
    await wrapper.trigger('mouseover')
    expect(wrapper.find('[data-test="news-description"]').text()).toBe(propsData.description)
  })

  it('renders the NewsMenu component with the correct props', () => {
    const wrapper = customMount(NewsCard, undefined, { props: propsData })
    const toolbar = wrapper.findComponent(NewsMenu)

    expect(toolbar.props()).toEqual({ id: propsData.id, title: propsData.title })
  })

  it('computes the card color correctly', () => {
    const wrapperNoImage = customMount(NewsCard, undefined, {
      props: { ...propsData, urlToImage: null }
    })
    const wrapperWithImage = customMount(NewsCard, undefined, { props: propsData })

    expect(wrapperNoImage.vm.cardColor).not.toBe('')
    expect(wrapperWithImage.vm.cardColor).toBe('')
  })

  it('expands and hides the content correctly', async () => {
    const wrapper = customMount(NewsCard, undefined, { props: propsData })

    expect(wrapper.vm.content).toBe(false)

    await wrapper.trigger('mouseover')
    expect(wrapper.vm.content).toBe(true)

    await wrapper.trigger('mouseleave')
    expect(wrapper.vm.content).toBe(false)

    await wrapper.trigger('focusin')
    expect(wrapper.vm.content).toBe(true)

    await wrapper.trigger('focusout')
    expect(wrapper.vm.content).toBe(false)
  })

  // Test Toolbar Teleport
  // it('renders the "Read" and "Edit" buttons', () => {
  //   const wrapper = customMount(NewsCard, undefined, { props: propsData })
  //   wrapper.getComponent(NewsMenu)
  //   // expect(wrapper.find('[data-test="expand-toolbar-btn"]').exists()).toBe(true)
  //   wrapper.find('[data-test="expand-toolbar-btn"]').trigger('click')
  //   console.log(wrapper.html())
  //   expect(wrapper.find('[data-test="read-toolbar-btn"]').exists()).toBe(true)
  // })
})
