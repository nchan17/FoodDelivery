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
}