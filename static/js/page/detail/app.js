define("js/page/detail/app",[
        "jquery",
        "js/common/page",
        "js/public/detail",
        "js/public/reply/replyList",
        "js/api/api"
    ],
    function ($,page,detail,replyList,api) {
        var app = {
            "init":function (id) {
                this.id = id;
                this.__init();
                this.render();
            },
            "render":function () {
                var _this = this;
                api.queryDetail(this.id).done(function (data) {
                    if(data["code"]==0){
                        detail.init({
                            "parent":_this.detail,
                            "data":data,
                            "id":_this.id
                        })
                        replyList.init({
                            "parent":_this.reply,
                            "id":_this.id,
                            "data":data
                        })
                    }else{
                        alert(data["error"])
                    }
                })
            },
            "__init":function () {
                this.content = $("[site-content]");
                this.detail = $("<div id='detail'></div>")
                this.reply = $("<div><div id='replyList'></div><div id='reply'></div></div>")
                this.content.append(this.detail)
                this.content.append(this.reply)
            }
        }
        return app
    }
)