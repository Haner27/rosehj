define("js/page/fashion/app",[
        "jquery",
        "js/common/page",
        "js/public/articleList"
    ],
    function ($,page,articleList) {
        var app = {
            "init":function () {
                articleList.init({
                    "parent":$("[site-content]"),
                    "query":{}
                })
            },
        }
        return app
    }
)
