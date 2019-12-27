var frame = $("#frame")
var iframe = frame.length > 0

var firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1

var fun = false
var funcheat = false

function onload() {

    if (iframe) {

        let printable = "<a class=\"btn btn-outline-dark\" target=\"_blank\" href=\"REPLACE\">Printable Version</a>"

        printable = printable.replace("REPLACE", frame.attr("src"))

        $("nav .form-inline").append(printable)

        console.log("Fix iframe anchor tags")

        frame.on("load", function () {
            frame.contents().find("a").attr("target", "_blank")
        })

    }

}

if (firefox) {
    $(window).on("load", onload)
} else {
    $(document).ready(onload)
}