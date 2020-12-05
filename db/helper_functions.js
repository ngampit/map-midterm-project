



module.exports = (pool) => {
  const helper = {};


const getAllMaps = function() {
  return pool.query(`SELECT * FROM maps WHERE created_at IS NOT NULL ORDER BY created_at DESC LIMIT 6;`)

  .then((res) =>{
    return res.rows;
  })
}
helper.getAllMaps = getAllMaps;

const getFavouritesMaps = function(user_id) {
  const query = `select fav_user_maps.user_id, map_id, maps.title as map_title,maps.created_at as map_creation, maps.description as map_description from fav_user_maps join maps on maps.id = map_id where fav_user_maps.user_id = $1 order by maps.created_at desc limit 6;`

  return pool.query(query, [user_id])
  .then((res) =>{
    return res.rows;
  })

}
helper.getFavouritesMaps = getFavouritesMaps;


const checkUserByEmail = function(email) {
  const query = `SELECT * FROM users WHERE email = $1`;

  return pool.query(query, [email])
  .then((res) =>{
    return res.rows[0];
  })
}
helper.checkUserByEmail = checkUserByEmail;



const createNewMap = function(data) {
  const user_id = data.user_id;
  const title = data.title;
  const center_lat = data.center_lat;
  const center_long = data.center_long;
  const description = data.description;

  query = `INSERT INTO maps (user_id, title, center_lat, center_long, description, created_at) VALUES ($1, $2, $3, $4, $5, now()) RETURNING *;`;

  return pool.query(query, [user_id, title, center_lat, center_long, description])
  .then((res) => {
    return res.rows[0];
  })
}
helper.createNewMap = createNewMap;


const deleteMap = function(id) {
  query = `DELETE FROM maps WHERE id = $1`;

  return pool.query(query, [id])
}
helper.deleteMap = deleteMap;


const getMapByID = function(map_id) {
  query = `SELECT * FROM maps
           WHERE id = $1 `

  return pool.query(query, [map_id])
  .then((res) => {
    return res.rows[0];
  })
}
helper.getMapByID = getMapByID;


const addMarker = function(data) {
  const map_id = data.map_id;
  const user_id = data.user_id;
  const title = data.title;
  const lat = data.lat;
  const long = data.long;
  const description = data.description;

  query = `INSERT INTO markers (map_id, user_id,title, lat, long, description, created_at) VALUES ($1, $2, $3, $4, $5, $6, now()) RETURNING *;`;

  return pool.query(query, [map_id, user_id, title, lat, long, description])
  .then((res) => {
    console.log(res.rows[0]);
    return res.rows[0];
  })
  .catch(err => {
    console.log(err)
  })
}
helper.addMarker = addMarker;



const deleteMarker = function(marker_id) {
  query = `DELETE FROM markers WHERE map_id = $1`;

  return pool.query(query, [marker_id])
}
helper.deleteMarker = deleteMarker;


const markFavourite = function(map_id, user_id) {
  query = `INSERT INTO fav_user_maps (map_id, user_id) VALUES ($1, $2);`;

  return pool.query(query, [map_id, user_id])
  .then((res) => {
    return res.rows[0];
  })
}
helper.markFavourite = markFavourite;


const getMarkersByMapId = function(map_id) {
  query = `SELECT * FROM markers
           WHERE map_id = $1 `

  return pool.query(query, [map_id])
  .then((res) => {
    return res.rows;
  })
}
helper.getMarkersByMapId = getMarkersByMapId;



const unmarkFavourite = function(map_id, user_id) {
  query = `DELETE FROM fav_user_maps VALUES where map_id = $1 and user_id = $2;`;

  return pool.query(query, [map_id, user_id])

}
helper.unmarkFavourite = unmarkFavourite;

return helper;
}
