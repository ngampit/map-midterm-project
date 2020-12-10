=========
## WELCOME TO MAPPER
Mapper utilizes the Google Maps API to allow users to:
- Allow users to create and save maps with custom markers, each marker having its own title & description
- Users can favourite their own or other user generated maps
- Users can contribute to other users maps and can view which maps they have contributed to

This project utilizes Express, NodeJS, PostgresQL, Jquery, Bootstrap and SASS.



Users can create and delete custom markers to there own or other users maps

!["GIF of creating a new marker and then deleting it"](https://github.com/ngampit/map-midterm-project/blob/master/Docs/Create-Delete-Marker.gif?raw=true)

Users can Favourite, and Contribute to other user's maps

!["GIF of Favouriting / Editing map"](https://github.com/ngampit/map-midterm-project/blob/master/Docs/Favourite_Delete%20Map.gif?raw=true)


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x



