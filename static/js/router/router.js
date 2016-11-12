define("js/router/router",[
    "jquery",
    "pageRouter",
    "js/page/controller",
    "js/admin/operate/operate"
],function ($,router,controller,operate) {

    function routerInit() {
        var siteContent = $("[site-content]");
        function before() {
            siteContent.html("");
            operate.inspect();
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
        router();
    }

    var routerProxy = {
        "init":function () {
            routerInit();
        }
    }
    return routerProxy
})
