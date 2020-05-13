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

function createPlot(dataset, id) {
    longest_duration = getLongestDuration(dataset);
    
    var options = {
        chart: {
            type: "line",
            id: id
        },
        series: dataset,
        yaxis: {
            title: {text: "Confirmed Cases"}
        },
        xaxis: {
            title: {text: `Days since ${threshold} confirmed cases`},
            categories: range(1,longest_duration)
        }
    }

    var chart = new ApexCharts(document.querySelector(`#${id}`), options);

    chart.render();
    
    return true;
}


function toggleScaleLog() {
    log_scale = !log_scale;
    ApexCharts.exec(
        'casesChart_2',
        'updateOptions', {
            yaxis: {
                logarithmic: log_scale,
                title: {text: "Confirmed Cases"}
            }
        },
        true,
        true
    );
    return true;
}

function updatePlot(dataset, id) {
    longest_duration = getLongestDuration(dataset);
    // Update values
    ApexCharts.exec(
        id, 
        'updateSeries', 
        dataset, 
        true);
    ApexCharts.exec(
        id, 
        'updateOptions', {
            xaxis: {
                categories: range(1,longest_duration), 
                title: {text: `Days since ${threshold} confirmed cases`}
            },
            yaxis: {
                logarithmic: log_scale,
                title: {text: "Confirmed Cases"}
            }
        }, 
        true, 
        true);
    return true;
}

function changeThreshold() {
    threshold = parseInt(document.getElementById("thresh_slider").value, 10)*100;
    doPlottingStuff_2();
    return true;
}

function doPlottingStuff() {
    console.log("Got all the countries data!");
    console.log(data_read_countries);

    aligned_countries = []
    for (let c_id_inner = 0; c_id_inner < list_sel_countries.length; c_id_inner++) {
        const country_inner = list_sel_countries[c_id_inner];
        dict_aux = {};
        dict_aux["name"] = country_inner;       
        realigned_country_data = getValuesAboveThreshold(data_read_countries[country_inner], 100);
        dict_aux["data"] = realigned_country_data["cases"];
        aligned_countries.push(dict_aux);
    }
    console.log(aligned_countries);
    console.log("Trying to plot");
    if (already_plotted) {
        updatePlot(aligned_countries, "casesChart");
    } else {
        createPlot(aligned_countries, "casesChart");
        already_plotted = true;
    }
    return true;
}

function doPlottingStuff_2() {
    console.log("Doing plot stuff_2!");
    console.log(data_read_countries);
    console.log(list_read_countries);
    console.log(list_active_countries);

    if (list_active_countries.length == 0) {
        console.log("Destroying plot")
        already_plotted_2 = false;
        ApexCharts.exec("casesChart_2", "destroy");
        document.getElementById("config_table").style.visibility = "hidden";
    } else { 
        aligned_countries = [];
        for (let c_id = 0; c_id < list_active_countries.length; c_id++) {
            const country = list_active_countries[c_id];
            dict_aux = {};
            dict_aux["name"] = country;       
            realigned_country_data = getValuesAboveThreshold(data_read_countries[country], 100);
            dict_aux["data"] = realigned_country_data["cases"];
            aligned_countries.push(dict_aux);
        }
        // console.log(aligned_countries);
        // console.log("Trying to plot");
        if (already_plotted_2) {
            updatePlot(aligned_countries, "casesChart_2");
        } else {
            createPlot(aligned_countries, "casesChart_2");
            already_plotted_2 = true;
        }
        document.getElementById("myDiv2").style.visibility = "visible";
        if (list_active_countries.length > 1) {
            document.getElementById("config_table").style.visibility = "visible";
        } else {
            document.getElementById("config_table").style.visibility = "hidden";
        }

    }
    return true;
}    

function toggleSeries(country) {
    ApexCharts.exec("casesChart_2", "toggleSeries", country);
    return true;
}