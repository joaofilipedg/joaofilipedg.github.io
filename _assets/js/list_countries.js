// https://www.w3schools.com/howto/howto_js_todolist.asp

// // Create a "close" button and append it to each list item
// var myNodelist = document.getElementsByTagName("LI");
// var i;
// for (i = 0; i < myNodelist.length; i++) {
//     var span = document.createElement("SPAN");
//     var txt = document.createTextNode("\u00D7");
//     span.className = "close";
//     span.appendChild(txt);
//     myNodelist[i].appendChild(span);
// }

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var first_c = true;
var list_ul_countries;

// Create a new list item when clicking on the "Add" button
function addNewCountry(inputValue) {
    var li = document.createElement("li");
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    
    document.getElementById("myCountryList").appendChild(li);
    
    document.getElementById("input_countries").value = "";
    
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    
    console.log(close)
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            // console.log(div.firstChild.data);
            div.style.display = "none";
            console.log(div.firstChild.data);
            var c_aux = div.firstChild.data;
            var index = list_active_countries.indexOf(c_aux);
            list_active_countries.splice(index, 1);
            doPlottingStuff_2();
        };
    }
    if (first_c) {
        // Add a "checked" symbol when clicking on a list item
        first_c = false;
        list_ul_countries = document.querySelector("ul");
        list_ul_countries.addEventListener(
            "click",
            function (ev) {
                var c_aux = ev.target.firstChild.data;
                console.log(c_aux)
                if (ev.target.tagName === "LI") {
                    ev.target.classList.toggle("checked");
                    toggleSeries(c_aux)
                }
            },
            false
        );
    }
    return true;
}
