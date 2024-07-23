function updateWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature =  response.data.temperature.current;
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
let windSpeedElement = document.querySelector("#windSpeed");
let timeElement = document.querySelector("#time");
let date = new Date(response.data.time * 1000);
let iconElement = document.querySelector("#icon");
let cityElement = document.querySelector("#city");

iconElement.innerHTML = `<img src= "${response.data.condition.icon_url}" class="weather-app-icon" />`;
temperatureElement.innerHTML = Math.round(temperature);
cityElement.innerHTML = response.data.city;
 descriptionElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML = `${response.data.temperature.humidity}%` 
windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
timeElement.innerHTML = formatDate(date);

getForecast(response.data.city);}
 


function formatDate(date){
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

    let day = days[date.getDay()];
if (minutes < 10){minutes = `0${minutes}`;}

    return `${day} ${hours}:${minutes}`;
}

function searchCity(city){
    let apiKey= "d324164f4b20a2b7oa3417dta85e424d";
    let apiUrl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(updateWeather);}





function handleSearchSubmit(event) {event.preventDefault();
let searchInput = document.querySelector("#input");

searchCity(searchInput.value);}

function getForecast(city) {
   let apiKey ="d324164f4b20a2b7oa3417dta85e424d";
   let apiUrl =`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios(apiUrl).then(displayForecast);
}

function displayForecast() {
   let days=["Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
   let forecastHTML = "";

   days.forEach(function (day){

    forecastHTML = forecastHTML + `
   <div class= "weather-forecast-day">
    <div class="weather-forecast-date">${day}</div>
    <div class="weather-forecast-icon">🌧️</div>
    <div class="weather-forecast-temps">
    <div class="temp">
        <strong>17°</strong></div>
    <div class="temp">8°</div>
    </div>
</div>`;
   });
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHTML;}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);




