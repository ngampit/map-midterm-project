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
    const id = req.session.user_id

    if (!id) {
      return res.status(401).send('User/Password not authorized to access this page');
    }
    const data = {
      user_id: req.session.user_id,
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
    const id = req.session.user_id

    if (!id) {
      return res.status(401).send('User/Password not authorized to access this page');
    }
    const mapId = req.params.id;

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

  router.post("/edit/:map_id", (req, res) => {
    const mapId = req.params.map_id;
    return helper.getMapByID(mapId)
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

  // this one will be in frontend on Ajax
  router.post("/:map_id/create", (req, res) => {
    const id = req.session.user_id

    if (!id) {
      return res.status(401).send('User/Password not authorized to access this page');
    }
    const data = {
      map_id: req.params.map_id,
      user_id: req.session.user_id,
      title: req.body.title,
      lat: req.body.lat,
      long: req.body.lng,
      description: req.body.description
    }

    return helper.addMarker(data)

      .then(data => {
        res.render('map')
      }).catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });

  })

  router.post("/:map_id/delete/marker", (req, res) => {
    // const id = req.session && req.session.user_id?req.session.user_id:-1;
    const mapId = req.params.map_id;
    const data = {
                  marker_id : req.body.markerId

                 }

    helper.deleteMarker(data)
//      .then(res.send('maker deleted'))
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });

  })


  router.get("/:map_id", (req, res) => {
    const id = req.session.user_id

    if (!id) {
      return res.status(401).send('User/Password not authorized to access this page');
    }
      return res.render('map')

      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });
});


  router.get("/:map_id/json", (req, res) => {
    const map_id = req.params.map_id;

    return helper.getMapByID(map_id)
      .then((data) => {
        res.json(data)
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
    return helper.getMarkersByMapId(map_id)
      .then((data) => {
        const tempVars = {
          map_id: data.id,
          lat: data.center_lat,
          lng: data.center_long
        }
        res.json(data)
      }).catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });

  })

  // favorite marker

  router.post("/:id/favourite", (req, res) => {

    const map_id = req.params.id;
    const user_id = req.session.user_id;

    if (!user_id) {
      return res.status(401).send('User/Password not authorized to access this page');
    }

    return helper.markFavourite(map_id, user_id)
      .then(res.redirect("/"))

      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  })

  router.post("/:map_id/unfavourite", (req, res) => {
    const map_id = req.params.map_id;
    const user_id = req.session.user_id;

    if (!user_id) {
      return res.status(401).send('User/Password not authorized to access this page');
    }
    return helper.unmarkFavourite(map_id, user_id)
      .then(res.redirect("/"))

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

