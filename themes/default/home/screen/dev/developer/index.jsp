<%--
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<website:title>${regionStatistics.region_name }公共数据开放平台_开发者中心</website:title>
<website:meta name="Keywords" content="数据开发,数据API,免费开发"/>
<website:meta name="Description" content="开发者中心面向所有类型开发者，为开发者集中提供开发、托管、提交、推广、统计分析、换量、变现等全流程服务。目前具备web应用和网站两种合作类型，包含开发支持、运营支持、渠道推广和商业变现四大主要业务。"/>
<website:style href="css/dev/developer/developerController/developerController.css" rel="stylesheet" />
<website:style href="css/dev/developer/index.css" rel="stylesheet" />
<!--切换城市css-->
<website:style href="css/dev/developer/developerController/hzw-city-picker.css" rel="stylesheet" />
<script type="text/javascript">
var isLogin_url="${fn:getLink('interact/correctionFd.do') }?method=isLogin";
</script>
<style>
.modal-dialog{
	z-index:1050;
}
</style>
<body>
<div class="main">
        <div class="banner" style="height: 180px;">
            <div class="line">
            </div>
            <img src="${fn:getUrl('/dist/img/arrow_gif.gif')}" style="position: absolute;left: 315px;top: 141px;">
            <img src="${fn:getUrl('/dist/img/arrow_gif.gif')}" style="position: absolute;left: 645px;top: 141px;">
            <img src="${fn:getUrl('/dist/img/arrow_gif.gif')}" style="position: absolute;left: 965px;top: 141px;">

         <!--   <div class="leftsj"></div>
            <div class="rightsj"></div>-->
            <div class="caro-main">
                <div>
                    <div class="controlContainer showControl currentControl">
                    </div>
                    <div class="flowContainer">
                    </div>
                    <div class="infoContainer">
                        开发注册
                    </div>
                </div>
                <div>
                    <div class="controlContainer" style="background: url(${fn:getUrl('/dist/img/developerController/yingyong.png')}) no-repeat center;left: 365px">
                    </div>
                    <div class="flowContainer" style="background: url(${fn:getUrl('/dist/img/developerController/ico2.png')}) no-repeat center;left: 365px;">
                    </div>
                    <div class="infoContainer" style="left: 370px;">
                        应用创建
                    </div>
                </div>
                <div>
                    <div class="controlContainer" style="background: url(${fn:getUrl('/dist/img/developerController/service.png')}) no-repeat center;left: 694px">
                    </div>
                    <div class="flowContainer" style="background: url(${fn:getUrl('/dist/img/developerController/ico3.png')}) no-repeat center;left: 694px;">
                    </div>
                    <div class="infoContainer" style="left: 700px;">
                        服务申请
                    </div>
                </div>
                <div>
                    <div class="controlContainer" style="background: url(${fn:getUrl('/dist/img/developerController/mix.png')}) no-repeat center;left: 935px;width: 260px;height: 100px;top: 5px">
                    </div>
                    <div class="flowContainer" style="background: url(${fn:getUrl('/dist/img/developerController/ico4.png')}) no-repeat center;left: 1005px;">
                    </div>
                    <div class="infoContainer" style="left: 1010px;">
                        应用开发
                    </div>
                </div>
            </div>
        </div>

    <div class="section-content">
        <div class="g-main">
            <div class="sec-header">平台工具</div>
            <div class="sec-body feature-list">
                <ul>
                    <li>
                        <img src="${fn:getUrl('/dist/img/developerController/developer_img_00.png')}" alt="" class="feature-img" style="max-width: none;height: auto;margin-bottom: 40px;"/>
                        <div class="feature-name">创新大赛</div>
                        <button class="feature-btn m-btn"><a target="_blank"  href="http://www.dcjingsai.com/static_page/openDataIndex.html">查看</a></button>
                    </li>
                    <li>
                        <img src="${fn:getUrl('/dist/img/developerController/developer_img_01.png')}" alt="" class="feature-img"/>
                        <div class="feature-name">海量数据</div>
                        <button class="feature-btn m-btn" onclick="catalog()">查看</button>
                    </li>
                    <li>
                        <img src="${fn:getUrl('/dist/img/developerController/developer_img_02.png')}" alt="" class="feature-img"/>
                        <div class="feature-name">应用接入</div>
                        <button class="feature-btn m-btn" onclick="appCreate()">查看</button>
                    </li>
                    <li>
                        <img src="${fn:getUrl('/dist/img/developerController/developer_img_03.png')}" alt="" class="feature-img"/>
                        <div class="feature-name">服务接口</div>
                        <button class="feature-btn m-btn" onclick="serviceList()">查看</button>
                    </li>
                    <li>
                        <img src="${fn:getUrl('/dist/img/developerController/developer_img_04.png')}" alt="" class="feature-img"/>
                        <div class="feature-name">应用推广</div>
                        <button class="feature-btn m-btn" onclick="appcenter()">查看</button>
                    </li>
                </ul>
            </div>
            <div class="sec-header">开发者文档</div>
            <div class="sec-body dev-info">
                <div class="dev-txt">详细的开发者文档，包括开发SDK的方法及开发流程</div>
                <div class="dev-img">
                    <img src="${fn:getUrl('/dist/img/developerController/developer_img_05.png')}" alt=""/>
                </div>
                <div class="dev-list">
                    <ul style="margin-top: 60px;">
                        <li>
                            <a href="javascript:void(0)" onclick="apiList()">API列表</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" onclick="developerSDK()">开发者SDK</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" onclick="developerDoc()">开发者文档</a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</div>
