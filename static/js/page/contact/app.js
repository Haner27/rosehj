define("js/page/contact/app",[
        "jquery",
        "js/public/detail",
        "js/public/reply/replyList",
        "js/api/api"
    ],
    function ($,detail,replyList,api) {
        var app = {
            "init":function (id) {
                var _this = this;
                api.queryArticle({
                    "from_id":3,
                    "page":1,
                    "per_page":1
                }).done(function (data) {
                    if(data["code"]==0) {
                        var contact = data["detail"]["data"]&&data["detail"]["data"][0]||null
                        if(contact){
                            // _this.id = contact._id;
                            // _this.__init();
                            // _this.render();
                            window.location.href = '/d/'+contact._id
                        }

                    }else{
                        alert(data["error"])
                    }
                })

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