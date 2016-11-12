define("js/api/api",[
    "jquery"
],function ($) {
    var api = {
        "queryArticle":function (params) {
            return $.ajax({
                "url":"../static/db/ar.json",
                "type":"get",
                "error":function () {
                    console.log("queryArticle error")
                }
            })
        },
        "queryDetail":function (id) {
           return $.ajax({
                "url":"../db/ar.json",
                "type":"get",
                "error":function () {
                    console.log("queryDetail error")
                }
            })
        },
        "queryReplace":function (id) {
            return $.ajax({
                "url":"../static/db/ar.json",
                "type":"get",
                "error":function () {
                    console.log("queryDetail error")
                }
            })
        },
        "submitArticle":function (params) {
            return $.ajax({
                "url":"../static/db/ar.json",
                "type":"post",
                "data":params,
                "error":function () {
                    console.log("submitArticle error")
                }
            })
        },
        "login":function (params) {
            return $.ajax({
                "url":"/user/admin",
                "type":"post",
                "data":params,
                "error":function () {
                    console.log("submitArticle error")
                }
            })
        }
    }
    return api
})
