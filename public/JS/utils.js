async function getAlbums(url) {

  let albums;
  try {
    let response = await fetch(url);
    albums = await response.json();
  } catch {
    location.reload();
  }

  let albumCards = document.querySelectorAll(".album-container__card");
  let i = 0;
  for (let card of albumCards) {
    card.innerHTML = `<h2 name="albumName" value="${albums[i].name}">${albums[i].name}</h2>
    <p name="albumArtist" value="${albums[i].artist}"> ${albums[i].artist}</p>
    <p name="albumRelease" value="${albums[i].release_date}">${albums[i].release_date}</p>
    <a name="albumLink" value="${albums[i].spotify_link}" href="${albums[i].spotify_link}" target="_blank">Listen on Spotify</a>
    <p name="albumTTracks" value=${albums[i].total_tracks}>Total tracks: ${albums[i].total_tracks}</p>
    <button class="btn favorites">Add to favorites</button>
    <img name="albumImage" src="${albums[i].image}" value="${albums[i].image}" alt="${albums[i].name} album cover">`;

    // re-querying the DOM inside the loop
    let albumCardsUpdated = document.querySelectorAll(".album-container__card");
    albumCardsUpdated[i].addEventListener("click", function (e) {
      // Perform some action when the card is clicked
      const parentNode = e.target.parentNode;
      const children = Array.from(parentNode.childNodes);
      //used to get array items that have a name in it, specified in the html file.
      const elements = children.filter(
        (c) => c.className != "btn favorites" && c.nodeName != "#text"
      );

      let items = {};
      console.log(items);

      elements.forEach((element) => {
        items[element.getAttribute("name")] = element.getAttribute("value");
      });

      let url = window.location.href + `/saveAlbum`;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(items)
      });
    });
    i++;
  }
}

export { getAlbums };
