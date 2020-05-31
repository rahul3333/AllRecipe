
$(document).ready(function(){
$(".heart_icon").on('click',function(){
    var $Label = $('.heart_icon');
    if($(this).hasClass('red_icon')) {
        $( this ).removeClass( "red_icon" );
        $( this ).addClass( "black_icon" );
    } else {
        $( this ).removeClass( "black_icon" );
        $( this ).addClass( "red_icon" );
    }

})
})

$(document).ready(function(){
    $(".fav_heart_icon").on('click',function(){
        var $Label = $('.fav_heart_icon');
        if($(this).hasClass('red_icon')) {
            $( this ).removeClass( "red_icon" );
            $( this ).addClass( "black_icon" );
        } else {
            $( this ).removeClass( "black_icon" );
            $( this ).addClass( "red_icon" );
        }
    
    })
    })
