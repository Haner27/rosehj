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
                        cookie.set("islogin",false)
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