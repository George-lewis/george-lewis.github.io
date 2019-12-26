var frame = $("#frame")
var iframe = frame.length > 0

var firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1

var fun = true
var funcheat = false

function onload() {

    if (iframe) {

        let printable = "<a class=\"btn btn-outline-dark\" href=\"REPLACE\">Printable Version</a>"

        printable = printable.replace("REPLACE", frame.attr("src"))

        $("nav .form-inline").append(printable)

    }

}

$(document).ready(onload)