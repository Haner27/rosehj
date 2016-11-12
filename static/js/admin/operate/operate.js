define("js/admin/operate/operate",[
    "jquery",
    "js/common/cookie"
],function ($,cookie) {
    var parent = $("#operate")
    function initEvent() {
        var current_user = {{ current_user|tojson }};
        if(current_user.is_authenticated){
            parent.on("click","[operate]",function () {
                var val = $(this).attr("operate");
                if(val=="upload"){

                }else if(val=="add"){

                }else if(val=="edit"){

                }else if(val=="delete"){

                }
            })
        }
    }
    initEvent();
    var app = {
        "inspect":function () {
            parent.html("");
            if(Number(cookie.get("islogin"))){
                parent.show();
                this.updateView()
            }else{
                parent.hide();
            }
        },
        "canoperate":function () {
            var path = window.location.pathname,exg = /^(\/d)|(\/c)/g
            return exg.test(path);
        },
        "getId":function () {
            var exp = /^[(\/d)|(\/c)]\/([0-9]+)/g,path = window.location.pathname
            return path.match(exp)[0]
        },
        "updateView":function () {
            var html = [],canoperate="";
            html.push('<a class="operate-btn disabled" operate="upload">上传首页图</a>');
            html.push('<a class="operate-btn disabled" operate="add">新增</a>');
            if(this.canoperate()){
                canoperate = "disabled";
            }else{
                canoperate = "undisabled";
            }
            html.push('<a class="operate-btn '+canoperate+'" operate="edit">修改这篇文章</a>');
            html.push('<a class="operate-btn '+canoperate+'" operate="delete">删除这篇文章</a>');
            parent.html(html.join(""));
        }
    }
    return app;
})
