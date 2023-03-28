const router = require('express').Router();

// Import the custom middleware
const withAuth = require('../Utils/auth');

// --- ADD withAuth in the future when we get to the login functionality--//
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll()
        res.render('homepage', {
            products,
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

router.get('/category/:id', async (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    //   ---- add in models for category path to Database ----//
    try {
        const products = await Product.findAll({
            where: {
                category: req.params.category
            }
        })
        res.render('category', {
            products, 
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }

});
module.exports = router;