
function showMajors1() {
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

function showMajors2() {
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





function filterMajors1() {
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

function filterMajors2() {
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