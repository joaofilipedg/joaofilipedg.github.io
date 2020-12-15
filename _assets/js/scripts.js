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
function getLongestDuration() {
    longest_duration = 0;
    for (let c_id = 0; c_id < list_active_countries.length; c_id++) {
        const country = list_active_countries[c_id];
        country_duration = g_countries_data[country]["aligned"]["duration"];
        if (country_duration > longest_duration) {
            longest_duration = country_duration;
        }
    }
    return longest_duration;
}

function alignAllActiveCountries() {
    // g_aligned_countries = [];
    for (let c_id = 0; c_id < list_active_countries.length; c_id++) {
        const country = list_active_countries[c_id];
        // g_aligned_countries.push(alignNewCountry(country));
        g_countries_data[country]["aligned"] = alignNewCountry(country);
    }
    return true;
}

function alignNewCountry(country) {
    dict_aux = {};
    dict_aux["name"] = country;
    realigned_country_data = getValuesAboveThreshold(data_read_countries[country]);
    dict_aux["data"] = realigned_country_data["cases"];
    dict_aux["duration"] = dict_aux["data"].length;
    return dict_aux;
}

function getDataseriesNewCountry(dates, datapoints) {
    values = [];
    for (i = 0; i < dates.length; i++)  {
        var innerArr =  [dates[i], datapoints[i]]
        values.push(innerArr);
    }
    return values;
}

function getDailyAverageOverPastDays(daily_values, num_days) {
    const result = [];
    for (let i = 0; i <= daily_values.length; i++) {
        const subArr_aux = daily_values.slice(Math.max(i - num_days, 0), Math.min(i, daily_values.length));
        
        var subArr = [];
        for (let j = 0; j< subArr_aux.length; j++) {
            subArr.push(subArr_aux[j][1]);
        }
        
        const avg = subArr.reduce((a, b) => a + (isNaN(b) ? 0 : b), 0) / subArr.length;
        result.push(Math.round(avg));
    }
    return result;
}

// this function assumes dates will always be in the format "YYYY-MM-DD"
function isLater(dateString1, dateString2) {
  return dateString1 > dateString2
}

function daysBetweenDates(dateString1, dateString2) {
    date1 = new Date(dateString1);
    date2 = new Date(dateString2);

    diff_in_days = (date1.getTime() - date2.getTime()) / (1000 * 3600 * 24);

    return diff_in_days;
}

function padCountryData(list_countries, sample_country, num_days, where) {
    if (where == "first") {
        // pad at the beginning
        var arr_aux = [];
        for (let i = 0; i <= num_days; i++) {
            arr_aux.push([g_countries_data[sample_country]["totals"][i][0], null]);
        }

        for (let c_i = 0; c_i < list_countries.length; c_i++) {
            country = list_countries[c_i];
            g_countries_data[country]["totals"] = arr_aux.slice(0,-1).concat(g_countries_data[country]["totals"]);
            g_countries_data[country]["daily"] = arr_aux.slice(1).concat(g_countries_data[country]["daily"]);
            g_countries_data[country]["avg_7days"] = arr_aux.slice(1).concat(g_countries_data[country]["avg_7days"]);
            g_countries_data[country]["first_day"] = arr_aux[0][0];
        }
    } else {
        // pad at the end
        var arr_aux = [];
        for (let i = 0; i < num_days; i++) {
            arr_aux.push([g_countries_data[sample_country]["totals"].slice(-num_days+i)[0], null]);
        }

        for (let c_i = 0; c_i < list_countries.length; c_i++) {
            country = list_countries[c_i];
            g_countries_data[country]["totals"] = g_countries_data[country]["totals"].concat(arr_aux);
            g_countries_data[country]["daily"] = g_countries_data[country]["daily"].concat(arr_aux);
            g_countries_data[country]["avg_7days"] = g_countries_data[country]["avg_7days"].concat(arr_aux);
            g_countries_data[country]["last_day"] = arr_aux.slice(-1)[0];
        }
    }
}

