define("js/common/header",[
    "jquery"
],function ($) {
    var header = {
        "init":function (parent) {
            this.parent = parent;
            this.header = parent&&parent.find(".site-header")||$(".site-header");
            this.headerbtn = this.header.find(".menu-toggle")
            this.nav = this.header.find("[toggle-menu-content]")
            this.initEvent();
        },
        "select":function (value) {
            var selectDom = this.header.find("[header-tab="+(value?value:"")+"]");
            selectDom.parent().siblings().find("a[header-tab]").removeClass("cur")
            selectDom.addClass("cur")
        },
        "initEvent":function () {
            var self = this;
            this.headerbtn.on("click",function () {
                self.nav.toggle("slow")
            })
        }
    }
    return header
})
