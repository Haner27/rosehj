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
                        data = {}
                        self.__renderDetail(data)
                        self.parent.stop().fadeIn(1000)
                    })

                },
                "__renderDetail":function (data) {
                   var html = '<div class="site-detail">'+
                                   '<article class="site-content-card">'+
                                        '<header>'+
                                            '<h2>Valentino Spring Summer 2017 Fashion Show</h2>'+
                                            '<p class="site-content-card-author">Published by bryanboy</p>'+
                                        '</header>'+
                                        '<div class="site-content-card-detail">'+
                                            '<p>Pierpaolo Piccioli will present his solo, spring summer 2017 womenswear debut at Valentino this afternoon in Paris. Don’t forget to tune in and watch the fashion show livestream at 3:00PM Paris time (that’s 9:00AM New York time).</p>'+
                                            '<img src="../img/photo/1.png">'+
                                            '<p>See you at the show!</p>'+
                                        '</div>'+
                                        '<footer>'+
                                            '<div>September 14, 2016 — <a>comments 2</a></div>'+
                                            '<div>Fashion, Shows</div>'+
                                            '<div><a>Permalink</a></div>'+
                                        '</footer>'+
                                        '</article>'+
                                        '<div class="page">' +
                                             '<a class="prev"><span>←</span>sadf haha prev</a>'+
                                            '<a class="next">dd next<span>→</span></a>'+
                                        '</div>'
                                '</div>'
                    this.parent.html(html)
                }
            }
            return app
        }
        return getList();
    }
)
