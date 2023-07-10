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
  } else {
    res.status(404).json({
      success: false,
      message: 'yeah, but no but yeah',
      user: '',
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

router.get(
  '/github/callback',
  // TODO - dig into this and get the redirects we actually want
  // same call to do two different things really smells like shite
  // we can redirect but we can see that the profile is not in the session
  // anyway - need to sleep

  passport.authenticate('github', {
    // successRedirect: `/`,
    // failureRedirect: `/`,
  }),
)

export const authRoutes = router

export const auth = {
  apply(app: Express) {
    app.use('/auth', router)
    app.use('/api/v1/auth', router)
  },
}
