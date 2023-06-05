import axios from 'axios'

export default axios.create({
  baseURL: import.meta.env.VITE_NEWS_API_BASE_URL,
  params: {
    apiKey: import.meta.env.VITE_NEWS_API_KEY,
    country: 'us'
  }
})
