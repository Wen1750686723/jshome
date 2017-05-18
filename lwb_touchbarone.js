/**
 * bar处理类库（类库）
 * ============================================================================
 * 版权所有 2017 文搏，并保留所有权利。
 * 网站地址: http://www.widerwill.com；
 * ----------------------------------------------------------------------------
 * ============================================================================
 * $Author: liuwenbohhh $
 * $Id: touchbar.js 17155 2017-02-06 06:29:05Z $
 * 例子：var touchbar=new touchBar();
        if(!touchbar.isInit) {
           touchbar.initData("liuchengs",$("#allcount").val());      
        }
        touchbar.oneline();
        touchbar.point();
        touchbar.reinit(5);
 */
var touchBar = function() {
    var that = this;
    var emptyFn = function() {};
    this.loaded = false;
    this.isInit = false;
    this.onsuccess;
    this.barclass;
    this.countid=1;  //第几个圈出来
    this.id=1;//出来多少
    this.onewidth;
    this.count;

    /**
     * 初始化类
     * @param string barclass  类名称
     * @param int    count     元素的总个数
     */
    this.initData = function(barclass,count) {
    	that.barclass=barclass;
        that.count=count;
        var onewidth=parseInt($("."+barclass).css("width"))/count;
        that.onewidth=onewidth;
        var buffers=$('<div id="graybar" style="width: 100%;margin-top: 5px;background: #eeeeee;height: 10px;float: left;z-index: 1"></div>');
        $("."+barclass).append(buffers);
        var buffers=$('<div id="redbar" style="position: absolute;left: 0px;top: 5px;height: 10px;background: #88b436;z-index: 3;"></div>');
        $("."+barclass).append(buffers);
        //     $("."+barclass).append(buffers);
        // for (var i = 1; i <=count; i++) {
        //     var buffers=$('<div id="graybar" style="width: '+onewidth+'px;margin-top: 5px;background: #eeeeee;height: 10px;float: left;z-index: 1"></div>');
        //     $("."+barclass).append(buffers);
        // }
        // for (var i = 1; i <=count; i++) {
        //     var buffers;
        //     if (i!=count) {
        //        buffers=$('<div id="grayyuan'+(i)+'" style="position: absolute;top:0px;left: '+(onewidth*i-10)+'px;border-radius: 50%;width: 20px;height: 20px;background: #eeeeee;z-index: 2;"></div>'); 
        //        $("."+barclass).append(buffers);
        //     }else{
        //        buffers=$('<div id=grayyuan"'+(i)+'" style="position: absolute;top:0px;left: '+(onewidth*i-20)+'px;border-radius: 50%;width: 20px;height: 20px;background: #eeeeee;z-index: 2;"></div>'); 
        //        $("."+barclass).append(buffers);
        //     }
            
        // }
        // for (var i = 1; i <=count; i++) {
        //     var buffers=$('<div id="redbar'+i+'" style="position: absolute;left: '+((i-1)*onewidth)+'px;top: 5px;height: 10px;background: #88b436;z-index: 3;"></div>');
        //     $("."+barclass).append(buffers);
        // }
        // for (var i = 1; i <=count; i++) {
        //     if (i!=count) {
        //        var buffers=$('<div id="redyuan'+(i)+'" style="position: absolute;top:0px;left: '+(onewidth*i-10)+'px;border-radius: 50%;width: 20px;height: 20px;background: #88b436;z-index: 4;display:none"></div>'); 
        //     }else{
        //        var buffers=$('<div id="redyuan'+(i)+'" style="position: absolute;top:0px;left: '+(onewidth*i-20)+'px;border-radius: 50%;width: 20px;height: 20px;background: #88b436;z-index: 4;display:none"></div>'); 
        //     }
            
        //     $("."+barclass).append(buffers);
        // }
        var countbar=$('<div id="countbar" style="color:#777;">0/'+count+'</div>');
        $("."+barclass).append(countbar);
    	// $(document.body).append(buffer);
    	this.isInit = true;
    }
    /**
     * 长方形推进
     */
    this.pushline= function() {
        $("."+that.barclass+" #redbar").animate({width:(""+parseInt(that.countid*this.onewidth)+"px")},function(){$("#countbar").html(that.countid+"/"+that.count);that.countid++;});
        // if (that.id!=6) {
        //     if (that.countid!=that.count) {
        //         if (that.id==5) {
        //             $("."+that.barclass+" #redbar"+that.countid).animate({width:(""+parseInt(that.id*this.onewidth/5-8)+"px")},function(){$("."+that.barclass+" #redyuan"+that.countid).show();$("#countbar").html(that.countid+"/"+that.count);that.countid++;that.id=1;});
                       
                    
                    
        //         }else{
        //             $("."+that.barclass+" #redbar"+that.countid).animate({width:(""+parseInt(that.id*this.onewidth/5)+"px")}); 
                    
        //         }
                
        //     }else{
        //         if (that.id==5) {
        //             $("."+that.barclass+" #redbar"+that.countid).animate({width:(""+parseInt(that.id*this.onewidth/5-18)+"px")},function(){$("."+that.barclass+" #redyuan"+that.countid).show(); $("#countbar").html(that.countid+"/"+that.count);that.countid++;that.id=1;}); 
        //         }else{
        //             $("."+that.barclass+" #redbar"+that.countid).animate({width:(""+parseInt(that.id*this.onewidth/5)+"px")});               
                    
        //         }
                
        //     }
                       
        //     that.id++;

        //     console.log("."+that.barclass+" #redbar"+that.countid);
        //     console.log((""+parseInt(that.id*this.onewidth/5)+"px"));
        // }       
    }
    /**
     * 长方形推进
      * @param string len  要推进的个数
     */
    this.oneline= function(len) {
        $("."+that.barclass+" #redbar").css("width",len*that.onewidth);
        that.countid+=parseInt(len);
        $("#countbar").html((that.countid-1)+"/"+that.count);
    }
    // this.pushpoint= function() {
    //     if (that.id==6) {
    //         $("."+that.barclass+" #redyuan"+that.countid).show();    
    //         that.countid++;
    //         that.id=1;
    //     }
        
    // }
    /**
     * 重新生成
      * @param string count  重新生成的bar的个数
     */
    this.reinit=function(count){
        $("."+that.barclass).html("");
        that.initData(that.barclass,count);
        that.countid=1;  //第几个圈出来
        // that.id=1;//出来多少
    }
}