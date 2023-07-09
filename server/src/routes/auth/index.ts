import { env } from '../../config'
import { Router } from 'express'
import passport from 'passport'
import { Express } from 'express'

const { CLIENT_URL = 'http://localhost:5173' } = env

const router = Router()

router.get('/logout', (req, res) => {
  req.logout(() => {})
  res.redirect('/')
})

router.get('/github', passport.authenticate('github', { scope: ['profile'] }))

router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/',
  }),
)

export const authRoutes = router

export const auth = {
  apply(app: Express) {
    app.use('/auth', router)
    app.use('/api/v1/auth', router)
  },
}
