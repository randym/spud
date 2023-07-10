import { Router } from 'express'
import { OpenAI } from '../../lib/openai'
import { Express } from 'express'

const router = Router()

router.post('/completion', authenticated, async (req, res) => {
  try {
    const completion = await OpenAI.complete(req.body.prompt)
    res.status(200).send(completion)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})

function authenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).send('Unauthorized')
}

export const openai = {
  apply(app: Express) {
    app.use('/openai', router)
  },
}
