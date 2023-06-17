let year;
//this is used in the albums.ejs file.
//does fetching and displays to user.

document.querySelector("#year").addEventListener("change", async (e) => {
  year = e.target.value;
  let url = "https://album-by-year-api.onrender.com/" + `albums/${year}`;
  console.log(url);

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
    card.innerHTML = `<h2>${albums[i].name}</h2>
    <p>${albums[i].artist}</p>
    <p>${albums[i].release_date}</p>
    <img src=${albums[i].image} alt=${albums[i].name} album cover">`;
    i++;
  }
});

document.querySelector("#next").addEventListener("click", async (e) => {
  let year = document.querySelector("#year").value;
  let url = "https://album-by-year-api.onrender.com/" + `albums/${year}/next`;

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
    card.innerHTML = `<h2>${albums[i].name}</h2>
    <p>${albums[i].artist}</p>
    <p>${albums[i].release_date}</p>
    <img src=${albums[i].image} alt=${albums[i].name} album cover">`;
    i++;
  }
});
document.querySelector("#back").addEventListener("click", async (e) => {
  let year = document.querySelector("#year").value;
  let url = "https://album-by-year-api.onrender.com/" + `albums/${year}/null/previous`;

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
    card.innerHTML = `<h2>${albums[i].name}</h2>
    <p>${albums[i].artist}</p>
    <p>${albums[i].release_date}</p>
    <img src=${albums[i].image} alt=${albums[i].name} album cover">`;
    i++;
  }
});

let list = document.querySelectorAll(".favorites");
for (var i = 0; i < list.length; i++) {
  list[i].addEventListener("click", (e) => {
    console.log(e.target);
    const parentNode = e.target.parentNode;
    const children = Array.from(parentNode.childNodes);
    //used to get array items that have a name in it, specified in the html file.
    const elements = children.filter(
      (c) => c.className != "btn favorites" && c.nodeName != "#text"
    );

    let items = {};

    elements.forEach((element) => {
      items[element.getAttribute("name")] = element.getAttribute("value");
    });

    fetch("http://localhost:8000/albums/saveAlbum", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(items)
    });
  });
}
// addEventListener("click", async (e) => {
//   console.log(e.target)
//   const parentNode = e.target.parentNode;
//   const children = Array.from(parentNode.childNodes);

//   //used to get array items that have a name in it, specified in the html file.
//   const elements = children.filter((c) => c.className != "btn favorites" && c.nodeName != "#text");

//   let items = {};

//   elements.forEach((element) => {
//     items[element.getAttribute("name")] = element.getAttribute("value");
//   });

//   fetch("http://localhost:8000/albums/saveAlbum", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(items)
//   });
// });
