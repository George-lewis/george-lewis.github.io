var iframe_init = false

function onload() {

    if (localStorage.getItem("mode") === "dark") {
        toggle_mode()
    } else {
        localStorage.setItem("mode", "light")
    }

    $("#frame").ready(init_iframe)

}

$(document).ready(onload)

 function check_iframe() {

    var links = $("#frame").contents().find("head link")

    for (i = 0; i < links.length; i++) {
        console.log("Scane: " + links[i].href)
        if (links[i].href.endsWith("dark.css")) {
            return true
        }
    }

    return false

 }

 function init_iframe() {
    console.log("Init iframe")
    var frame = $("#frame").contents()
    var count = 0
    while (!check_iframe()) {
        frame.find("head").append("<link rel=\"stylesheet\" href=\"/css/dark.css\">")
        count++
        if (count > 3) {
            console.log("Breaking with " + count + " failed attempts")
            setTimeout(init_iframe, 10)
            break
        }
    }
    if (localStorage.getItem("mode") === "dark") {
        toggle_iframe()
    }
 }

 function toggle_iframe() {

    var frame = $("#frame").contents()

    if (frame.length) {

        var html = frame.find("html")

        var body = frame.find("body")

        html.toggleClass("iframe-body-dark")

        body.toggleClass("iframe-body-dark")

        body.find("code").toggleClass("code-dark")

    }

 }

function toggle_mode() {

    var dl = $("#darklight")

    var text = dl.text().toLowerCase()

    toggle_iframe()

    $("body").toggleClass("body-dark")

    if (text === "dark") {

        dl.text("Light")

        localStorage.setItem("mode", "dark")

    } else if (text === "light") {

        dl.text("Dark")

        localStorage.setItem("mode", "light")

    }

}