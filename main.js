var data;
var app = new Vue({
    el: "#app",
    data: {
        city: ""
    },
    created: function () {
        this.getData();
    },
    methods: {
        getData: function () {
            fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + {
                app.city
            } + "&APPID=914f7ee92898923518e503628161935b", {

                method: "GET",
                /*headers: {
                    'X-API-Key': '914f7ee92898923518e503628161935b'
                }*/
            }).then(function (response) {

                if (response.ok) {
                    // add a new promise to the chain
                    return response.json();
                }
                // signal a server error to the chain
                throw new Error(response.statusText);
            }).then(function (json) {
                data = json;
                app.inputValue();
                // equals to .success in JQuery Ajax call;
                //                city = json.name;
                console.log(data);
            }).catch(function (error) {
                // called when an error occurs anywhere in the chain
                console.log("Request failed: " + error.message);
            });
        },
        inputValue: function () {
            console.log(app.city);
        }

    }
})
