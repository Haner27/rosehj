
require([
        "jquery",
        "js/router/router",
        "js/common/header",
        "js/admin/app",
        "js/public/banner"
    ],
    function ($,router,header,admin,banner) {
        banner.init();
        header.init();
        router.init();
        admin.init();
    }
)