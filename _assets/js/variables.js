var available_countries = []; //list of names of the available countries (fetched from the API), used in the autocomplete

var list_read_countries = []; //list of countries with data already fetched
var data_read_countries = {}; //dictionary with data for each country (key: country_name)

var list_active_countries = []; //list of names of the currently active countries, ie the ones being plotted
var list_toggled_countries = []; //list of names of the countries that are active but have been toggled off from the plot

// var g_aligned_countries = []; //data of the active countries, aligned according to the current threshold 
var g_countries_data = {}; 


var already_plotted = false; //boolean, true if the charts are currently plotted
var log_scale = false; //boolean, true if the chart is in log scale

var threshold = 100; //default threshold value

var longest_duration = 0; //longest duration, ie size of the largest country in g_aligned_countries

var id_confirmed_chart = "casesChart_2";
var id_total_chart = "casesChart_total";
var id_daily_chart = "casesChart_daily";

var first_day_global = "";
var last_day_global = "";

var num_days_avg = 7;

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

var apex_default_options_new = {
    chart: {
        type: "line",
        zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
        },
        toolbar: {
            autoSelected: 'zoom'
        }
    },
    
    dataLabels: {
        enabled: false
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
                    return  Intl.NumberFormat('pt-PT').format(y) + " Cases"; //add thousands separator
                }
                return y;
            }
        },

        x: {
            format: "dd/MM/yy - dddd"
        }

    },
    xaxis: {
        type: 'datetime',
        labels:   {
            format: "MMM 'yy"
        }
    }

}

var g_colors = [
        "#F3B415",
        "#F27036",
        "#663F59",
        "#6A6E94",
        "#4E88B4",
        "#00A7C6",
        "#18D8D8",
        "#A9D794",
        "#46AF78",
        "#A93F55",
        "#8C5E58",
        "#2176FF",
        "#33A1FD",
        "#7A918D",
        "#BAFF29"
      ];
      
var g_colors_2 = [
        "#F3B415",
        "#F3B415",
        "#F27036",
        "#F27036",
        "#663F59",
        "#663F59",
        "#6A6E94",
        "#6A6E94",
        "#4E88B4",
        "#4E88B4",
        "#00A7C6",
        "#00A7C6",
        "#18D8D8",
        "#18D8D8",
        "#A9D794",
        "#A9D794",
        "#46AF78",
        "#46AF78",
        "#A93F55",
        "#A93F55",
        "#8C5E58",
        "#8C5E58",
        "#2176FF",
        "#2176FF",
        "#33A1FD",
        "#33A1FD",
        "#7A918D",
        "#7A918D",
        "#BAFF29",
        "#BAFF29"
    ];