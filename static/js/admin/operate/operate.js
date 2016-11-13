define("js/admin/operate/operate",[
    "jquery",
    "js/common/cookie",
    "js/api/api"
],function ($,cookie,api) {
    var parent = $("#operate");
    function initEvent() {
        if(cookie.get("islogin")){
            parent.on("click","[operate]",function () {
                var val = $(this).attr("operate");
                if(val=="upload"){

                }else if(val=="add"){
                   window.location.href="/article/edit"
                }else if(val=="edit"){
                     window.location.href="/article/edit?content_id="+app.getId();
                }else if(val=="delete"){
                    api.deleteArticle(app.getId()).done(function (data) {
                        if(data["success"]){
                            alert("success")
                            window.location.href="/"
                        }else{
                            alert(data["error"])
                        }
                    })
                }else if(val == "logout"){
                    api.logout().done(function (data) {
                        cookie.set("islogin",0);
                        if(data["success"]){
                            window.location.href = "/";
                        }
                    })
                }
            })
        }
    }
    initEvent();
    var app = {
        "init":function () {
            this.inspect();
        },
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
            var exp = /^(\/d|\/c)(\/[0-9a-zA-Z]+)/g,path = window.location.pathname,exc=exp.exec(path)
            return exc&&exc[2].split("/")[1]
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
            html.push('<a class="operate-btn disabled" operate="logout">退出</a>');
            parent.html(html.join(""));
        }
    }
    return app;
})
