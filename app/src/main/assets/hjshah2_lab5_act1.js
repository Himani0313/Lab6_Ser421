'use strict';

// helpers
let p = (data)=>{
    console.log(data);
};

let get_date = (dt)=>{
    return new Date(parseInt(dt)*1000).toJSON().slice(0,19).replace(/-/g,'/').replace('T', " ");
};

// this utility method is taken from stack overflow
// https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
String.prototype.toCamelCase = function(str) {
    if(str !== null && str !== undefined)
        return str
            .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
            .replace(/\s/g, '')
            .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
    else return str;
};

function generateDifferencesRow(city_name){
    let data = {};
    let date_Diff = "";
    if(original_cities.includes(city_name)){
        data.main = {};
        data.main.temp = (parseFloat(original_cities_html[city_name].childNodes[2].innerText) -
            parseFloat(original_cities_previous_html[city_name].childNodes[2].innerText)).toFixed(2);
        data.main.humidity = (parseFloat(original_cities_html[city_name].childNodes[3].innerText) -
            parseFloat(original_cities_previous_html[city_name].childNodes[3].innerText)).toFixed(2);
        data.wind = {};
        data.wind.speed = (parseFloat(original_cities_html[city_name].childNodes[4].innerText) -
            parseFloat(original_cities_previous_html[city_name].childNodes[4].innerText)).toFixed(2);
        data.clouds = {};
        data.clouds.all = (parseFloat(original_cities_html[city_name].childNodes[5].innerText) -
            parseFloat(original_cities_previous_html[city_name].childNodes[5].innerText)).toFixed(2);
        date_Diff = Math.floor((Math.abs(new Date(original_cities_html[city_name].childNodes[1].innerText) -
            new Date(original_cities_previous_html[city_name].childNodes[1].innerText))/1000));
    }else{
        data.main = {};
        data.main.temp = (parseFloat(third_city_html[third_city_name].childNodes[2].innerText) -
            parseFloat(third_city_previous_html[third_city_name].childNodes[2].innerText)).toFixed(2);
        data.main.humidity = (parseFloat(third_city_html[third_city_name].childNodes[3].innerText) -
            parseFloat(third_city_previous_html[third_city_name].childNodes[3].innerText)).toFixed(2);
        data.wind = {};
        data.wind.speed = (parseFloat(third_city_html[third_city_name].childNodes[4].innerText) -
            parseFloat(third_city_previous_html[third_city_name].childNodes[4].innerText)).toFixed(2);
        data.clouds = {};
        data.clouds.all = (parseFloat(third_city_html[third_city_name].childNodes[5].innerText) -
            parseFloat(third_city_previous_html[third_city_name].childNodes[5].innerText)).toFixed(2);
        date_Diff = Math.floor((Math.abs(new Date(third_city_html[third_city_name].childNodes[1].innerText) -
            new Date(third_city_previous_html[third_city_name].childNodes[1].innerText))/1000));
    }
    date_Diff = Math.floor(date_Diff/60) + " minutes";
    city_name = document.createElement("td");
    city_name.innerText = "";
    return generate_html_from_json(city_name, data, date_Diff);
}

function generate_html_from_json(city_name, data_object, date){
    let timestamp = document.createElement("td");
    timestamp.innerText = date;
    let temperature = document.createElement("td");
    temperature.innerText = data_object.main.temp;
    let humidity = document.createElement("td");
    humidity.innerText = data_object.main.humidity + "%";
    let wind = document.createElement("td");
    wind.innerText = data_object.wind.speed;
    let cloud = document.createElement("td");
    cloud.innerText = data_object.clouds.all+"%";
    let city_html = document.createElement("tr");
    city_html.appendChild(city_name);
    city_html.appendChild(timestamp);
    city_html.appendChild(temperature);
    city_html.appendChild(humidity);
    city_html.appendChild(wind);
    city_html.appendChild(cloud);
    return city_html;
}

