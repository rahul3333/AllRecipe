// {
//     let createComment=function(){
//         let newCommentform=$('#comment-form');
//         newCommentform.submit(function(e){
//             e.preventDefault();
//             $.ajax({
//                 type:'POST',
//                 url:'/comments/create',
//                 data:newCommentform.serialize(),
//                 dataType: 'JSON',
//                 success:function(data){
//                     console.log('success');
//                     let newComment=newCommentDom(data.data.comment);
//                     $('#recipe-comments-list>ul').prepend(newComment);
//                 },error:function(error){
//                     console.log(error.responseText);
//                 }
//             });
//         });
        
//     }

//     let newCommentDom = function(comment){
//         console.log(comment.content);
        
//         return $(`<li id="comment-${comment._id}">
//                     <p>
                        
//                         <small>
//                             <a class="delete-post-button"  href="/posts/destroy/${ comment._id }">X</a>
//                         </small>
                       
//                         ${ comment.content }
//                         <br>
//                         <small>
//                         ${ comment.user.name }
//                         </small>
//                     </p>
//                     <div class="post-comments">
                        
//                             <form action="/comments/create" method="POST">
//                                 <input type="text" name="content" placeholder="Type Here to add comment..." required>
//                                 <input type="hidden" name="post" value="${ comment._id }" >
//                                 <input type="submit" value="Add Comment">
//                             </form>
               
                
//                         <div class="comment-list-container">
//                             <ul id="post-comments-${ comment._id }">
                                
//                             </ul>
//                         </div>
//                     </div>
                    
//                 </li>`)
//     }


//     createComment();
// }

// {
//     let deletePost = function(deleteLink){
//     $(deleteLink).click(function(e){
//         e.preventDefault();

//         $.ajax({
//             type: 'get',
//             url: $(deleteLink).prop('href'),
//             success: function(data){
//                 $(`#post-${data.data.post_id}`).remove();
//             },error: function(error){
//                 console.log(error.responseText);
//             }
//         });

//     });
// }
// }




function deleteComment(id){
    
    var ele=document.getElementById(`delete-link-${id}`);
    console.log(ele);
    
    var result=window.confirm('Are you sure you want to delete the comment');
    
    if(result==true){
        console.log(result);
        
        ele.href=`/comments/destroy/${id}`;
    }
    else{
        console.log(result);
        ele.href='#';
    }
}