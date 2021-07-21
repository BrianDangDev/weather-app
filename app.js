// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

const weather = {};
weather.temperature = {
    unit:"celsius"
}
const KELVIN = 273;

//API 
const key = "97a0fd3c240e0a154fd72aaf21977ed8";


//Check if browswe support geo location 
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browswer doesn't support geolocation </p>" ;
}

//set user position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}
function showError(error){
notificationElement.style.display = "block";
notificationElement.innerHTML = `<p>${error.message}</p>`;
}

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
fetch(api)
.then(function(response){
    let data = response.json();
    return data;
})
.then(function(data){
    weather.temperature.value = Math.floor(data.main.temp - KELVIN);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
})
.then(function(){
    displayWeather();
})
}

function displayWeather(){
iconElement.innerHTML = `<img src = "icons/${weather.iconId}.png"/>`;
tempElement.innerHTML = `${weather.temperature.value} °<span>C</span></p>`;
descElement.innerHTML = weather.description;
locationElement.innerHTML =`${weather.city}, ${weather.country}`;
}