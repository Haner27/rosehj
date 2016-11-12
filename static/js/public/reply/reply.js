define("js/public/reply/reply",[
    "jquery"
],function ($) {
    function Replay(id) {
        this.id=id
    }
    Replay.prototype.init = function () {

    }
    Replay.prototype.getHtml = function () {
        var html = '<div class="replay" reply='+this.id+'>'+
                        '<h3>Leave a Reply</h3>'+
                        '<p>Your email address will not be published. Required fields are marked *</p>'+
                        '<div class="relay-content">'+
                            '<div class="replay-item"><label>Comment</label><textarea></textarea></div>'+
                            '<div class="replay-item"><label>Name *</label><input type="text"/></div>'+
                            '<div class="replay-item"><label>Email *</label><input type="text"/></div>'+
                            '<div class="replay-item"><label>Website</label><input type="text"/></div>'+
                            '<div class="replay-item"><a class="replay-btn">post Comment</a></div>'+
                            '<div class="replay-item-select">' +
                                '<input type="checkbox" id="subscribe_comments">' +
                                '<label for="subscribe_comments">Notify me of follow-up comments by email.</label>' +
                            '</div>'+
                            '<div class="replay-item-select">' +
                                '<input type="checkbox" id="subscribe_comments">' +
                                '<label for="subscribe_comments">Notify me of follow-up comments by email.</label>' +
                            '</div>'+
                        '</div>'+
                    '</div>'

        return html;
    }
    return Replay
})
