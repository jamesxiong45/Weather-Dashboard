async function displayForecast(city) {
    const API_KEY = '481eb4fe101dd3b7b6c1dd83891ed073';
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;