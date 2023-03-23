const router = require('express').Router();
// const withAuth = require('../utils/auth');

// --- ADD withAuth in the future when we get to the login functionality--//
router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            // Pass the logged in flag to the template
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
module.exports = router;