export class WeatherListItem extends HTMLElement {

    constructor() {
        super();
    }
    connectedCallback() {

        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
            <style>
              p {
                text-align: center;
                font-weight: normal;
                padding: 1em;
                margin: 0 0 2em 0;
                background-color: #eee;
                border: 1px solid #666;
              }
            </style>
        
            <p>Hello!</p>`;

    }
}
