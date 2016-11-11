import mongoose from 'mongoose'
import restify from 'restify'
import passport from 'passport'
import { Strategy } from 'passport-local'

const User = mongoose.model('User')

export default (server) => {
  server.use(passport.initialize())
  server.use(passport.session())

  // This is how a user gets serialized
  passport.serializeUser((user, done) => done(null, user.id))

  // This is how a user gets deserialized
  passport.deserializeUser((id, done) => done(null, {id:'123456', username:'john'}));

  passport.use(
    new Strategy(
      { usernameField: 'username', session: true },
      (username, password, done) => {
          User.auth(username, password)
          .then(user => {
            user ? done(null, user): done(null, false, { error: 'Incorrect username or password.' })
          })
      }
    )
  );
}
