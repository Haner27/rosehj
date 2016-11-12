require([
        "jquery",
        "js/api/api",
        "js/common/cookie"
    ],
    function ($,api,cookie) {
        var app = {
            "init":function () {
                this.name = $("#name");
                this.password=$("#password");
                this.submit = $("#submit");
                this.initEvent();
            },
            "initEvent":function () {
                var _this=this;
                this.submit.on("click",function () {
                    var data={
                        "username":_this.name.val(),
                        "password":Base64.encode(_this.password.val())
                    }

                    api.login(data).done(function (data) {
                        if(data["success"]){
                            cookie.set("islogin",1)
                            alert("success")
                            setTimeout(function () {
                                var location = window.location;
                                location.href = location.protocol+"//"+location.hostname+":"+location.port+"/"
                            },1000)
                        }else{
                            alert(data["error"])
                        }
                    })
                })
            }
        }
        app.init();
    }
)