import { Router } from 'express'
import passport from 'passport'
import express from 'express'

const router = Router()

const root = (req: express.Request, res: express.Response) =>
  res.redirect(`https://${req.headers.host}/`)

const logout = (req: express.Request, res: express.Response) => {
  req.logout(() => {})
  res.redirect(`https://${req.headers.host}/`)
}

router.get('/user', (req, res) => {
  if (req.user) {
    res.status(200).json({
      user: req.user,
    })
  } else {
    res.status(401).json({})
  }
})

router.get('/logout', logout)

router.get('/github', passport.authenticate('github', { scope: ['profile'] }))

router.get('/github/callback', passport.authenticate('github', {}), root)

export const authRoutes = router

export const auth = {
  apply(app: express.Express) {
    app.use('/auth', router)
    // app.use('/api/v1/auth', router)
  },
}
