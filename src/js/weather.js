const axios = require("axios");

const geoUrl = "https://api.openweathermap.org/geo/1.0/zip"
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather"
const apiKey = process.env.API_KEY;

export async function getWeather(lat, lon) {
    try {
        const weatherResponse = await axios.get(weatherUrl, {
            params: {
                lat: lat,
                lon: lon,
                units: "metric",
                appid: apiKey
            }
        });
        console.log(weatherResponse.data);
        return weatherResponse.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getGeo(zipCode, countryCode) {
    try {
        const geoResponse = await axios.get(geoUrl, {
            params: {
                zip: zipCode + "," + countryCode,
                appid: apiKey
            }
        });
        return geoResponse.data;
    } catch (error) {
        console.error(error);
    }
}

export  function weatherIcon(status) {
    // List based on https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
    if (status === "Thunderstorm") {
        return "fa-solid fa-bolt-lightning";
    } else if (status === "Drizzle") {
        return "fa-solid fa-cloud-rain";
    } else if (status === "Rain") {
        return "fa-solid fa-cloud-showers-heavy";
    } else if (status === "Snow") {
        return "fa-solid fa-snowflake";
    } else if (status === "Atmosphere") {
        return "fa-solid fa-smog";
    } else if (status === "Clear") {
        return "fa-solid fa-sun";
    } else if (status === "Clouds") {
        return "fa-solid fa-cloud";
    } else if (status === "Mist") {
        return "fa-solid fa-water";
    }
}

