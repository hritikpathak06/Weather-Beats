
const apiKey = "4dc92fa3a5bbb7a7c7c527eb067f7d45";
const city = "Bhopal"; 
const weatherInfoElement = document.getElementById("weather-info");
const sendSongButton = document.getElementById("send-song");

async function fetchWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const weatherCondition = data.weather[0].main;
    displayWeather(data, weatherCondition);
  } catch (error) {
    weatherInfoElement.textContent = "Error fetching weather data";
  }
}

function displayWeather(data, weatherCondition) {
  weatherInfoElement.textContent = `Current Weather in ${data.name}: ${data.main.temp}°C, ${weatherCondition}`;


  const songRecommendation = getSongRecommendation(weatherCondition);


  sendSongButton.style.display = "block";
  sendSongButton.addEventListener("click", () =>
    sendSongOnWhatsApp(songRecommendation)
  );
}

function getSongRecommendation(weatherCondition) {
  let songUrl;
  switch (weatherCondition) {
    case "Clear":
      songUrl = "http://127.0.0.1:5500/assets/baarish.mp3";
      break;
    case "Rain":
      songUrl = "http://127.0.0.1:5500/assets/baarish.mp3";
      break;
    case "Clouds":
      songUrl = "http://127.0.0.1:5500/assets/tumhiho.mp3";
      break;
    case "Snow":
      songUrl = "http://127.0.0.1:5500/assets/tumhiho.mp3";
      break;
    default:
      songUrl = "http://127.0.0.1:5500/assets/tumhiho.mp3";
  }
  return songUrl;
}

function sendSongOnWhatsApp(songUrl) {
  const phoneNumber = prompt(
    "Enter your phone number (with country code)",
    "+91"
  );

  if (phoneNumber) {
    const message = `Check out this song for the weather! \nClick here to listen: ${songUrl}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  }
}

fetchWeather();
