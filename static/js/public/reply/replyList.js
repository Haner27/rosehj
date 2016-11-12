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
                    this.list = params["parent"].find("#replyList");
                    this.reply = params["parent"].find("#reply")
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
                    api.queryReplace(this.id).done(function (data) {
                        data = [
                            {
                                id:1,
                                reply:[{
                                    id:2
                                }]
                            },
                             {
                                id:1,
                                reply:[{
                                    id:2
                                }]
                            }
                        ]
                        self.__renderList(data)
                        self.list.stop().fadeIn(1000)
                        self.renderReplyDetail();
                    })

                },
                renderReplyDetail:function () {
                    var reply = new Reply(this.id),replyDom = $(reply.getHtml()).show()

                    this.reply.html(replyDom)
                    this.reply.stop().fadeIn(1000);
                },
                "__renderList":function (data) {
                    var html = "",replyHtml;
                     html+='<div class="replay-list">'+
                                    '<div class="replay-list-count">'+
                                        '<span>6</span>Comments'+
                                    '</div>';
                    for (var i = 0,length=data.length;i<length;i++){
                        html+=this.getReplyView(data[i])

                    }
                    html+='</div>'
                    this.list.html(html)
                },
                getReplyView:function (data) {
                    var replyHtml = new Reply(data.id).getHtml(),html="",toReplyList="";
                    if(data["reply"]){
                        for(var i =0,replyData=data["reply"],length=replyData.length;i<length;i++){
                            toReplyList+=this.getReplyView(replyData[i])
                        }
                    }
                    html+='<div class="class="replay-message-wrap">' +
                              '<article class="replay-message">'+
                                    '<header>'+
                                        '<img src="../img/default-photo.png">'+
                                        '<div class="replay-message-user">'+
                                            '<h3>tr3ndygirl by Pamela Soluri</h3>'+
                                            '<time>September 19, 2016</time>'+
                                        '</div>'+
                                    '</header>'+
                                    '<section class="replay-message-content">'+
                                        'Obsessed with those fragrances. The women’s is perfect and the mens is soo sexy.'+
                                    '</section>'+
                                    '<p class="replay-message-website">http://www.kristenskouture.com | Luxury. Fashion. Lifestyle.</p>'+
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
                    this.list.on("click","[replay-message-answer]",function () {
                        var reply = $(this).parent().find("[reply]").toggle(800,function () {
                            
                        })
                    })
                }
            }
            return app
        }
        return getList();
    }
)