// fixed data
let cities = {};
localStorage.setItem('firstTime', 'true');
cities['Denver'] = {id: 5419384, name: "Denver"};
cities['Miami'] =   {id: 4542692, name: "Miami"};
cities['Chicago'] = {id: 4887398, name: "Chicago"};
cities['Houston'] = {id: 2646507, name: "Houston",};
cities['Philadelphia'] =   {id: 4440906, name: "Philadelphia"};
cities['Dallas'] =   {id: 4462896, name: "Dallas"};
cities['Tempe'] =   {id: 5317058, name: "Tempe"};
let API_KEY = "02ac79da5464da32c20e18fc437d0e16";
//let API_KEY = "f9cd3610e9144f965638b5be216a0b1d";
//let API_KEY = "f9cd3610e9144f965638b5be216a0123";
// let original_cities = ["karachi","lahore"];
// let third_city_name = "";
// let original_cities_html = {};
// original_cities_html['karachi'] = document.createElement("tr");
// original_cities_html['lahore'] = document.createElement("tr");
// let original_cities_previous_html = {};
// original_cities_previous_html['karachi'] = document.createElement("tr");
// original_cities_previous_html['lahore'] = document.createElement("tr");

let original_cities = ["boston","phoenix"];
let third_city_list = ['Denver','Miami','Chicago','Houston','Philadelphia','Dallas','Tempe','Seattle','Washington','Austin'];
let third_city_name = "";
let original_cities_html = {};
original_cities_html['boston'] = document.createElement("tr");
original_cities_html['phoenix'] = document.createElement("tr");
let original_cities_previous_html = {};
original_cities_previous_html['boston'] = document.createElement("tr");
original_cities_previous_html['phoenix'] = document.createElement("tr");

let third_city_html = {};
third_city_html['Denver'] = document.createElement("tr");
third_city_html['Miami'] = document.createElement("tr");
third_city_html['Chicago'] = document.createElement("tr");
third_city_html['Houston'] = document.createElement("tr");
third_city_html['Philadelphia'] = document.createElement("tr");
third_city_html['Dallas'] = document.createElement("tr");
third_city_html['Tempe'] = document.createElement("tr");
third_city_html['Seattle'] = document.createElement("tr");
third_city_html['Washington'] = document.createElement("tr");
third_city_html['Austin'] = document.createElement("tr");
let third_city_previous_html = {};
third_city_previous_html['Denver'] = document.createElement("tr");
third_city_previous_html['Miami'] = document.createElement("tr");
third_city_previous_html['Chicago'] = document.createElement("tr");
third_city_previous_html['Houston'] = document.createElement("tr");
third_city_previous_html['Philadelphia'] = document.createElement("tr");
third_city_previous_html['Dallas'] = document.createElement("tr");
third_city_previous_html['Tempe'] = document.createElement("tr");
third_city_previous_html['Seattle'] = document.createElement("tr");
third_city_previous_html['Washington'] = document.createElement("tr");
third_city_previous_html['Austin'] = document.createElement("tr");

// frequent dom objects
let city_data = document.getElementById("city_data");
let third_city_option = document.getElementById("city");
let nicest = document.getElementById("nicest");
let worst = document.getElementById("worst");
let avg_temp = document.getElementById("avg_temp");
let avg_hum = document.getElementById("avg_hum");
let error = document.getElementById("error");
let mainTable = document.getElementById("mainTable");


function show_data(isRefresh=false, isThirdCity=true){
    clear_chart();
    for(let city in original_cities){
        if(original_cities.hasOwnProperty(city)){
            city_data.appendChild(original_cities_html[original_cities[city]]);
            if(isRefresh){
                if(original_cities_previous_html[original_cities[city]].childElementCount > 0){
                    if(original_cities_previous_html[original_cities[city]].childNodes[1].innerText !== original_cities_html[original_cities[city]].childNodes[1].innerText)
                        city_data.appendChild(original_cities_previous_html[original_cities[city]]);
                    //city_data.appendChild(generateDifferencesRow("karachi"));
                }
            }
        }
    }
    if(third_city_name !== ""){
        city_data.appendChild(third_city_html[third_city_name]);
    }
    if(isRefresh && third_city_name !== "" && !isThirdCity){
        if(third_city_previous_html[third_city_name.toLowerCase()].childElementCount > 0) {
            //city_data.appendChild(generateDifferencesRow(third_city_name));
            if(third_city_html[third_city_name].childNodes[1].innerText !==
                third_city_previous_html[third_city_name].childNodes[1].innerText){
                city_data.appendChild(third_city_previous_html[third_city_name]);
            }
        }
    }
    update_info();
}

function clear_chart(){
    city_data.innerHTML="";
}


