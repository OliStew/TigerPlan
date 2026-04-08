/* This will be the Global JavaScript File. Anything that will need to be consist between all pages will be put here.
    Anything else create your own js file and link it in the HTML file.
    Of course first test it in your own file, but once you are sure it works, put it here. */

var prevScrollpos = window.pageYOffset;    
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
         document.getElementsByClassName("header")[0].style.padding = "10px 10px";
        document.getElementsByClassName("header")[0].getElementsByClassName("logo")[0].style.fontSize = "15px";

        
         document.getElementsByClassName("navbar")[0].style.opacity = "0%"
        document.getElementsByClassName("navbar")[0].style.top = "-75px";

    
  } else {
        document.getElementsByClassName("header")[0].style.padding = "20px 10px";
        document.getElementsByClassName("header")[0].getElementsByClassName("logo")[0].style.fontSize = "25px";

        document.getElementsByClassName("navbar")[0].style.opacity = "100%"
        document.getElementsByClassName("navbar")[0].style.top = "0px";


  }

}

