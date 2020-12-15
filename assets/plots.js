function plotCreateNew(new_country_data, id) {
    // longest_duration = getLongestDuration(dataset);

    longest_duration = new_country_data["data"].length;

    var options = apex_default_options;

    options.chart.id = id;
    // dataset = {name: new_country_data["name"], data: new_country_data["data"]};

    options.series = [{name: new_country_data["name"], data: new_country_data["data"]}];
    options.yaxis = {
                        title: {text: "Confirmed Cases"}
                    };
    options.xaxis = {
                        title: {text: `Days since ${threshold} confirmed cases`},
                        categories: range(1,longest_duration)
                    };

    var chart = new ApexCharts(document.querySelector(`#${id}`), options);

    chart.render();
    
    return true;
}

function plotCreateNew2(full_dataset, country, type) {
    var options = apex_default_options_new;
    
    options.chart.group = "test";

    if (type == "totals") {
        title = "Total Confirmed Cases";
        options.chart.type = "line";

        options.series = [{
                            name: country, 
                            data: full_dataset[type],
                        }];

        id = id_total_chart;

        options.colors =  g_colors;
        options.legend = {show: false };

    } else {
        title = "Daily Confirmed Cases";
        // options.chart.type = "bar";
        // options.dataLabels = [{enabled: "false"}];
        
        options.series = [
                            {   name: country + " (daily)", 
                                data: full_dataset["daily"],
                                type: "bar"
                            }, 
                            {   name: country + " (" + num_days_avg + "-day average)", 
                                data: full_dataset["avg_7days"],
                                type: "line"
                            }
                        ];
        
                        
        options.colors =  g_colors_2;
        // options.plotOptions = {bar: {colors:  {backgroundBarOpacity: 0.5}}};
        options.fill =   {type: ["pattern", "solid","pattern", "solid","pattern", "solid","pattern", "solid","pattern", "solid","pattern", "solid","pattern", "solid","pattern", "solid","pattern", "solid","pattern", "solid","pattern", "solid","pattern", "solid"], 
                           pattern: {style: 'slantedLines', strokeWidth: 1.5}
                        };
        options.stroke =   {width: [1, 3,1, 3,1, 3,1, 3,1, 3,1, 3,1, 3,1, 3,1, 3,1, 3,1, 3,1, 3,1, 3,1, 3,1, 3,1, 3,1, 3,1, 3,1, 3,1, 3]};
        
        id = id_daily_chart;
    }
    
    document.getElementById(id).style.display = "block";
 
    options.chart.id = id;

    options.title = {
                        text: title,
                        align: 'left'
                    };

    
                
    options.yaxis = {
            labels: {minWidth: 40},
            title: {text: title},
            min: 0
    };
    var chart = new ApexCharts(document.querySelector(`#${id}`), options);

    chart.render();
    
    return true;
}

function plotToggleScaleLog() {
    log_scale = !log_scale;
    ApexCharts.exec(
        id_confirmed_chart,
        "updateOptions",
        {
            yaxis: {
                logarithmic: log_scale
            },
        },
        true,
        true
    );
    return true;
}


function plotAppendNewCountry(new_country_data, id) {
    duration = new_country_data["data"].length;

    dataset = {name: new_country_data["name"], data: new_country_data["data"]};

    // Check if new country has longer duration than the other active
    // If it has, it need to realign
    if (duration > longest_duration) {
        console.log("Reploting all");
        plotAllActiveCountries(id);
    } else {
        console.log("Just appending");
        console.log(dataset);
        ApexCharts.exec(id, "appendSeries", dataset, true);
    }
    return true;
}

function plotAppendNewCountry2(full_dataset, country, type) {
    
    if (type == "totals") {
        id = id_total_chart;
        dataset = {name: country, data: full_dataset["totals"]};
        ApexCharts.exec(id, "appendSeries", dataset, true);
    } else {
        id = id_daily_chart;
        dataset = { name: country + " (daily)", 
                    data: full_dataset["daily"],
                    type: "bar"};
        ApexCharts.exec(id, "appendSeries", dataset, true);

        dataset = { name: country + " (" + num_days_avg + "-day average)", 
                    data: full_dataset["avg_7days"],
                    type: "line"};
        ApexCharts.exec(id, "appendSeries", dataset, true);
    }

    return true;
}

