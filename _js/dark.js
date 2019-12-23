// Runs when the page is loaded
function onload() {

    theme = localStorage.getItem("mode")

    // Toggle into dark mode if local storage is set to dark
    if (theme === "dark") {
        toggle_mode(true)
    } else { // There is no stored value or its "light" (or something else)
        localStorage.setItem("mode", "light")
        $("#frame").css("visibility", "visible")
    }

    // If frame exists
    if (iframe) {
        if (theme === "dark") {
            frame.on("load", function() {
                toggle_iframe()
                frame.css("visibility", "visible")
            })
        } else {
            frame.css("visibility", "visible")
        }
    } else {
        console.log("iframe not present")
    }

}

$(document).ready(onload)

// Toggles all the classes necessary to make the iframe dark-theme
function toggle_iframe() {

    console.log("Toggle iframe")

    var frame = frame.contents()

    if (iframe) {

        var html = frame.find("html")

        var body = frame.find("body")

        console.log(html.attr("class"))

        html.toggleClass("iframe-body-dark")

        console.log(html.attr("class"))

        body.toggleClass("iframe-body-dark")

        body.find(".md-fences").toggleClass("md-fences-dark")

        console.log(body.find("code").attr("class"))

        body.find("code").toggleClass("code-dark")

        console.log(body.find("code").attr("class"))

        body.find("blockquote").toggleClass("blockquote-dark")

    }

}

// Toggles dark theme
function toggle_mode(initial = false) {

    var dl = $("#darklight")

    var text = dl.text().toLowerCase()

    if (!initial) {
        if (iframe) {
            toggle_iframe()
        }
    }

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