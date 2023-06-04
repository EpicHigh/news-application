// @ts-ignore
import colors from 'vuetify/lib/util/colors'

function camelToKebab(camelCase: string) {
  return camelCase.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

function getRandomColor() {
  const colorKeys = Object.keys(colors).filter((key) => key !== 'shades')
  const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)]
  const kebabKey = camelToKebab(randomKey)
  return `${kebabKey}-darken-3`
}

export default getRandomColor
