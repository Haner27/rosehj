define("js/page/controller",[
        "jquery",
        "js/page/index/app",
        "js/page/fashion/app",
        "js/page/world/app",
        "js/page/detail/app"
    ],
    function ($,index,fashion,world,detail) {
        var app = {
            "index":index,
            "fashion":fashion,
            "world":world,
            "detail":detail
        }
        return app
    }
)
