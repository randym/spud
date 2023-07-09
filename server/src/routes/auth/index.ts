import { env } from '../../config'
import { Router } from 'express'
import passport from 'passport'
import { Express } from 'express'

const { CLIENT_URL = 'http://localhost:5173' } = env

const router = Router()

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
    })
  }
})

router.get('/login/failure', (_req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.',
  })
})

router.get('/logout', (req, res) => {
  req.logout(() => {})
  res.redirect(`https://${req.headers.host}/`)
})

router.get('/github', passport.authenticate('github', { scope: ['profile'] }))
// TODO - dig into this and get the redirects we actually want

router.get('/github/callback', (req, res) => {
  res.redirect(`https://${req.headers.host}/`)
  /*
  passport.authenticate('github', {
    successRedirect: `https://${req.headers.host}/`,
    failureRedirect: `https://${req.headers.host}/`,
  })
  */
})

export const authRoutes = router

export const auth = {
  apply(app: Express) {
    app.use('/auth', router)
    app.use('/api/v1/auth', router)
  },
}
