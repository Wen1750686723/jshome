/**
 * 滑动选择处理类库（类库）
 * ============================================================================
 * 版权所有 2017 文搏，并保留所有权利。
 * 网站地址: http://www.widerwill.com；
 * ----------------------------------------------------------------------------
 * ============================================================================
 * $Author: liuwenbohhh $
 * $Id: city_picker.js 17155 2017-02-06 06:29:05Z $
 * 
 */
//城市选择器
var CityPicker = function() {
    var that = this;
    var emptyFn = function() {};
    this.rootDataArray = [];
    this.provinceScroller; //省份scroll
    this.cityScroller; //城市
    this.regionScroller; //区域
    this.pickerBox; //picker box 
    this.loaded = false;
    this.isInit = false;
    //===========EVENT========//
    //onSelctedData(province,city,regon)
    //选中城市信息
    this.onSelctedRegonData;
    this.kid="";
    this.id=0;
    /*
     * dataArray 数据
     */
    this.initData = function(dataArray,id,kid) {
//		var idDataMap = {}; //id和数据对照
//		var rootDataArray = []; //跟列的数据
//
//
//		$.each(dataArray, function(index, itemData) {
//
//			idDataMap[itemData.itemCode] = itemData;
//
//			//如果没有上级节点  则他是跟节点 也就是要显示的列
//			if (AppUtils.isEmptyString(itemData.parentItemCode)) {
//
//				rootDataArray.push(itemData);
//
//			} else { //如果有父节点 证明是某个节点的子级
//
//				//取到该节点的父节点
//				var parentData = idDataMap[itemData.parentItemCode];
//				if (parentData != null) {
//
//					if (parentData.childrenArray == null) {
//						parentData.childrenArray = [];
//					}
//					parentData.childrenArray.push(itemData);
//				}
//			}
//		});
        this.id=id;
        this.kid=kid;
        this.rootDataArray = dataArray;
        var pickerBox = $('<div class="list_picker" id="'+kid+'"  style="display: none;">' +
            '<div class="slide_time">' +
            '<div class="slide_top line_tnone">' +
            '<a id="city_picker_calcel" class="city_picker_calcel">取消</a>' +
            '<a id="city_picker_confirm" class="city_picker_determine">确定</a>' +
            '</div>' +
            '</div>' +
            '</div>');
        //城市列表容器
        var listContainer = $('<div class="list_container" style="height: 192px;position:relative;">' +
            '<div class="sbd_list_fixed"></div>' +
            '</div>')
        pickerBox.append(listContainer);
        //点击取消按钮
        pickerBox.find("#city_picker_calcel").click(function() {
            that.dismiss();
        });
        //点击确认按钮
        pickerBox.find("#city_picker_confirm").click(function() {
            that.dismiss();
            var onSelctedRegonDataFun = that.onSelctedRegonData || emptyFn;
            var regionText = "";
            // var regon = that.getSelectedReagon();
            
            // if (regon == null) {
            //     regon = that.getSelectedCity();
            // }
            // if (regon == null) {
            //     regon = that.getSelectedProvince();
            // }
             if (id<2) {
                 regionText = that.getSelectedProvince().itemName;
                 onSelctedRegonDataFun([that.getSelectedProvince()],regionText);
             }else if(id<3) {
                regionText = that.getSelectedProvince().itemName + that.getSelectedCity().itemName;
                onSelctedRegonDataFun([that.getSelectedProvince(),that.getSelectedCity()],regionText);
             }else if(id<4){
                regionText = that.getSelectedProvince().itemName + that.getSelectedCity().itemName + that.getSelectedReagon().itemName;
                onSelctedRegonDataFun([that.getSelectedProvince(),that.getSelectedCity(),that.getSelectedReagon()],regionText);
             }
          
        });
        //添加省份列表wrapper
        listContainer.append('<div class="scrollerwrapper" id="provinceScrollerwrapper'+kid+'">' +
            '<ul style="height: 100%;overflow: auto;">' +
            '</ul>' +
            '</div>');
        //添加城市wrapper
        if (id<2) {
            listContainer.append('<div class="scrollerwrapper" style="display:none;" id="cityScrollerwrapper'+kid+'">' +
                '<ul style="height: 100%;overflow: auto;">' +
                '</ul>' +
                '</div>');
        }else{
            listContainer.append('<div class="scrollerwrapper" id="cityScrollerwrapper'+kid+'">' +
                '<ul style="height: 100%;overflow: auto;">' +
                '</ul>' +
                '</div>');
        }
        if (id<3) {
            listContainer.append('<div class="scrollerwrapper" style="display:none;" id="regionScrollerwrapper'+kid+'">' +
            '<ul style="height: 100%;overflow: auto;">' +
            '</ul>' +
            '</div>');
        }else{
            listContainer.append('<div class="scrollerwrapper" id="regionScrollerwrapper'+kid+'">' +
            '<ul style="height: 100%;overflow: auto;">' +
            '</ul>' +
            '</div>');
        }
        //添加区域wrappr
        
        this.pickerBox = pickerBox;
        $(document.body).append(this.pickerBox);
        that.provinceScroller = new iScroll("provinceScrollerwrapper"+kid, {
            "onScrollEnd": function() {
                if (id>=2) {
                    that.reloadCityScrollerData();}

                if (id>=3) {
                    that.reloadRegonScrollerData();
                }
                
//				if (that.getSelectedProvince()) {
//					this.adjustScrollSelectItem();
//				}
            }
        });
        if (id>=2) {
            that.cityScroller = new iScroll("cityScrollerwrapper"+kid, {
                "onScrollEnd": function() {
                    if (id>=3) {
                        that.reloadRegonScrollerData();
                    }
                    
    //				if (that.getSelectedCity()) {
    //					this.adjustScrollSelectItem();
    //				}
                }
            });
        }
        if (id>=3) {
           that.regionScroller = new iScroll("regionScrollerwrapper"+kid, function() {
    //          if (that.getSelectedReagon()) {
    //              this.adjustScrollSelectItem();
    //          }
            }); 
        }
        
        this.isInit = true;
    }
    //必须先初始化数据
    this.show = function() {
        $(".list_picker").hide();
        if (this.pickerBox == null) {
            console.log("pickerBox==null");
            return;
        }
        // AppUI.showMaskLayer(function() {
            that.dismiss();
        // });
        this.pickerBox.show();
        if (!this.loaded) {
            this.reloadProvinceScrollerData();
            if (that.id>=2) {
                this.reloadCityScrollerData();
            }
            if (that.id>=3) {
               this.reloadRegonScrollerData(); 
            }
            
            this.loaded = true;
        }
    }
    //关闭
    this.dismiss = function() {
        // AppUI.removeMaskLayer();
        this.pickerBox.hide();
    }
    //获取当前选择的省份
    this.getSelectedProvince = function() {
        if (this.rootDataArray && this.rootDataArray.length > 0) {
            //获取当前选择的省份id
            var provinceSelectedIndex = this.provinceScroller.getCurrentSelectedIndex();
            //拿到当前省份
            var provinceData = this.rootDataArray[Math.min(provinceSelectedIndex, this.rootDataArray.length - 1)];
        
            console.log(provinceData.itemName);
        
            return provinceData;
        }
        return null;
    }
    //获取当前选择的城市
    this.getSelectedCity = function() {
        var provinceData = this.getSelectedProvince();
        if (provinceData && provinceData.list && provinceData.list.length > 0) {
            var citySelectedIndex = this.cityScroller.getCurrentSelectedIndex();
            var cityData = provinceData.list[Math.min(citySelectedIndex, provinceData.list.length - 1)];
            return cityData;
        }
        return null;
    }
    //获取当前选择的区域
    this.getSelectedReagon = function() {
        var cityData = this.getSelectedCity();
        if (cityData && cityData.list && cityData.list.length > 0) {
            var regonSelectedIndex = this.regionScroller.getCurrentSelectedIndex();
            var regonData = cityData.list[Math.min(regonSelectedIndex, cityData.list.length - 1)];
            return regonData;
        }
        return null;
    }
    //刷新省份信息
    this.reloadProvinceScrollerData = function() {
        $.each(this.rootDataArray, function(index, data) {
            $("#"+that.kid+" #provinceScrollerwrapper"+that.kid+" ul").append("<li style='overflow:hidden; white-space:nowrap; text-overflow:ellipsis;'>" + data.itemName + "</li>")
        });
        $("#"+that.kid+" #provinceScrollerwrapper"+that.kid+" ul").append("<li>&nbsp;</li>")
        $("#"+that.kid+" #provinceScrollerwrapper"+that.kid+" ul").append("<li>&nbsp;</li>")
        $("#"+that.kid+" #provinceScrollerwrapper"+that.kid+" ul").append("<li>&nbsp;</li>")
        this.provinceScroller.refresh();
        this.provinceScroller.setCurrentIndex(0);
    }
    //刷新城市信息
    this.reloadCityScrollerData = function() {
        //拿到当前省份
        var provinceData = this.getSelectedProvince();
        $("#"+that.kid+" #cityScrollerwrapper"+that.kid+" ul").empty();
        if (provinceData == null || provinceData.list == null || provinceData.list.length == 0) {
            $("#"+that.kid+" cityScrollerwrapper"+that.kid+" ul").append("<li>暂无数据</li>")
            this.cityScroller.refresh();
            return false;
        }
        //清除老的数据
        $.each(provinceData.list, function(index, data) {
            $("#"+that.kid+" #cityScrollerwrapper"+that.kid+" ul").append("<li style='overflow:hidden; white-space:nowrap; text-overflow:ellipsis;'>" + data.itemName + "</li>")
        });
        $("#"+that.kid+" #cityScrollerwrapper"+that.kid+" ul").append("<li>&nbsp;</li>")
        $("#"+that.kid+" #cityScrollerwrapper"+that.kid+" ul").append("<li>&nbsp;</li>")
        $("#"+that.kid+" #cityScrollerwrapper"+that.kid+" ul").append("<li>&nbsp;</li>")
        this.cityScroller.refresh();
        this.cityScroller.setCurrentIndex(0);
        return true;
    }
    //属性区域信息
    this.reloadRegonScrollerData = function() {
        //清除老的数据
        $("#"+that.kid+" #regionScrollerwrapper"+that.kid+" ul").empty();
        var cityData = this.getSelectedCity();
        if (cityData == null || cityData.list == null || cityData.list.length == 0) {
            $("#"+that.kid+" #regionScrollerwrapper"+that.kid+" ul").append("<li>暂无数据</li>")
            this.regionScroller.refresh();
            return false;
        }
        $.each(cityData.list, function(index, data) {
            $("#"+that.kid+" #regionScrollerwrapper"+that.kid+" ul").append("<li style='overflow:hidden; white-space:nowrap; text-overflow:ellipsis;'>" + data.itemName + "</li>")
        });
        $("#"+that.kid+" #regionScrollerwrapper"+that.kid+" ul").append("<li>&nbsp;</li>")
        $("#"+that.kid+" #regionScrollerwrapper"+that.kid+" ul").append("<li>&nbsp;</li>")
        $("#"+that.kid+" #regionScrollerwrapper"+that.kid+" ul").append("<li>&nbsp;</li>")
        this.regionScroller.refresh();
        this.regionScroller.setCurrentIndex(0);
        return true;
    }
}