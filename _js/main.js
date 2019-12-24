var frame = $("#frame")
var iframe = frame.length > 0

var firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1

if (firefox) {

    $(document).load(function() {

        // Header color
        $("#content").css("background-color", "#202020")

    })

}