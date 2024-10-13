let country = document.getElementById("country");
let todayName = document.getElementById("today-name");
let todayDate = document.getElementById("today-date");
let todayMonth = document.getElementById("today-month");
let todayYear = document.getElementById("today-year");
let todayTime = document.getElementById("today-time");
let todayDegree = document.getElementById("today-degree");
let todayStatus = document.getElementById("today-status");
let todayStatusImage = document.getElementById("today-status-image");
let todayFeels = document.getElementById("today-feels-like");
let humidity = document.getElementById("today-humidity");
let wind = document.getElementById("today-wind");
let weatherData;
let searchInput = document.getElementById("countryInput")
let locationBtn = document.getElementById("locationBtn");

let nextDay = document.getElementsByClassName("next-day");
let nextMaxDegree = document.getElementsByClassName("next-max-degree");
let nextMinDegree = document.getElementsByClassName("next-min-degree");
let nextStatusImage = document.getElementsByClassName("next-status-image");
let nextStatus = document.getElementsByClassName("next-status");



// Functions
async function getWeather(countryName="cairo"){
    let weatherResponse  = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${countryName}&days=3`);
    let weatherData =await weatherResponse.json();
    if(!weatherData.error){
        getTodayData(weatherData);
        getNextData(weatherData);
    }
}
//  function to fetch bdc API to get the city name by using latitude and langitude from geolocation 
  async function getLocation(lat, lon) {
    const response = await fetch(`https://api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    let locationData = await response.json();
    console.log(locationData.city);  
    getWeather("locationData.city")
  }
  
function getTodayData(data){
    let today = new Date();
    todayName.innerHTML = today.toLocaleDateString("en-US", {weekday:"long"})
    todayDate.innerHTML = today.getDate()
    todayMonth.innerHTML = today.toLocaleDateString("en-US",{month:"long"})
    todayYear.innerHTML = today.toLocaleDateString("en-US",{year:"numeric"})
    // todayTime.innerHTML = today.getHours() + `:`+ today.getMinutes();
    country.innerHTML = data.location.name;
    todayDegree.innerHTML = data.current.temp_c;
    todayStatusImage.setAttribute("src", data.current.condition.icon);
    todayStatus.innerHTML = data.current.condition.text;
    todayFeels.innerHTML = data.current.feelslike_c;
    humidity.innerHTML = data.current.humidity;
    wind.innerHTML = data.current.wind_kph;
}
function getNextData(data){
    for(var i = 0 ; i<3; i++){
        let next = new Date(data.forecast.forecastday[i].date)
        nextDay[i].innerHTML = next.toLocaleDateString("en-US",{weekday:"long"})
    nextMaxDegree[i].innerHTML = data.forecast.forecastday[i].day.maxtemp_c;
    nextMinDegree[i].innerHTML = data.forecast.forecastday[i].day.mintemp_c;
   nextStatusImage[i].setAttribute("src", data.forecast.forecastday[i].day.condition.icon);
   nextStatus[i].innerHTML = data.forecast.forecastday[i].day.condition.text;

   }
}

getWeather()

searchInput.addEventListener("input", function(){
getWeather(searchInput.value)
})


locationBtn.addEventListener("click", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords.latitude, position.coords.longitude);
  
        getLocation(position.coords.latitude, position.coords.longitude);
      },
      error => {
        console.log(error);
      });
    } else {
      alert("Geolocation not supported");
    }
  });
  

