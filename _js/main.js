var frame = $("#frame")
var iframe = frame.length > 0

var firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1

$(document).ready(function(){

    let num = Math.floor(Math.random() * 100)

    if (num === 50) {

        console.log("Wow, there was a 1% chance of that happening")

        $(".navbar-brand").text("What the Fuck™").css("color", "gold")

    } else {
        console.log("No luck this time: " + num)
    }

})