import { expect } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'
import crypto from 'crypto'

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

Object.defineProperty(global.self, 'crypto', {
  value: {
    subtle: crypto.webcrypto.subtle
  }
})
