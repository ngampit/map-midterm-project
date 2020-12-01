/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();




module.exports = (db) => {
//   router.get("/", (req, res) => {
//     db.query(`SELECT * FROM users;`)
//       .then(data => {
//         const users = data.rows;
// //        res.json({ users });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;

//  module.exports = (db) => {
  //   router.get("/", (req, res) => {
  //     res.render('index');
  //     //res.json({ users });
  //   });

  //   router.get("/login", (req, res) => {
  //     res.render('login');
  //   //        res.json({ users });
  //   });


  //   router.post("/login", (req, res) => {
  //     db.query(`SELECT * FROM users;`)
  //       .then(data => {
  //             const users = data.rows;
  //             // if ((!req.body.email) || (!req.body.password)) {
  //             // res.status(400).send('No input entry');
  //             // }
  //             if ((req.body.email)||(req.body.password)){
  //             res.render('map1')};
  //   //          res.json({ users });
  //           })
  //           .catch(err => {
  //             res
  //               .status(500)
  //               .json({ error: err.message });
  //           });
  //   });



  //     //   const getUserByEmail = function(email, database) {
  //     //     //  console.log("finding user by email");
  //     //   for (user in database) {
  //     // //    console.log(user);
  //     //     if (database[user].email === email) {
  //     //        return database[user];
  //     //     }
  //     //   }
  //     //   return undefined;
  //     // };


  //     // let foundUser = getUserByEmail(req.body.email, users);
  //     //   if (!foundUser) {
  //     //     res.status(403).send(`no user found for user ID ${req.body.email}`);
  //     //   } else {
  //     //     const password = req.body.password;
  //     //     const hashedPassword = bcrypt.hashSync(password, 10);
  //     //     if (bcrypt.compareSync(foundUser.password, hashedPassword)){
  //     //       req.session.user_id = users[user].id;
  //     //       res.redirect('/urls');
  //     // //      console.log( req.body.password, hashedPassword);
  //     //     } else {
  //     // //      console.log( req.body.password, hashedPassword);
  //     //       res.status(403).send('no password match');
  //     //     }
  //     //   }
  //     // })


  return router;


};





