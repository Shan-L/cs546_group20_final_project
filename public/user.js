(function ($) {

    var showMyCollectionBoxDiv = $('#showMyCollectionBox');
    var emptycollectionBoxDiv = $('#emptycollectionBox');

    function bindEventsToTodoItem(todoItem) {
        showMyCollectionBoxDiv.find('.collectionBoxCancelBtn').on('click', function (event) {
            event.preventDefault();
            var currentCancelBtn = $(this);
            var userId = currentCancelBtn.data('userid');
            var parkingLotId = currentCancelBtn.data('parkinglotid');

            var requestConfig = {
                method: 'DELETE',
                url: '/api/todo/complete/' + userId + '?parkingLotId=' + parkingLotId
            };

            $.ajax(requestConfig).then(function (responseMessage) {
                var newElement = $(responseMessage);
                bindEventsToTodoItem(newElement);
                todoItem.replaceWith(newElement);
            });
        });
    }

    showMyCollectionBoxDiv.children().each(function (index, element) {
        bindEventsToTodoItem($(element));
    });



    addNewComment.submit((event) => {
        event.preventDefault();

        let commentInfo = commentContent.val().trim();
        if (!commentInfo) alert('You must need have comment content!');

        let rating = commentRating.val();
        if (!rating) alert('You must need have rating!');
        if (rating < 1 || rating > 5) alert('The rating must between 1~5 !');
        if (!parseInt(rating)) alert("You must input a number in the rating area!");
        if (rating % 1 != 0) alert("The rating must be an Interger !")

        let parkLotId = parkingId.val();

        let check_val = [];
        for (x in commentTag) {
            if (commentTag[x].checked) check_val.push(commentTag[x].value);
        };

        if (check_val.length === 0) check_val.push('N/A')

        let body = {
            commentTag: check_val,
            parkLotId: parkLotId,
            commentInfo: commentInfo,
            level: rating
        };

        var requestConfig = {
            url: 'http://localhost:3000/comment/comment',
            method: 'POST',
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify(body),
        };

        $.ajax(requestConfig).then(function (responseMessage) {
            if (responseMessage.length === 0) {
                // return shows;
                commentsListArea.hide();
                error.show();
                error.html('can not add the comments');

            } else {
                error.hide();
                addNewComment.trigger('reset');
                commentContent.val('');
                alert('You have successfully comment, refresh to see your comment!');
            }

        });
    });


})(window.jQuery);