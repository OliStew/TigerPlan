
export function showMajors1() {
    var x = document.getElementById("majorDropdown1");
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



export function showMajors2() {
    var x = document.getElementById("majorDropdown2");
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

export function filterMajors1() {
    const input = document.getElementById("majorInput1");
    const filter = input.value.toUpperCase();
    const div = document.getElementById("majorDropdown1");
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

export function filterMajors2() {
    const input = document.getElementById("majorInput2");
    const filter = input.value.toUpperCase();
    const div = document.getElementById("majorDropdown2");
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

export function majorClicked1(element) {

    var x1 = document.getElementById("majorDropdown1");
    var x2 = document.getElementById("majorDropdown2");
    var y = document.getElementById("Infomation1");
    var z = document.getElementById("Infomation2");
    var a = document.getElementById("compareResults");

    const input = document.getElementById("majorInput1");
    input.placeholder = element.textContent;

    x1.style.opacity = "0";
    x1.style.marginTop = "-13%";
    x2.style.marginTop = "-13%";
    y.style.display = "block";

   if (y.style.display === "block" && z.style.display === "block") {
        a.style.display  = "block";
    } 

}

export function majorClicked2(element) {

    var x1 = document.getElementById("majorDropdown2");
    var x2 = document.getElementById("majorDropdown1");
    var y = document.getElementById("Infomation2");
    var z = document.getElementById("Infomation1");
    var a = document.getElementById("compareResults");

    const input = document.getElementById("majorInput2");
    input.placeholder = element.textContent;

    x1.style.opacity = "0";
    x1.style.marginTop = "-13%";
    x2.style.marginTop = "-13%";
    y.style.display = "block";

    if (y.style.display === "block" && z.style.display === "block") {
        a.style.display  = "block";
    } 

}

window.showMajors1 = showMajors1;
window.showMajors2 = showMajors2;
window.filterMajors1 = filterMajors1;
window.filterMajors2 = filterMajors2;
window.majorClicked1 = majorClicked1;
window.majorClicked2 = majorClicked2;

