import type { Article } from '@/types'

export interface TopHeadlinePayload {
  title: string
  id: number
}

export interface HistoryPayload extends Article {
  id: number
}
