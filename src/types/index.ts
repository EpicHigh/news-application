export interface TopHeadlineResponse {
  status: string
  totalResults: number
  articles: Article[]
}

export interface Article {
  source: Pick<Source, 'id' | 'name'>
  author: null | string
  title: string
  description: null | string
  url: string
  urlToImage: null | string
  publishedAt: string
  content: null | string
}

export interface SourceListResponse {
  status: string
  sources: Source[]
}

export interface Source {
  id: string
  name: string
  description: string
  url: string
  category: Category
  language: string
  country: string
}

export enum Category {
  Business = 'business',
  Entertainment = 'entertainment',
  General = 'general',
  Health = 'health',
  Science = 'science',
  Sports = 'sports',
  Technology = 'technology'
}
