
function loadForecast(data, unit){
  let sortedForecast = getSortedForecast(data.list);
  let resultHTML = `
  <div class="widget" style="width:90%; text-align: center; color: white">
    <div>
      <h1>${data.city.name}</h1>
    </div>
  </div>`;
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
                    <td data-label="temp">${parseInt(singleWeather.main.temp, 10)} ${this.temp[unit]}</td>
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
        } else {
            let lastIndex = fullForecast.length - 1;
            if (fullForecast[lastIndex]['weekDay'] == day){
                fullForecast[lastIndex]['dayForecast'].push(forecast)
            } else {
              var temp2 = [];
              var temp4 = [];
              temp4.push(forecast);
              temp2['dayForecast'] = temp4;
              temp2['weekDay'] = day;
              fullForecast.push(temp2);
            }
        }
        
    }
    return fullForecast;
}