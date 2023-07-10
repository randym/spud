import express from 'express'
import os from 'os'
import fs from 'fs'
import { env } from './config'
import { middleware } from './middleware'
import { routes } from './routes'

const app = express()

middleware.apply(app)
routes.apply(app)

app.listen(3000, () => {
  if (env.DYNO) {
    fs.openSync('/tmp/app-initialized', 'w')
  }
  console.log(`Node app running on ${os.hostname}:3000`)
})
