const router = require("express").Router();

/* get album names by title, id, release data and artist 
   I am using deezer api to do so
*/
router.get("/", async (req, res) => {
  let albums = [];
  let albumNum = 302127;

  for (let i = 0; i < 10; i++) {
    const response = await fetch(`https://api.deezer.com/album/${albumNum}`);
    const data = await response.json();
    try {
      albums.push({
        id: data.id,
        title: data.title,
        release_date: data.release_date,
        artist: data.artist.name
      });
    } catch (e) {
      albums.push({ error: "no data here" });
    }
    albumNum++;
  }

  res.json(albums);
});

module.exports = router;
