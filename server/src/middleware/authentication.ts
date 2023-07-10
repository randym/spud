import { env } from '../config'
import { Express } from 'express'
import passport from 'passport'
import { Strategy, StrategyOptions } from 'passport-github2'
import { VerifyCallback } from 'passport-google-oauth20'

const {
  GITHUB_CLIENT_ID: clientID = '',
  GITHUB_CLIENT_SECRET: clientSecret = '',
  WHITE_LIST: invitees = '',
} = env

const options: StrategyOptions = {
  clientID,
  clientSecret,
  callbackURL: '/auth/github/callback', // this MUST match github oauth app redirect url
}

const isValidProfile = ({ username }: { username: string }) =>
  invitees.split(',').includes(username)

const verify = (
  _accessToken: string,
  _refreshToken: string,
  profile: any,
  done: VerifyCallback,
) => {
  process.nextTick(() => {
    const user = isValidProfile(profile) ? profile : null
    done(null, user, 'You need to request access to this application.')
  })
}

const strategy = new Strategy(options, verify)

passport.use(strategy)
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user: Express.User, done) => done(null, user))

export const authentication = {
  apply(app: Express) {
    app.use(passport.initialize())
    app.use(passport.session())
  },
}
