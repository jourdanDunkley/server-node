import { Router } from 'express';
import bcrypt from 'bcrypt';
import initialize from '../bootstrap/passport';
import passport from 'passport';
import { User } from "../entities/index";
import { logger } from "../common/utils/logger";

const router = Router();

router.get('/', checkAuthenticated, async(req, res) => {
  res.render('index.ejs', {name: req.user.name});
});

router.get('/login', checkNotAuthenticated, async(_, res) => {
  res.render('login.ejs');
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/register', checkNotAuthenticated, async(_, res) => {
  res.render('register.ejs');
});

router.post('/register', checkNotAuthenticated, async(req, res) => {
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = hashedPassword;
    await user.save();
    
    res.redirect('/login');
    console.log(await User.find());
  } catch {
    res.redirect('/register');
  }
});

router.delete('/logout', (req, res) => {
  req.logOut();
  return res.redirect('/login');
});

function checkAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }

  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return res.redirect('/');
  }
  next();
}

export default router;