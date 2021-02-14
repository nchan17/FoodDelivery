let loadingElement = document.getElementById('loading');
let containerElement = document.getElementById('js-container');

let key = '&appid=cbdd233385e363394315c521d7b568d9';
let rootUrl = 'https://api.openweathermap.org/data/2.5/';
// rootUrl = 'https://cors-anywhere.herokuapp.com/' + rootUrl;

let baseCity = 'Tbilisi'
let baseUnit = 'metric'


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

function loadCurrentWeather(data){
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
               ${parseInt(data.main.temp, 10)}&deg;
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
                  <td data-label="Cloudiness">${data.clouds.all}%</td>
                  <td data-label="Humidity">${data.main.humidity}mm</td>
                  <td data-label="WindSpeed">${data.wind.speed}kmh</td>
                  <td data-label="WindDirection">${data.wind.deg}&#176</td>
                  <td data-label="Pressure">${data.main.pressure}hpa</td>
                </tr>
              </tbody>
            </table>
        </div>
    </div>

  `;
  console.log(data);
}

function loadForecast(data){
  let sortedForecast = getSortedForecast(data.list);
  let resultHTML = '';
  for (i = 0; i < sortedForecast.length; i++) {
    elem = sortedForecast[i];
    resultHTML+=`
      <div class="widget">
        <div class="left-panel panel">
            <table>
              <caption>${elem['weekDay']}</caption>
              <thead>
                <tr>
                  <th scope="col">time</th>
                  <th scope="col">description</th>
                  <th scope="col">visual</th>
                  <th scope="col">temp</th>
                </tr>
              </thead>
              `;
              for(j=0; j < elem['dayForecast'].length; j++){
                let singleWeather = elem['dayForecast'][j];
                resultHTML+=`
                <tbody>
                  <tr>
                    <td data-label="time">${timeConverter(singleWeather.dt)['hour']}</td>
                    <td data-label="desc">${singleWeather.weather[0].description}</td>
                    <td data-label="visual"><img src="https://openweathermap.org/img/w/${singleWeather.weather[0].icon}.png"></td>
                    <td data-label="temp">${parseInt(singleWeather.main.temp, 10)}&#176;C</td>
                  </tr>
                </tbody>`;
              }
    resultHTML+=`         
            </table>
        </div>
    </div>
      `;
  }
  
  containerElement.innerHTML = resultHTML;
  console.log(data);
}


function loadAir(data){
  let baseData = data.list[0].components
  var icon = "./assets/images/";
  var desc = " - Air Quality is ";
  switch (data.list[0].main.aqi){
    case 1: 
      icon += "shield.png";
      desc += "Good";
      break;
    case 2:
      icon += "guarantee.png";
      desc += "Fair";
      break;
    case 3:
      icon += "warning.png";
      desc += "Moderate";
      break;
    case 4:
      icon += "shield-negative.png";
      desc += "Poor";
      break;
    case 5:
      icon += "nuclear.png";
      desc += "Very Poor";
      break;

  }
  var mycity = localStorage.getItem("currentCity");
  console.log(baseCity);
  console.log(mycity);
  if(mycity == null || mycity==""){
    mycity = baseCity;
  }
  let resultHTML = `
  <div class="widget">
                <div class="left-panel panel">
                    <div style="text-align: center">
                        <img src="${icon}">
                    </div>
                    <table>
                      <caption>${mycity} ${desc}</caption>
                      <thead>
                        <tr>
                          <th scope="CO">Carbon monoxide</th>
                          <th scope="NO">Nitrogen monoxide</th>
                          <th scope="NO2">Nitrogen dioxide</th>
                          <th scope="O3">Ozone</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td data-label="CO">${baseData.co} &micro;g/m&sup3;</td>
                          <td data-label="NO">${baseData.no} &micro;g/m&sup3;</td>
                          <td data-label="NO2">${baseData.no2} &micro;g/m&sup3;</td>
                          <td data-label="O3">${baseData.o3} &micro;g/m&sup3;</td>
                        </tr>
                      </tbody>
                    </table>
                    <table>
                      <thead>
                        <tr>
                            <th scope="SO2">Sulphur dioxide</td>
                            <th scope="PM 2.5">Fine particles matter</td>
                            <th scope="PM 10">Coarse particulate matter</td>
                            <th scope="NH3">Ammonia</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td data-label="SO2">${baseData.so2} &micro;g/m&sup3;</td>
                          <td data-label="PM 2.5">${baseData.pm2_5} &micro;g/m&sup3;</td>
                          <td data-label="PM 10">${baseData.pm10} &micro;g/m&sup3;</td>
                          <td data-label="NH3">${baseData.nh3} &micro;g/m&sup3;</td>
                        </tr>
                      </tbody>
                    </table>
                </div>
            </div>
  `
  containerElement.innerHTML = resultHTML;
  console.log(data);
}


let routes = {
  'about': () => {
    loadAbout();
  },
  'current': (city, unit) => {
    callCurrentWeatherAPI(city, unit);
  },
  'forecast': (city, unit) => {
    callForecastAPI(city, unit);
  },
  'air': (city, unit) => {
    callAirAPI(city);
  }
};





let defaultRoute = 'posts';

let handleRouting = () => {
  let currentUri = window.location.hash || false;
  let currentCity = localStorage.getItem("currentCity");
  let currentUnit = localStorage.getItem("currentUnit");
  if (currentUri !== false) {
    currentUri = currentUri.substring(1);
    let urlParts = currentUri.split("/");
    currentUri = urlParts[0];

    if(urlParts.length == 2) {
      currentUnit = urlParts[1];
      localStorage.setItem("currentUnit", currentUnit);
    } else if(urlParts.length >= 3) {
      currentUnit = urlParts[1];
      currentCity = urlParts[2]; 
      localStorage.setItem("currentUnit", currentUnit);
      localStorage.setItem("currentCity", currentCity);
    }
  }
  routes[currentUri || 'about'](currentCity||baseCity, currentUnit||baseUnit);
};

// let handleRouting = () => {
//   let currentUri = window.location.hash || false;
//   if (currentUri !== false) {
//     currentUri = currentUri.substring(1);
//   }
//   routes[currentUri || 'about']();
// };

window.addEventListener('load', handleRouting);
window.addEventListener('hashchange', handleRouting);


function searchCity() {
  var city = document.forms["myForm"]["ftext"].value;
  var unit = document.forms["myForm"]["funits"].value;
  window.location.href = '#current/' + unit + '/' + city;
  return true
}


function callCurrentWeatherAPI(city, unit){
  // let baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
  let baseUrl = rootUrl + 'weather?q=';
  let units = '&units=' + unit;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.overrideMimeType("json", true);
  xmlhttp.open("GET", baseUrl + city + units + key, true);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myArr = JSON.parse(this.responseText);
      loadCurrentWeather(myArr);
    }
  };
}


function callForecastAPI(city, unit){
  let baseUrl = rootUrl + 'forecast?q='; 
  let units = '&units=' + unit;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.overrideMimeType("json", true);
  xmlhttp.open("GET", baseUrl + city + units + key, true);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myArr = JSON.parse(this.responseText);
      loadForecast(myArr);
    }
  };
}


function callAirAPI(city){
  let baseUrl = rootUrl + 'weather?q=';
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.overrideMimeType("json", true);
  xmlhttp.open("GET", baseUrl + city + key, true);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      baseUrl = rootUrl + 'air_pollution?lat=';
      var xmlhttpair = new XMLHttpRequest();
      xmlhttpair.overrideMimeType("json", true);
      xmlhttpair.open("GET", baseUrl + data.coord.lat + '&lon=' + data.coord.lon + key, true);
      xmlhttpair.send();
      xmlhttpair.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var myArr = JSON.parse(this.responseText);
          loadAir(myArr);
        }
      };
    }
  };
}



function timeConverter(UNIX_timestamp){
  var dateObject = new Date(UNIX_timestamp * 1000);
  var mydate = [];
  mydate['weekday'] = dateObject.toLocaleString("en-US", {weekday: "long"})
  mydate['fulldate'] = dateObject.toLocaleString() //2019-12-9 10:30:15
  mydate['month'] = dateObject.toLocaleString("en-US", {month: "long"}) // December
  mydate['day'] = dateObject.toLocaleString("en-US", {day: "numeric"}) // 9
  mydate['year'] = dateObject.toLocaleString("en-US", {year: "numeric"}) // 2019
  mydate['hour'] = dateObject.toLocaleString("en-US", {hour: "numeric"}) // 10 AM
  mydate['minute'] = dateObject.toLocaleString("en-US", {minute: "numeric"}) // 30
  mydate['second'] = dateObject.toLocaleString("en-US", {second: "numeric"}) // 15
  mydate['timeZoneName'] = dateObject.toLocaleString("en-US", {timeZoneName: "short"}) // 12/9/2019, 10:30:15 AM CST

  return mydate;
}


function getSortedForecast(forcastList){                
    var fullForecast = [];
    for(i = 0; i <forcastList.length; i++){
      let forecast = forcastList[i];
        let day = timeConverter(forecast.dt)['weekday'];
        if (i == 0) {
            var temp = [];
            var temp3 = [];
            temp3.push(forecast);
            temp['dayForecast'] = temp3;
            temp['weekDay'] = day;
            fullForecast.push(temp);
            console.log(fullForecast[0]);
        } else {
            let lastIndex = fullForecast.length - 1;
            console.log(i);
            console.log(fullForecast[lastIndex]);
            if (fullForecast[lastIndex]['weekDay'] == day){
                fullForecast[lastIndex]['dayForecast'].push(forecast)
            } else {
              var temp2 = [];
              var temp4 = [];
              temp4.push(forecast);
              temp2['dayForecast'] = temp4;
              temp2['weekDay'] = day;
              fullForecast.push(temp2);

              // var temp2 = [];
              // temp2['dayForecast'] = forecast;
              // temp2['weekDay'] = day;
              // fullForecast.push(temp2);
            }
        }
        
    }
    console.log(fullForecast);
    return fullForecast;
}


