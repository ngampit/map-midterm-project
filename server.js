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
const cookieSession = require('cookie-session');



// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
const helperMaker     = require('./db/helper_functions');
const helper = helperMaker(db);
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
app.use(cookieSession({
  name: 'session',
  keys: ['secret']
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(helper));
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
  const id = req.session && req.session.user_id?req.session.user_id:-1;

//  console.log(req);
  if(id === -1) {
     return helper.getAllMaps()
    .then((data)=> {
      const tempVars = {
         lat: data.center_lat,
         lng: data.center_long

      }
      res.render('index', tempVars)
    })
    .catch(err => {
      return res
        .status(500)
        .json({ error: err.message });
    });
  }
  return helper.getFavouritesMaps(id)
  .then((favouriteMaps)=>{



    const tempVars = {
      favouriteMaps

   }
   helper.getAllMaps()
   .then((allMaps) => {
    tempVars["allMaps"] = allMaps
    return res.render('user', tempVars)
   })

  }).catch(err => {
    return res
      .status(500)
      .json({ error: err.message });
  });
  })



app.get("/login", (req, res) => {
  res.render('login');
//        res.json({ users });
});


app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);

  return helper.checkUserByEmail(email)

    .then(data => {
      if (data.length === 0) {
        res.send("this email doesn't exist");
      }
      if (password !== data.password) {
        res.send("Password wrong");
      }
      req.session.user_id = data.id;
      res.redirect('/')
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
});

app.post("/logout", (req,res) => {
  req.session = null;
  res.redirect('/')
})



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
