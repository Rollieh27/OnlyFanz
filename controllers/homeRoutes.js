const router = require('express').Router();
const { Product, User } = require('../models');
// Import the custom middleware
const withAuth = require('../Utils/auth');

router.get('/', withAuth,async (req, res) => {
  try {
    const products = await Product.findAll()
    // This sucker is what we were missing---//
    const productData = products.map((product) => product.get({ plain: true }));
    console.log(productData)
    res.render('homepage', {
      productData,
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

// ---- Render Specific Category that are selected on the Nav bar by clicking --//
router.get('/fan/:category', async (req, res) => {
  try {
    const productsCall = await Product.findAll({
      where: {
        category: req.params.category
      }
    });
    const productData = productsCall.map((category) => category.get({ plain: true }));
    
    res.render('homepage', {
      productData,
      logged_in: req.session.logged_in,
  });
  } catch (err) {
    res.status(500).json(err);
  }
})


// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product }],
    });
    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;