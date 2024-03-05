import template from "html-loader!./WeatherListItem.html";

export class WeatherListItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const el = document.createElement("template");
    const text = String.raw`${template}`;
    if (!text) throw new Error("No template.");
    el.innerHTML = text;

    const shadowRoot = this.attachShadow({ mode: "open" });
    const instance = el.content.cloneNode(true);
    shadowRoot.appendChild(instance);

    const lat = this.getAttribute("lat");
    const lon = this.getAttribute("lon");


    if (lat != null && lon != null) {
      import("../../js/weather.js").then(({ getWeather, weatherIcon }) => {
        getWeather(lat, lon)
          .then((data) => {
              this.shadowRoot.querySelector('.city').innerHTML = data.name;
              this.shadowRoot.querySelector('.temperature').innerHTML = Math.round(data.main.temp) + "°C";
              this.shadowRoot.querySelector('.weather-condition').innerHTML = data.weather[0].description;
              this.shadowRoot.querySelector('.weather-icon > i').className = weatherIcon(data.weather[0].main);
          })
          .catch(function (error) {
            console.log("Failed to fetch weather data: " + error);
          });
      });
    }
  }
}



customElements.define("weather-list-item", WeatherListItem);