</body>
&lt;%&ndash; <website:script src="vendor/monui/js/form.js" />&ndash;%&gt;
<website:script src="dist/js/common.js" />
<website:script src="dist/js/hzw-city-picker.js" />
<website:script src="libs/assets/dialog/dialog.js" />
<script>
    var temp;
    var boolean_set = false;
    $(function(){

        $(".showControl").show();

        var i = 0, t = $('.controlContainer').length;
        temp =  setInterval(function(){
            if(i==4)
            {
                i=0
            }
            $(".controlContainer").removeClass("currentControl");
            $('.controlContainer').eq(i > t-1 ? i = 0 : i++).addClass("currentControl");
        }, 2000);
        $("body").on("mouseover",".flowContainer",function(){
           if($(this).siblings(".controlContainer").hasClass("currentControl"))
            {
                boolean_set = true;
                clearInterval(temp);
                //console.log("移进"+i);
            }
        });
        $("body").on("mouseout",".flowContainer",function(){
            if(($(this).siblings(".controlContainer").hasClass("currentControl")))
            {
                console.log('bset = ' + boolean_set);
                if(boolean_set == true){
                    //console.log("移出"+i);
                    temp = setInterval(function(){
                        boolean_set = false;
                        if(i==4)
                        {
                            i=0
                        }
                        $(".controlContainer").removeClass("currentControl");
                        $('.controlContainer').eq(i > t-1 ? i = 0 : i++).addClass("currentControl");
                    }, 2000);
                }
            }
        })


        /**
         * 选择城市
         */
        var cityPicker = new HzwCityPicker({
            data: city_data,
            target: 'cityChoice',
            valType: 'k-v',
            hideCityInput: {
                name: 'city',
                id: 'city'
            },
            hideProvinceInput: {
                name: 'province',
                id: 'province'
            },
            callback: function(){
                var pro_arr = ($('#province').val()).split('-');
                var city_arr = ($('#city').val()).split('-');
                $('#cityChoice').val(pro_arr[1]+'-'+city_arr[1]);
            }
        });
        cityPicker.init();
    })

    function interval(i,t)
    {
        setInterval(function(){
            if(i==4)
            {
                i=0
            }
            $(".controlContainer").removeClass("currentControl");
            $('.controlContainer').hide().eq(i > t-1 ? i = 0 : i++).addClass("currentControl").fadeIn(1000);
        }, 4000);
    }
    
    function catalog(){
    	window.location.href = "${fn:getConfValue('global.index.odweb')}"+"/catalog/";
    }
    
    function serviceList(){
    	//window.location.href = "${fn:getLink('developer/serviceList.htm') }";
    	window.location.href = "${fn:getConfValue('global.index.odweb') }" + "/dev/developer/serviceList.htm";
    }
    
    function appCreate(){
    	var userinfo = "${sessionScope.userInfo }";
    	if(userinfo==null || userinfo==""){
    		$('#bounceIn').click();
    	}else{
	    	window.location.href = "${fn:getConfValue('global.index.odweb')}"+"/dev/console/appCreate.htm";
    	}
    }
    
    function appcenter(){
    	window.location.href = "${fn:getConfValue('global.index.odweb')}"+"/appcenter/";
    }
    
    function developerSDK(){
    	window.location.href = "${fn:getConfValue('global.index.odweb')}"+"/dev/document/download.htm";
    }
    
    function developerDoc(){
    	window.location.href = "${fn:getConfValue('global.index.odweb')}"+"/dev/document/summarizeBack.htm";
    }
    
    function apiList(){
    	window.location.href = "${fn:getConfValue('global.index.odweb')}"+"/dev/developer/serviceList.htm";
    }
    
