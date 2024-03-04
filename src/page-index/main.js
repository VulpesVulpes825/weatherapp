import './page.scss';
require('../css/main.scss')

const axios = require('axios');

const geoUrl = "https://api.openweathermap.org/geo/1.0/zip"
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather"
const apiKey = process.env.API_KEY;

const searchButton = document.querySelector(".search button");
const searchBox = document.querySelector(".search input");
const countryBox = document.querySelector(".search select");

function showWarning(text) {
    const warningArea = document.querySelector(".warning-area");
    warningArea.style.display = "block";
    warningArea.innerHTML = text;

}

function hideWarning() {
    document.querySelector(".warning-area").style.display = "none";
}

async function getWeather(zipCode, countryCode) {
    try {
        const geoResponse = await axios.get(geoUrl, {
            params: {
                zip: zipCode + "," + countryCode,
                appid: apiKey
            }
        });
        const geoJson = geoResponse.data;
        console.log(geoJson);

        const weatherResponse = await axios.get(weatherUrl, {
            params: {
                lat: geoJson.lat,
                lon: geoJson.lon,
                units: "metric",
                appid: apiKey
            }
        });

        const weatherJson = weatherResponse.data;
        console.log(weatherJson);

        return weatherJson;
    } catch (error) {
        console.error(error);
    }
}

function weatherIcon(status) {
    const weatherDiv = document.querySelector(".weather-icon > i")
    // List based on https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
    if (status === "Thunderstorm") {
        weatherDiv.className = "fa-solid fa-bolt-lightning";
    } else if (status === "Drizzle") {
        weatherDiv.className = "fa-solid fa-cloud-rain";
    } else if (status === "Rain") {
        weatherDiv.className = "fa-solid fa-cloud-showers-heavy";
    } else if (status === "Snow") {
        weatherDiv.className = "fa-solid fa-snowflake";
    } else if (status === "Atmosphere") {
        weatherDiv.className = "fa-solid fa-smog";
    } else if (status === "Clear") {
        weatherDiv.className = "fa-solid fa-sun";
    } else if (status === "Clouds") {
        weatherDiv.className = "fa-solid fa-cloud";
    }
}

countryBox.onchange = (event) => {
    const selectedCountryCode = event.target.value;
    if (selectedCountryCode === "us") {
        searchBox.pattern = "[0-9]{5}";
    } else if (selectedCountryCode === "ca") {
        searchBox.pattern = "([ABCEGHJKLMNPRSTVXY]\\d)([ABCEGHJKLMNPRSTVWXYZ]\\d){2}";
    }
}

searchButton.addEventListener("click", () => {
    if (!searchBox.checkValidity()) {
        showWarning("Zip Code Format is Incorrect");
        setTimeout(hideWarning, 4000);
    } else {
        getWeather(searchBox.value, countryBox.value).then((data) => {
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
            weatherIcon(data.weather[0].main);
            document.querySelector(".weather").style.display = "block";
        }).catch(function () {
            showWarning("There is something wrong with the api request");
            setTimeout(hideWarning, 4000);
        }) ;
    }
})