function getFormatedDataset(list_countries, types) {
    var datasets = {};
    for (let i = 0; i < types.length; i++) {
        datasets[types[i]] = [];
    }
    for (let c_id = 0; c_id < list_countries.length; c_id++) {
        country = list_countries[c_id];
        for (let i = 0; i < types.length; i++) {
            var type = types[i];
            if (type == "daily") {
                datasets[type].push({name: country + " (daily)", 
                        data: g_countries_data[country]["daily"],
                        type: "bar"});
                datasets[type].push({name: country + " (" + num_days_avg + "-day average)", 
                        data: g_countries_data[country]["avg_7days"],
                        type: "line"});
            } else if (type == "aligned") {
                datasets[type].push({name: country, data: g_countries_data[country][type]["data"]});
            } else {
                datasets[type].push({name: country, data: g_countries_data[country][type]});                
            }
        }
    }
    return datasets;
}


// THIS IS THE MAIN FUNCTION THAT DOES THE WORK
function validatedCountrySelected(country) {
    
    console.log("1:");
    console.log(list_read_countries);
    console.log(data_read_countries);
    
    

    aligned_country_data = alignNewCountry(country); // Align the country data (values above threshold)
    
    // g_aligned_countries.push(aligned_country_data);
    // console.log("2:");
    // console.log(g_aligned_countries);

    g_countries_data[country] = {};
    g_countries_data[country]["aligned"] = aligned_country_data;
    
    dataseries_country_total = getDataseriesNewCountry(data_read_countries[country]["date"], data_read_countries[country]["cases"]);
    console.log("3:");
    console.log(dataseries_country_total);

    g_countries_data[country]["totals"] = dataseries_country_total;
    
    var values_daily = data_read_countries[country]["cases"].slice(1).map((x,i)=> x-data_read_countries[country]["cases"][i]);
    dataseries_country_daily = getDataseriesNewCountry(data_read_countries[country]["date"].slice(1), values_daily);
    console.log("4:");
    console.log(dataseries_country_daily);
    
    g_countries_data[country]["daily"] = dataseries_country_daily;
    console.log("5:");
    console.log(g_countries_data);

    var values_avg_daily = getDailyAverageOverPastDays(g_countries_data[country]["daily"], num_days_avg);
    dataseries_country_avg_daily = getDataseriesNewCountry(data_read_countries[country]["date"].slice(1), values_avg_daily.slice(1));
    g_countries_data[country]["avg_7days"] = dataseries_country_avg_daily;
    
    g_countries_data[country]["first_day"] = data_read_countries[country]["date"][0];    
    g_countries_data[country]["last_day"] = data_read_countries[country]["date"].slice(-1)[0];    
    
    if (!already_plotted) {
        first_day_global = g_countries_data[country]["first_day"];
        last_day_global = g_countries_data[country]["last_day"];
        console.log("first_day: " + first_day_global);
        console.log("last_day: " + last_day_global);
    } else {
        // check if nenw country has same startisng and end dates
        console.log("days");
        console.log(daysBetweenDates(g_countries_data[country]["first_day"], first_day_global));
        console.log(daysBetweenDates(g_countries_data[country]["last_day"], last_day_global));
       
        diff_start = daysBetweenDates(g_countries_data[country]["first_day"], first_day_global);
        diff_last = daysBetweenDates(g_countries_data[country]["last_day"], last_day_global);
        country_aux = list_active_countries[0];
        need_replot = false;


        if (diff_start > 0) {
            // need to pad the new country with nulls at the beginning
           padCountryData([country], country_aux, diff_start, "first");
        
        } else if (diff_start < 0) {
            // need to pad the countries previously read with nulls at the beginning
            padCountryData(list_active_countries, country, diff_start*-1, "first");

            first_day_global = g_countries_data[country]["first_day"];
            
            // need to replot everything
            need_replot = true;
        }
        
        if (diff_last > 0) {
            // need to pad the countries previously read with nulls at the end
            padCountryData(list_active_countries, country, diff_last, "last");
            
            last_day_global = g_countries_data[country]["last_day"];

            // need to replot everything
            need_replot = true;
            
        } else if (diff_last < 0){
            // need to pad the new country with nulls at the end
            padCountryData([country], sample_country, diff_last*-1, "last");
            
        }

        if (need_replot) {
            updatePlottedSeries(list_active_countries);
        }
    }

    list_active_countries.push(country);
    addNewActiveCountry(country); //add the country to the visible list of active countries    

    plotNewCountry(country);
    
    return true;
}

