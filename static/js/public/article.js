define("js/public/article",[
    "jquery",
    "js/common/type"
],function ($,type) {
    function Article(params) {
        this.params = $.extend({},params)
    }
    Article.prototype.init = function () {
        
    }
    Article.prototype.getHtml = function () {
        var typeName = type.getType(this.params.from_id),typeLink = type.getLink(typeName);
        var html = '<article class="site-content-card">'+
                        '<header>'+
                            '<h2><a href="/d/'+this.params._id+'">'+this.params.title+'</a></h2>'+
                            '<p class="site-content-card-author">Published by '+this.params.author_name+'</p>'+
                        '</header>'+
                        '<div class="site-content-card-detail">'+
                            this.params.text+
                        '</div>'+
                        '<footer>'+
                            '<div>'+this.params.created_at+' — <a>comments '+this.params.comments.length+'</a></div>'+
                            '<div><a href="'+typeLink+'">'+typeName+'</a></div>'+
                            '<div><a href="/d/'+this.params._id+'">Permalink</a></div>'+
                        '</footer>'+
                '</article>'
        return html;
    }
    return Article
})
