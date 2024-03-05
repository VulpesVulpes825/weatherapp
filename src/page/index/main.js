import './page.scss';

require('../../css/main.scss')

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
        import("../../js/weather.js").then(({getGeo, getWeather, weatherIcon}) => {
            getGeo(searchBox.value, countryBox.value).then((data) => {
                getWeather(data.lat, data.lon).then((data) => {
                    document.querySelector(".city").innerHTML = data.name;
                    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
                    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
                    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
                    const weatherDiv = document.querySelector(".weather-icon > i")
                    weatherDiv.className = weatherIcon(data.weather[0].main);
                    document.querySelector(".weather").style.display = "block";
                })}).catch(function () {
                showWarning("There is something wrong with the api request");
                setTimeout(hideWarning, 4000);
            });
        })
    }
})


