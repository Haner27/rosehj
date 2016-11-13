define("js/common/cookie",[
],function () {
   var cookie = {
       "days":30,
       "set":function (key,value) {
           var Days = 0;
           var exp  = new Date();  
           exp.setTime(exp.getTime() + this.days*24*60*60*1000);
           document.cookie = key + "="+ value + ";path=/";
       },
       "get":function (key) {
           var arr = document.cookie.match(new RegExp("(^| )"+key+"=([^;]*)(;|$)"));
           if(arr != null){
             return (arr[2]);
           }else{
             return "";
           }
       },
       "delete":function (key) {
           var exp = new Date();
           exp.setTime(exp.getTime() - 1);
           var cval=this.getCookie(key);
           if(cval!=null) document.cookie= key + "="+cval+";expires="+exp.toGMTString();
       }
   }
   return cookie
})
