import './App.css';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import sunny from './assets/sunny.png';

function App() {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [weather, setWeather] = useState(null);
  const [hourly, setHourly] = useState(null);
  const [elizabeth, setElizabeth] = useState(null);
  const [district, setDistrict] = useState(null);
  const [hsc, setHsc] = useState(null);
  const [dlr, setDlr] = useState(null);
  

  useEffect(() => {
    const apiKey = "16d8e3c5008af8baa953fc589f693bb8";
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
    const apiKey = "16d8e3c5008af8baa953fc589f693bb8";
    const city = "London";
    const lat = "51.5072";
    const lon = "0.1276";
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
      const cutOffData = data.hourly.slice(0, 5);
      setHourly(cutOffData);
    })
    .catch(error => console.error('Error fetching weather data:', error));
}, []);

useEffect(() => { // tfl api
  const appKey = "534560f88f0d4660a3a5af1e030c8059";
  const url = `https://api.tfl.gov.uk/Line/elizabeth,district,hammersmith-city,dlr/Status?app_key=${appKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Here, 'data' is an array of line status objects
      const elizabethLine = data.find(line => line.id === 'elizabeth');
      const districtLine = data.find(line => line.id === 'district');
      const hammersmithCityLine = data.find(line => line.id === 'hammersmith-city');
      const dlrLine = data.find(line => line.id === 'dlr');

      // Set the state with the relevant information
      setElizabeth(elizabethLine ? elizabethLine.lineStatuses[0].statusSeverityDescription : 'No data');
      setDistrict(districtLine ? districtLine.lineStatuses[0].statusSeverityDescription : 'No data');
      setHsc(hammersmithCityLine ? hammersmithCityLine.lineStatuses[0].statusSeverityDescription : 'No data');
      setDlr(dlrLine ? dlrLine.lineStatuses[0].statusSeverityDescription : 'No data');
    })
    .catch(error => {
      console.error('Error fetching train status data:', error);
    });
}, []); // Make sure to include the dependency array


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
          {hourly ? (
            hourly.map((hourData, index) => (
              <div key={index} className="hour">
                <p>{new Date(hourData.dt * 1000).getHours()} {Math.round(hourData.temp)}°C</p>
              </div>
            ))
          ) : (
            <p>Loading hourly forecast...</p>
          )}
        </div>
      </body>
      <div className="tfl">
        <div className="trainStatus">
          <div className="title">
            Train Status
          </div>
          <div className="elizabeth">
            Elizabeth: {elizabeth}
          </div>
          <div className="district">
            District: {district}
          </div>
          <div className="hsc">
            HammerSmith & City: {hsc}
          </div>
          <div className="dlr">
            DLR: {dlr}
          </div>
        </div>
        <div className="buses">
          x
        </div>
      </div>
      <footer className="footer">
        07378daa5e3c481bb5b98029e0876b6b
      </footer>
    </div>
  );  
}

export default App;