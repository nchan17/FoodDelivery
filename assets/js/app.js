let loadingElement = document.getElementById('loading');
let containerElement = document.getElementById('js-container');

let key = '&appid=cbdd233385e363394315c521d7b568d9';
let rootUrl = 'https://api.openweathermap.org/data/2.5/';
// rootUrl = 'https://cors-anywhere.herokuapp.com/' + rootUrl;

let baseCity = 'Tbilisi'
let baseUnit = 'metric'

var currentCity = null;
var currentUnit = null;


UnitConsts();


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
  containerElement.innerHTML = `<div class="loader"></div>`;
  let currentUri = window.location.hash || false;
  currentCity = localStorage.getItem("currentCity");
  currentUnit = localStorage.getItem("currentUnit");
  if (currentUri !== false) {
    currentUri = currentUri.substring(1);
    let urlParts = currentUri.split("/");
    currentUri = urlParts[0];
    if(!isEmptyOrNull(urlParts[1]) && isEmptyOrNull(urlParts[2])) {
      currentUnit = urlParts[1];
    } else if(!isEmptyOrNull(urlParts[1]) && !isEmptyOrNull(urlParts[2])) {
      currentUnit = urlParts[1];
      currentCity = urlParts[2]; 
    }
  }
  routes[currentUri || 'about'](currentCity||baseCity, currentUnit||baseUnit);
};


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
      loadCurrentWeather(myArr, unit||baseUnit);
      localStorage.setItem("currentUnit", currentUnit||baseUnit);
      localStorage.setItem("currentCity", currentCity||baseCity);
    }else{
      containerElement.innerHTML = `
        <div style="text-align:center; color: red; margin-top:20px">
          Error! 
          <br> No city named ${city} found! 
          <br> Reload page or search for a valid city!
        </div>
      `;
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
      loadForecast(myArr, unit||baseUnit);
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


function handleBurgerManu() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

