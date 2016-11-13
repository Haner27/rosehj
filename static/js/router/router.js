define("js/router/router",[
    "jquery",
    "pageRouter",
    "js/page/controller",
    "js/admin/operate/operate",
    "js/admin/app"
],function ($,router,controller,operate,admin) {

    function routerInit() {
        var siteContent = $("[site-content]");
        function before() {
            siteContent.html("");
            admin.init();
        }

        router('/',function (ctx) {
            before();
            controller.index.init();

        })
         router('/w',function (ctx) {
            before();
            controller.world.init();
        })
         router('/f',function (ctx) {
            before();
            controller.fashion.init();
        })
         router('/d/:id',function (ctx,next) {
            before();
            controller.detail.init(ctx.params.id);
        })
         router('/c',function (ctx,next) {
            before();
            controller.contact.init();
        })
        router("*",function () {
            alert(1);
        })
        router();
    }

    var routerProxy = {
        "init":function () {
            routerInit();
        }
    }
    return routerProxy
})
