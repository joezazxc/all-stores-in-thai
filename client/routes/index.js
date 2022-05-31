import axios from 'axios';
import { Router } from 'express';
import 'dotenv/config'
const router = Router();
const api_server = process.env.API_SERVER

/* GET home page. */
router.get('/', async (req, res, next) => {
  const { data: stores } = await axios.get(api_server + 'stores')

  if (req.session.user) {
    res.render('home', {
      title: "All Stores In Thai",
      stores: stores,
      subtitle: "Welcome to All Stores In Thai",
      user: req.session.user
    });
  } else {
    // Not logged in
    res.render('home', {
      title: "All Stores In Thai",
      stores: stores,
      subtitle: "Welcome to All Stores In Thai",
      user: null
    });
  }


});

router.get('/register', async (req, res, next) => {
  res.render('register')
});

router.post('/register', async (req, res, next) => {
  axios.post(api_server + 'users', req.body)
    .then(({data}) => {
     
      req.session.user = data.data;
      res.redirect('/');
    })
    .catch((err) => {
      if (Array.isArray(err.response.data.error.message)) {
        const errorArr = err.response.data.error.message
        const messageErr = errorArr.map(o => o.msg).toString()
        return res.render('error', { message: messageErr })
      }
      res.render('error', err.response.data.error)
    })
});

router.get('/login', async (req, res, next) => {
  res.render('login');
});

router.post('/login', async (req, res, next) => {
  axios.post(api_server + 'users/login', { username: req.body.username, password: req.body.password })
    .then((response) => {
      req.session.user = response.data;
      res.redirect('/');
    }).catch((err) => {
      if (Array.isArray(err.response.data.error.message)) {
        const errorArr = err.response.data.error.message
        const messageErr = errorArr.map(o => o.msg).toString()
        return res.render('error', { message: messageErr })
      }
      res.render('error', err.response.data.error)
    });
});

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

export default router;
