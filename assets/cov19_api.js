function getListFromJSON(data, entry) {
    new_list = [];
    for (let index = 0; index < data.length; index++) {
        if (typeof data[index] == "function") continue;
        
        if (entry == "Date") {
            new_list.push(data[index][entry].substr(0,10));
        } else {
            new_list.push(data[index][entry]);
        }
    }
    return new_list;
}

function getAvailableCountries() {
    $.ajax({
        url: "https://api.covid19api.com/countries",
        method: "GET",
        dataType: "json",
        success: function (data) {
            available_countries = getListFromJSON(data, "Country")
            autocomplete(document.getElementById("input_countries"), available_countries);
        },
    });
}

function getNewCountryData(country) {
    // console.log(country)

    // if country data was not already fetched
    if (!list_read_countries.includes(country)) {
        console.log("Fecthing data from new country")
        $.ajax({
            url: `https://api.covid19api.com/total/dayone/country/${country}/status/confirmed`,
            method: "GET",
            dataType: "json",
            success: function (data) {
                // add country to the list of already read 
                // console.log(data)
                list_read_countries.push(country);

                var new_values = {};
                new_values["date"] = getListFromJSON(data, "Date");
                new_values["cases"] = getListFromJSON(data, "Cases");
                
                data_read_countries[country] = new_values;
                               
                // console.log(list_read_countries);
                console.log("early");
                console.log(data_read_countries);
                
                validatedCountrySelected(country); //Main worker script. Needs to be called here because ajax call is asynchronous
                },
            });
    } else {
        console.log("Country data was already previously fecthed.")
        // doPlottingStuff_2();

    }
    return;
}
;
