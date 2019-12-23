// Runs when the page is loaded
function onload() {

    let theme = localStorage.getItem("mode")

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

    if (iframe) {

        let html = framec.find("html")

        let body = framec.find("body")

        html.toggleClass("iframe-body-dark")

        body.toggleClass("iframe-body-dark")

        body.find(".md-fences").toggleClass("md-fences-dark")

        body.find("code").toggleClass("code-dark")

        body.find("blockquote").toggleClass("blockquote-dark")

    }

}

// Toggles dark theme
function toggle_mode(initial = false) {

    let dl = $("#darklight")

    let text = dl.text().toLowerCase()

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