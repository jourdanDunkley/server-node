import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from "../entities/index";

export default function(passport){
  passport.use(
    new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
      const user = await User.findOne({ where: { email }});
      await bcrypt.compare(password, user.password, (err, result) => {
        if(err) throw err;
        if(result === true){
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ where: { id }});
    done(null, user);
  });
}