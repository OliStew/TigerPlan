
function showMajors() {
    var x = document.getElementById("majorDropdown");
    if (x.style.opacity === "0") {
        x.style.opacity = "100";
        x.style.pointerEvents = "auto";
    } else {
        x.style.opacity = "0";
        x.style.pointerEvents = "none";
    }
}


function filterMajors() {
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

function majorClicked(element) {
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

}

