function plotCreateNew(dataset, id) {
    longest_duration = getLongestDuration(dataset);

    var options = apex_default_options;

    options.chart.id = id;
    options.series = dataset;
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


function plotAppendNewCountry(id, new_country_data) {
    duration = new_country_data["data"].length;

    // Check if new country has longer duration than the other active
    // If it has, it need to realign
    if (duration > longest_duration) {
        console.log("Reploting all");
        plotAllActiveCountries(id);
    } else {
        console.log("Just appending");
        console.log(new_country_data);
        ApexCharts.exec(id, "appendSeries", new_country_data, true);
    }
    return true;
}

function plotAllActiveCountries(id) {
    console.log("HEREEEEEEEEEEEEE");
    longest_duration = getLongestDuration(g_aligned_countries);

    // Update values
    ApexCharts.exec(id, "updateSeries", g_aligned_countries, true);
    ApexCharts.exec(
      id,
      "updateOptions",
      {
        xaxis: {
          categories: range(1, longest_duration)
        }
      },
      true,
      true
    );
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
    return true;
}

function changeThreshold() {
    threshold = parseInt(document.getElementById("thresh_slider").value, 10) * 100;

    // Threshold changed, need to realign countries and redo plot
    alignAllActiveCountries();
    plotAllActive(id_confirmed_chart);
    return true;
}