function plotNewCountry(country) {

    // Add country to the plot
    if (already_plotted) {

        plotAppendNewCountry(g_countries_data[country]["aligned"], id_confirmed_chart);
        
        plotAppendNewCountry2(g_countries_data[country], country, "totals");
        plotAppendNewCountry2(g_countries_data[country], country, "daily");
       



        if (list_active_countries.length > 1) {
            document.getElementById("config_table").style.display = "block";
        } else {
            document.getElementById("config_table").style.display = "none";
        }

    } else {
        document.getElementById(id_confirmed_chart).style.display = "block"; //display chart area
        document.getElementById("myDiv2").style.display = "block";

        
        plotCreateNew(g_countries_data[country]["aligned"], id_confirmed_chart);
        
        plotCreateNew2(g_countries_data[country], country, "totals");
        plotCreateNew2(g_countries_data[country], country, "daily");
  
        already_plotted = true;
    }
}

function updatePlottedSeries(list_countries) {
    var datasets = getFormatedDataset(list_countries, ["totals", "daily"]);
    
    ApexCharts.exec(id_total_chart, "updateSeries", datasets["totals"], true);
    ApexCharts.exec(id_daily_chart, "updateSeries", datasets["daily"], true);

    return true;
}


function plotAllActiveCountries() {
    // ALIGNED PLOT
    console.log("HEREEEEEEEEEEEEE");
    longest_duration = getLongestDuration();

    var datasets = getFormatedDataset(list_active_countries, ["aligned"]);
    // var datasets = [{name:"Portugal", data: g_countries_data["Portugal"]["aligned"]["data"]}, {name:"Austria", data: g_countries_data["Austria"]["aligned"]["data"]}];
    console.log(datasets);
    // Update values
    ApexCharts.exec(id_confirmed_chart, "updateSeries", datasets["aligned"], true);
    ApexCharts.exec(
      id_confirmed_chart,
      "updateOptions",
      {
        xaxis: {
          categories: range(1, longest_duration)
        }
      },
      true,
      true
    );

    // ApexCharts.exec(id_total_chart, "updateSeries", datasets["totals"], true);
    // ApexCharts.exec(id_daily_chart, "updateSeries", datasets["daily"], true);
    return true;
}

function plotClose(id) {
     console.log("Destroying plot");
     already_plotted = false;
     ApexCharts.exec(id, "destroy");
     document.getElementById(id).style.display = "none";
     document.getElementById("config_table").style.display = "none";
     return true;
}



// function doPlottingStuff_2() {
//     console.log("Doing plot stuff_2!");
//     console.log(data_read_countries);
//     console.log(list_read_countries);
//     console.log(list_active_countries);

//     if (list_active_countries.length == 0) {
//         console.log("Destroying plot")
//         already_plotted = false;
//         ApexCharts.exec("casesChart_2", "destroy");
//         document.getElementById("casesChart_2").style.display = "none";
//         document.getElementById("config_table").style.display = "none";
//     } else { 
//         aligned_countries = [];
//         for (let c_id = 0; c_id < list_active_countries.length; c_id++) {
//             const country = list_active_countries[c_id];
//             dict_aux = {};
//             dict_aux["name"] = country;       
//             realigned_country_data = getValuesAboveThreshold(data_read_countries[country]);
//             dict_aux["data"] = realigned_country_data["cases"];
//             aligned_countries.push(dict_aux);
//         }
//         // console.log(aligned_countries);
//         // console.log("Trying to plot");
//         if (already_plotted) {
//             updatePlot(aligned_countries, "casesChart_2");
//         } else {
//             document.getElementById("casesChart_2").style.display = "block";
//             createPlot(aligned_countries, "casesChart_2");
//             already_plotted = true;
//         }
//         document.getElementById("myDiv2").style.display = "block";
//         if (list_active_countries.length > 1) {
//             document.getElementById("config_table").style.display = "block";
//         } else {
//             document.getElementById("config_table").style.display = "none";
//         }

//     }
//     return true;
// }    

function toggleSeries(country) {
    ApexCharts.exec(id_confirmed_chart, "toggleSeries", country);
    ApexCharts.exec(id_total_chart, "toggleSeries", country);
    ApexCharts.exec(id_daily_chart, "toggleSeries", country + " (daily)");
    ApexCharts.exec(id_daily_chart, "toggleSeries", country + " (" + num_days_avg + "-day average)");
    return true;
}

function changeThreshold() {
    threshold = parseInt(document.getElementById("thresh_slider").value, 10) * 100;

    // Threshold changed, need to realign countries and redo plot
    alignAllActiveCountries();
    plotAllActiveCountries();
    return true;
}
;
