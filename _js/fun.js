if (fun) {

    $(document).ready(function(){

        let num = Math.floor(Math.random() * 100)

        if (funcheat) {
            console.log("Note: Fun cheat is enabled")
        }
    
        if (num === 50 || funcheat) {
    
            console.log("Wow, there was a 1% chance of that happening")
    
            $(".navbar-brand")
                .text("What the Fuck™")
                .css("color", "gold")
                .css("font-weight", "600")
            
            $("nav").css("background-color", "purple")
    
        } else {
            console.log("No luck this time: " + num)
        }
    
    })

} else {
    console.log("Note: fun disabled")
}