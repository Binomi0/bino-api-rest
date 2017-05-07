$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

var modal1 = document.getElementById('id01')
//var modal2 = document.getElementById('id02')
var cerrarmodal = document.getElementById('id01x')
//var cerrarmodal2 = document.getElementById('id02x')

cerrarmodal.addEventListener('click', function() {
  modal1.style.display = "none";
})
// cerrarmodal.addEventListener('click', function() {
//   modal1.style.display = "none";
// })
// cerrarmodal2.addEventListener('click', function() {
//   modal2.style.display = "none";
// })

//document.getElementsByClassName("tablink")[0].click();
//
// function openCity(evt, cityName) {
//   var i, x, tablinks;
//   x = document.getElementsByClassName("city");
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";
//   }
//   tablinks = document.getElementsByClassName("tablink");
//   for (i = 0; i < x.length; i++) {
//     tablinks[i].classList.remove("w3-light-grey");
//   }
//   document.getElementById(cityName).style.display = "block";
//   evt.currentTarget.classList.add("w3-light-grey");
// }




var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/5909f91d4ac4446b24a6d0bd/default';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();

