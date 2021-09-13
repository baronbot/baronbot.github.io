$(document).ready(function () {
    $("head").append("<link href='/imgs/Avatar.png' rel='shortcut icon' type='image/x-icon'/>");

    setLanguage("en");
    const ps = new PerfectScrollbar(".dropdown-content");

    $.getJSON("https://api.github.com/gists/efcebfc278a8bffbd5bca68d3d2428ce", function (result) {
        if(!result || !result.files || !result.files["baron-stats.json"]) return;
        result = JSON.parse(result.files["baron-stats.json"].content);
        
        //Insert stats.
        $(".statsServersNum").text(numberWithCommas(result.stats.s));
        $(".statsUsersNum").text(numberWithCommas(result.stats.u));
        $(".statsChannelsNum").text(numberWithCommas(result.stats.c));

        console.log("[x] Stats set successfully.");

        //Insert translators.
        let uniqueTranslators = _.uniqBy(result.translators, "n");
        let translatorsArray = _.sortBy(uniqueTranslators, "l");

        let left = true;
        for (i in translatorsArray) {
            if (left) {
                $(".translatorsList1").append("<div class='translatorsListItem'><img src='" + translatorsArray[i].a + "'><span>" + translatorsArray[i].n + "</span></div>")
                left = false;
            } else {
                $(".translatorsList2").append("<div class='translatorsListItem'><img src='" + translatorsArray[i].a + "'><span>" + translatorsArray[i].n + "</span></div>")
                left = true;
            }
        }
        console.log("[x] Translators set successfully.");
    });

    //Top bar "shortcuts".
    $(".topBar-GetBaron").on("click", function () {
        window.open("https://discordapp.com/oauth2/authorize?&client_id=240482527695994880&scope=bot&permissions=314368", "_blank");
    });

    $(".topBar-Commands").click(function () {
        $("html, body").animate({
            scrollTop: $("#commands").offset().top
        }, 2000);
    });

    $(".topBar-About").click(function () {
        $("html, body").animate({
            scrollTop: $("#about").offset().top
        }, 2000);
    });

    //Language selector dropdown.
    $(".dropdown-content, .dropbtn").on("mouseover", function () {
        ps.update();

        if ($(window).width() > 466) {
            $(".dropbtn").css("background-color", "#303236");
            $("body").disableScroll();
        }
    });

    $(".dropdown-content, .dropbtn").on("mouseout", function () {
        if ($(window).width() > 466) {
            $(".dropbtn").css("background-color", "inherit");
            $("body").enableScroll();
        }
    });

    $(".dropbtn").on("click", function () {
        if($(".dropdown-content").hasClass("open")){
            $(".dropdown-content").hide();
            $(".dropdown-content").removeClass("open");

            if ($(window).width() > 466) {
                $("body").enableScroll();
            }
        } else {
            ps.update();
            $(".dropdown-content").show();
            $(".dropdown-content").addClass("open");
            if ($(window).width() > 466) {
                $("body").disableScroll();
            }
        }
    });

    $(".dropdown-content a").on("click", function () {
        let img = $(this).find("img").attr("src");
        let lang = $(this).text();
        let locale = $(this).attr("locale");

        $(".dropbtn-img").attr("src", img);
        $(".dropbtn-txt").text(lang);

        setLanguage(locale);
        mixpanel.track("language", { locale });
    });

    //Translators Modal.
    $(".trigger").click(function () {
        $(".modal-wrapper").toggleClass("open");
        $(".page-wrapper").toggleClass("blur");
        $("body").css("overflow", "hidden");
    });

    $(".btn-close").click(function () {
        $("body").css("overflow", "visible");
    });

    $("table a").on("click", function () {
        const command = $(this).text();
        mixpanel.track("command_example", { command });
    });
});

function setLanguage(locale) {
    $.getJSON("locales/" + locale + ".json", function (json) {
        let toTranslate = $("[translate]");
        toTranslate.each(function () {
            let elemAttr = $(this).attr("translate");
            let translatedString = _.get(json, elemAttr);

            $(this).html(translatedString);
        });
        console.log("[x] Language set: " + locale.toUpperCase() + ".");
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$.fn.disableScroll = function() {
    window.oldScrollPos = $(window).scrollTop();

    $(window).on("scroll.scrolldisabler",function ( event ) {
       $(window).scrollTop( window.oldScrollPos );
       event.preventDefault();
    });
};

$.fn.enableScroll = function() {
    $(window).off("scroll.scrolldisabler");
};
