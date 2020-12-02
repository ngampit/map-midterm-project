/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();



module.exports = (db) => {
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

   router.get("/", (req, res) => {
    let query = `SELECT * FROM markers limit 5`;
    db.query(query)
      .then(data => {
        const widgets = data.rows;
        const vancouver = {
                          lat : data.rows[0].center_lat,
                          lng : data.rows[0].center_lat
                          }
        res.json({widgets});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;

}



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

