let APIKey = '6e9212c1940c5264a43ed792ce5f5c11';
var weatherAPI = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=' + APIKey;
var geocoderAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit={limit}&appid=' + APIKey;

var headerDate = $('.date');
var citySearch = $("#citySeach");
var searchCardEL = $('.card');

var createDate = function() {  
    var currrentDate = dayjs().format('dddd, DD MMM YYYY');
    console.log(currrentDate);
    headerDate.text(currrentDate);
};

 citySearch.on('submit', function(event) {
    event.preventDefault();
    var city = $('city').val();
    localStorage.setItem('Cities', JSON.stringify(city));

   })


createDate();


