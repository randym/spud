import { Express } from 'express'
import ExpressSession from 'express-session'
import { env } from '../config'

const { SESSION_SECRET: secret = 'configure this' } = env

const expressSession = ExpressSession({
  secret,
  resave: false,
  saveUninitialized: false,
})

export const session = {
  apply(app: Express) {
    app.use(expressSession)
  },
}
