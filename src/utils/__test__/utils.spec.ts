import { describe, vi, expect, it } from 'vitest'
// @ts-ignore
import colors from 'vuetify/lib/util/colors'
import { getRandomColor, hashUrl, debounce } from '../index'

describe('utils', () => {
  it('getRandomColor', () => {
    const colorKeys = Object.keys(colors).filter((key) => key !== 'shades')
    const randomColor = getRandomColor()
    const colorName = randomColor.split('-')[0]
    expect(colorKeys).toContain(colorName)
    expect(randomColor.endsWith('-darken-3')).toBe(true)
  })

  it('hashUrl', async () => {
    const hash = await hashUrl('https://example.com')
    expect(hash).toHaveLength(64)
    const checkHex = /^[0-9a-f]{64}$/
    expect(checkHex.test(hash)).toBe(true)
  })

  it('debounce', async () => {
    const func = vi.fn()
    const debouncedFunc = debounce(func, 1000)

    debouncedFunc()
    setTimeout(() => {
      expect(func).toBeCalledTimes(1)
    }, 1000)
  })
})
