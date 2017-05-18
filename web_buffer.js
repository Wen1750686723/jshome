/**
 * 遮罩处理类库（类库）
 * ============================================================================
 * 版权所有 2017 文搏，并保留所有权利。
 * 网站地址: http://www.widerwill.com；
 * ----------------------------------------------------------------------------
 * ============================================================================
 * $Author: liuwenbohhh $
 * $Id: web_buffer.js 17155 2017-02-06 06:29:05Z $
 * 
 */
var Webbuffer = function() {
    var that = this;
    var emptyFn = function() {};
    this.loaded = false;
    this.isInit = false;
    this.onsuccess;
    this.bufferid;

    this.initData = function(bufferid,imgpath) {
    	this.bufferid=bufferid;
    	var buffer=$('<div id="'+bufferid+'" style="display:none;width:100%;height:100%;position: fixed;left:0;top:0;opacity:0.6;z-index:999999;"><img src="'+imgpath+'/loader.gif" style="margin-left:50%;margin-top:60%;" alt=""></div>	');
    	$(document.body).append(buffer);
    	this.isInit = true;
    }
    this.show = function(){
    	var onsuccessFun = that.onsuccess || emptyFn;
    	onsuccessFun();
        $("#"+that.bufferid).show();
    }
    this.hide = function(){
        $("#"+that.bufferid).hide();
    }
}