'use strict';

const API_KEY = 'at_M52PkOdz1D2dnUCdZmCJsAi8wNU9S';
const IP = '197.242.100.18';
const form = document.querySelector('.form');
const formInputEl = document.querySelector('.form__input');
const resultContainer = document.querySelector('.result');

const getCountryData = async function (ipAddress) {
  const res = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ipAddress}`
  );
  const data = await res.json();
  console.log(data.location);
  return data;
};

// getCountry(IP);

const renderMap = async function (ipAddress) {
  const data = await getCountryData(ipAddress);
  const { location } = await data;
  const { lat, lng } = await location;
  console.log(lat, lng);
  var map = L.map('map').setView([lat, lng], 13);
  /* L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map); */

  L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  }).addTo(map);

  var greenIcon = L.icon({
    iconUrl: './images/icon-location.svg',

    iconSize: [40, 40], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  });
  console.log(L);
  L.marker([lat, lng], { icon: greenIcon }).addTo(map);
  return [map, L];
};

const renderData = async function (ipAddress) {
  const data = await getCountryData(ipAddress);
  const html = `
  <div class="result__box">
    <h2 class="heading-secondary">IP Address</h2>
    <p class="result__text">${data.ip}</p>
  </div>
  <div class="result__box">
    <h2 class="heading-secondary">Location</h2>
    <p class="result__text">
    ${data.location.region}, 
    ${data.location.city} &nbsp; 
    ${data.location.postalCode}
    </p>
  </div>
  <div class="result__box">
    <h2 class="heading-secondary">Timezone</h2>
    <p class="result__text">UTC ${data.location.timezone}</p>
  </div>
  <div class="result__box">
    <h2 class="heading-secondary">ISP</h2>
    <p class="result__text">${data.isp}</p>
  </div>
  `;
  resultContainer.innerHTML = html;
};
const setMapView = async function (map, L, ipAddress) {
  const data = await getCountryData(ipAddress);
  const { location } = await data;
  const { lat, lng } = await location;
  console.log(lat, lng);

  map.setView([lat, lng], 13);

  var greenIcon = L.icon({
    iconUrl: './images/icon-location.svg',

    iconSize: [40, 40], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  });
  L.marker([lat, lng], { icon: greenIcon }).addTo(map);
};

window.addEventListener('load', async function () {
  const ipAddress = formInputEl.value;
  const [map, L] = await renderMap(ipAddress);
  renderData(ipAddress);

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const ipAddress = formInputEl.value;
    setMapView(map, L, ipAddress);
    renderData(ipAddress);
  });
});
