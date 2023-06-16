let year;

document.querySelector("#year").addEventListener("change", async (e) => {
  year = e.target.value;
  let url = `http://localhost:8000/albums/${year}`;

  let albums;
  try {
    let response = await fetch(url);
    albums = await response.json();
  } catch {
    location.reload();
  }

  console.log(albums[0].name);

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
  let url = `http://localhost:8000/albums/${year}/next`;

  let albums;
  try {
    let response = await fetch(url);
    albums = await response.json();
  } catch {
    location.reload();
  }
  console.log(albums[0].name);

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
  let url = `http://localhost:8000/albums/${year}/null/previous`;

  let albums;
  try {
    let response = await fetch(url);
    albums = await response.json();
  } catch {
    location.reload();
  }
  console.log(albums[0].name);

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