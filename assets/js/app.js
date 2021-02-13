let loadingElement = document.getElementById('loading');
let containerElement = document.getElementById('js-container');

let key = '&appid=cbdd233385e363394315c521d7b568d9';
let rootUrl = 'https://api.openweathermap.org/data/2.5/';
// rootUrl = 'https://cors-anywhere.herokuapp.com/' + rootUrl;

function loadAbout(data){
  containerElement.innerHTML = `
    <div class="row">
      <div>
          <h2 class="text-center text-primary" style="margin-top:40px;">Welcome To Weather Map</h2>
          <p class="text-center" id="welcome-paragraph">OpenWeather is a team of IT experts and data scientists that has been practising deep weather data science since 2014. For each point on the globe, OpenWeather provides historical, current and forecasted weather data via light-speed APIs. Headquarters in London, UK.
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
  containerElement.innerHTML = `
  <div id = "container" style="clear: left; "/>
    <div style="font-size: medium; font-weight: bold; margin-bottom: 0px;">${data.name}</div>
        <div style="float: left; width: 130px;">
        <div style="display: block; clear: left;">
            <div style="float: left;" title="Titel">
                <img height="45" width="45" style="border: medium none; width: 45px; height: 45px; background: url(&quot;https://openweathermap.org/img/w/${data.weather[0].icon}.png&quot;) repeat scroll 0% 0% transparent;" alt="title" src="https://openweathermap.org/images/transparent.png"/>
            </div>
            <div style="float: left;">
                <div style="display: block; clear: left; font-size: medium; font-weight: bold; padding: 0pt 3pt;" title="Current Temperature">${data.main.temp} &deg;C</div>
                <div style="display: block; width: 85px; overflow: visible;"></div>
            </div>
        </div>
        <div style="display: block; clear: left; font-size: small;">Clouds: ${data.clouds.all}%</div>
        <div style="display: block; clear: left; color: gray; font-size: x-small;" >Humidity: ${data.main.humidity}%</div>
        <div style="display: block; clear: left; color: gray; font-size: x-small;" >Wind: ${data.wind.speed} m/s</div>
        <div style="display: block; clear: left; color: gray; font-size: x-small;" >Pressure: ${data.main.pressure}hpa</div>
        </div>
        <div style="display: block; clear: left; color: gray; font-size: x-small;">
        
    </div>
  </div>
  `;
  console.log(data);
}

function loadForecast(data){
  resultHTML = '<div class="col-container">';

  for (i = 0; i < 5; i++) {
    elem = data.list[i];
    resultHTML+=`<div class="col-fifth">`;
    resultHTML+=`
      <div id = "container" style="clear: left; "/>
        <div style="font-size: medium; font-weight: bold; margin-bottom: 0px;">${data.city.name}</div>
            <div style="float: left; width: 130px;">
            <div style="display: block; clear: left;">
                <div style="float: left;" title="Titel">
                    <img height="45" width="45" style="border: medium none; width: 45px; height: 45px; background: url(&quot;https://openweathermap.org/img/w/${elem.weather[0].icon}.png&quot;) repeat scroll 0% 0% transparent;" alt="title" src="https://openweathermap.org/images/transparent.png"/>
                </div>
                <div style="float: left;">
                    <div style="display: block; clear: left; font-size: medium; font-weight: bold; padding: 0pt 3pt;" title="Current Temperature">${elem.main.temp} &deg;C</div>
                    <div style="display: block; width: 85px; overflow: visible;"></div>
                </div>
            </div>
            <div style="display: block; clear: left; font-size: small;">Clouds: ${elem.clouds.all}%</div>
            <div style="display: block; clear: left; color: gray; font-size: x-small;" >Humidity: ${elem.main.humidity}%</div>
            <div style="display: block; clear: left; color: gray; font-size: x-small;" >Wind: ${elem.wind.speed} m/s</div>
            <div style="display: block; clear: left; color: gray; font-size: x-small;" >Pressure: ${elem.main.pressure}hpa</div>
            </div>
            <div style="display: block; clear: left; color: gray; font-size: x-small;">
            
        </div>
      </div>
      `;

    resultHTML+=`</div>`;
  }
  
  resultHTML += `</div>`;
  containerElement.innerHTML = resultHTML;
  console.log(data);
}


function loadAir(data){
  let resultHTML = `
  <div id = "container" style="clear: left; "/>
    <p> Air Quality Index ${data.list[0].main.aqi} </p>
  </div>
  `
  containerElement.innerHTML = resultHTML;
  console.log(data);
}


let routes = {
  'about': () => {
    loadAbout()
  },
  'current': () => {
    callCurrentWeatherAPI('Tbilisi', 'metric');
  },
  'forecast': () => {
    callForecastAPI('Tbilisi', 'metric');
  },
  'air': () => {
    callAirAPI('Tbilisi', 'metric');
  }
};



let defaultRoute = 'posts';

let handleRouting = () => {
  let currentUri = window.location.hash || false;
  if (currentUri !== false) {
    currentUri = currentUri.substring(1);
  }
  routes[currentUri || 'about']();
};

window.addEventListener('load', handleRouting);
window.addEventListener('hashchange', handleRouting);

// let getDataFromApi = function(endpoint) {
//   // let baseUrl = 'https://api.openweathermap.org/data/2.5/';
//   let baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/';
//   let key = '&appid=cbdd233385e363394315c521d7b568d9'
//   let city = '?q=Tbilisi'
//   let units = '&units=metric'

//   return fetch(baseUrl + endpoint + city + units + key)
//     .then((response) => {
//       return response;
//     })
//     .then(response => response.json());
// };


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

