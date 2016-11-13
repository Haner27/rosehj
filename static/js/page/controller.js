define("js/page/controller",[
        "jquery",
        "js/page/index/app",
        "js/page/fashion/app",
        "js/page/world/app",
        "js/page/detail/app",
        "js/page/contact/app"
    ],
    function ($,
              index,
              fashion,
              world,
              detail,
              contact
    ) {
        var app = {
            "index":index,
            "fashion":fashion,
            "world":world,
            "detail":detail,
            "contact":contact
        }
        return app
    }
)
