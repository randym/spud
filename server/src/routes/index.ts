import { auth } from './auth'
import { openai } from './openai'
import { Express } from 'express'

export const routes = {
  apply(app: Express) {
    auth.apply(app)
    openai.apply(app)
  },
}
