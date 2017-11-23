var thirdcity = ['New York,US','New Delhi,IN','Sydney,AU','Shanghai,CN','Frankfurt,DE']
var cityExistsFlag=0;
var refreshFlag = 1;
var table = document.getElementById("weathertable");

function getFromLocalStorage(city) {
    return localStorage.getItem(city);
}

function checkIfInLocalStorage(city) {
    if(localStorage.getItem(city)){
        return 1;
    }
    else{
        return 0;
    }
}

function storeInLocalStorage(city, value) {
    localStorage.setItem(city,value);
}

function parsedata(city, data) {
    var temp = JSON.parse(data);
    var arr = [];
    arr.push(city);
    var time = timeConverter(temp.dt);
    arr.push(time)
    arr.push(convertKelvinToCelsius(temp.main.temp));
    arr.push(temp.main.humidity);
    arr.push((temp.wind.speed * 2.23694).toFixed(3));
    arr.push(temp.clouds.all);
    return arr;
}

function addtablerow(city, data,rowno) {
    // var temp = JSON.parse(data)
    var row = table.insertRow(rowno);
    for(i = 0; i< 6; ++i){
        row.cells[i] = row.insertCell(i)
    }
    row.cells[0].innerHTML = data[0];
    // var time = timeConverter(temp.dt);
    row.cells[1].innerHTML = data[1];
    row.cells[2].innerHTML = data[2];
    row.cells[3].innerHTML = data[3];
    row.cells[4].innerHTML = data[4];
    row.cells[5].innerHTML = data[5];
}

function convertKelvinToCelsius(kelvin) {
    if (kelvin < (0)) {
        return 'below absolute zero (0 K)';
    } else {
        return (kelvin-273.15).toFixed(2);
    }
}

function updateTableRow(city,rowno, d1,d2,d3,d4,d5) {
    // var temp = JSON.parse(data);
    console.log(rowno);
    table.rows[rowno].cells[0].innerHTML = city;
    // var time = timeConverter(temp.dt);
    table.rows[rowno].cells[1].innerHTML = d1;
    table.rows[rowno].cells[2].innerHTML = d2;
    table.rows[rowno].cells[3].innerHTML = d3;
    table.rows[rowno].cells[4].innerHTML = d4;
    table.rows[rowno].cells[5].innerHTML = d5;
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var year = a.getFullYear();
    var month = a.getMonth();
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = year + ':' + month + ':' + date + ':' + hour + ':' + min + ':' + sec ;
    return time;
}

function populatemenu(elementId, menuArray) {
    var sel = document.getElementById(elementId);
    document.getElementById(elementId).selectedIndex = -1;
    document.getElementById(elementId).innerHTML = "";
    for(var i = 0; i < menuArray.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = menuArray[i];
        opt.value = menuArray[i];
        sel.appendChild(opt);
    }
}

