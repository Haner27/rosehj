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
        }
        function after() {
             operate.inspect();
        }

        router('/',function (ctx) {
            before();
            controller.index.init();

        })
         router('/w',function (ctx,next) {
            before();
            controller.world.init();
            next();
        },function () {
            after()
        })
         router('/f',function (ctx,next) {
            before();
            controller.fashion.init();
            next()
        },function () {
            after()
        })
         router('/d/:id',function (ctx,next) {
            before();
            controller.detail.init(ctx.params.id);
            next()
        },function () {
            after()
        })
        router("*",function () {
            operate.inspect();
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
