define("js/page/world/app",[
        "jquery",
        "js/common/page",
        "js/public/articleList"
    ],
    function ($,page,articleList) {
        var app = {
            "init":function () {
                articleList.init({
                    "parent":$("[site-content]"),
                    "query":{
                        "from_id":1,
                        "page":1,
                        "per_page":10
                    }
                })
            },
        }
        return app
    }
)
