// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// app.get("/", (req, res) => {   // for later map project
//   res.render('map.ejs')
// });
// app.get("/", (req, res) => {
//   res.render("index");
// });


app.get("/", (req, res) => {
  res.render('index');
  //res.json({ users });
});

app.get("/login", (req, res) => {
  res.render('login');
//        res.json({ users });
});


app.post("/login", (req, res) => {
  db.query(`SELECT * FROM users;`)
    .then(data => {
          const users = data.rows;
          // if ((!req.body.email) || (!req.body.password)) {
          // res.status(400).send('No input entry');
          // }
          if ((req.body.email)||(req.body.password)){
          res.render('map1')};
//          res.json({ users });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
});



  //   const getUserByEmail = function(email, database) {
  //     //  console.log("finding user by email");
  //   for (user in users) {
  // //    console.log(user);
  //     if (users[user].email === email) {
  //        return users[user];
  //     }
  //   }
  //   return undefined;
  // };


  // let foundUser = getUserByEmail(req.body.email, users);
  //   if (!foundUser) {
  //     res.status(403).send(`no user found for user ID ${req.body.email}`);
  //   } else {
  //     const password = req.body.password;
  //     const hashedPassword = bcrypt.hashSync(password, 10);
  //     if (bcrypt.compareSync(foundUser.password, hashedPassword)){
  //       req.session.user_id = users[user].id;
  //       res.redirect('/urls');
  // //      console.log( req.body.password, hashedPassword);
  //     } else {
  // //      console.log( req.body.password, hashedPassword);
  //       res.status(403).send('no password match');
  //     }
  //   }
  // })

  // app.post("/logout", (req,res) => {
  //   //       res.clearCookie('user_id' );
  //     req.session = null;
  //     res.redirect('/')
  // })




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});



