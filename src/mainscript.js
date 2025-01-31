// $("#liProfile").on({
//     click: function(){
//         $("article:first").css("color","red");
//         $("article:not(:first-child)").hide()
//         $("#Profile").show()

//     },
//     mouseleave: function(){
//         $("article:first").css("color","black")
//         $("article:not(:first-child)").show()
//         $("#Profile").hide()
//     }
// })

// $("#Profile").hide()

$("#liProfile").on({
    click: function(){
        $("#Profile").css("display","block");
        $("#Experience").css("display","none");
        $("#Education").css("display","none");
        $("#Tech").css("display", "none");
    }
})

$("#liExperience").on({
    click: function(){
        $("#Profile").css("display","none");
        $("#Experience").css("display","block");
        $("#Education").css("display","none");
        $("#Tech").css("display", "none");
    }
})

$("#liEducation").on({
    click: function(){
        $("#Profile").css("display","none");
        $("#Experience").css("display","none");
        $("#Education").css("display","block");
        $("#Tech").css("display", "none");
    }
})

$("#liTech").on({
    click: function(){
        $("#Profile").css("display","none");
        $("#Experience").css("display","none");
        $("#Education").css("display","none");
        $("#Tech").css("display", "block");
    }
})





