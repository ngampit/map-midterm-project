/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();



module.exports = (helper) => {
  // router.get("/", (req, res) => {
  //   let query = `SELECT * FROM widgets`;
  //   console.log(query);
  //   db.query(query)
  //     .then(data => {
  //       const widgets = data.rows;
  //       res.json({ widgets });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });


   router.post("/:map_id", (req, res) => {
    const data = { user_id : req.session,
                   title : "title",
                   center_lat: 13.7563,
                   center_long:100.5018,
                   description: "test Description"
                  }
    helper.createNewMap(data)
    .then((data) => {
      const tempVars = {
         lat : center_lat,
         lng : center_long
      }
      res.render('map', tempVars)})
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

  })

   router.post("delete/:map_id", (req, res) => {
      const mapId = req.params;
      helper.deleteMap(mapId)
      .then(res.send("delete done"))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
   })

  })

   router.post("/edit/:map_id", (req, res) => {
      const mapId = req.params;
      helper.getMapByID(mapId)
      .then(data => {
        const tempVars = {
          lat : center_lat,
          lng : center_long
        }
      res.render('map', tempVars)})
      .catch(err => {
        res
           .status(500)
           .json({ error: err.message });
   });

   })


// this one will be in frontend on Ajax
   router.post("/:map_id/create/: markerId", (req, res) => {
    const data = {
      map_id : req.params.map_id,
      user_id : req.session,
      title : "title",
      center_lat: 13.7563,
      center_long:100.5018,
      description: "test Description"
     }
    helper.addMarker(mapId)

    .then(data => {
      const tempVars = {
        lat : center_lat,
        lng : center_long
      }
    res.render('map', tempVars)})
    .catch(err => {
      res
         .status(500)
         .json({ error: err.message });
 });

 })


 router.post("/:map_id/delete/:markerId", (req, res) => {
  const marker_id = req.params.markerId;
  helper.deleteMarker(maker_id)
  .then(res.send('maker deleted'))
  .catch(err => {
    res
       .status(500)
       .json({ error: err.message });
});

})

// edit marker func pending !!!!



// favorite marker
router.post("/:map_id/favorite", (req, res) => {
  const map_id = req.params;
  const user_id = req.session;
  helper.markFavourite(map_id, user_id)
  .then(res.send('maker favorite'))
  .catch(err => {
    res
       .status(500)
       .json({ error: err.message });
});

})



router.post("/:map_id/unfavorite", (req, res) => {
  const map_id = req.params;
  const user_id = req.session;
  helper.unmarkFavourite(map_id, user_id)
  .then(res.send('unfavorite marker'))
  .catch(err => {
    res
       .status(500)
       .json({ error: err.message });
});

})






//module.exports = (db) => {
  // delete point on map

  // router.post("/:map_id/point/:id", (req,res) => {
  //   let map_id = req.params.map_id;
  //   let pointId = req.params.id;
  //   db.deletePointInMap(pointId, (results) => {
  //     console.log(results);
  //   })
  //   res.redirect("/");
  // })
//}


  // //get current map by not login user
  // router.get("/", (req,res)=>{
  //   // not login client
  //   render login page
  //   res.send or res.redirect
  // })

  // // get all maps by users
  // router.get("/:id", (req,res)=>{
  //   db.getAllMapByUser
  //   res.send or res.redirect
  // })

  // // creat map
  // router.post("/create", (req,res)+>{
  //   db.addMap
  //   res.send or res.redirect
  // })

  // // delete map
  // router.post("/delete/:id", (req,res) =>{
  //   db.deleteSingleMap
  //   res.send or res.redirect

  // }

  return router;
}
