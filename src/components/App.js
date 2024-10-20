import './styles/App.css';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import sunny from './assets/sunny.png';

function App() {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [weather, setWeather] = useState(null);
  const [hourly, setHourly] = useState(null);

  useEffect(() => {
    const apiKey = "";
    const city = "London";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    setWeather(Math.round(data.main.temp)); // Update state with temperature
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
    setWeather('N/A'); // Handle errors by setting weather to 'N/A'
  });
  }, []);

  useEffect(() => {
    const apiKey = "";
    const city = "London";
    const url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    setHourly(data.hourly.slice(0,12));
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
    setHourly('N/A');
  })
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const current = new Date();
      setTime(current.toLocaleTimeString());
      setDate(current.toLocaleDateString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app">
      <header className="header">
          Travel App
      </header>
      <body className="body">
        <div className="weather">
          {weather}
        </div>
        <div className="datetime">
          <div className="time">
            {time}
          </div>
          <div className="date">
            {date}
          </div>
        </div>
        <div className="hourly">
          <h2>Hourly Forecast:</h2>
          {sunny}
          
        </div>
      </body>
      <footer className="footer">
      </footer>
    </div>
  );
}

export default App;
