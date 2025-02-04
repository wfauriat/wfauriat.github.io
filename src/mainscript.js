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
        $("#Expertise").css("display", "none");
        $("#Tech").css("display", "none");
        $("#Goals").css("display", "none");
    }
})

$("#liExperience").on({
    click: function(){
        $("#Profile").css("display","none");
        $("#Experience").css("display","block");
        $("#Education").css("display","none");
        $("#Expertise").css("display", "none");
        $("#Tech").css("display", "none");
        $("#Goals").css("display", "none");
    }
})

$("#liEducation").on({
    click: function(){
        $("#Profile").css("display","none");
        $("#Experience").css("display","none");
        $("#Education").css("display","block");
        $("#Expertise").css("display", "none");
        $("#Tech").css("display", "none");
        $("#Goals").css("display", "none");
    }
})

$("#liExpert").on({
    click: function(){
        $("#Profile").css("display","none");
        $("#Experience").css("display","none");
        $("#Education").css("display","none");
        $("#Expertise").css("display", "block");
        $("#Tech").css("display", "none");
        $("#Goals").css("display", "none");
    }
})



$("#liTech").on({
    click: function(){
        $("#Profile").css("display","none");
        $("#Experience").css("display","none");
        $("#Education").css("display","none");
        $("#Expertise").css("display", "none");
        $("#Tech").css("display", "block");
        $("#Goals").css("display", "none");
    }
})

$("#liGoals").on({
    click: function(){
        $("#Profile").css("display","none");
        $("#Experience").css("display","none");
        $("#Education").css("display","none");
        $("#Expertise").css("display", "none");
        $("#Tech").css("display", "none");
        $("#Goals").css("display", "block");
    }
})



$("#tooltiptest").hover(
    function() {
      $( this ).append( $( "<div id='tooled'>I work\
        at cea</div>" ) );
    }, function() {
      $( this ).find( "div" ).last().remove();
    }
  );
