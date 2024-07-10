// Replace with your actual API key
const apiKey = 'c2a318f31c504e8fa61103332240807 ';

const searchInput = document.getElementById('search-location');
const searchButton = document.getElementById('search-button');
const weatherInfo = document.getElementById('weather-info');

async function getWeatherData(location) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data.error) {
      weatherInfo.textContent = `Error: ${data.error.message}`;
    } else {
      const city = data.location.name;
      const temperature = data.current.temp_c;
      const weatherCondition = data.current.condition.text;
      const weatherIcon = data.current.condition.icon;

      // Get current local time at the searched location (assuming time zone info provided by API)
      const localTime = data.location.localtime;

      // Format the local time using toLocaleTimeString (optional: adjust format)
      const formattedTime = new Date(localTime).toLocaleTimeString('en-US', { hour12: true });

      // Display city, country, formatted time, and date
      weatherInfo.innerHTML = `
        <h3>${formattedTime} - ${city} (${data.location.country})</h3>
        <img src="${weatherIcon}" alt="${weatherCondition}">
        <p>Temperature: ${temperature}°C</p>
        <p>Weather: ${weatherCondition}</p>
      `;
    }
  } catch (error) {
    console.error(error);
    weatherInfo.textContent = 'Error fetching weather data.';
  }
}

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
    alert('Please enter a location to search.');
    return;
  }

  getWeatherData(searchTerm);
});
