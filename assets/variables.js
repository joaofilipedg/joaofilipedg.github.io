var available_countries = []; //list of names of the available countries (fetched from the API), used in the autocomplete

var list_read_countries = []; //list of countries with data already fetched
var data_read_countries = {}; //dictionary with data for each country (key: country_name)

var list_active_countries = []; //list of names of the currently active countries, ie the ones being plotted
var list_toggled_countries = []; //list of names of the countries that are active but have been toggled off from the plot
var g_aligned_countries = []; //data of the active countries, aligned according to the current threshold 

var already_plotted = false; //boolean, true if the charts are currently plotted
var log_scale = false; //boolean, true if the chart is in log scale

var threshold = 100; //default threshold value

var longest_duration = 0; //longest duration, ie size of the largest country in g_aligned_countries

var id_confirmed_chart = "casesChart_2";

var apex_default_options = {
    chart: {
        type: "line",
    },
    legend: {
        show: false
    },
    tooltip: {
        shared:true,
        intersect: false,
        y: {
            formatter: function (y) {
                if(typeof y !== "undefined") {
                    return  y.toFixed(0) + " Cases";
                }
                return y;
            }
        },
        x: { 
            formatter: function(x) {
                if (typeof x !== "undefined") {
                    return  "Day " + x.toFixed(0);
                }
                return x;
            }
        }    
    }
}
;
