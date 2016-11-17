define("js/public/reply/reply",[
    "jquery"
],function ($) {
    function Replay(id,parentId) {
        this.id=id;
        this.parentId = parentId||""
    }
    Replay.prototype.init = function () {

    }
    Replay.prototype.getHtml = function () {
        var html="";
        html += '<div class="replay" reply>'+
                    '<h3>Leave a Reply</h3>'+
                    '<p>Your email address will not be published. Required fields are marked *</p>'+
                    '<div class="relay-content">'+
                        '<div class="replay-item"><label>Comment * <span class="input-error-message"></span></label><textarea comment-content></textarea></div>'+
                        '<div class="replay-item"><label>Name * <span class="input-error-message"></span></label><input comment-name type="text"/></div>'+
                        '<div class="replay-item"><label>Email * <span class="input-error-message"></span></label><input comment-email type="text"/></div>'+
                        '<div class="replay-item"><label>Website</label><input comment-website type="text"/></div>'+
                        '<div class="replay-item"><a class="replay-btn" sendReply='+this.id+' sendReplyParent='+this.parentId+'>post Comment</a></div>'+
                        '<div class="replay-item-select">' +
                            '<input notify-comment type="checkbox">' +
                            '<label for="subscribe_comments" >Notify me of follow-up comments by email.</label>' +
                        '</div>'+
                        '<div class="replay-item-select">' +
                            '<input notify-posts type="checkbox">' +
                            '<label for="subscribe_comments" >Notify me of new posts by email.</label>' +
                        '</div>'+
                    '</div>'+
                '</div>'

        return html;
    }
    return Replay
})
