function loadCurrentWeather(data, unit){
  let dateInfo = timeConverter(data.dt);
  containerElement.innerHTML = `
      <div class="widget">
        <div class="left-panel panel">
            <div class="date">
                ${dateInfo['weekday']}, ${dateInfo['day']} ${dateInfo['month']} ${dateInfo['year']}
            </div>
            <div class="city">
                ${data.name}
            </div>
            <div class="temp">
                <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="" width="100">
               ${parseInt(data.main.temp, 10)} ${this.temp[unit]}
            </div>
            <table>
              <caption>${data.weather[0].description}</caption>
              <thead>
                <tr>
                  <th scope="col">Cloudiness</th>
                  <th scope="col">Humidity</th>
                  <th scope="col">Wind Speed</th>
                  <th scope="col">Wind Direction</th>
                  <th scope="col">Pressure</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Cloudiness">${data.clouds.all} %</td>
                  <td data-label="Humidity">${data.main.humidity} %</td>
                  <td data-label="WindSpeed">${data.wind.speed} ${this.speed[unit]}</td>
                  <td data-label="WindDirection">${data.wind.deg} &#176</td>
                  <td data-label="Pressure">${data.main.pressure} hPa</td>
                </tr>
              </tbody>
            </table>
        </div>
    </div>

  `;
}