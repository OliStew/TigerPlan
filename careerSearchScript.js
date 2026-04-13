function showMajors() {
    var x = document.getElementById("majorDropdown");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
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
