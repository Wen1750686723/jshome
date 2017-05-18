/**
 * 自动加载处理类库（类库）
 * ============================================================================
 * 版权所有 2017 文搏，并保留所有权利。
 * 网站地址: http://www.widerwill.com；
 * ----------------------------------------------------------------------------
 * ============================================================================
 * $Author: liuwenbohhh $
 * $Id: more_lists.js 17155 2017-02-06 06:29:05Z $
 * 
 */
var Morelist = function() {
    
    var emptyFn = function() {};
    this.webbuffer;
    this.loaded = false;
    this.page=2;
    this.isInit = false;
    this.isnone = false;
    this.onsuccess;
    this.url;
    var that = this;

    this.initData = function(imgurl,url) {
        var webbuffer = new Webbuffer();
        that.webbuffer=webbuffer
        if(!webbuffer.isInit) {
           
           webbuffer.initData("dengdai2",imgurl);
        }
        
        that.url=url;
        

    	this.isInit = true;
    }
    this.loaddata=function(){

        if (that.isnone==false) {
            var onsuccessFun = that.onsuccess || emptyFn;
            that.webbuffer.show();
            $.ajax({
                type:"post",
                url :that.url,
                data:{
                    "page":that.page,
                },
                dataType:"json",
                success:function(data){
                    if (data=="") {
                       that.isnone=true; 
                       that.webbuffer.hide();
                    }else{
                        onsuccessFun(data);
                        that.page++; 
                        that.webbuffer.hide();
                    }
                    
                }
            });
        }

    }
}