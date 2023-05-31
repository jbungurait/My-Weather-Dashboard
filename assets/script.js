let APIKey = "6e9212c1940c5264a43ed792ce5f5c11";

var headerDate = $(".date");
var citySearch = $("#citySearch");
var searchCardEL = $(".card");
var searchHistoryEL = $(".searchHistory");
var city = [];
var cityStorage = [];

var createDate = function () {
  var currentDate = dayjs().format("dddd, DD MMM YYYY");
  console.log(currentDate);
  headerDate.text(currentDate);
};

var cityHistory = function () {
  var historyButton = $(".cities");
  historyButton.remove();

  var historyString = localStorage.getItem("Cities");
  var historyArray = JSON.parse(historyString);

  for (let index = 0; index < historyArray.length; index++) {
    const listEL = historyArray[index];
    const buttonEL = `<button 
    class="cities btn btn-success" id="${listEL}">${listEL}</button>`
    searchHistoryEL.append(buttonEL);

    const btn = document.getElementById(listEL);
    btn.addEventListener('click', function() {
      var current = $(".current");
      current.remove();
      var weekly = $('.weekly');
      weekly.remove();
      getCityWeather(listEL)
    });
  };

};

var getCityWeather = function (city) {
  var weatherAPI =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";
  fetch(weatherAPI)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      currentDay(data);
    }).catch(error => {
      throw(error);
    });

    var forcast = 
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";
    fetch(forcast)
    .then((response => response.json()))
    .then((data) => {
        console.log(data);
        createWeatherCard(data);
    })

};

citySearch.on("submit", function (event) {
  event.preventDefault();

  city = $("#city").val();
  cityStorage.push(city);
  localStorage.setItem("Cities", JSON.stringify(cityStorage));
  city = city.toLowerCase();

  var current = $(".current");
  current.remove();
  var weekly = $('.weekly');
  weekly.remove();

  getCityWeather(city);
  cityHistory();
});

var currentDay = function (data) {

   cardText = `<div class="card current" style="width: 18rem;">
<div class="card-body">
  <h5 class="card-title"></h5>
  <h6 class="card-subtitle mb-2 text-muted">Today</h6>
  <p class="card-text">Temp: ${data.main.temp}F.</p>
  <p>Wind Speed: ${data.wind.speed} MPH.</p>
  <p>Humidity: ${data.main.humidity}</p>
  <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
  <p>Conditions: ${data.weather[0].description}</p>

</div>
</div>
`;
  $(".form").append(cardText);
};

var createWeatherCard = function (data) {
    const fiveDayForcast = [
        { id: 5 },
        { id: 13 },
        { id: 21 },
        { id: 29 },
        { id: 37 },
      ];
  
      fiveDayForcast.forEach((fiveDayForcast) => {
        var day = data.list[fiveDayForcast.id].dt_txt;
        var formatDay = dayjs(day).format("dddd");

         cardText = `<div class="card weekly" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title"></h5>
          <h6 class="card-subtitle mb-2 text-muted">${formatDay}</h6>
          <p class="card-text">Temp: ${data.list[fiveDayForcast.id].main.temp}F.</p>
          <p>Wind Speed: ${data.list[fiveDayForcast.id].wind.speed} MPH.</p>
          <p>Humidity: ${data.list[fiveDayForcast.id].main.humidity}</p>
          <img src="http://openweathermap.org/img/wn/${data.list[fiveDayForcast.id].weather[0].icon}@2x.png" />
          <p>Conditions: ${data.list[fiveDayForcast.id].weather[0].description}</p>
        
        </div>
        </div>
        `;
          $("#display").append(cardText);
        
      })
}

createDate();
cityHistory();
