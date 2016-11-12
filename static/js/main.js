
require([
        "jquery",
        "js/router/router",
        "js/common/header",
        "js/common/cookie"
    ],
    function ($,router,header,cookie) {
        header.init();
        router.init();
    }
)