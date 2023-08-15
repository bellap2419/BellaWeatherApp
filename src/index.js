function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let seconds = now.getSeconds();
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  document.getElementById(
    `date`
  ).innerHTML = `${day}, ${month} ${date}, ${year} -  ${hour} : ${minute} : ${seconds}`;
}
let date = new Date();
formatDate(date);

//Temp links
function changeCelsius(event) {
  event.preventDefault();
  let todayTempNummber = document.querySelector("#ttn");
  todayTempNummber.innerHTML = "32";
}
let celsiusTemp = document.querySelector("#cTemp");
celsiusTemp.addEventListener("click", changeCelsius);

function changeFahrenheit(event) {
  event.preventDefault();
  let todayTempNummber = document.querySelector("#ttn");
  todayTempNummber.innerHTML = "90";
}
let fTemp = document.querySelector("#fTemp");
fTemp.addEventListener("click", changeFahrenheit);

//search bar and City Name
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  searchCity(cityInput.value);
}

//ciy Weather temp
function searchCity(city) {
  let units = "metric";
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#citySearch");
form.addEventListener("submit", search);

function showTemperature(response) {
  let cityName = document.querySelector("#cityName");
  cityName.innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#ttn");
  cityTemp.innerHTML = `${temp}`;
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lon=${lon}&lat=${lat}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let currBtn = document.querySelector("#currentLocationBtn");
currBtn.addEventListener("click", getCurrentLocation);
