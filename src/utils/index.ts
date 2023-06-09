// @ts-ignore
import colors from 'vuetify/lib/util/colors'

function camelToKebab(camelCase: string) {
  return camelCase.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

export function getRandomColor() {
  const colorKeys = Object.keys(colors).filter((key) => key !== 'shades')
  const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)]
  const kebabKey = camelToKebab(randomKey)
  return `${kebabKey}-darken-3`
}

export async function hashUrl(url: string) {
  const msgUint8 = new TextEncoder().encode(url)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export function debounce(func: Function, wait: number, immediate?: boolean) {
  let timeout: NodeJS.Timeout | undefined | number
  return () => {
    // @ts-ignore
    const context = this
    // eslint-disable-next-line prefer-rest-params
    const args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = undefined
      if (!immediate) func.apply(context, args)
    }, wait)
    if (immediate && !timeout) func.apply(context, args)
  }
}
