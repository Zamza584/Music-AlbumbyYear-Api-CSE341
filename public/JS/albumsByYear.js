let year;

document.querySelector("#year").addEventListener("change", async (e) => {
  year = e.target.value;
  let url = `http://localhost:8000/albums/${year}`;

  let response = await fetch(url);
  let albums = await response.json();
  console.log(albums[0].name);

  let albumCards = document.querySelectorAll(".album-container__card");

  let i = 0
  for (let card of albumCards) {
    card.innerHTML = `<h2>${albums[i].name}</h2>
    <p>${albums[i].artist}</p>
    <p>${albums[i].release_date}</p>
    <img src=${albums[i].image} alt=${albums[i].name} album cover">`;
    i++
  }
});

document.querySelector("#next").addEventListener("click", async (e) => { 
  let url = `http://localhost:8000/albums/${year}/next`;

  let response = await fetch(url);
  let albums = await response.json();
  console.log(albums[0].name);

  let albumCards = document.querySelectorAll(".album-container__card");

  let i = 0
  for (let card of albumCards) {
    card.innerHTML = `<h2>${albums[i].name}</h2>
    <p>${albums[i].artist}</p>
    <p>${albums[i].release_date}</p>
    <img src=${albums[i].image} alt=${albums[i].name} album cover">`;
    i++
  }

})
document.querySelector("#back").addEventListener("click", async (e) => { 
  let url = `http://localhost:8000/albums/${year}/null/previous`;

  let response = await fetch(url);
  let albums = await response.json();
  console.log(albums[0].name);

  let albumCards = document.querySelectorAll(".album-container__card");

  let i = 0
  for (let card of albumCards) {
    card.innerHTML = `<h2>${albums[i].name}</h2>
    <p>${albums[i].artist}</p>
    <p>${albums[i].release_date}</p>
    <img src=${albums[i].image} alt=${albums[i].name} album cover">`;
    i++
  }

})
