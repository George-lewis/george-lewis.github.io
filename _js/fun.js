if (fun) {

    $(document).ready(function(){

        let num = Math.floor(Math.random() * 100)
    
        if (num === 50) {
    
            console.log("Wow, there was a 1% chance of that happening")
    
            $(".navbar-brand")
                .text("What the Fuck™")
                .css("color", "gold")
                .css("font-weight", "600")
    
        } else {
            console.log("No luck this time: " + num)
        }
    
    })

} else {
    console.log("Note: fun disabled")
}