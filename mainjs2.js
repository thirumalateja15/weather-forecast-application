const apikey = '<api-key>';

window.addEventListener("load", () => {
    getLocationData();
})

export function getLocationData(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat +'&lon=' + lon + '&APPID=' + apikey;

            fetch(url).then(res => {
                return res.json();
            }).then(data => {
                weatherReport(data);
                return data;
            })
        })
    }
}

function weatherReport(data){
    const uf = 'http://api.openweathermap.org/data/2.5/forecast?q=' + data.name + '&APPID=' + apikey;
    
    fetch(uf).then(res => {
        return res.json();
    }).then(forecast => {
        document.getElementById('cityname').innerHTML = data.name;
        document.getElementById('temp').innerHTML = Math.floor(data.main.temp - 273) + '°C';
        document.getElementById('nature').innerHTML = data.weather[0].main;

        let icon = data.weather[0].icon;
        let iconurl = 'http://api.openweathermap.org/img/w/' + icon + '.png';
        document.getElementById('mainimg').src = iconurl;
        
        document.getElementById('humidityvalue').innerHTML = data.main.humidity;
        document.getElementById('feelslikevalue').innerHTML = data.main.feels_like;
        document.getElementById('pressurevalue').innerHTML = data.main.pressure;
        document.getElementById('tempmaxvalue').innerHTML = Math.floor(data.main.temp_max - 273);
        document.getElementById('tempminvalue').innerHTML = Math.floor(data.main.temp_min - 273);

        document.getElementById('citytitle').innerHTML = data.name;
        document.getElementById('windspeed').innerHTML = data.wind.speed;
        const currentDate = new Date();

        const dayOfWeek = currentDate.getDay();

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDay = days[dayOfWeek];

        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const currentDateFormatted = currentDate.toLocaleDateString('en-US', options);

        document.getElementById('timevalue').innerHTML = currentDateFormatted + ' / ' + currentDay;

        let deg = data.wind.deg - 180;

        document.getElementById('wdirec').style.transform = 'rotate(' + deg + 'deg)';

        dayForecast(forecast);
    })
}

export function hourForecast(data){
    let tempArr = new Array(8);
    const uf = 'http://api.openweathermap.org/data/2.5/forecast?q=' + data.name + '&APPID=' + apikey;

    fetch(uf).then(res => {
        return res.json;
    }).then(forecast => {
        for (let index = 0; index < tempArr.length; index++) {
            tempArr[index] = Math.floor(forecast.list[index].main.temp - 273);
        }
        return tempArr;
    })
}

function dayForecast(forecast){

    document.querySelector('.days').innerHTML = "";

    for(let i=7; i < forecast.list.length; i+=8){
        let day = document.createElement('div');
        day.setAttribute('class', 'day');

        let img = document.createElement('img');
        img.setAttribute('class', 'mainimg');

        img.src = 'http://api.openweathermap.org/img/w/' + forecast.list[i].weather[0].icon + '.png';

        let cityname = document.createElement('h1');
        cityname.setAttribute('class', 'cityname');

        cityname.innerText = String(forecast.list[i].dt_txt).substring(0, 10);

        let daytemp = document.createElement('h1');
        daytemp.setAttribute('class', 'tempe');

        daytemp.innerText = Math.floor(forecast.list[i].main.temp - 273) + '°C';

        let daynature = document.createElement('h1');
        daynature.setAttribute('class', 'nature');

        daytemp.innerText = forecast.list[i].weather[0].main;

        day.appendChild(img);
        day.appendChild(cityname);
        day.appendChild(daytemp);
        day.appendChild(daynature);

        document.querySelector('.days').appendChild(day);
    }
}

window.addEventListener('load', () => {
  window.scrollTo(0, 300);
})

document.getElementById('mainSearchButton').addEventListener('click', () => {
    window.scrollTo(0, 300);
    let data = document.getElementById('searchValue').value;
    if(data == ""){
        getLocationData();
    }else {
        const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + data + '&APPID=' + apikey;

        fetch(url).then(res => {
          return res.json();
        }).then(data => {
          weatherReport(data);
        })
    }
    document.getElementById('searchValue').value = "";
})

document.getElementById('search2').addEventListener('click', () => {
    window.scrollTo(300, 0);
})

document.getElementById('leftarrow').addEventListener('click', () => {
    var scrollContainer = document.querySelector('.scrollholder');
    scrollContainer.scrollLeft -= 100;
})

document.getElementById('rightarrow').addEventListener('click', () => {
    var scrollContainer = document.querySelector('.scrollholder');
    scrollContainer.scrollLeft += 100;
})