function loadAbout(data){
  containerElement.innerHTML = `
    <div class="row">
      <div>
          <h2 class="text-center text-primary" style="margin-top:40px; text-align:center">Welcome To Weather Map</h2>
          <p class="text-center" id="welcome-paragraph" style="text-align:center">OpenWeather is a team of IT experts and data scientists that has been practising deep weather data science since 2014. For each point on the globe, OpenWeather provides historical, current and forecasted weather data via light-speed APIs. Headquarters in London, UK.
          </p>
      </div>
    </div>
  
    <div class="col-container">
      <div class="col-third">
          <div class="info-icon"><img src ="./assets/images/sun-icon.png"/></div>
          <h3 class="text-center">Current Weather</h3>
          <p class="text-center">Access current weather data for any location on Earth including over 200,000 cities! We collect and process weather data from different sources such as global and local weather models, satellites, radars and vast network of weather stations.</p>
      </div>
      <div class="col-third">
          <div class="info-icon"><img src ="./assets/images/forecast-icon.png"/></div>
          <h3 class="text-center">5 Day Forecast</h3>
          <p class="text-center">5 day forecast is available at any location or city. It includes weather forecast data with 3-hour step.</p>
      </div>

      <div class="col-third">
          <div class="info-icon"><img src ="./assets/images/air-quality-icon.png"/></div>
          <h3 class="text-center">Air Pollution</h3>
          <p class="text-center">Besides basic Air Quality Index, the API returns data about polluting gases, such as Carbon monoxide (CO), Nitrogen monoxide (NO), Nitrogen dioxide (NO2), Ozone (O3), Sulphur dioxide (SO2), Ammonia (NH3), and particulates (PM2.5 and PM10).</p>
      </div>
    </div>
  `;
}