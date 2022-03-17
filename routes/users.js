const express = require('express');
const router = express.Router();
const fs = require('fs')

/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile('users.json', (err, data) => {
    if(err) {
        console.log("Error reading file: \n", err)
    }
    else {
        let parsed = JSON.parse(data)
        console.log(typeof parsed)
        res.render('users/users', { users: parsed, title: "Users" });
    }
  })
  
});


// Add new user
router.route('/register') 
  .get((req, res) => {
    res.render('users/register', { title: 'Add user' })
  })

  .post((req, res) => {
    const userData = {
      username: req.body.username,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      language: req.body.language
    }

    // read and store the user form data in "users.json" file
    fs.readFile('users.json', (err, data) => {
      if (err) {
        return console.log(err)
      }
      let users = JSON.parse(data)
      users.push(userData)
      newUsers = JSON.stringify(users)
      
      fs.writeFile('users.json', newUsers, (err) => {
          if(err) {console.log("Error writing data on the file")}
          else {
              console.log("User added succesfully")
              res.redirect('/users')
          }                        
      })
    })
  })

module.exports = router;
