define("js/api/api",[
    "jquery"
],function ($) {
    var api = {
        "queryArticle":function (params) {
            return $.ajax({
                "url":"/article/index",
                "type":"post",
                "data":params,
                "error":function () {
                    console.log("queryArticle error")
                }
            })
        },
        "queryDetail":function (id) {
           return $.ajax({
                "url":"/article/details",
                "type":"post",
                "data":{
                  "content_id":id
                },
                "error":function () {
                    console.log("queryDetail error")
                }
            })
        },
        "submitArticle":function (params) {
            return $.ajax({
                "url":"/article/edit",
                "type":"post",
                "data":params,
                "error":function () {
                    console.log("submitArticle error")
                }
            })
        },
        "deleteArticle":function (id) {
            return $.ajax({
                "url":"/article/delete",
                "type":"post",
                "data":{
                    "article_id":id
                },
                "error":function () {
                    console.log("submitArticle error")
                }
            })
        },
        "submitComment":function (params) {
            return $.ajax({
                "url":"/article/comment",
                "type":"post",
                "data":params,
                "error":function () {
                    console.log("submitComment error")
                }
            })
        },
        "submitReply":function (params) {
            return $.ajax({
                "url":"/comment/reply",
                "type":"post",
                "data":params,
                "error":function () {
                    console.log("submitReply error")
                }
            })
        },
        "login":function (params) {
            return $.ajax({
                "url":"/user/admin",
                "type":"post",
                "data":params,
                "error":function () {
                    console.log("login error")
                }
            })
        },
        "islogin":function () {
            return $.ajax({
                "url":"/user/islogin",
                "type":"get",
                "error":function () {
                    console.log("islogin error")
                }
            })
        },
        "logout":function () {
            return $.ajax({
                "url":"/user/logout",
                "type":"get",
                "error":function () {
                    console.log("logout error")
                }
            })
        }
    }
    return api
})