function handle_response(data, fromAPI=false, isThirdCity=false){
    p(data);
    mainTable.removeAttribute("hidden");
    let data_object = JSON.parse(data);
    if(data_object!==null){
        let date = get_date(data_object.dt);
        let city = data_object.name;
        let city_name = document.createElement("td");
        city_name.innerText = city + ", " + data_object.sys.country;
        //data_object.main.temp = (data_object.main.temp - 273.15).toFixed(2);
        data_object.main.temp = ((data_object.main.temp - 32)*5/9).toFixed(2);
        //data_object.wind.all = (data_object.wind.all * 2.23694).toFixed(2);
        data_object.wind.all = (data_object.wind.all * 1).toFixed(2);
        let tr = generate_html_from_json(city_name, data_object, date);
        if(original_cities.includes(city.toLowerCase())){
            if(fromAPI){
                original_cities_previous_html[city.toLowerCase()] = original_cities_html[city.toLowerCase()];
            }
            original_cities_html[city.toLowerCase()] = tr;
        }else{
            if(fromAPI){
                third_city_previous_html[third_city_name] = third_city_html[third_city_name];
            }
            third_city_html[third_city_name] = tr;
        }
        show_data(fromAPI, isThirdCity);
    }
}

function errorHandle(req, city, isThirdCity){
    p(req.status + "\n" + req.responseText);
    if(req.status > 399){
        error.innerHTML = "Server has thrown error " + req.status + ": " + JSON.parse(req.response).message;
        error.innerHTML += "<br>Showing data from previous load if available.";
        handle_response(localStorage.getItem(city), false, isThirdCity);
    }

}

// functionality
function update_chart(city, isRefresh=false, isThirdCity=false){
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if(req.readyState === 1){
            setTimeout(function () {
                if(req.readyState === 4 && req.status === 0 || req.readyState === 1){
                    error.innerHTML = "I think you do not have internet connection. Previously stored data, if present, is currently being shown until new data is made available. Press refresh when you have internet connection.";
                    if(localStorage.getItem(original_cities[0]) === null){
                            mainTable.setAttribute("hidden","true");
                    }else{
                        p("Looks like I am always being called");
                    }
                }else{
                    p(req.readyState);
                }
            }, 2000);

        }
        if (req.readyState === 4 && req.status === 200) {
            let data = req.response;
            p("API RESPONSE: " + data);
            localStorage.setItem(city, data);
            error.innerHTML = "";
            handle_response(data, true, isThirdCity);
        }else if (req.readyState > 2){
            errorHandle(req, city, isThirdCity);
        }
    };
    if(isRefresh || localStorage.getItem(city) === null || localStorage.getItem(city+"_timestamp") === null){
        p("Hitting API.");
        if(cities[city] !== undefined){
            req.open("GET", "http://api.openweathermap.org/data/2.5/weather?id=" + cities[city].id + "&APPID="+API_KEY+"&units=imperial", true);
        }else{
            req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID="+API_KEY+"&units=imperial", true);
        }
        req.send();
        if(localStorage.getItem('firstTime') === 'false' && localStorage.getItem(city) !== null){
                error.innerHTML = "I think you do not have internet connection. Previously stored data, if present, is currently being shown until new data is made available. Press refresh when you have internet connection.";
            handle_response(localStorage.getItem(city), false, isThirdCity);
        }else
            localStorage.setItem('firstTime', 'false');
    }else{
        handle_response(localStorage.getItem(city), false, isThirdCity);
    }
}

function load(){
    let url = window.location.href.split('?');
    if(url.length > 1){
        third_city_list = url[1].split('&')[1].split(',');
        third_city_name = url[1].split('&')[0].toLowerCase();
        third_city_option.value = third_city_name;
        if(third_city_name!==""){
            let option = document.createElement("option");
            option.setAttribute("value", third_city_name);
            option.innerText = third_city_name;
            third_city_option.appendChild(option);
        }
    }
    handle_response(localStorage.getItem(original_cities[0]), false);
    handle_response(localStorage.getItem(original_cities[1]), false);

    // if(localStorage.getItem('lahore') !== null)
    //     handle_response(localStorage.getItem('lahore'), false);
    update_chart(original_cities[0], true);
    update_chart(original_cities[1], true);
    for(let city in third_city_list){
        if(third_city_list.hasOwnProperty(city) && third_city_list[city]!==third_city_name){
            let option = document.createElement("option");
            option.setAttribute("value", third_city_list[city]);
            option.innerText = third_city_list[city];
            third_city_option.appendChild(option);
        }
    }
    third_city();
}

