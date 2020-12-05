/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
// const cookieSession = require('cookie-session');
// app.use(cookieSession({
//   name: 'session',
//   keys: ['secret']
// }));

module.exports = (helper) => {

  router.post("/", (req, res) => {
    // const id = req.session && req.session.user_id?req.session.user_id:-1;

    // if (id === -1) {
    //   return res.status(401).send('User/Password not authorized to access this page');
    // }
    const data = {
      user_id: req.session,
      title: req.body.title,
      center_lat: 43.70011,
      center_long: -79.4163,
      description: req.body.description
    }
    return helper.createNewMap(data)
      .then((data) => {
        res.redirect(`/api/widgets/${data.id}`);
      }).catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });

  })


  router.post("/:id/delete", (req, res) => {
    // const id = req.session && req.session.user_id?req.session.user_id:-1;

    // if (id === -1) {
    //   return res.status(401).send('User/Password not authorized to access this page');
    // }
    const mapId = req.params.id;
    console.log("this is req params", mapId)
    return helper.deleteMap(mapId)
      .then(res.redirect("/"))
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      })

  })

  // this one will be in frontend on Ajax
  router.post("/:map_id/create", (req, res) => {
    // const id = req.session && req.session.user_id?req.session.user_id:-1;

    // if (id === -1) {
    //   return res.status(401).send('User/Password not authorized to access this page');
    // }
    console.log(req)
    const data = {
      map_id: req.params.map_id,
      user_id: req.session,
      title: "title",
      lat: req.body.lng,
      long: req.body.lat,
      description: "test Description"
    }
    return helper.addMarker(data)

      .then(data => {
        const tempVars = {
          lat: center_lat,
          lng: center_long
        }

        res.render('map', tempVars)
      }).catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });

  })




  router.post("/:map_id/delete/:markerId", (req, res) => {
    const id = req.session && req.session.user_id?req.session.user_id:-1;

    // if (id === -1) {
    //   return res.status(401).send('User/Password not authorized to access this page');
    // }
    const marker_id = req.params.markerId;
    helper.deleteMarker(maker_id)
      .then(res.send('maker deleted'))
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });

  })


  router.get("/:map_id", (req, res) => {
    // const id = req.session && req.session.user_id?req.session.user_id:-1;

    // if (id === -1) {
    //   return res.status(401).send('User/Password not authorized to access this page');
    // }
    const map_id = req.params.map_id;
    console.log("line 127", map_id)
    return helper.getMapByID(map_id)
      .then((data) => {
        console.log("line 130", data);
        const tempVars = {
          map_id: data.id,
          lat: data.center_lat,
          lng: data.center_long
        }

        helper.getMarkersByMapId(map_id)
          .then((markers) => {
            tempVars["markers"] = markers
            console.log(tempVars);
            return res.render('map', tempVars)
          })
        //    res.send(tempVars);
        //    console.log(tempVars);
        // res.render('map', tempVars)
      }).catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });

  })

  router.get("/:id/markers", (req, res) => {

    const map_id = req.params.id;
    console.log("line 127", map_id)
    return helper.getMarkersByMapId(map_id)
      .then((data) => {
        console.log("line 130", data);
        const tempVars = {
          map_id: data.id,
          lat: data.center_lat,
          lng: data.center_long
        }
        console.log(data)
        //    res.send(tempVars);
        //    console.log(tempVars);
        res.json(data)
      }).catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });

  })


  // edit marker func pending !!!!



  // favorite marker
  router.post("/:map_id/favourite", (req, res) => {

    const map_id = req.params;
    const user_id = req.session;
    helper.markFavourite(map_id, user_id)
      .then(res.send('maker favorite'))
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  })




  router.post("/:map_id/unfavourite", (req, res) => {
    const id = req.session && req.session.user_id?req.session.user_id:-1;

    if (id === -1) {
      return res.status(401).send('User/Password not authorized to access this page');
    }
    const map_id = req.params;
    const user_id = req.session;
    helper.unmarkFavourite(map_id, user_id)
      .then(res.send('unfavorite marker'))
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  });


  return router;
}
