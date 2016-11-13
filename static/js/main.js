
require([
        "jquery",
        "js/router/router",
        "js/common/header",
        "js/admin/app"
    ],
    function ($,router,header,admin) {
        header.init();
        router.init();
        admin.init();
    }
)