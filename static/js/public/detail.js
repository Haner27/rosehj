define("js/public/detail",[
        "jquery",
        "js/common/page",
        "js/public/article",
        "js/api/api"
    ],
    function ($,page,Article,api) {
        function getList() {
            var app = {
                "init":function (params) {
                    this.id = params["id"];
                    this.parent = params["parent"]
                    this.renderDetail()
                },
                "renderDetail":function (id) {
                    var self = this;
                    this["id"]=id||this.id;
                    this.parent.hide()
                    api.queryDetail(this.id).done(function (data) {
                        if(data["code"]==0){
                            self.__renderDetail(data["detail"])
                            self.parent.stop().fadeIn(1000)
                        }else{
                            alert(data["error"])
                        }
                    })

                },
                getType:function (id) {
                    if(id==1){
                        return "HJ`S World"
                    }else if(id==2){
                        return "Fashion"
                    }else if(id==3){
                        return "Contact"
                    }
                },
                getLink:function (name) {
                    var links = {
                        "HJ`S World":"/w",
                        "Fashion":"/f",
                        "Contact":"/c"
                    }
                    return links[name]
                },
                "__renderDetail":function (data) {
                    var curData = data["data"],
                        typeName = this.getType(curData["from_id"]),
                        nextAndPrev="",
                        nextData=data["next_data"],
                        prevData=data["pre_data"];
                    if(prevData){
                        nextAndPrev +='<a class="prev" href="/d/'+prevData["_id"]+'"><span>←</span>'+prevData["title"]+'</a>';
                    }
                    if(nextData){
                        nextAndPrev+='<a class="next" href="/d/'+nextData["_id"]+'">'+nextData["title"]+'<span>→</span></a>'
                    }
                    var html = '<div class="site-detail">'+
                                   '<article class="site-content-card">'+
                                        '<header>'+
                                            '<h2>'+curData["title"]+'</h2>'+
                                            '<p class="site-content-card-author">Published by '+curData["author_name"]+'</p>'+
                                        '</header>'+
                                        '<div class="site-content-card-detail">'+
                                            curData["text"]+
                                        '</div>'+
                                        '<footer>'+
                                            '<div>'+curData["created_at"]+' — <a>comments '+curData["comments"].length+'</a></div>'+
                                            '<div><a href="'+this.getLink(typeName)+'">'+typeName+'</a></div>'+
                                            '<div><a href="'+window.location.href+'">Permalink</a></div>'+
                                        '</footer>'+
                                   '</article>'+
                                   '<div class="page">'+
                                        nextAndPrev+
                                   '</div>'+
                                '</div>'
                    this.parent.html(html)
                }
            }
            return app
        }
        return getList();
    }
)
