import axios from 'axios'

console.log(import.meta.env, 'import.meta.env')

export default axios.create({
  baseURL: import.meta.env.VITE_NEWS_API_BASE_URL,
  params: {
    apiKey: import.meta.env.VITE_NEWS_API_KEY,
    country: 'th'
  }
})
