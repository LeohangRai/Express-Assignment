const express = require('express');
const router = express.Router();
const forecast = require('../controllers/forecast')


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(res.locals.success_message);
  res.render('index/index', { title: 'Home' });
});


// About page
router.get('/about', (req, res) => {
  res.render('index/about', { title: 'About' })
})

// Weather forecast
router.route('/weather')
  .get((req, res) => {
    res.render('weather/weather', { title: 'Weather forecast' })
  })

  .post((req, res) => {
    const location = req.body.location;

    forecast(location, (error, forecast) => {
      if (error){         
        req.flash('error-message', error)
        res.redirect('weather')
      }
      else {
        req.flash('success-message', forecast)
        res.redirect('weather')
      }   
    })    
  })

module.exports = router;
