define("js/page/contact/app",[
        "jquery",
        "js/public/articleList"
    ],
    function ($,page,articleList) {
        var app = {
            "init":function () {
               articleList.init({
                    "parent":$("[site-content]"),
                    "query":{
                        "from_id":3,
                        "page":1,
                        "per_page":1
                    }
                })
            },
        }
        return app
    }
)
