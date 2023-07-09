import bodyParser from 'body-parser'
import { Express } from 'express'

export const parser = {
  apply(app: Express) {
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
  },
}
