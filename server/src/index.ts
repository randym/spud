import express from 'express'
import path from 'path'
import os from 'os'
import fs from 'fs'

import { env } from './config'
import { middleware } from './middleware'
import { routes } from './routes'

const app = express()

const { HOST = os.hostname, PORT = 80, NODE_ENV = 'local' } = env

middleware.apply(app)
routes.apply(app)

/*
const distPath = path.resolve('../../client/dist/')
NODE_ENV !== 'local' && app.use(express.static(distPath))

app.use('/*', (req, rest) => {
  rest.redirect('/')
})
*/
// NGINX should forward all requests to anything non '/api/v1' to the client
// distribution and reqwrite /api/v1 to here

app.listen(PORT, () => {
  // Supposedly this will be set on heroku
  // perpaps there is a better way to check?
  if (env.DYNO) {
    console.log('This is running on Heroku')
    fs.openSync('/tmp/app-initialized', 'w')
  }
  console.log(`Node app running on ${HOST}:${PORT}`)
})
