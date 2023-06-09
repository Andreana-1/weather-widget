let date = new Date();
let h2 = document.querySelector("h2");
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[date.getDay()];
h2.innerHTML = `${day} ${hours}:${minutes}`;

function displayWeather(response) {
  console.log(response);
  document.querySelector("#city-now").innerHTML = response.data.name;
  document.querySelector("#wrapper-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )} °C`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let localTemp = Math.round(response.data.main.temp);
  let temp = document.querySelector("#wrapper-temp");
  let localHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  let tempFeeling = Math.round(response.data.main.feels_like);
  let feeling = document.querySelector("#temp-feeling");
  let iconElement = document.querySelector("#main-icon");
  let maxTemp = Math.round(response.data.main.temp_max);
  let highTemps = document.querySelector("#temp-max");
  let celsius = document.querySelector("#wrapper-temp");
  let celsiusConversion = Math.round(response.data.main.temp);
  let fahrenheit = document.querySelector("#wrapper-temp");
  let fahrenheitConversion = Math.round(response.data.main.temp);

  fahrenheit.innerHTML = `${fahrenheitConversion}`;

  celsius.innerHTML = `${celsiusConversion}`;
  highTemps.innerHTML = `${maxTemp}`;
  temp.innerHTML = `${localTemp}`;
  humidity.innerHTML = `${localHumidity}`;
  feeling.innerHTML = `${tempFeeling}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function search(event) {
  event.preventDefault();
  let apiKey = "a2dda52dce059eb8a14e95aaa0db6ab7";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function searchCity(city) {
  let apiKey = "a2dda52dce059eb8a14e95aaa0db6ab7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

function searchMyLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a2dda52dce059eb8a14e95aaa0db6ab7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(searchMyLocation);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentPosition);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#wrapper-temp");
  temperatureElement.innerHTML = `${celsiusConversion}`;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#wrapper-temp");
  temperatureElement.innerHTML = `${fahrenheitConversion}`;
}

{
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", convertToCelsius);
}
{
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
}
