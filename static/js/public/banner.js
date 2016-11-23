define("js/public/banner",[
    "jquery",
    "js/api/api"
],function ($,api) {
    var cotent = {
        "init":function () {
            var _this = this;
            this.banner= $("#banner img");
            _this.banner.hide()
            api.banner().done(function (data) {
                if(data.code==0){
                    _this.banner.attr("src",data["detail"]&&data["detail"]["file_url"])
                    _this.banner.fadeIn(800);
                }else{
                    console.log(data.error)
                }
            })
        },
    }
    return cotent
})
