var data;
var app = new Vue({
    el: "#app",
    data: {
        city: "",
        /*kelvin: 0,
        wind: 0,
        pressure: 0,
        humidity: 0,
        weatherDescriptionNow: "",
        weatherDescriptionTomorrow: "",
        mainWeatherNow: "",
        mainWeatherTomorrow: "",
*/
        arrayNewContainers: [],
//        dataObject: {}
    },
    methods: {
        createNewContainer: function () {
            this.inputValue();
            this.getData();
//            this.arrayNewContainers.push(this.dataObject);
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
                var dataObject = {};
                dataObject.city = json.city.name;
                dataObject.temperature = json.list[0].main.temp;
                app.arrayNewContainers.push(dataObject);

//                app.convertKelvinToCelsius();
                dataObject.pressure = json.list[0].main.pressure;
                dataObject.wind = json.list[0].wind.speed;
                dataObject.humidity = json.list[0].main.humidity;
                dataObject.weatherDescriptionNow = json.list[0].weather[0].description;
                dataObject.weatherDescriptionTomorrow = json.list[7].weather[0].description;
                dataObject.mainWeatherNow = json.list[0].weather[0].main;
                dataObject.mainWeatherTomorrow = json.list[7].weather[0].main;

                // equals to .success in JQuery Ajax call;
                //                city = json.name;

            }).catch(function (error) {
                // called when an error occurs anywhere in the chain
                console.log("Request failed: " + error.message);
            });
        },
        convertKelvinToCelsius: function () {
            if (this.dataObject.temperatura < 0) {
                this.dataObject.temperatura = 'below absolute zero (0 K)';
            } else {
                this.dataObject.temperatura = this.dataObject.temperatura - 273.15;
            }
            this.dataObject.temperatura = this.dataObject.temperatura.toFixed(1);
        },
        deleteRow: function (index) {
            this.arrayNewContainers.splice(index, 1)
        },
        inputValue: function () {
            var input = document.getElementById("inputCity");
            this.city = input.value;
        }

    }
})
