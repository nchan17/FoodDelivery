function timeConverter(UNIX_timestamp){
  var dateObject = new Date(UNIX_timestamp * 1000);
  var mydate = [];
  mydate['weekday'] = dateObject.toLocaleString("en-US", {weekday: "long"})
  mydate['fulldate'] = dateObject.toLocaleString() 
  mydate['month'] = dateObject.toLocaleString("en-US", {month: "long"}) 
  mydate['day'] = dateObject.toLocaleString("en-US", {day: "numeric"}) 
  mydate['year'] = dateObject.toLocaleString("en-US", {year: "numeric"}) 
  mydate['hour'] = dateObject.toLocaleString("en-US", {hour: "numeric"}) 
  mydate['minute'] = dateObject.toLocaleString("en-US", {minute: "numeric"}) 
  mydate['second'] = dateObject.toLocaleString("en-US", {second: "numeric"}) 
  mydate['timeZoneName'] = dateObject.toLocaleString("en-US", {timeZoneName: "short"}) 

  return mydate;
}


function isEmptyOrNull(str){
  if (str == null){
    return true;
  }
  if(str == ""){
    return true;
  }
  return false;
}

function UnitConsts() { 
  this.speed = [];
  this.temp = [];
  this.speed['metric'] = "mps";
  this.temp['metric'] = "&#176C";

  this.speed['imperial'] = "mph";
  this.temp['imperial'] = "&#176F";
}