$(function() {
    $(".tweet-container").on('click', '.btn-like', function(e) {
        var button = $(this);
        var likes = Number(button.attr("numlikes"));
        var tweetID = button.parent().attr("tweetID");
        var handle = $(".user-handle").text();

        $.ajax({
            method: 'POST',
            url: `/tweet/like/${tweetID}`,
            data : { handle: handle }
        })
        .done(function() {
            button.attr("numlikes", likes + 1);
            button.html(`<span class="fas fa-heart red"></span> ${likes+1}`);
            button.removeClass('btn-like');
            button.addClass('btn-unlike');
        });		
    });

    $(".tweet-container").on('click', '.btn-unlike', function(e) {
        var button = $(this);
        var likes = Number(button.attr("numlikes"));
        var tweetID = button.parent().attr("tweetID");
        var handle = $(".user-handle").text();

        $.ajax({
            method: 'DELETE',
            url: `/tweet/like/${tweetID}`,
            data: { handle: handle }
        })
        .done(function() {
            button.attr("numlikes", likes - 1);
            button.html(`<span class="far fa-heart red"></span> ${likes-1}`);
            button.removeClass('btn-unlike');
            button.addClass('btn-like');
        });
    });
});

var showLikedTweet = function(author, handle, content, id, likes) {
    $(".tweet-container").prepend(`<div class="card see-content">
        <div class="card-body" tweetID="${id}">
            <img class="user-img rounded-circle" src="/images/dawg.jpg">
            <h5 class="card-title name">${author}</h5>
            <h6 class="card-subtitle handle"><a href="/user/${handle}">${handle}</a></h6>
            <p class="card-text">${content.replace(/\n/g, '<br/>')}</p>
            <button class="btn-unlike" numlikes="${likes}"><span class="fas fa-heart red"></span> ${likes}</button>
        </div>
    </div>`);
};
var showNewTweet = function(author, handle, content, id, likes) {
    $(".tweet-container").prepend(`<div class="card see-content">
        <div class="card-body" tweetID="${id}">
            <img class="user-img rounded-circle" src="/images/dawg.jpg">
            <h5 class="card-title name">${author}</h5>
            <h6 class="card-subtitle handle"><a href="/user/${handle}">${handle}</a></h6>
            <p class="card-text">${content.replace(/\n/g, '<br/>')}</p>
            <button class="btn-like" numlikes="${likes}"><span class="far fa-heart red"></span> ${likes}</button>
        </div>
    </div>`);
};