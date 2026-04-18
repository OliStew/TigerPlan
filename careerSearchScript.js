
import { postMethods } from './runCareerDataBase.js';
import * as allData from './careerSearchDataBase.js';

export function showMajors() {
    var x = document.getElementById("majorDropdown");
    if (x.style.opacity === "0") {
        x.style.opacity = "100";
        x.style.zIndex = 1;
        x.style.pointerEvents = "auto";
    } else {
        x.style.opacity = "0";
        x.style.pointerEvents = "none";
        x.style.zIndex = 0;
    }
}


export function filterMajors() {
    const input = document.getElementById("majorInput");
    const filter = input.value.toUpperCase();
    const div = document.getElementById("majorDropdown");
    const a = div.getElementsByTagName("a");

    for (let i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
            console.log(a[i].textContent);
        } else {
            a[i].style.display = "none";
        }
    }

}

export function majorClicked(element) {
    var x = document.getElementById("majorDropdown");
    var y = document.getElementById("optionsPlaceHolder");
    var z = document.getElementById("careerContentHeader");

    const input = document.getElementById("majorInput");
    input.placeholder = element.textContent;

    x.style.opacity = "0";
    x.style.pointerEvents = "none";
    y.style.display = "none";
    z.style.display = "grid";

    document.querySelectorAll('.careerContent').forEach(element => element.classList.add('careerContent--show'));
    document.getElementById("careerContentHeader").innerHTML = "Career Opportunities for " + element.textContent;

    const majorText = element.textContent;
    const cleanName = majorText.replace(/\s+/g, '');
    const key = "cardData" + cleanName;
    const selectedData = allData[key];

     if (selectedData) {
        postMethods(selectedData);
    } else {
        console.error("Could not find data for key:", key);
    }
}

window.onscroll = function() {scrollFunction()};
export function scrollFunction() {
  var x = document.getElementById("majorDropdown");
    x.style.opacity = "0";
    x.style.pointerEvents = "none";
    x.style.zIndex = 0;
}

window.showMajors = showMajors;
window.filterMajors = filterMajors;
window.majorClicked = majorClicked;

