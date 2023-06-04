export interface TopHeadlineResponse {
  status: string
  totalResults: number
  articles: Article[]
}

export interface Article {
  source: Source
  author: null | string
  title: string
  description: null | string
  url: string
  urlToImage: null | string
  publishedAt: Date
  content: null | string
}

interface Source {
  id: null | string
  name: string
}
