import { expect } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

class ResizeObserver {
  callback?: ResizeObserverCallback

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
  }

  observe() {
    this.callback?.([], this)
  }

  unobserve() {
    this.callback = undefined
  }

  disconnect() {
    this.callback = undefined
  }
}

global.ResizeObserver = ResizeObserver
