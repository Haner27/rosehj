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
                        "type":_this.type.val(),
                        "content":ue.getContent()
                    }
                    api.submitArticle(data).done(function (data) {
                        alert("success")
                        setTimeout(function () {
                            var location = window.location,id=data["id"]||this.id;
                            location.href = location.protocol+"//"+location.hostname+"/d/"+_this.id
                        },1000)
                    })
                })
            }
        }
        app.init();
    }
)