import axios from 'axios'
import qs from 'qs'

export default axios.create({
  baseURL: import.meta.env.VITE_NEWS_API_BASE_URL,
  params: {
    apiKey: import.meta.env.VITE_NEWS_API_KEY
  },
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'comma' })
  }
})
