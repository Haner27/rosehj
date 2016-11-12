define("js/page/detail/app",[
        "jquery",
        "js/common/page",
        "js/public/detail",
        "js/public/reply/replyList"
    ],
    function ($,page,detail,replyList) {
        var app = {
            "init":function (id) {
                this.render()
                detail.init({
                    "parent":this.detail,
                    "id":id
                })
                replyList.init({
                    "parent":this.reply,
                    "id":id
                })

            },
            "render":function () {
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