function calculations() {
    var cityValues = [];

    if(refreshFlag == 0){
        for(i=1;i<table.rows.length;i=i+2){
            var city = [];
            city.push(table.rows[i].cells[0].innerHTML);
            city.push(table.rows[i].cells[2].innerHTML);
            city.push(table.rows[i].cells[3].innerHTML);
            city.push(table.rows[i].cells[4].innerHTML);
            city.push(table.rows[i].cells[5].innerHTML);
            cityValues.push(city);
        }
        console.log(cityValues);
    }
    else {
        for(i=1;i<table.rows.length;++i){
            var city = [];
            city.push(table.rows[i].cells[0].innerHTML);
            city.push(table.rows[i].cells[2].innerHTML);
            city.push(table.rows[i].cells[3].innerHTML);
            city.push(table.rows[i].cells[4].innerHTML);
            city.push(table.rows[i].cells[5].innerHTML);
            cityValues.push(city);
        }
        console.log(cityValues);
    }
    var avgTemp =0, avgHumidity =0,maxTemp =0, maxHumidity =0, indexTemp, indexHumidity, objectiveComponent = [], bestWeather = 0, worstWeather = 1000, bestWeatherIndex, worstWeatherIndex;
    for(i=0;i<cityValues.length;++i){
        avgTemp += parseFloat(cityValues[i][1]);
        avgHumidity += parseFloat(cityValues[i][2]);
        if(maxTemp<parseFloat(cityValues[i][1])){
            maxTemp = parseFloat(cityValues[i][1]);
            indexTemp = i;
        }
        if(maxHumidity<parseFloat(cityValues[i][2])){
            maxHumidity = parseFloat(cityValues[i][2])
            indexHumidity = i;
        }
        objectiveComponent.push((parseFloat(cityValues[i][1])*0.4) + (parseFloat(cityValues[i][2])*0.15) + (parseFloat(cityValues[i][3])*0.25) + (parseFloat(cityValues[i][4])*0.2))
    }
    for(i=0;i<objectiveComponent.length;++i){
        if(bestWeather<parseFloat(objectiveComponent[i])){
            bestWeather = parseFloat(objectiveComponent[i])
            bestWeatherIndex = i;
        }
        if(worstWeather > parseFloat(objectiveComponent[i])){
            worstWeather = parseFloat(objectiveComponent[i])
            worstWeatherIndex = i;
        }
    }
    avgTemp = avgTemp/cityValues.length;
    avgHumidity = avgHumidity/cityValues.length;
    var temp = "The average temperature is " + avgTemp.toFixed(2) +" and the hottest city is " + cityValues[indexTemp][0];
    var humidity = "The average humidity is " + avgHumidity.toFixed(2) +" and the most humid city is " + cityValues[indexHumidity][0];
    var best = "The city with the nicest weather is " + cityValues[bestWeatherIndex][0];
    var worst = "The city with the worst weather is " + cityValues[worstWeatherIndex][0];
    document.getElementById("average-temp").innerHTML = temp;
    document.getElementById("average-humidity").innerHTML = humidity;
    document.getElementById("best-weather").innerHTML = best;
    document.getElementById("worst-weather").innerHTML = worst;
}

function loadWeatherForCity(city, success, error ) {
    // Feature detection
    if ( !window.XMLHttpRequest ) return;

    // Create new request
    var request = new XMLHttpRequest();

    // Setup callbacks
    request.onreadystatechange = function () {

        // If the request is complete
        if ( request.readyState === 4 ) {

            // If the request failed
            if ( request.status >= 400 && request.status< 500 ) {
                if ( error && typeof error === 'function' ) {
                    error( request.responseText, request );
                    document.getElementById("error").innerHTML= "CLIENT ERROR: " + request.responseText;
                }
                return;
            }
            if ( request.status >= 500 && request.status< 600 ) {
                if ( error && typeof error === 'function' ) {
                    error( request.responseText, request );
                    document.getElementById("error").innerHTML = "SERVER ERROR: " + request.responseText;
                }
                return;
            }
            // If the request succeeded
            if ( success && typeof success === 'function' ) {
                success( request.responseText, request );
            }
        }

    };
    request.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=f9cd3610e9144f965638b5be216a0b1d", true);
    request.send();
}

function onWebPageLoad(xml) {

    populatemenu('thirdcity-option',thirdcity);
    if(checkIfInLocalStorage("Phoenix,US")){
        var phoenixData = loadWeatherForCity("Phoenix,US",
            function (data) {
                // On success...
                var tempValue = parsedata("Phoenix,US",data) ;
                var oldValue = JSON.parse(getFromLocalStorage("Phoenix,US"));
                addtablerow("Phoenix,US",tempValue,-1);
                refreshFlag = 0;
                if(tempValue[1]==oldValue[1]){
                    oldValue = ["Phoenix,US",'','','','','']
                    addtablerow("Phoenix,US",oldValue,-1);
                }
                else {
                    addtablerow("Phoenix,US",oldValue,-1);
                }
                tempValue = JSON.stringify(tempValue);
                storeInLocalStorage("Phoenix,US",tempValue);
                calculations();
            },
            function (data) {
                // On failure...
            });

    }
    else{
        var phoenixData = loadWeatherForCity("Phoenix,US",
            function (data) {
                // On success...
                var tempValue = parsedata("Phoenix,US",data) ;
                addtablerow("Phoenix,US",tempValue,0);
                tempValue = JSON.stringify(tempValue);
                storeInLocalStorage("Phoenix,US",tempValue);
                calculations();
            },
            function (data) {
                // On failure...
            });
    }
    if(checkIfInLocalStorage("London,GB")){
        var phoenixData = loadWeatherForCity("London,GB",
            function (data) {
                var tempValue = parsedata("London,GB",data) ;
                var oldValue = JSON.parse(getFromLocalStorage("London,GB"));
                addtablerow("London,GB",tempValue,-1);
                refreshFlag = 0;
                if(tempValue[1]==oldValue[1]){
                    oldValue = ["London,GB",'','','','','']
                    addtablerow("London,GB",oldValue,-1);
                }
                else {
                    addtablerow("London,GB",oldValue,-1);
                }
                tempValue = JSON.stringify(tempValue);
                storeInLocalStorage("London,GB",tempValue);
                calculations();
            },
            function (data) {
                // On failure...
            });
    }

    else{
        var londonData = loadWeatherForCity("London,GB",
            function (data) {
                // On success...
                var tempValue = parsedata("London,GB",data);
                addtablerow("London,GB",tempValue,-1);
                tempValue = JSON.stringify(tempValue);
                storeInLocalStorage("London,GB",tempValue);
                calculations();
            },
            function (data) {
                // On failure...
            });
    }
}

