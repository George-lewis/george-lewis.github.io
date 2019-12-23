// Runs when the page is loaded
function onload() {

    // Toggle into dark mode if local storage is set to dark
    if (localStorage.getItem("mode") === "dark") {
        toggle_mode()
    } else { // There is no stored value or its "light" (or something else)
        localStorage.setItem("mode", "light")
    }

    var frame = $("#frame")

    // If frame exists
    if (frame.length > 0) {
        frame.ready(init_iframe) // Init the frame
    } else {
        console.log("iframe not present")
    }

}

$(document).ready(onload)

function check_iframe() {

    var links = $("#frame").contents().find("head link")

    for (i = 0; i < links.length; i++) {
        if (links[i].href.endsWith("dark.css")) {
            return true
        }
    }

    return false

 }

// The iframe'd content doesn't inherit CSS from the outer context
// So we must add the stylesheet into the iframe manually
function init_iframe() {
    console.log("Init iframe")
    var frame = $("#frame").contents()
    var count = 0
    while (!check_iframe()) {
        frame.find("head").append("<link rel=\"stylesheet\" href=\"/css/dark.css\">")
        count++
        if (count > 3) {
            // For some reason this line can randomly and repeatedly fail
            // So we try again in 10ms, again and again, until it works
            console.log("iframe css insertion failed, trying again in 10ms")
            setTimeout(init_iframe, 10)
            return
        }
    }
    if (localStorage.getItem("mode") === "dark") {
        toggle_iframe()
    }
}

// Toggles all the classes necessary to make the iframe dark-theme
function toggle_iframe() {

    var frame = $("#frame").contents()

    if (frame.length) {

        var html = frame.find("html")

        var body = frame.find("body")

        html.toggleClass("iframe-body-dark")

        body.toggleClass("iframe-body-dark")

        body.find(".md-fences").toggleClass("md-fences-dark")

        body.find("code").toggleClass("code-dark")

        body.find("blockquote").toggleClass("blockquote-dark")

    }

}

// Toggles dark theme
function toggle_mode() {

    var dl = $("#darklight")

    var text = dl.text().toLowerCase()

    toggle_iframe()

    $("body").toggleClass("body-dark")

    if (text === "dark") {

        dl.text("Light")

        // Update the local storage
        localStorage.setItem("mode", "dark")

    } else if (text === "light") {

        dl.text("Dark")

        localStorage.setItem("mode", "light")

    }

    // The paper needs to be updated
    set_paper()

}