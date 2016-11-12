define("js/public/reply/replyList",[
        "jquery",
        "js/common/page",
        "js/public/reply/reply",
        "js/api/api"
    ],
    function ($,page,Reply,api) {
        function getList() {
            var app = {
                "init":function (params) {
                    this.id = params["id"];
                    this.parent = params["parent"];
                    this.list = params["parent"].find("#replyList");
                    this.reply = params["parent"].find("#reply");
                    this.data = params["data"];
                    this.hideWrap()
                    this.renderList();
                    this.initEvent()
                },
                hideWrap:function () {
                    this.list.hide();
                    this.reply.hide();
                },
                "renderList":function (id) {
                    var self = this;
                    this["id"]=id||this.id;
                    // api.queryReplace(this.id).done(function (data) {
                    //     data = [
                    //         {
                    //             id:1,
                    //             reply:[{
                    //                 id:2
                    //             }]
                    //         },
                    //          {
                    //             id:1,
                    //             reply:[{
                    //                 id:2
                    //             }]
                    //         }
                    //     ]
                    //     self.__renderList(data)
                    //     self.list.stop().fadeIn(1000)
                    //     self.renderReplyDetail();
                    // })
                    if(this.data){
                        self.__renderList(this.data["detail"]["data"]["comments"])
                        self.list.stop().fadeIn(1000)
                        self.renderReplyDetail();
                    }
                },
                renderReplyDetail:function () {
                    var reply = new Reply(),replyDom = $(reply.getHtml()).show()

                    this.reply.html(replyDom)
                    this.reply.stop().fadeIn(1000);
                },
                "__renderList":function (data) {
                    var html = "",replyHtml;
                     html+='<div class="replay-list">'+
                                    '<div class="replay-list-count">'+
                                        '<span>'+data.length+'</span>Comments'+
                                    '</div>';
                    for (var i = 0,length=data.length;i<length;i++){
                        html+=this.getReplyView(data[i])

                    }
                    html+='</div>'
                    this.list.html(html)
                },
                getReplyView:function (data,parentId) {
                    var replyHtml = new Reply(data._id,parentId).getHtml(),html="",toReplyList="";
                    if(data["replies"]){
                        for(var i =0,replyData=data["replies"],length=replyData.length;i<length;i++){
                            toReplyList+=this.getReplyView(replyData[i],data._id)
                        }
                    }
                    html+='<div class="class="replay-message-wrap">' +
                              '<article class="replay-message" comment='+data._id+'>'+
                                    '<header>'+
                                        '<img src="../img/default-photo.png">'+
                                        '<div class="replay-message-user">'+
                                            '<h3>'+data["nickname"]+'</h3>'+
                                            '<time>'+data["created_at"]+'</time>'+
                                        '</div>'+
                                    '</header>'+
                                    '<section class="replay-message-content">'+
                                        data["content"]+
                                    '</section>'+
                                    '<p class="replay-message-website">'+data["website"]+'</p>'+
                                    '<a class="replay-message-answer" replay-message-answer>reply</a>'+
                                    replyHtml+
                              '</article>'+
                              '<div style="padding-left: 40px;">' +
                                    toReplyList+
                              '</div>'+
                           '</div>'
                    return html
                },
                "initEvent":function () {
                    var _this = this;
                    this.list.on("click","[replay-message-answer]",function () {
                        var reply = $(this).parent().find("[reply]").toggle(800,function () {
                            
                        })
                    })
                    this.reply.on("click","[sendReply]",function () {
                        var reply=_this.reply,params = {
                            "content_id":_this.id,
                            "content":reply.find("[comment-content]").val(),
                            "nickname":reply.find("[comment-name]").val(),
                            "email":reply.find("[comment-email]").val(),
                            "website":reply.find("[comment-website]").val()
                        }
                        api.submitComment(params).done(function (data) {
                            console.log(data)
                        })
                    })
                    this.list.on("click","[sendReply]",function () {

                        var parentId=$(this).attr("sendReply"),commentId=$(this).attr("sendReplyParent"),reply=_this.list.find("[reply="+parentId+"]"),params = {
                            "comment_id":commentId,
                            "parent_id":parentId,
                            "content":reply.find("[comment-content]").val(),
                            "nickname":reply.find("[comment-name]").val(),
                            "email":reply.find("[comment-email]").val(),
                            "website":reply.find("[comment-website]").val()
                        }
                        api.submitReply(params).done(function (data) {
                            console.log(data)
                        })
                    })
                }
            }
            return app
        }
        return getList();
    }
)
