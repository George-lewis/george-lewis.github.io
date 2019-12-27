// These values represent how many different wallpapers are available
// For the dark (dpapers) and light (lpapers) themes
var dpapers = 12
var lpapers = 8

// Runs on page load
function onload() {

    if (iframe) {
        console.log("iframe detected - hiding change wallpaper button and not setting wallpaper")

        $("#papechanger").css("display", "none")

        return
    }

    let theme = localStorage.getItem("mode")

    let lpaper = localStorage.getItem("lpaper")

    let dpaper = localStorage.getItem("dpaper")

    // Set the default papers if there is no value

    if (!lpaper) {
        lpaper = "3"
        console.log("Setting default wallpaper for light theme: " + lpaper)
        localStorage.setItem("lpaper", lpaper)
    }

    if (!dpaper) {
        dpaper = "3"
        console.log("Setting default wallpaper for dark theme: " + dpaper)
        localStorage.setItem("dpaper", dpaper)
    }

    // Set the wallpaper
    if (theme === "dark") {

        console.log("Dark theme is active on page load, loading #" + dpaper)

        set_paper(dpaper)

    } else {

        console.log("Light theme is active on page load, loading #" + lpaper)

        set_paper(lpaper)

    }

}

$(document).ready(onload)

function luminanace(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
function contrast(rgb1, rgb2) {
    return (luminanace(rgb1[0], rgb1[1], rgb1[2]) + 0.05)
         / (luminanace(rgb2[0], rgb2[1], rgb2[2]) + 0.05);
}

// Sets the body's background
function set_paper(i = null, type = null) {

    if (iframe) {
        console.log("Background not set due to prescence of iframe")
        return
    }

    // Get the theme from local store or use a supplied override
    let theme = (type) ? type : localStorage.getItem("mode")

    // If a number wasnt supplied then get one from local storage
    if (!i) {
        i = (theme === "dark") ? localStorage.getItem("dpaper") : localStorage.getItem("lpaper")
        if (!i) { // There's nothing we can do.
            console.error("set_paper() was invoked with no parameters but local storage contains no entry for " + theme + " theme")
            return // If this happens it might mean that when 
        }
    }

    // Path to wallpaper
    let path = "/_assets/bg/" + theme + "/bg" + i + ".jpg"

    let url = "url(\"" + path + "\")"

    // Don't want to set it to a value it's already set to
    if (!$("html").css("background-image").includes(path)) {
        // Set it
        console.log("Set wallpaper to: " + path)
        $("html").css("background-image", url)
    } else {
        console.log("Setting wallpaper to '" + path + "' would have no effect -- not setting")
    }

    let img = document.createElement("img")

    img.addEventListener("load", function() {
        Vibrant.from(img).getPalette().then(
            function(palette){
                let vib = palette["Vibrant"]

                if (!vib) {
                    $(".navbar-brand").css("color","")
                    return
                }

                vib = vib.getRgb()

                // if (theme === "dark") {
                //     var vib = palette["LightVibrant"].getRgb()
                // } else {
                //     var vib = palette["DarkVibrant"].getRgb()
                // }

                console.log(vib)
            
                let col = $("nav").css("background-color").replace("rgb(", "").replace(")", "").split(", ")

                let c = contrast(vib, col)

                console.log(c)

                if (c > 0.50 && theme === "light" || c < 3.5 && theme === "dark") {
                    if (theme === "dark") {
                    $(".navbar-brand").css("color","")
                    return
                }
                    if (theme === "dark") {
                        vib = palette["LightVibrant"].getRgb()
                    } else {
                        vib = palette["DarkVibrant"].getRgb()
                    }
                }

                c = contrast(vib, col)

                console.log(c)

                if (c > 0.55 && theme === "light" || c < 3.5 && theme === "dark") {
                    $(".navbar-brand").css("color","")
                    return
                }

                console.log("set")

                $(".navbar-brand").css("color", "rgb(" + vib[0] + "," + vib[1] + "," +vib[2] + ")")
            }
        )
    })

    img.src = path

}

function change_wallpaper() {

    console.log("Change wallpaper!")

    let theme = localStorage.getItem("mode")

    if (theme === "dark") {

        // Increase wallpaper index
        let paper = parseInt(localStorage.getItem("dpaper")) + 1

        // Reset index if its larger than the # of wallpapers
        // The wallpapers are indexed starting at one (subject to change)
        if (paper > dpapers) {
            paper = 1
        }

        // Set the new value
        localStorage.setItem("dpaper", paper.toString())

        // Update
        set_paper(paper)

    } else {

        let paper = parseInt(localStorage.getItem("lpaper")) + 1

        if (paper > lpapers) {
            paper = 1
        }

        localStorage.setItem("lpaper", paper.toString())

        set_paper(paper)

    }

}