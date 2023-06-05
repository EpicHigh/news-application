import type { Article } from '@/types'

export interface UpdatedTopHeadlinePayload {
  title: string
  id: string
}

export interface NewsPayload extends Article {
  id: number
}
