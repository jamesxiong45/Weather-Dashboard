async function displayForecast(city) {
    const API_KEY = '481eb4fe101dd3b7b6c1dd83891ed073';
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;
    
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const forecastData = data.list.filter((weatherData, index) => index % 8 === 0);
        const forecastContainer = document.querySelector('#forecast-container');
        const forecastCard = document.createElement('div');
        const dateElement = document.createElement('p');
        const temperatureElement = document.createElement('p');
        const humidityElement = document.createElement('p');
        const windSpeedElement = document.createElement('p');
        const iconElement = document.createElement('img');