function updateWeatherOfThirdCity(element) {
    var text = element.options[element.selectedIndex].text;
    var oldValue = [], newValue;
    var temp = loadWeatherForCity(text,
        function (data) {
            newValue = parsedata(text,data);
            if(refreshFlag == 0){
                if(cityExistsFlag){

                    var city = table.rows[table.rows.length-2].cells[0].innerHTML;
                    if(table.rows.length == 6){
                        updateTableRow(text,table.rows.length-1,newValue[1],newValue[2],newValue[3],newValue[4],newValue[5]);
                    }else{
                        updateTableRow(text,table.rows.length-2,newValue[1],newValue[2],newValue[3],newValue[4],newValue[5]);
                        updateTableRow(text,table.rows.length-1,'','','','','');
                    }
                    calculations()
                }
                else {
                    addtablerow(text,newValue,-1);
                    // oldValue = [text,'','','','','']
                    // addtablerow(text,oldValue,-1);
                    cityExistsFlag = 1;
                    calculations()
                }
            }
            else{
                if(cityExistsFlag){
                    updateTableRow(text,table.rows.length-1,newValue[1],newValue[2],newValue[3],newValue[4],newValue[5]);
                    calculations()
                }
                else {

                    addtablerow(text,newValue,-1);
                    cityExistsFlag = 1;
                    calculations()
                }
            }
        },
        function (data) {

        });
}


function handleAsynchronousRequest(city,rowno) {
    var temp = loadWeatherForCity(city,
        function (data) {
            // On success...
            //console.log("i:",i);
            var newValue = parsedata(city,data);
            var oldValue = [];
            if(checkIfInLocalStorage(city)) {
                oldValue = JSON.parse(getFromLocalStorage(city));
                if(newValue[1]==oldValue[1]){
                    updateTableRow(city,rowno,'','','','','');
                    calculations()
                }
                else{
                    updateTableRow(city,rowno-1,newValue[1],newValue[2],newValue[3],newValue[4],newValue[5]);
                    updateTableRow(city,rowno,oldValue[1],oldValue[2],oldValue[3],oldValue[4],oldValue[5]);
                    calculations()
                }
                storeInLocalStorage(city,JSON.stringify(newValue));
            }
            else {
                for (i = 0; i<6;++i){
                    oldValue.push(table.rows[rowno-1].cells[i].innerHTML);
                }
                if(newValue[1]==oldValue[1]){
                    updateTableRow(city,rowno,'','','','','');
                    calculations();
                }
                else{
                    updateTableRow(city,rowno-1,newValue[1],newValue[2],newValue[3],newValue[4],newValue[5]);
                    updateTableRow(city,rowno,oldValue[1],oldValue[2],oldValue[3],oldValue[4],oldValue[5]);
                    calculations();
                }
            }

        },
        function (data) {
            // On failure...
        });
}

function refreshButtonClicked() {
    if(refreshFlag == 1){
        refreshFlag = 0;

        for(i = 2; i<=table.rows.length; i=i+2){
            var row = table.insertRow(i);
            for(j = 0; j< 6; ++j){
                row.cells[j] = row.insertCell(j)
            }
            console.log(table.rows[i-1].cells[0].innerHTML);
            //var city = table.rows[i-1].cells[0].innerHTML;

        }
        for(i = 2; i<=table.rows.length; i=i+2){
            var city = table.rows[i-1].cells[0].innerHTML;
            handleAsynchronousRequest(city,i);
        }
    }
    else{
        refreshFlag = 1;

        for(i = 2; i<table.rows.length; ++i){
            table.deleteRow(i);
        }
    }
}