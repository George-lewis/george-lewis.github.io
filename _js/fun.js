function onload() {

    let num = Math.floor(Math.random() * 100)

        if (funcheat) {
            console.log("Note: Fun cheat is enabled")
        }
    
        if (num === 50 || funcheat) {
    
            console.log("Wow, there was a 1% chance of this happening")
    
            funfunc()

            alert("There was a 1% chance of this happening -- you're lucky!")
    
        } else {
            console.log("No luck this time: " + num)
        }

}

if (fun) {

    $(document).ready(onload)

} else {
    console.log("Note: fun disabled")
}

function funfunc() {

    $(".navbar-brand")
                .text("What the Fuck™")
                .css("color", "gold")
                .css("font-weight", "600")
            
            $("nav")
                .css("cssText", "visibility: visible; background-color: #39004d !important;")

            $(".navbar-toggler")
                .css("color", "gold")
                .css("border-color", "gold")

            $("p, #copyright").css("color", "gold")

            $("body").css("cssText", "background-image: none; background-color: #39004d;")

            $("#content > h1, p, a").css("color", "gold").css("border-color", "gold")

            $("#outercontainer, #content, #contact-info").css("border-color", "gold")

            $(".btn")
                .removeClass("btn-outline-light")
                .removeClass("btn-outline-dark")
                .addClass("btn-outline-warning")
                .css("color", "white")

            frame.on("load", function() {
                let body = frame.contents().find("body")
                body.css("cssText", "color: gold !important; background-color: #39004d !important;")
            })

}