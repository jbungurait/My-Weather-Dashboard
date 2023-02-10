let APIKey = '6e9212c1940c5264a43ed792ce5f5c11';


var headerDate = $('.date');
var citySearch = $("#citySearch");
var searchCardEL = $('.card');
// var displayArea = $('#display');


var createDate = function() {  
    var currrentDate = dayjs().format('dddd, DD MMM YYYY');
    console.log(currrentDate);
    headerDate.text(currrentDate);
};

var getCityWeather = function(city) {
    var weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +'&appid=' + APIKey+"&units=imperial";
    fetch(weatherAPI)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
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
       }
   }
var createWeatherCard = function(data) { 
console.log(data)

var cardText = `<div class="card" style="width: 18rem;">
<div class="card-body">
  <h5 class="card-title"></h5>
  <h6 class="card-subtitle mb-2 text-muted">${currrentDate}</h6>
  <p class="card-text">Temp: ${data.main.temp}.</p>
  <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
  <p>Conditions: ${data.weather[0].description}</p>

</div>
</div>
`
        //     var cardbody = $('div');
        //     //  cardbody.addClass('card-body');
           
        //     //cardbody.text(day[i]);
        //     // cardbody.attr('style', 'width: 20rem;');
        //      var h6Tag = $("h6")
        //      h6Tag.textContent = 
        //      var img = $("img")
        //      img.attr("src",``)
        //      var desc = $("p")
        //      desc.textContent = 
        //      var wndSpd = $("p")
        //      wndSpd.textContent = "Wind Speed: "+data.wind.speed
            
        // cardbody.append(h6Tag)
        // cardbody.append(img)
        // cardbody.append(desc)
        // cardbody.append(wndSpd)
        // console.log(cardbody)
        $("#display").append(cardText);
   
 };


createDate();


