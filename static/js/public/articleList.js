define("js/public/articleList",[
        "jquery",
        "js/common/page",
        "js/public/article",
        "js/api/api",
        "js/common/content"
    ],
    function ($,page,Article,api,content) {
        function getList() {
            var app = {
                "init":function (params) {
                    this.wrap = params["parent"]
                    this.parent = $("<div><div id='articleList'></div><div id='page'></div></div>")
                    this.articleList = this.parent.find("#articleList");
                    this.queryParms = params["query"];

                    this.render()
                },
                "toPage":function (page) {
                    this.renderList({
                        "page":page
                    })
                },
                "render":function () {
                    var _this = this;
                    this.wrap.html(this.parent);
                    this.page = page({
                        "parent":this.parent.find("#page"),
                        "pageSize":this.queryParms["per_page"],
                        "callback":function (page) {
                            _this.toPage(page.option.current)
                        }
                    })
                    this.renderList()
                },
                "renderList":function (queryParams) {
                    var self = this;
                    self.wrap.hide();
                    queryParams&&$.extend(this.queryParms,queryParams);
                    api.queryArticle(this.queryParms).done(function (data) {
                        if(data["code"]==0){
                            var detail = data["detail"];
                            self.__render(detail["data"])
                            self.page.render({
                                "total":detail["total"],
                                "current":detail["page"]
                            })
                            self.wrap.fadeIn(1200)
                        }else{
                            alert(data["error"])
                        }
                    })

                },
                "__render":function (data) {
                    var i = 0,length = data.length,html="";
                    for(;i<length;i++){
                        var article = new Article(data[i]);
                        html+=article.getHtml();
                    }
                    this.articleList.html(html)
                }
            }
            return app
        }
        return getList();
    }
)
