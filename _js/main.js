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

        // Bit of a css hack for the iframe pages
        // For some reason the normal pages are just fine with
        // Only having a min-height on the body
        // But this means that the iframes cant size automatically for some reason
        // Setting the body to height 100% seems to solve this issues
        $("body").css("height", "100vh")

    }

}

if (firefox) {
    $(window).on("load", onload)
} else {
    $(document).ready(onload)
}