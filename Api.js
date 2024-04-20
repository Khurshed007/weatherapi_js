document.addEventListener("DOMContentLoaded", function() {
  const body = document.querySelector("body");
  body.classList.add("loaded");
});


let cityInput = document.querySelector(".search-bar");
let searchButton = document.querySelector(".search button"); 
let Api_Key = "5ec342cc8a76c142d3e82ed9f3a51d6d";
const TEMP = document.querySelector(".temp");
const HUMIDITY = document.querySelector(".humidity");
const WIND = document.querySelector(".wind");
const CITY_DATE = document.querySelector(".city-date")
const DESCRIPTION = document.querySelector(".description")
const ICON = document.querySelector(".flex .icon")
const CURRENT_CITY = document.querySelector(".city")
const TODAYS_DATAILS = document.querySelector(".today-details")

let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thirsday",
    "Friday",
    "Saturday"
]

let CalMonthes = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
let settedMonth = CalMonthes[new Date().getMonth()]
let createWeatherCard = (items,firstItem) => {
  console.log(new Date().getMonth() + 1)
      document.querySelector(".forecast").innerHTML =  `${items.length} days forecast` 
      const {humidity, temp,pressure,temp_min, temp_max} = firstItem[0].main
      const {speed,deg} = firstItem[0].wind
      const {icon, description} = firstItem[0].weather[0];
      
      TODAYS_DATAILS.innerHTML = `
      <li><p>Lowest temp: ${temp_min}°</p></li>
      <li><p>Wind deg: ${deg}°</p></li>
      <li><p>Highest temp: ${temp_max}°</p></li>
      <li><p>Pressure: ${pressure}hPa</p></li>
      `

      let day = firstItem[0].dt_txt.split(" ")[0].split("-")[2]
      let Hour = firstItem[0].dt_txt.split(" ")[1].split(":")[0]
       console.log(firstItem[0])
      TEMP.innerHTML = temp +"°";
      HUMIDITY.innerHTML = `Humidity: ${humidity}%`; 
      WIND.innerHTML  = `Wind speed: ${speed}km/h `;
      CITY_DATE.innerHTML= `To ${Hour} o'clock ${settedMonth} ${day}`
      
      ICON.src = `https://openweathermap.org/img/wn/${icon}.png`
      DESCRIPTION.innerHTML = description
      // console.log(a)
       let daysList = document.querySelector(".days")
       daysList.innerHTML = ""
      for(let i = 0; i < items.length; i++){
       const {icon, description} = items[i].weather[0];
       const {humidity, temp} = items[i].main
       let [Years,Monthes, Days] = items[i].dt_txt.split(" ")[0].split("-")
       daysList.innerHTML += `  <li><span>${Years} ${Monthes} ${Days}</span> <span class="m">${description}<img src=https://openweathermap.org/img/wn/${icon}.png class=icon"></span></li>`
      }
}
let arr = []
let newArr = []
const setCityId = (id) => {
const WHEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&appid=${Api_Key}`;
  fetch(WHEATHER_API_URL).then(res => res.json()).then(data => {
       let uniqeDays = [];
       let firstIndex = []
       let fDay = []
       console.log(data)

        let newForeCast = data.list.filter((item,index) => {
              let txtDays = data.list[index].dt_txt.split(" ")
              let txtFirstDay = data.list[index].dt_txt.split(" ")[0].split("-")[2]
   
               if(!fDay.includes(txtFirstDay)){
                  fDay.push(txtFirstDay)
               }
     
              if(index > 0){
              if(txtDays[1].includes("6:00") && !txtDays[0].includes("-"+fDay[0])){
                  return uniqeDays.push(data.list[index])
              }
            }else{
                 firstIndex.push(data.list[index])
            }
             
        
        })
        createWeatherCard(newForeCast,firstIndex)
       console.log(firstIndex)
        console.log(newForeCast)
       })
     
}

const getCityId = (city) => {
       let cityName = cityInput.value.trim();
       if(cityName === "" || cityName === undefined || cityName === null) cityName = city;
       console.log(cityName)
       const WHEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${Api_Key}`
       return fetch(WHEATHER_API_URL).then(res => res.json()).then(data => {
          let id = data.id
          cityId = data.id
          setCityId(id)
          document.querySelector(".cityname").innerHTML = `Todays wheather details in ${data.name}`
          CURRENT_CITY.innerHTML = data.name
          document.querySelector(".loaded").style.background = "url('https://source.unsplash.com/1600x900/?" + data.name + " ')"

   })
      }

      getCityId("Germany")


searchButton.onclick = function(){getCityId("Germany")}


cityInput.addEventListener("keyup",function(e){
     if(e.target == "Enter"){
       getCityId("Germany")
     }
})