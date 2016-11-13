define("js/public/banner",[
    "jquery",
    "js/api/api"
],function ($,api) {
    var cotent = {
        "init":function () {

            api.banner().done(function (data) {
                if(data.code==0){
                    $("#banner img").attr("src",data["detail"]&&data["detail"]["file_url"])
                }else{
                    console.log(data.error)
                }
            })
        },
    }
    return cotent
})
