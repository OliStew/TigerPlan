/* This will be the Global JavaScript File. Anything that will need to be consist between all pages will be put here.
    Anything else create your own js file and link it in the HTML file.
    Of course first test it in your own file, but once you are sure it works, put it here. */

var prevScrollpos = window.pageYOffset;    
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
         document.getElementById("header").style.padding = "10px 10px";
        document.getElementById("logo").style.fontSize = "15px";

        
         document.getElementById("navbar").style.opacity = "0%"
        document.getElementById("navbar").style.top = "-75px";

    
  } else {
        document.getElementById("header").style.padding = "20px 10px";
        document.getElementById("logo").style.fontSize = "25px";

        document.getElementById("navbar").style.opacity = "100%"
        document.getElementById("navbar").style.top = "0px";


  }

}