</script>
--%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<website:title>${regionStatistics.region_name }公共数据开放平台_开发者中心</website:title>
<website:meta name="Keywords" content="数据开发,数据API,免费开发"/>
<website:meta name="Description" content="开发者中心面向所有类型开发者，为开发者集中提供开发、托管、提交、推广、统计分析、换量、变现等全流程服务。目前具备web应用和网站两种合作类型，包含开发支持、运营支持、渠道推广和商业变现四大主要业务。"/>
<website:style href="css/dev/developer/developerController/developerController.css" rel="stylesheet" />
<website:style href="css/dev/developer/index.css" rel="stylesheet" />
<!--切换城市css-->
<website:style href="css/dev/developer/developerController/hzw-city-picker.css" rel="stylesheet" />
<script type="text/javascript">
  var isLogin_url="${fn:getLink('interact/correctionFd.do') }?method=isLogin";
</script>
<style>
    .modal-dialog{
        z-index:1050;
    }
</style>
<body>
<div class="main">
    <div class="banner" style="height: 180px;">
        <div class="line">
        </div>
        <img src="${fn:getUrl('/dist/img/arrow_gif.gif')}" style="position: absolute;left: 315px;top: 141px;">
        <img src="${fn:getUrl('/dist/img/arrow_gif.gif')}" style="position: absolute;left: 645px;top: 141px;">
        <img src="${fn:getUrl('/dist/img/arrow_gif.gif')}" style="position: absolute;left: 965px;top: 141px;">

        <!--   <div class="leftsj"></div>
           <div class="rightsj"></div>-->
        <div class="caro-main">
            <div>
                <div class="controlContainer showControl currentControl">
                </div>
                <div class="flowContainer">
                </div>
                <div class="infoContainer">
                    开发注册
                </div>
            </div>
            <div>
                <div class="controlContainer" style="background: url(${fn:getUrl('/dist/img/developerController/yingyong.png')}) no-repeat center;left: 365px">
                </div>
                <div class="flowContainer" style="background: url(${fn:getUrl('/dist/img/developerController/ico2.png')}) no-repeat center;left: 365px;">
                </div>
                <div class="infoContainer" style="left: 370px;">
                    应用创建
                </div>
            </div>
            <div>
                <div class="controlContainer" style="background: url(${fn:getUrl('/dist/img/developerController/service.png')}) no-repeat center;left: 694px">
                </div>
                <div class="flowContainer" style="background: url(${fn:getUrl('/dist/img/developerController/ico3.png')}) no-repeat center;left: 694px;">
                </div>
                <div class="infoContainer" style="left: 700px;">
                    服务申请
                </div>
            </div>
            <div>
                <div class="controlContainer" style="background: url(${fn:getUrl('/dist/img/developerController/mix.png')}) no-repeat center;left: 935px;width: 260px;height: 100px;top: 5px">
                </div>
                <div class="flowContainer" style="background: url(${fn:getUrl('/dist/img/developerController/ico4.png')}) no-repeat center;left: 1005px;">
                </div>
                <div class="infoContainer" style="left: 1010px;">
                    应用开发
                </div>
            </div>
        </div>
    </div>

    <div class="section-content">
        <div class="g-main">
            <div class="sec-header">平台工具</div>
            <div class="sec-body feature-list">
                <ul style="display: flex; justify-content: center">
                    <li>
                        <img src="${fn:getUrl('/dist/img/developerController/developer_img_00.png')}" alt="" class="feature-img" style="max-width: none;height: auto;margin-bottom: 40px;"/>
                        <div class="feature-name">创新大赛</div>
                        <button class="feature-btn m-btn"><a target="_blank"  href="http://www.dcjingsai.com/static_page/openDataIndex.html">查看</a></button>
                    </li>
                    <li>
                        <img src="${fn:getUrl('/dist/img/developerController/developer_img_01.png')}" alt="" class="feature-img"/>
                        <div class="feature-name">海量数据</div>
                        <button class="feature-btn m-btn" onclick="catalog()">查看</button>
                    </li>
                    <li>
                        <img src="${fn:getUrl('/dist/img/developerController/developer_img_02.png')}" alt="" class="feature-img"/>
                        <div class="feature-name">应用接入</div>
                        <button class="feature-btn m-btn" onclick="appCreate()">查看</button>
                    </li>
                    <li>
                        <img src="${fn:getUrl('/dist/img/developerController/developer_img_03.png')}" alt="" class="feature-img"/>
                        <div class="feature-name">服务接口</div>
                        <button class="feature-btn m-btn" onclick="serviceList()">查看</button>
                    </li>
                    <li>
                        <img src="${fn:getUrl('/dist/img/developerController/developer_img_04.png')}" alt="" class="feature-img"/>
                        <div class="feature-name">应用推广</div>
                        <button class="feature-btn m-btn" onclick="appcenter()">查看</button>
                    </li>
                </ul>
            </div>
            <div class="sec-header">开发者文档</div>
            <div class="sec-body dev-info">
                <div class="dev-txt">详细的开发者文档，包括开发SDK的方法及开发流程</div>
                <div class="dev-img">
                    <img src="${fn:getUrl('/dist/img/developerController/developer_img_05.png')}" alt=""/>
                </div>
                <div class="dev-list">
                    <ul style="margin-top: 60px;">
                        <li>
                            <a href="javascript:void(0)" onclick="apiList()">API列表</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" onclick="developerSDK()">开发者SDK</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" onclick="developerDoc()">开发者文档</a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</div>
