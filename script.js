var weatherAPI = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={6e9212c1940c5264a43ed792ce5f5c11}';
var geocoderAPI = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={6e9212c1940c5264a43ed792ce5f5c11}';

var searchBtn = $('#search');


var createDate = function() {  
    var headerDate = document.getElementsByClassName('date');
    var currrentDate = dayjs();
    currrentDate.format('dddd, MMM, YYYY');
    console.log(currrentDate);
};

searchBtn.on('submit', function(event) {
    event.preventDefault();
    var seachInput = $('input[name="citySearch"]').val();

    // if (!seachInput) {

    // }
   
    localStorage.setItem('searchInput', JSON.stringify('searchInput'));

});


createDate();


