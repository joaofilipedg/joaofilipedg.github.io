// function fastStart() {
//     var list_fast = ["Portugal", "Spain"]
//     for (let index = 0; index < list_fast.length; index++) {
//         const element = list_fast[index];
//         getNewCountryData(element);
//         addNewCountry(element);
//     }
//     document.getElementById("fast_but").style.display = "none";
//     return
// }

function getValuesAboveThreshold(country_data) {
    // console.log(country_data);
    new_country_data = {}
    new_country_data["cases"] = country_data["cases"].filter(function (num) {
                                                                return num >= threshold;
                                                            });
    new_idx = country_data["cases"].indexOf(new_country_data["cases"][0]);
    new_country_data["date"] = country_data["date"].slice(new_idx);

    return new_country_data;
}

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx);
}

// get the longest duration (for the xaxis)
function getLongestDuration(dataset) {
    longest_duration = 0;
    for (let index = 0; index < dataset.length; index++) {
        country_duration = dataset[index]["data"].length;
        if (country_duration > longest_duration) {
            longest_duration = country_duration;
        }
    }
    return longest_duration;
}

function alignAllActiveCountries() {
    g_aligned_countries = [];
    for (let c_id = 0; c_id < list_active_countries.length; c_id++) {
        const country = list_active_countries[c_id];
        g_aligned_countries.push(alignNewCountry(country));
    }
    return true;
}

function alignNewCountry(country) {
    // console.log("1");
    // console.log(country);
    dict_aux = {};
    dict_aux["name"] = country;
    // console.log("2");
    // console.log(data_read_countries);
    // console.log("3");
    // console.log(data_read_countries[country]);
    realigned_country_data = getValuesAboveThreshold(data_read_countries[country]);
    dict_aux["data"] = realigned_country_data["cases"];
    return dict_aux;
}

// THIS IS THE MAIN FUNCTION THAT DOES THE WORK
function validatedCountrySelected(country) {
    
    console.log("1:");
    console.log(list_read_countries);
    console.log(data_read_countries);
    
    list_active_countries.push(country);
    addNewActiveCountry(country); //add the country to the visible list of active countries

    aligned_country_data = alignNewCountry(country); // Align the country data (values above threshold)
    g_aligned_countries.push(aligned_country_data);

    // Add country to the plot
    if (already_plotted) {
        plotAppendNewCountry(id_confirmed_chart, aligned_country_data);
        // updatePlot(aligned_countries, id_confirmed_chart);
        
        if (list_active_countries.length > 1) {
            document.getElementById("config_table").style.display = "block";
        } else {
            document.getElementById("config_table").style.display = "none";
        }

    } else {
        document.getElementById(id_confirmed_chart).style.display = "block"; //display chart area
        document.getElementById("myDiv2").style.display = "block";

        plotCreateNew(g_aligned_countries, id_confirmed_chart);

        already_plotted = true;
    }
    return true;
}