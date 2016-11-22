({
    baseUrl: "../",
    out: "compile/all.js",
    paths: {
        jquery:"lib/jquery/1.12.4/jquery",
        pageRouter:"lib/page/page",
        text:"lib/require/requireText/text",
        b64:"lib/base64/b64"
    },
    shim:{
        director:{
            exports:'Router',
            deps:["jquery"]
        }
    },
    name:"js/main"
})
