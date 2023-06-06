import customMount from '@/test-utils'
import { describe, it, expect, vi } from 'vitest'
import NewsMenu from '../NewsMenu.vue'

describe('NewsMenu', () => {
  const propsData = {
    title: 'Test title',
    id: 'test-id'
  }

  it('renders without crashing', async () => {
    const wrapper = customMount(NewsMenu, undefined, {
      props: propsData
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should change a menu ref value when the button was clicked', () => {
    const wrapper = customMount(NewsMenu, undefined, {
      props: propsData
    })
    expect(wrapper.vm.menu).toBe(false)
    wrapper.find('[data-test="expand-toolbar-btn"]').trigger('click')
    expect(wrapper.vm.menu).toBe(true)
  })

  it('opens the dialog when dialog is true', async () => {
    const wrapper = customMount(NewsMenu, undefined, {
      props: propsData
    })
    expect(wrapper.vm.dialog).toBe(false)
    wrapper.vm.dialog = true
    expect(wrapper.vm.dialog).toBe(true)
    expect(wrapper.findComponent({ name: 'v-dialog' }).isVisible()).toBe(true)
  })
})
