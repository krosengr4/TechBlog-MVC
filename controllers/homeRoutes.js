const router = require('express').Router();
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/withAuth');

router.get('/', async (req, res) => {
    try {
    // Get all blogpost's and Join them w user data
    const blogPostData = await BlogPost.findAll({
        include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],
    })
    const blogPosts = blogPostData.map((post) => post.get({ plain:true }));

        // Pass serialized data and session flag into template
    res.render('homepage', { 
        blogPosts, 
        logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
    });

    router.get('/blogPost/:id', async (req, res) => {
        try {
          const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
              {
                model: User,
                attributes: ['name'],
              },
            ],
          });
      
          const blogpost = blogPostData.get({ plain: true });
      
          res.render('blogpost', {
            ...blogpost,
            logged_in: req.session.logged_in
          });
        } catch (err) {
          res.status(500).json(err);
        }
      });

  router.get('/profile', withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: {exclude: ['password'] },
        include: [{ model: BlogPost }],
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
    if (req.session.logged_in) {
      res.redirect('/profile');
      return; 
    }
    console.log('You clicked the login page');

    res.render('login');
  });

  module.exports = router;

