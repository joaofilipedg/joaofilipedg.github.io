function fastStart() {
    var list_fast = ["Portugal", "Spain"]
    for (let index = 0; index < list_fast.length; index++) {
        const element = list_fast[index];
        getNewCountryData(element);
        addNewCountry(element);
    }
    document.getElementById("fast_but").style.visibility = "hidden";
    return
}

function getValuesAboveThreshold(country_data) {
    new_country_data = {}
    new_country_data["cases"] = country_data["cases"].filter(function (num) {
        return num >= threshold;
    });
    new_idx = country_data["cases"].indexOf(new_country_data["cases"][0]);
    new_country_data["date"] = country_data["date"].slice(new_idx);

    return new_country_data;
}


//https://stackoverflow.com/questions/590018/getting-all-selected-checkboxes-in-an-array
function getSelectedCountries() {
    list_sel_countries = [];
    
    console.clear();
    // check which countries checkboxes were selected
    $("input:checkbox[name=country_list]:checked").each(function () {
        var c = $(this).val();
        list_sel_countries.push(c);
    });
    // document.getElementById("selected_c").innerHTML = list_sel_countries;
    var num_sel_countries = list_sel_countries.length;

    if (list_sel_countries != []) {
        console.log("Im in")

        for (let c_id = 0; c_id < list_sel_countries.length; c_id++) {
            const country = list_sel_countries[c_id];
            console.log(country)

            // if country data was not already fetched
            if (list_read_countries.includes(country) == false) {
                console.log("New Country")
                $.ajax({
                    url: `/values/${country}`,
                    method: "GET",
                    dataType: "json",
                    success: function (data) {
                        
                        // add country to the list of already read countries
                        list_read_countries.push(country);
                        data_read_countries[country] = data.values_alt;
                        
                        // data_sel_countries[country] = data.values_alt;
                        
                        console.log(data_read_countries[country]);
                        
                        num_sel_countries = num_sel_countries - 1;
                        // if last of the selected countries, align the values and plot
                        if (num_sel_countries == 0) {
                            doPlottingStuff();
                        }
                    },
                });
            } else {
                console.log("Already Read Country")
                num_sel_countries = num_sel_countries - 1;
                if (num_sel_countries == 0) {
                    doPlottingStuff();
                }
            }
        }
    }

    
    return false;
}
;
