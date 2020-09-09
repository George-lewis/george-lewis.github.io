// Runs when the page is loaded
function onload() {

    let theme = localStorage.getItem("mode")

    if (theme !== "light") { // Either theme was set to dark or it is not present, in which case default to dark
        toggle_mode(true)
        localStorage.setItem("mode", "dark")
        $("#frame").css("visibility", "visible")
    }

    $("nav").css("visibility", "visible")

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

if (firefox) {
    $(window).on("load", onload)
} else {
    $(document).ready(onload)
}

// Toggles all the classes necessary to make the iframe dark-theme
function toggle_iframe() {

    let framec = frame.contents()

    if (iframe) {

        let html = framec.find("html")

        let body = framec.find("body")

        html.toggleClass("iframe-body-dark")

        body.toggleClass("iframe-body-dark")

        body.find(".md-fences").toggleClass("md-fences-dark")

        body.find("p > code").toggleClass("code-dark")

        body.find("blockquote").toggleClass("blockquote-dark")

        body.find("a").toggleClass("a-dark")

        github = body.find(".github")

        if (github.length > 0) {

            if (github.attr("src").endsWith("github.svg")) {
                github.attr("src", "/_assets/github-white.svg")
            } else {
                github.attr("src", "/_assets/github.svg")
            }

        }

        linkedin = body.find(".linkedin")

        if (linkedin.length > 0) {

            if (linkedin.attr("src").endsWith("linkedin.svg")) {
                linkedin.attr("src", "/_assets/linkedin-white.svg")
            } else {
                linkedin.attr("src", "/_assets/linkedin.svg")
            }

        }

    }

}

// Toggles dark theme
function toggle_mode(initial = false, theme = null) {

    let dl = $("#darklight")

    let text = dl.text().toLowerCase()

    if (theme) {
        text = theme
    }

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

        $("nav").addClass("navbar-dark bg-dark")

        $("nav").removeClass("navbar-light bg-light")

        $("#navbarSupportedContent .btn").addClass("btn-outline-light")

        $("#navbarSupportedContent .btn").removeClass("btn-outline-dark")

    } else if (text === "light") {

        dl.text("Dark")

        localStorage.setItem("mode", "light")

        $("nav").removeClass("navbar-dark bg-dark")

        $("nav").addClass("navbar-light bg-light")

        $("#navbarSupportedContent .btn").removeClass("btn-outline-light")

        $("#navbarSupportedContent .btn").addClass("btn-outline-dark")

    }

    // The paper needs to be updated
    if (!initial)
        set_paper()

}