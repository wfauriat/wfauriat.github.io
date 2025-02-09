
$(document).ready(function() {
    loadOverview();
    $("#liOverview").css("background-color","white");
});

$("#liOverview").click(
    function(){
        loadOverview();
        $(this).css("background-color","white");
        $("#liPrevious").css("background-color","rgb(199, 199, 199)");
        $("#liPortfolio").css("background-color","rgb(199, 199, 199)");
        $("#liContact").css("background-color","rgb(199, 199, 199)");
    }
    
)

$("#liPrevious").click(
    function(){
        loadPrevious();
        $(this).css("background-color","white");
        $("#liOverview").css("background-color","rgb(199, 199, 199)");
        $("#liPortfolio").css("background-color","rgb(199, 199, 199)");
        $("#liContact").css("background-color","rgb(199, 199, 199)");
    }
)

$("#liPortfolio").click(
    function(){
        loadPortfolio();
        $(this).css("background-color","white");
        $("#liOverview").css("background-color","rgb(199, 199, 199)");
        $("#liPrevious").css("background-color","rgb(199, 199, 199)");
        $("#liContact").css("background-color","rgb(199, 199, 199)");
    }
)

$("#liContact").click(
    function(){
        loadContact();
        $(this).css("background-color","white");
        $("#liOverview").css("background-color","rgb(199, 199, 199)");
        $("#liPrevious").css("background-color","rgb(199, 199, 199)");
        $("#liPortfolio").css("background-color","rgb(199, 199, 199)");
    }
)

let isToggled = false;

let loadOverview = function() {
    $(document).ready(function() {
        $("#page_wrapper").load("./overview.html", function() {
            $("#sub_nav > ul > li").click(
    
                function() {
                    let articleOthers = $("#main_window").children();
                    let articleObj = $("#main_window").children().eq($(this).index());
                    let navItems = $(this).parent().children()
                    navItems.css("background-color", "rgb(216, 216, 216)");
                    articleOthers.css("display", "none");        
                    articleObj.css("display", "block");
                    $(this).css("background-color", "darkorange");
                }
            )

            $(".Expdiv0").hover(
                function() {
                    if (!isToggled) {
                    $("#exp_details").html($(this).children().last().html());
                    $("#exp_details").css("display", "inline");
                    $("#exp_details").css("top", $(this).parent().position().top+20);
                    }
                },
                function() {
                    if (!isToggled) {
                    $("#exp_details").css("display", "none");
                }
                }
            )
            
            $(".Expdiv0").click(
                function() {
                    isToggled = !isToggled;
                    let expItems = $(this).parent().parent().children();
                    $("#exp_details").html($(this).children().last().html());
                    $("#exp_details").css("display", "inline");
                    $("#exp_details").css("top", $(this).parent().position().top+20);
                    if (isToggled) {
                        $(this).css("color", "darkorange");
                    }
                    else {
                        $(this).css("color", "inherit");
                        // expItems.css("color", "inherit");
                    }
                },
            )
        });
    });

}

let loadPrevious = function() {
    $(document).ready(function() {
        $("#page_wrapper").load("./previousWork.html", function()
        {

        })
    })
};

let loadPortfolio = function() {
    $(document).ready(function() {
        $("#page_wrapper").load("./portfolio.html", function()
        {

        })
    })
};


let loadContact = function() {
    $(document).ready(function() {
        $("#page_wrapper").load("./contact.html", function()
        {

        })
    })
};





