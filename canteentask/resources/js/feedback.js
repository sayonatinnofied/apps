var totalTask = function(id) {
    var count = 1;
    var before;
    var after;
    var replyCode;
    var createCommentCode = function(num, name) {

        before = '<div class="media comment' + num + '">' +
            '<a class="pull-left" href=""></a>' +
            '<div class="media-body area' + num + '">' +
            '<h4 class="media-heading">' +
            name +
            ' said @ <span class="time-show current-time' + num + '"></span>' +
            '</h4>' +
            '<pre>';
        after = '</pre>' +
            '</a>' +
            '</div>' +
            '</div>';
    };

    var createReplyCode = function(num) {
        replyCode = '<form class="form-inline reply-area' + num + '">' +
            '<textarea class="form-control reply-here' + num + '" rows="1"></textarea>' +
            '<button type="button" class="btn-sm put-reply">Reply</button>' +
            '</form>';
    };


    var showComments = function() {
        var db1 = openDatabase('mydb1', '1.0', 'Test DB', 2 * 1024 * 1024);

        db1.transaction(function(tx) {
            tx.executeSql('SELECT * FROM FEEDBACK', [], function(tx, results) {
                var len = results.rows.length,
                    i, timenow, feedid, name = "name";
                for (i = 0; i < len; i++) {
                    timenow = results.rows.item(i).feedback_time;
                    feedid = results.rows.item(i).user_id;
                    displayComments(results.rows.item(i).feedback_content, timenow, feedid);
                }
            });
        });
    };
    var displayComments = function(comment, t, feedid) {

        var name = "name";



        if (comment !== '' && comment !== ' ') {

            var db2 = openDatabase('mydb1', '1.0', 'Test DB', 2 * 1024 * 1024);
            db2.transaction(function(tx1) {
                tx1.executeSql('SELECT * FROM USER where user_id="' + feedid + '"', [], function(tx1, result1) {
                    if (result1.rows.length === 1) {
                        name = result1.rows.item(0).user_name;
                        createCommentCode(count, name);
                        count++;
                        totalarea = before + comment + after;
                        $('.comment-area').append(totalarea);
                        $('.current-time' + (count - 1)).append(t);
                    } else {
                        createCommentCode(count, name);
                        count++;
                        totalarea = before + comment + after;
                        $('.comment-area').append(totalarea);
                        $('.current-time' + (count - 1)).append(t);
                    }
                });
            });


            //$('.post-reply'+(count-1)).click(showReply);
        }
    };


    var totalarea = "";
    var comment = "";
    var postComment = function(user_id,t) {
        var name = "name";
        comment = $('.comment-here').val();
        if (comment !== '' && comment !== ' ') {

            var db2 = openDatabase('mydb1', '1.0', 'Test DB', 2 * 1024 * 1024);
            db2.transaction(function(tx1) {
                tx1.executeSql('SELECT * FROM USER where user_id="' + user_id + '"', [], function(tx1, result1) {
                    if (result1.rows.length === 1) {
                        name = result1.rows.item(0).user_name;
                        console.log("1" + name);
                        createCommentCode(count, name);
                        count++;
                        totalarea = before + comment + after;
                        $('.comment-area').append(totalarea);
                        $('.current-time' + (count - 1)).append(t);
                    } else {
                        createCommentCode(count, name);
                        count++;
                        totalarea = before + comment + after;
                        $('.comment-area').append(totalarea);
                        $('.current-time' + (count - 1)).append(t);
                    }
                    addComment(user_id, comment);
                });
            });


            
            
        }
        $('.comment-here').val('');

    };

    var addComment = function(user_id, value) {

        var db = dataBase,
            u = user_id,
            v = value;
        db.transaction(function(tx) {
            tx.executeSql("INSERT INTO FEEDBACK (user_id,feedback_content) VALUES (?,?)", [u, v]);
        });
    };


    var wrapper = function() {
        var u_id = id;
        showComments();
        $('.post-comment').click(function() {

            //var cookie=document.cookie;
            //var s=cookie.split(';');
            //var s1=s[1].split('=')[1];//get user id

            var t=new Date().getFullYear()+'-'+new Date().getMonth()+'-'+new Date().getDate()+
            ' '+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds();
            postComment(u_id,t);
        });
    };
    wrapper();
};
