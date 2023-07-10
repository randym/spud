import express from 'express'
import fs from 'fs'
import { env } from './config'
import { middleware } from './middleware'
import { routes } from './routes'

const app = express()
const port = env.API_SERVCER_PORT || 3000
const host = env.API_SERVER || 'localhost'

middleware.apply(app)
routes.apply(app)

app.listen(port, () => {
  env.DYNO && fs.openSync('/tmp/app-initialized', 'w') // see heroku-buildback-nginx
  console.log(`Node app running on ${host}:${port}`)
})
