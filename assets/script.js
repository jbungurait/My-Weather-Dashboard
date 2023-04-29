let APIKey = '6e9212c1940c5264a43ed792ce5f5c11';


var headerDate = $('.date');
var citySearch = $("#citySearch");
var searchCardEL = $('.card');



var createDate = function() {  
    var currrentDate = dayjs().format('dddd, DD MMM YYYY');
    console.log(currrentDate);
    headerDate.text(currrentDate);
};

var getCityWeather = function(city) {
    createCard();

    var weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +'&appid=' + APIKey+"&units=imperial";
    fetch(weatherAPI)
        .then((response) => response.json())
        .then((data) => {
            
            createWeatherCard(data);
        });
    
};


citySearch.on('submit', function(event) {
    event.preventDefault();

    var city = $('#city').val();
    localStorage.setItem('Cities', JSON.stringify(city));
    city = city.toLowerCase();
    getCityWeather(city);

    console.log(city);
   })

   var createCard = function() {
       for (var i = 0; i < 5; i++) {
            var newCard = document.createElement('div');
            newCard.classList.add('card');
            document.getElementById('display').appendChild(newCard);
       }
   }

var createWeatherCard = function(data) { 
console.log(data)

var cardText = `<div class="card" style="width: 18rem;">
<div class="card-body">
  <h5 class="card-title"></h5>
  <h6 class="card-subtitle mb-2 text-muted">Today</h6>
  <p class="card-text">Temp: ${data.main.temp}.</p>
  <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
  <p>Conditions: ${data.weather[0].description}</p>

</div>
</div>
`
        $(".card").append(cardText);
   
 };


createDate();


