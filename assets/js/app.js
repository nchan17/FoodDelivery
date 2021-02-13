let loadingElement = document.getElementById('loading');
let containerElement = document.getElementById('js-container');

function loadAbout(data){
  containerElement.innerHTML = `<div class="container" style="margin-bottom: 70px;">
                    <div class="row">
                        <div>
                            <h2 class="text-center text-primary" style="margin-top:40px;">Welcome To Weather Map</h2>
                            <p class="text-center" id="welcome-paragraph">about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us about us 
                            </p>
                        </div>
                    </div>
                    
                    <div class="one-fifth-table">
                        <div id="colDesc">
                            <div class="info-icon"><i class="fa fa-sun-o"></i></div>
                            <h3 class="text-center">Weather API</h3>
                            <p class="text-center">Use openweathermap API to get weather information of any city.</p>
                        </div>
                        <div id="colDesc">
                            <div class="info-icon"><i class="fa fa-sun-o"></i></div>
                            <h3 class="text-center">Weather API</h3>
                            <p class="text-center">Use openweathermap API to get weather information of any city.</p>
                        </div>

                        <div id="colDesc">
                            <div class="info-icon"><i class="fa fa-sun-o"></i></div>
                            <h3 class="text-center">Weather API</h3>
                            <p class="text-center">Use openweathermap API to get weather information of any city.</p>
                        </div>

                        <div id="colDesc">
                            <div class="info-icon"><i class="fa fa-sun-o"></i></div>
                            <h3 class="text-center">Weather API</h3>
                            <p class="text-center">Use openweathermap API to get weather information of any city.</p>
                        </div>

                        <div id="colDesc">
                            <div class="info-icon"><i class="fa fa-sun-o"></i></div>
                            <h3 class="text-center">Weather API</h3>
                            <p class="text-center">Use openweathermap API to get weather information of any city.</p>
                        </div>
                    </div>

                </div>`;
}

function loadCurrentWeather(data){
  containerElement.innerHTML = "current";
  console.log(data);
}

function loadForecast(data){
  containerElement.innerHTML = "forecast";
  console.log(data);
}

function loadAir(data){
  containerElement.innerHTML = "air";
  console.log(data);
}



let routes = {
  'about': () => {
    loadAbout()
  },
  'current': () => {
    getDataFromApi('weather').then((data) => {
      loadCurrentWeather(data);
    });

  },
  'forecast': () => {
    getDataFromApi('forecast').then((data) => {
      loadForecast(data);
    });
  },
  'air': () => {
    getDataFromApi('weather').then((data) => {
      loadAir(data);
    });
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

let getDataFromApi = function(endpoint) {
  // let baseUrl = 'http://api.openweathermap.org/data/2.5/';
  let baseUrl = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/';
  let key = '&appid=cbdd233385e363394315c521d7b568d9'
  let city = '?q=Tbilisi'
  let units = '&units=metric'

  return fetch(baseUrl + endpoint + city + units + key)
    .then((response) => {
      return response;
    })
    .then(response => response.json());
};
