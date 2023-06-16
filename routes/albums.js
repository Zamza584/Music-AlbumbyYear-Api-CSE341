const { cookieJWTAuth } = require("../public/middlewares/cookieJWTAuth");
const router = require("express").Router();

/* get album names by title, id, release data and artist 
   I am using deezer api to do so
*/
let offset = 0;

router.get("/:year/:next?/:previous?", cookieJWTAuth, async (req, res) => {
  let selectedYear = req.params.year;
  let p = req.params;

  //to get token
  var clientId = process.env.CLIENT_ID; // Your client id
  var clientSecret = process.env.CLIENT_SECRET; // Your secret
  const tokenEndpoint = "https://accounts.spotify.com/api/token";

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", clientId);
  params.append("client_secret", clientSecret);

  const dataToken = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params
  });

  const data = await dataToken.json();
  var token = data.access_token;

  let year = selectedYear;

  let url;

  if (req.params.next === "next") {
    offset += 10;
    url = `https://api.spotify.com/v1/search?q=year%3A${year}&type=album&offset=${offset}&limit=10`;
  } else if (req.params.previous === "previous") {
    offset -= 10;
    if (offset < 0) {
      offset = 0;
    }
    url = `https://api.spotify.com/v1/search?q=year%3A${year}&type=album&offset=${offset}&limit=10`;
  } else {
    url = `https://api.spotify.com/v1/search?q=year%3A${year}&type=album&offset=0&limit=10`;
    offset = 0;
  }

  //access albums through spotify api
  let albumsData = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token
    }
  });
  let albums = await albumsData.json();
  let albumList = [];

  albumObj = albums.albums.items;
  for (let obj of albumObj) {
    albumList.push({
      name: obj.name,
      type: obj.album_type,
      artist: obj.artists[0].name,
      release_date: obj.release_date,
      image: obj.images[0].url
    });
  }
  res.send(albumList);
});

//used in index

router.get("/", cookieJWTAuth, async (req, res) => {

  var clientId = process.env.CLIENT_ID; // Your client id
  var clientSecret = process.env.CLIENT_SECRET; // Your secret
  const tokenEndpoint = "https://accounts.spotify.com/api/token";

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", clientId);
  params.append("client_secret", clientSecret);

  const dataToken = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params
  });
  const data = await dataToken.json();

  var token = data.access_token;

  let year = 2023;

  //access albums through spotify api
  let albumsData = await fetch(
    `https://api.spotify.com/v1/search?q=year%3A${year}&type=album&limit=10`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    }
  );
  let albums = await albumsData.json();
  let albumList = [];

  albumObj = albums.albums.items;
  for (let obj of albumObj) {
    albumList.push({
      name: obj.name,
      type: obj.album_type,
      artist: obj.artists[0].name,
      release_date: obj.release_date,
      image: obj.images[0].url
    });
  }
  res.render("albums", { albumList });
});

// function authenticateToken(req, res, next) {
//   const authHeader = req.cookies.token;
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, proces.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

module.exports = router;
