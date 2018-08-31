var data;
var app = new Vue({
    el: "#app",
    data: {
        city: "",
        kelvin:0,
        wind:0,
        pressure: 0,
        humidity: 0,
        weatherDescriptionNow:"",
        weatherDescriptionTomorrow:"",
        mainWeatherNow:"",
        mainWeatherTomorrow: "",
        
        arrayNewContainers: []
    },
    methods: {
        inputValue: function () {
            var input = document.getElementById("inputCity");
            this.city = input.value;
            this.getData()
        },
        getData: function () {
            fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + this.city + "&APPID=914f7ee92898923518e503628161935b", {

                method: "GET",

            }).then(function (response) {

                if (response.ok) {
                    // add a new promise to the chain
                    return response.json();
                }
                // signal a server error to the chain
                throw new Error(response.statusText);
            }).then(function (json) {
                console.log(app.city)
                console.log(json);
                app.kelvin = json.list[0].main.temp;
                app.convertKelvinToCelsius();
                app.pressure = json.list[0].main.pressure;
                app.wind = json.list[0].wind.speed;
                app.humidity = json.list[0].main.humidity;
                app.weatherDescriptionNow = json.list[0].weather[0].description;
                app.weatherDescriptionTomorrow = json.list[7].weather[0].description;
                app.mainWeatherNow = json.list[0].weather[0].main;
                
                app.mainWeatherTomorrow = json.list[7].weather[0].main;
                app.imageDependOfWeather(app.mainWeatherNow, "nowWeather");
                app.imageDependOfWeather(app.mainWeatherTomorrow, "tomorrowWeather");
                // equals to .success in JQuery Ajax call;
                //                city = json.name;

            }).catch(function (error) {
                // called when an error occurs anywhere in the chain
                console.log("Request failed: " + error.message);
            });
        },
        convertKelvinToCelsius: function() {
            console.log(this)
            if (this.kelvin < 0) {
                this.kelvin = 'below absolute zero (0 K)';
            } else {
                this.kelvin = this.kelvin - 273.15;
            }
            this.kelvin= this.kelvin.toFixed(1);
        },
        imageDependOfWeather: function(string, id){
            var divImg = document.getElementById(id);
            console.log(divImg)
            console.log(string)
            if(string === "Clouds"){
                var cloudsImg = document.createElement("img");
                cloudsImg.setAttribute("src", "Images/cloud.jpg" );
                divImg.appendChild(cloudsImg);
            }else if(string === "Rain"){
                var cloudsImg = document.createElement("img");
                cloudsImg.setAttribute("src", "Images/rain.jpg" );
                divImg.appendChild(cloudsImg);
            }else if(string === "Clear"){
                var cloudsImg = document.createElement("img");
                cloudsImg.setAttribute("src", "Images/clear.jpg" );
                divImg.appendChild(cloudsImg);
            }
        }

        //        pushTheContainer: function(){
        //            app.arrayNewContainers.push("app.city")
        //        }
        //        inputValue: function () {
        //            var input = document.getElementById("inputCity");
        //            for(var i = 0; i < this.dataCityName.length; i++ ){
        //                if(this.dataCityName[i] === input.value){
        //                    return true;
        //                }else{
        //                    return false;
        //                }
        //            }
        //        },
        //        imageDependOfWeather: function(){

        //        }

    }
})
