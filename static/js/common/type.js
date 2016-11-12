define("js/common/type",[
    "jquery"
],function ($) {
    var type = {
        getType:function (id) {
            if(id==1){
                return "HJ`S World"
            }else if(id==2){
                return "Fashion"
            }else if(id==3){
                return "Contact"
            }
        },
        getLink:function (name) {
            var links = {
                "HJ`S World":"/w",
                "Fashion":"/f",
                "Contact":"/c"
            }
            return links[name]
        },
    }
    return type;
})
