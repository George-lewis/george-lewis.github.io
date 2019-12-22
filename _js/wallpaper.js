dpapers = 10
lpapers = 1

function onload() {

    theme = localStorage.getItem("mode")

    lpaper = localStorage.getItem("lpaper")

    dpaper = localStorage.getItem("dpaper")

    if (!lpaper) {
        localStorage.setItem("lpaper", "1")
        lpaper = "1"
    }

    if (!dpaper) {
        localStorage.setItem("dpaper", "6")
        dpaper = "6"
    }

    if (theme === "dark") {

        set_paper(dpaper)

    } else {

        set_paper(lpaper)

    }

}

$(document).ready(onload)

function set_paper(i = null, type = null) {

    theme = (type) ? type : localStorage.getItem("mode")

    if (!i) {
        i = (theme === "dark") ? localStorage.getItem("dpaper") : localStorage.getItem("lpaper")
    }

    path = "/_assets/bg/" + theme + "/bg" + i + ".jpg"

    console.log("Set wallpaper to: " + path)

    $("body").css("background-image", "url('"+path+"')")

}

function change_wallpaper() {

    console.log("Change wallpaper!")

    theme = localStorage.getItem("mode")

    if (theme === "dark") {

        paper = parseInt(localStorage.getItem("dpaper")) + 1

        if (paper > dpapers) {
            paper = 1
        }

        localStorage.setItem("dpaper", paper.toString())

        set_paper(paper)

    } else {

        paper = parseInt(localStorage.getItem("lpaper")) + 1

        if (paper > lpapers) {
            paper = 1
        }

        localStorage.setItem("lpaper", paper.toString())

        set_paper(paper)

    }

}