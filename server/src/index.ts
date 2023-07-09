import express from 'express'
import { env } from './config'
import { middleware } from './middleware'
import { routes } from './routes'
import os from 'os'
const app = express()
const { HOST = os.hostname, PORT = 3000 } = env

middleware.apply(app)
routes.apply(app)

app.listen(PORT, () => {
  console.log(`Server listening at http://${HOST}:${PORT}`)
})
