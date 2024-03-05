require("../../css/main.scss");
import "./style.scss";
import "../../component/WeatherListItem/WeatherListItem";

const locations = [
    {
        "lat": 47.61101,
        "lon": -122.33352
    },
    {
        "lat": 37.70740,
        "lon": -122.45870
    },
    {
        "lat": 33.97359,
        "lon": -118.24790
    },
    {
        "lat": 40.75080,
        "lon": -73.99612
    },
    {
        "lat": 31.224361,
        "lon": 121.469170
    },
    {
        "lat": 35.652832,
        "lon": 139.839478
    }
]

let i = 0;

const weatherList = document.querySelector(".weather-list");

for (; i < locations.length - 3; i++) {
    createNode(locations[i].lat, locations[i].lon);
}

while (i < locations.length) {
    createNode(locations[i].lat, locations[i].lon);
    i++;
}

function createNode(lat, lon) {
    const cell = document.createElement("weather-list-item");
    cell.setAttribute('lat', lat);
    cell.setAttribute('lon', lon);
    weatherList.appendChild(cell);
}
