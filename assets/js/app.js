let loadingElement = document.getElementById('loading');
let containerElement = document.getElementById('js-container');

function loadAbout(data){
  containerElement.innerHTML = "about";
  console.log(data);
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
    containerElement.innerHTML = "<div> <p>something about this site </p> </div>";
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
