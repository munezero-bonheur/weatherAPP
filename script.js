const apiKey = '8d09952163c64265900170544232907'; 

async function getWeatherData(location) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

function processWeatherData(data) {
  if (!data) return null;

  const processedData = {
    location: data.location.name,
    temperature: data.current.temp_c,
    description: data.current.condition.text,
    icon: data.current.condition.icon,
  };

  return processedData;
}

function displayWeatherInfo(weatherData) {
  if (!weatherData) {
    document.getElementById('weatherInfo').innerHTML = 'Weather data not available';
    return;
  }

  const weatherInfoElement = document.getElementById('weatherInfo');
  weatherInfoElement.innerHTML = `
    <h2>${weatherData.location}</h2>
    <p>Temperature: ${weatherData.temperature} °C</p>
    <p>Description: ${weatherData.description}</p>
    <img src="${weatherData.icon}" alt="Weather Icon">
  `;

  weatherInfoElement.style.display = 'block';
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const location = document.getElementById('locationInput').value;
  const weatherData = await getWeatherData(location);
  const processedData = processWeatherData(weatherData);
  displayWeatherInfo(processedData);
}

document.getElementById('weatherForm').addEventListener('submit', handleFormSubmit);
