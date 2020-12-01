/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();



module.exports = (db) => {

  router.get('/', (req,res)=>{
    const UserID = req.session.user_id;
    if (!UserID) {
      return res.redirect('/login');
    }
    else if (UserID) {
    const templateVars = {
                           username: users[req.session.user_id]
                          };
    console.log(templateVars)
    return res.render("/index", templateVars);
    }
  })



  router.post("/login", (req,res) => {
    if ((!req.body.email) || (!req.body.password)) {
      res.status(400).send('No input entry');
    }

    const getUserByEmail = function(email, database) {
      //  console.log("finding user by email");
    for (user in database) {
  //    console.log(user);
      if (database[user].email === email) {
         return database[user];
      }
    }
    return undefined;
  };


  let foundUser = getUserByEmail(req.body.email, users);
    if (!foundUser) {
      res.status(403).send(`no user found for user ID ${req.body.email}`);
    } else {
      const password = req.body.password;
      const hashedPassword = bcrypt.hashSync(password, 10);
      if (bcrypt.compareSync(foundUser.password, hashedPassword)){
        req.session.user_id = users[user].id;
        res.redirect('/urls');
  //      console.log( req.body.password, hashedPassword);
      } else {
  //      console.log( req.body.password, hashedPassword);
        res.status(403).send('no password match');
      }
    }
  })

  router.post("/logout", (req,res) => {
    //       res.clearCookie('user_id' );
      req.session = null;
      res.redirect('/')
  })


  router.get("/register", (req,res)=> {
    res.render('/register');
  });

  router.post("/register", (req,res)=>{
    const new_id = generateRandomString(3);
    password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    users[new_id] = {  id : new_id,
                       email : req.body.email,
                       password : hashedPassword
                    }
    if ((!req.body.email) || (!req.body.password)) {
      res.status(400).send('No input entry')
    }
    for (user in users) {
      if (users[user].email.includes(req.body.email)) {
        res.status(400).send('this userId has already exist')
      }
      req.session.user_id = new_id;
      //   console.log(req.session.user_id)
      res.redirect('/')

    }
  })
  return router;

}



