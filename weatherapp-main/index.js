let city = "Shahjahanpur";
let url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=20b6e159248ddd6685e34e5d59c1ad58";
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Set up Animation on Load
setTimeout(function () {
    document.querySelector("#main-temp").classList.remove("fade-in-on-load");
}, 500);
setTimeout(function () {
    document.querySelector("#forecast").classList.remove("fade-in-on-load-with-delay");
}, 1000);
setTimeout(function () {
    document.querySelector("#forecast").style.opacity = "1";
}, 500);
document.querySelector("#forecast").classList.add("fade-in-on-load-with-delay");

// Get Default Data for Mumbai
getData();

// Reload button action
document.querySelector(".reload-btn").addEventListener("click", function () {
    getData();
   // animationHandler();
});

// Update and setup animation again after load
function animationHandler() {
    document.querySelector("#main-temp").classList.add("fade-in-on-load");
    setTimeout(function () {
        document.querySelector("#main-temp").classList.remove("fade-in-on-load");
    }, 500);

    document.querySelector("#forecast").style.opacity = "0";
    setTimeout(function () {
        document.querySelector("#forecast").style.opacity = "1";
    }, 500);
    document.querySelector("#forecast").classList.add("fade-in-on-load-with-delay");
    setTimeout(function () {
        document.querySelector("#forecast").classList.remove("fade-in-on-load-with-delay");
    }, 1000);
}

// Get weather Data
function getData() {
    var httpObj = new XMLHttpRequest();
    httpObj.onreadystatechange = function () {
        if (httpObj.readyState == 4 && httpObj.status == 200) {
            // console.log(httpObj.responseText);
            let data = JSON.parse(httpObj.responseText);
            // console.log(data);
            displayData(data);
        }
        else {
            return;
        }
    }
    httpObj.open("GET", url, true); // true for asynchronous 
    httpObj.send();
}

// Show data in DOM
function displayData(weatherData) {

    // Set Dynamic Background Image based on weather type like clouds, rain, snow etc
    var weatherType = weatherData.list[0].weather[0].main;
    var weatherCode = weatherData.list[0].weather[0].id;
    if (weatherType === "Clouds" && weatherCode === "801") {
        document.body.style.background = 'linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .4)), url("weather-backgrounds/few-clouds.jpg")';
    }
    else if (weatherType === "Clouds" && weatherCode === "804") {
        document.body.style.background = 'linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .4)), url("weather-backgrounds/overcast-clouds.jpg")';
    }
    else if (weatherType === "Clouds") {
        document.body.style.background = 'linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .4)), url("weather-backgrounds/cloudy.jpg")';
    }
    else if (weatherType === "Clear") {
        document.body.style.background = 'linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .4)), url("weather-backgrounds/clear-sky.jpg")';
    }
    else if (weatherType === "Rain") {
        document.body.style.background = 'linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .4)), url("weather-backgrounds/rainy.jpg")';
    }
    else if (weatherType === "Snow") {
        document.body.style.background = 'linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .4)), url("weather-backgrounds/snow.jpg")';
    }
    else if (weatherType === "Thunderstorm") {
        document.body.style.background = 'linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .4)), url("weather-backgrounds/thunderstorm.jpg")';
    }
    else if (weatherType === "Mist") {
        document.body.style.background = 'linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .4)), url("weather-backgrounds/mist.jpg")';
    }
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";

    // Displaying Main data
    var today = days[new Date(weatherData.list[0].dt_txt.split(' ')[0]).getDay()];
    var todaysDate = new Date(weatherData.list[0].dt_txt.split(' ')[0]).getDate();
    document.querySelector(".city").innerHTML = city[0].toUpperCase() + city.slice(1, city.length) + ", " + today + " " + todaysDate;

    document.querySelector(".feels-like").innerHTML = 'Feels Like  :  ';
    document.querySelector(".temp-min").innerHTML = 'Min Temperature  :  ';
    document.querySelector(".temp-max").innerHTML = 'Max Temperature  :  ';
    document.querySelector(".pressure").innerHTML = 'Pressure  :  ';
    document.querySelector(".humidity").innerHTML = 'Humidity  :  ';
    document.querySelector(".wind-speed").innerHTML = 'Wind Speed  :  '

    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + weatherData.list[0].weather[0].icon + "@2x.png";
    document.querySelector(".temp").innerHTML = weatherData.list[0].main.temp + "&#8451;";
    document.querySelector(".weather-type").innerHTML = weatherType;

    document.querySelector(".feels-like").innerHTML += weatherData.list[0].main.feels_like + "&#8451;";
    document.querySelector(".temp-min").innerHTML += weatherData.list[0].main.temp_min + "&#8451;";
    document.querySelector(".temp-max").innerHTML += weatherData.list[0].main.temp_max + "&#8451;";
    document.querySelector(".pressure").innerHTML += weatherData.list[0].main.pressure + ' mb';
    document.querySelector(".humidity").innerHTML += weatherData.list[0].main.humidity + "%";
    document.querySelector(".wind-speed").innerHTML += weatherData.list[0].wind.speed + " mph";

    // Displaying Forecast Data Cards
    var currentDate = new Date().getDate();
    var forecastDate = "";
    document.querySelector(".forecast-cards").innerHTML = "";
    weatherData.list.forEach(function (element, index) {
        forecastDate = new Date(element.dt_txt.split(' ')[0]).getDate();
        if (currentDate < forecastDate) {
            currentDate = forecastDate;
            document.querySelector(".forecast-cards").innerHTML += `
            <div class="card">
                <span class="date">${days[new Date(element.dt_txt.split(' ')[0]).getDay()]} ${new Date(element.dt_txt.split(' ')[0]).getDate()}</span>
                <img src="https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png" alt="">
                <span style="margin-bottom: 7px;" class="forecast-temp">${element.main.temp}&#8451;</span>
                <span class="forecast-weather-type">${element.weather[0].main}</span>
            </div>`
        }
    })
    animationHandler();
}

// Action on enter
document.addEventListener("keyup", function (event) {
    if (event.code === 'Enter') {
        city = document.querySelector(".city-search").value;
        if (!city) return;
        cityUpdate();
    }
});
//his code snippet sets up an event listener on the document object
// for the "keyup" event. When a user presses a key on their keyboard, this event
// listener checks if the pressed key is the "Enter" key (identified by the event.code value).
// If the pressed key is indeed the "Enter" key, the code performs the following actions:

// Action on clicking search button in navbar
document.querySelector(".search-btn").addEventListener("click", function () {
    cityUpdate();
})

// Update city value and reload data if new city is searched
function cityUpdate() {
    city = document.querySelector(".city-search").value;
    if (!city) return false;
    url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=20b6e159248ddd6685e34e5d59c1ad58";
    // console.log(url);
    getData();
}
