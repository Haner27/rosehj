require([
        "jquery",
        "js/api/api"
    ],
    function ($,api) {
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        }
        //初始化ueditor
        var ue = UE.getEditor('container');

        var app = {
            "init":function () {
                this.id = getQueryString("id");
                this.type = $("#type");
                this.title=$("#title");
                this.submit=$("#submit");
                this.__init();
                this.initEvent();
            },
            "__init":function () {
                if(this.id){
                    api.queryDetail(this.id).done(function (data) {
                        ue.ready(function () {
                            ue.setContent('')
                        })
                    })
                }
            },
            "initEvent":function () {
                var _this=this;
                this.submit.on("click",function () {
                    var data={
                        "title":_this.title.val(),
                        "from_id":_this.type.val(),
                        "text":ue.getContent()
                    }
                    api.submitArticle(data).done(function (data) {
                        var a = data;
                        if(data["code"]==0){
                            setTimeout(function () {
                                var location = window.location,id=data["detail"]["_id"]||this.id;
                                location.href = "/d/"+id
                            },1000)
                        }

                    })
                })
            }
        }
        app.init();
    }
)