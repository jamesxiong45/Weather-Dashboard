const API_KEY = "39a9a737b07b4b703e3d1cd1e231eedc";

let searchArray = JSON.parse(localStorage.getItem("last-search")) || [];

async function search(searchTerm) {

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=${API_KEY}`);
    const data = await res.json();


    document.getElementById('name').innerHTML = data.name;

    document.getElementById('temp').innerHTML = Math.floor(data.main.temp);

    document.getElementById('hum').innerHTML = data.main.humidity;

    document.getElementById('wind').innerHTML = data.wind.speed;

    const currentIcon = data.weather[0].icon;
    document.getElementById('current-icon').setAttribute("src", `http://openweathermap.org/img/wn/${currentIcon}@2x.png`);

    document.getElementById('description').innerHTML = data.weather[0].description;

    const uvRes = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_KEY}`);
    const uvData = await uvRes.json();
    document.getElementById('uvIndex').innerHTML = uvData.current.uvi;

    if (uvData.current.uvi < 3) {
      document.getElementById('uvIndex').classList.add("low-uv");
      document.getElementById('uvIndex').classList.remove("class", "moderate-uv");
      document.getElementById('uvIndex').classList.remove("class", "high-uv");
    } else if (uvData.current.uvi >= 3 && uvData.current.uvi <= 6) {
      document.getElementById('uvIndex').classList.add("class", "moderate-uv");
      document.getElementById('uvIndex').classList.remove("class", "low-uv");
      document.getElementById('uvIndex').classList.remove("class", "high-uv");
    } else {
      document.getElementById('uvIndex').classList.add("class", "high-uv");
      document.getElementById('uvIndex').classList.remove("class", "moderate-uv");
      document.getElementById('uvIndex').classList.remove("class", "low-uv");
    }

    const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=${API_Key}`);
    const forecastData = await forecastRes.json();
    const fiveDayArray = forecastData.list.filter(day => day.dt_txt.includes('12:00:00'));
    for (let i = 0; i < fiveDayArray.length; i++) {
      const date = new Date(fiveDayArray[i].dt_txt).toLocaleString().split(',')[0];
      const icon = fiveDayArray[i].weather[0].icon;
      const temperature = Math.floor(fiveDayArray[i].main.temp);
      const humidity = fiveDayArray[i].main.humidity;
      
      const dateCard = document.getElementById(`date-card-${i}`);
      dateCard.innerHTML = date;
    
      const iconImg = document.getElementById(`img-card-${i}`);
      iconImg.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
    
      const temperatureCard = document.getElementById(`temp-card-${i}`);
      temperatureCard.innerHTML = temperature;
    
      const humidityCard = document.getElementById(`hum-card-${i}`);
      humidityCard.innerHTML = humidity;
}}