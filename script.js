$(document).ready(function() {
    $('head').append('<link href="https://u.nya.is/mzrdtf.png" rel="shortcut icon" type="image/x-icon" />');
    
    $.getJSON("https://ptb.discordapp.com/api/guilds/264370940706553857/widget.json", function(result) {

        for(i=0; i < result.channels.length; i++){
            if(result.channels[i].position === 0){
                var serverNum = result.channels[i].name.replace(":", "");
            } else if (result.channels[i].position === 1){
                var usersNum = result.channels[i].name.replace(":", "");
            } else if(result.channels[i].position === 2){
                var channelsNum = result.channels[i].name.replace(":", "");
            }
        }

        $('.statsServersNum').text(serverNum);
        $('.statsUsersNum').text(usersNum);
        $('.statsChannelsNum').text(channelsNum);

        console.log("[x] Data success. ")
    });

    $('.topBar-GetBaron').on('click', function() {
        window.open("https://discordapp.com/oauth2/authorize?&client_id=240482527695994880&scope=bot&permissions=52224", '_blank');
    });

    $(".topBar-Commands").click(function() {
        $('html, body').animate({
            scrollTop: $("#commands").offset().top
        }, 2000);
    });

    $(".topBar-About").click(function() {
        $('html, body').animate({
            scrollTop: $("#about").offset().top
        }, 2000);
    });
});