function refresh_data(){
    update_chart(original_cities[0], true);
    update_chart(original_cities[1], true);
    if(third_city_html.hasOwnProperty(third_city_name) && third_city_html[third_city_name].childElementCount > 2){
        update_chart(third_city_option.value, true);
    }

}

function third_city(){
//    if(third_city_option.childElementCount > 5)
//        third_city_option.removeChild(document.getElementById("dummy"));
    p("LOOK AT ME!: "+third_city_option.value);
    third_city_name = third_city_option.value;
    update_chart(third_city_name, true, true);
    window.history.pushState('','','?'+third_city_name+"&"+third_city_list);
}

function distance_from_ideal(city){
    let dist = [];
    if(original_cities_html[city] !== undefined && original_cities_html[city] !== null){
        if(original_cities_html[city].childElementCount > 0){
            dist.push((parseFloat(original_cities_html[city].childNodes[2].innerText) - 25)/25);
            dist.push((parseFloat(original_cities_html[city].childNodes[3].innerText) - 40)/40);
            dist.push((parseFloat(original_cities_html[city].childNodes[4].innerText) - 5)/5);
            dist.push((parseFloat(original_cities_html[city].childNodes[5].innerText) - 40)/40);
        }
    }else{
        if(third_city_html[third_city_name].childElementCount > 0){
            dist.push((parseFloat(third_city_html[third_city_name].childNodes[2].innerText) - 25)/25);
            dist.push((parseFloat(third_city_html[third_city_name].childNodes[3].innerText) - 40)/40);
            dist.push((parseFloat(third_city_html[third_city_name].childNodes[4].innerText) - 5)/5);
            dist.push((parseFloat(third_city_html[third_city_name].childNodes[5].innerText) - 40)/40);
        }
    }
    let sum = 0;
    dist.forEach((x) => sum+=(x*x));
    return Math.sqrt(sum);
}

function nicest_city(){
    let all_cities_distance_from_ideal = {};
    all_cities_distance_from_ideal[original_cities[0]] = distance_from_ideal(original_cities[0]);
    all_cities_distance_from_ideal[original_cities[1]] = distance_from_ideal(original_cities[1]);
    if(third_city_name !== "")
        all_cities_distance_from_ideal['third'] = distance_from_ideal(third_city_name);
    let minValue = 9999999;
    let maxValue = -9999999;
    let minCity = "";
    let maxCity = "";
    for(let city in all_cities_distance_from_ideal){
        if(all_cities_distance_from_ideal.hasOwnProperty(city)){
            if(all_cities_distance_from_ideal[city] < minValue){
                minValue = all_cities_distance_from_ideal[city];
                minCity = city;
            }
            if(all_cities_distance_from_ideal[city] > maxValue){
                maxValue = all_cities_distance_from_ideal[city];
                maxCity = city;
            }
        }
    }
    p(all_cities_distance_from_ideal);
    if(minCity === "third") minCity = third_city_name;
    if(maxCity === "third") maxCity = third_city_name;
    nicest.innerText = "The nicest city is " + minCity;
    worst.innerText = "The worst city is " + maxCity;
}

function getAverageHumidity(){
    let sum = 0;
    let count = 0;
    city_data.childNodes.forEach((x)=>{
        if(x.childElementCount > 3){
            if(x.childNodes[0].innerText !== ""){
                sum += parseFloat(x.childNodes[3].innerText);
                count++;
            }
        }
    });
    return (sum/count).toFixed(2);
}

function getAverageTemperature(){
    let sum = 0;
    let count = 0;
    city_data.childNodes.forEach((x)=>{
        if(x.childElementCount > 2){
            if(x.childNodes[0].innerText !== ""){
                sum += parseFloat(x.childNodes[2].innerText);
                count++;
            }
        }
    });
    return (sum/count).toFixed(2);
}

function avg_tem(){
    avg_temp.innerText = "The average temperature is " + getAverageTemperature() + " Celcius.";
}

function avg_hm(){
    avg_hum.innerText = "The average humidity is " + getAverageHumidity() + "%.";
}


function update_info(){
    avg_tem();
    avg_hm();
    nicest_city();
}