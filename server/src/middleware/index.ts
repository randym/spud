import { authentication } from './authentication'
import { session } from './session'
import { parser } from './parser'

import { Express } from 'express'

const stack = [session, authentication, parser]

export const middleware = {
  apply(app: Express) {
    stack.forEach((ware) => ware.apply(app))
  },
}
