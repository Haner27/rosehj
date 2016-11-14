define("js/router/router",[
    "jquery",
    "pageRouter",
    "js/page/controller",
    "js/admin/operate/operate",
    "js/admin/app",
    "js/common/header"
],function ($,router,controller,operate,admin,header) {

    function routerInit() {
        var siteContent = $("[site-content]");
        function before() {
            siteContent.html("");
            admin.init();
        }

        router('/',function (ctx,next) {
            before();
            controller.index.init();
            header.select("index")
            next()

        })
         router('/w',function (ctx,next) {
            before();
            controller.world.init();
            header.select("w")
            next()
        })
         router('/f',function (ctx,next) {
            before();
            controller.fashion.init();
            header.select("f")
            next()
        })
         router('/d/:id',function (ctx,next) {
            before();
            controller.detail.init(ctx.params.id);
            header.select("d");
            next()
        })
         router('/c',function (ctx,next) {
            before();
            controller.contact.init();
            header.select("c")
            next();
        })
        router("*",function () {

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
