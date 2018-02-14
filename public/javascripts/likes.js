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