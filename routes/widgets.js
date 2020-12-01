/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // delete point on map

  router.post("/delete/:id/point", (req,res) => {
    db.deletePointInMap(pointId, (results) =>{
      console.log(results);
    })
    either (res.redirect('/');
  })

  //get current map by not login user
  router.get("/", (req,res)=>{
    // not login client
    render login page
    res.send or res.redirect
  })

  // get all maps by users
  router.get("/:id", (req,res)=>{
    db.getAllMapByUser
    res.send or res.redirect
  })

  // creat map
  router.post("/create", (req,res)+>{
    db.addMap
    res.send or res.redirect
  })

  // delete map
  router.post("/delete/:id", (req,res) =>{
    db.deleteSingleMap
    res.send or res.redirect

  }

