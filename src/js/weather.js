const axios = require("axios");

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