</body>
<%-- <website:script src="vendor/monui/js/form.js" />--%>
<website:script src="dist/js/common.js" />
<website:script src="dist/js/hzw-city-picker.js" />
<website:script src="libs/assets/dialog/dialog.js" />
<script>
  var temp;
  var boolean_set = false;
  $(function(){

    $(".showControl").show();

    var i = 0, t = $('.controlContainer').length;
    temp =  setInterval(function(){
      if(i==4)
      {
        i=0
      }
      $(".controlContainer").removeClass("currentControl");
      $('.controlContainer').eq(i > t-1 ? i = 0 : i++).addClass("currentControl");
    }, 2000);
    $("body").on("mouseover",".flowContainer",function(){
      if($(this).siblings(".controlContainer").hasClass("currentControl"))
      {
        boolean_set = true;
        clearInterval(temp);
        //console.log("移进"+i);
      }
    });
    $("body").on("mouseout",".flowContainer",function(){
      if(($(this).siblings(".controlContainer").hasClass("currentControl")))
      {
        console.log('bset = ' + boolean_set);
        if(boolean_set == true){
          //console.log("移出"+i);
          temp = setInterval(function(){
            boolean_set = false;
            if(i==4)
            {
              i=0
            }
            $(".controlContainer").removeClass("currentControl");
            $('.controlContainer').eq(i > t-1 ? i = 0 : i++).addClass("currentControl");
          }, 2000);
        }
      }
    })


    /**
     * 选择城市
     */
    var cityPicker = new HzwCityPicker({
      data: city_data,
      target: 'cityChoice',
      valType: 'k-v',
      hideCityInput: {
        name: 'city',
        id: 'city'
      },
      hideProvinceInput: {
        name: 'province',
        id: 'province'
      },
      callback: function(){
        var pro_arr = ($('#province').val()).split('-');
        var city_arr = ($('#city').val()).split('-');
        $('#cityChoice').val(pro_arr[1]+'-'+city_arr[1]);
      }
    });
    cityPicker.init();
  })

  function interval(i,t)
  {
    setInterval(function(){
      if(i==4)
      {
        i=0
      }
      $(".controlContainer").removeClass("currentControl");
      $('.controlContainer').hide().eq(i > t-1 ? i = 0 : i++).addClass("currentControl").fadeIn(1000);
    }, 4000);
  }

  function catalog(){
    window.location.href = "${fn:getConfValue('global.index.odweb')}"+"/catalog/";
  }

  function serviceList(){
    //window.location.href = "${fn:getLink('developer/serviceList.htm') }";
    window.location.href = "${fn:getConfValue('global.index.odweb') }" + "/dev/developer/serviceList.htm";
  }

  function appCreate(){
    var userinfo = "${sessionScope.userInfo }";
    if(userinfo==null || userinfo==""){
      $('#bounceIn').click();
    }else{
      window.location.href = "${fn:getConfValue('global.index.odweb')}"+"/dev/console/appCreate.htm";
    }
  }

  function appcenter(){
    window.location.href = "${fn:getConfValue('global.index.odweb')}"+"/appcenter/";
  }

  function developerSDK(){
    window.location.href = "${fn:getConfValue('global.index.odweb')}"+"/dev/document/download.htm";
  }

  function developerDoc(){
    window.location.href = "${fn:getConfValue('global.index.odweb')}"+"/dev/document/summarizeBack.htm";
  }

  function apiList(){
    window.location.href = "${fn:getConfValue('global.index.odweb')}"+"/dev/developer/serviceList.htm";
  }

</script>
