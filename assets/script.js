async function displayForecast(city) {
    const API_KEY = '481eb4fe101dd3b7b6c1dd83891ed073';
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;
  
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
  
      // Extract the data for the 5 day forecast
      const forecastData = data.list.filter((weatherData, index) => index % 8 === 0);
  
      // Clear any existing forecast data from the page
      document.querySelector('#five-day-forecast').innerHTML = '';
  
      // Iterate through the forecast data and display the information for each day
      forecastData.forEach(dayData => {
        const date = new Date(dayData.dt * 1000).toLocaleDateString();
        const temperature = dayData.main.temp;
        const humidity = dayData.main.humidity;
        const windSpeed = dayData.wind.speed;
        const icon = dayData.weather[0].icon;
  
        // Create HTML elements to display the data
        const forecastContainer = document.querySelector('#forecast-container');
        const forecastCard = document.createElement('div');
        const dateElement = document.createElement('p');
        const temperatureElement = document.createElement('p');
        const humidityElement = document.createElement('p');
        const windSpeedElement = document.createElement('p');
        const iconElement = document.createElement('img');
  
        // Add the data to the HTML elements
        dateElement.textContent = `Date: ${date}`;
        temperatureElement.textContent = `Temperature: ${temperature}`;
        humidityElement.textContent = `Humidity: ${humidity}`;
        windSpeedElement.textContent = `Wind Speed: ${windSpeed}`;
        iconElement.src = `http://openweathermap.org/img/w/${icon}.png`;
  
        // Add the HTML elements to the forecast card
        forecastCard.appendChild(dateElement);
        forecastCard.appendChild(temperatureElement);
        forecastCard.appendChild(humidityElement);
        forecastCard.appendChild(windSpeedElement);
        forecastCard.appendChild(iconElement);
  
        // Add the forecast card to the forecast container
        forecastContainer.appendChild(forecastCard);
      });
    } catch (error) {
      console.error(error);
    }
  }