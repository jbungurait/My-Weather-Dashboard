let APIKey = "6e9212c1940c5264a43ed792ce5f5c11";

var headerDate = $(".date");
var citySearch = $("#citySearch");
var searchCardEL = $(".card");

var createDate = function () {
  var currentDate = dayjs().format("dddd, DD MMM YYYY");
  console.log(currentDate);
  headerDate.text(currentDate);
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

  var city = $("#city").val();
  localStorage.setItem("Cities", JSON.stringify(city));
  city = city.toLowerCase();
  getCityWeather(city);

});

var currentDay = function (data) {

  var cardText = `<div class="card" style="width: 18rem;">
<div class="card-body">
  <h5 class="card-title"></h5>
  <h6 class="card-subtitle mb-2 text-muted">Today</h6>
  <p class="card-text">Temp: ${data.main.temp}.</p>
  <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
  <p>Conditions: ${data.weather[0].description}</p>

</div>
</div>
`;
  $("#display").append(cardText);
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
        var cardText = `<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title"></h5>
          <h6 class="card-subtitle mb-2 text-muted">${data.list[fiveDayForcast.id].dt_txt}</h6>
          <p class="card-text">Temp: ${data.list[fiveDayForcast.id].main.temp}.</p>
          <img src="http://openweathermap.org/img/wn/${data.list[fiveDayForcast.id].weather[0].icon}@2x.png" />
          <p>Conditions: ${data.list[fiveDayForcast.id].weather[0].description}</p>
        
        </div>
        </div>
        `;
          $("#display").append(cardText);
        
      })
}

createDate();
