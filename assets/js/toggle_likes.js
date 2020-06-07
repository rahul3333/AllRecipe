// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if (data.data.deleted == true){
                    $("#h_icon").removeClass("red_icon");
                    $("#h_icon").addClass("black_icon");
                    likesCount -= 1;
                    if(likesCount<0)
                        likesCount=0;
                    
                }else{
                    $("#h_icon").removeClass("black_icon");
                    $("#h_icon").addClass("red_icon");
                    likesCount += 1;
                }


                $(self).attr('data-likes', likesCount);
                // $(self).html(`${likesCount} Likes`);
                
            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
            

        });
    }
}
