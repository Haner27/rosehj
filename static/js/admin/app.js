define("js/admin/app",[
        "jquery",
        "js/api/api",
        "js/common/cookie",
        "js/admin/operate/operate"
    ],function ($,api,cookie,operate) {
        var app = {
            "init":function () {

                this.getLoginState()
            },
            "getLoginState":function () {
                var _this = this;
                api.islogin().done(function (data) {
                    if(data["success"]){
                        cookie.set("islogin",1);
                        _this.__init();
                    }else{
                        cookie.set("islogin",0);
                    }
                })
            },
            "__init":function () {
                operate.init();
            }
        }
        return app;
    })