"use strict";var pageId=$("body").attr("id"),configName="kf_config",config={},setCookie=function(e,t,a,n){document.cookie="{0}{1}={2}{3};path=/;".replace("{0}","undefined"==typeof n||null===n?pageInfo.cookiePrefix:n).replace("{1}",e).replace("{2}",encodeURI(t)).replace("{3}",a?";expires="+a.toUTCString():"")},getCookie=function(e,t){var a=new RegExp("(^| ){0}{1}=([^;]*)(;|$)".replace("{0}","undefined"==typeof t||null===t?pageInfo.cookiePrefix:t).replace("{1}",e)),n=document.cookie.match(a);return n?decodeURI(n[2]):null},getDate=function(e){var t=new Date,a=/^(-|\+)?(\d+)([a-zA-Z]{1,2})$/.exec(e);if(!a)return null;var n="undefined"==typeof a[1]?0:"+"===a[1]?1:-1,o=n===-1?-parseInt(a[2]):parseInt(a[2]),i=a[3];switch(i){case"Y":t.setFullYear(o);break;case"y":t.setYear(0===n?o:t.getYear()+o);break;case"M":t.setMonth(0===n?o:t.getMonth()+o);break;case"d":t.setDate(0===n?o:t.getDate()+o);break;case"h":t.setHours(0===n?o:t.getHours()+o);break;case"m":t.setMinutes(0===n?o:t.getMinutes()+o);break;case"s":t.setSeconds(0===n?o:t.getSeconds()+o);break;case"ms":t.setMilliseconds(0===n?o:t.getMilliseconds()+o);break;default:return null}return t},getStrLen=function(e){for(var t=0,a=e.indexOf("\n")!==-1?e.replace(/\r?\n/g,"_").length:e.length,n=2,o=0;o<a;o++)t+=e.charCodeAt(o)<0||e.charCodeAt(o)>255?n:1;return t},getHostNameUrl=function(){return location.protocol+"//"+location.host},addCode=function(e,t,a){var n=""===a?t.indexOf("]")+1:t.indexOf(a);if("undefined"!=typeof e.selectionStart){var o=e.selectionStart;e.value=e.value.substr(0,o)+t+e.value.substr(e.selectionEnd),e.selectionStart=o+n,e.selectionEnd=o+n+a.length}else e.value+=t},getSelText=function(e){return e.value.substr(e.selectionStart,e.selectionEnd-e.selectionStart)},extractQueryStr=function(e){var t={};return $.each(e.split("&"),function(e,a){if(a){var n=a.split("=");t[n[0]]="undefined"!=typeof n[1]?n[1]:""}}),t},buildQueryStr=function(e){var t="";return $.each(e,function(e,a){t+="/"+e+"/"+a}),t},makeUrl=function(e,t,a){var n="",o=extractQueryStr(t?t:"");a&&(o=$.extend(extractQueryStr(pageInfo.urlParam),o));var i=0===location.pathname.indexOf(pageInfo.baseFile);n=i?pageInfo.baseFile:pageInfo.rootPath.substr(0,pageInfo.rootPath.length-1);var r="";return $.isEmptyObject(o)||(r=buildQueryStr(o)),n+=2===pageInfo.urlType?"?s=/"+e+r:"/"+e+r},decodeHtmlSpecialChar=function(e){return 0===e.length?"":e.replace(/<br\s*\/?>/gi,"\n").replace(/&quot;/gi,'"').replace(/&#39;/gi,"'").replace(/&nbsp;/gi," ").replace(/&gt;/gi,">").replace(/&lt;/gi,"<").replace(/&amp;/gi,"&")},readConfig=function(){var e=null;if(e=localStorage.configName){try{e=JSON.parse(e)}catch(t){return}e&&"object"===$.type(e)&&!$.isEmptyObject(e)&&(config=e)}},writeConfig=function(){localStorage.configName=JSON.stringify(config)},handleMainMenu=function(){$("#mainMenuTogglerBtn").click(function(){$("#mainMenu").css("max-height",document.documentElement.clientHeight-50+"px")})},handleBackToTop=function(){$(window).scroll(function(){$(window).scrollTop()>300?$("#backToTop").fadeIn():$("#backToTop").fadeOut()}),$("#backToTop").click(function(){$("body, html").animate({scrollTop:0})})},handleSearchDialog=function(){var e=$("#searchDialog");e.on("shown.bs.modal",function(){$("#searchKeyword").select().focus()}).find("form").submit(function(){var e=$(this),t=e.find("#searchKeyword"),a=e.find("#searchType").val(),n=$.trim(t.val());if("gjc"===a)e.attr("action",makeUrl("gjc/"+n));else if("username"===a)e.attr("action",makeUrl("user/username/"+n));else if(e.attr("action",makeUrl("search")),t.attr("name","author"===a?"pwuser":"keyword"),"title"===a&&n.length&&getStrLen(n)<=2){var o=e.find('input[name="method"]');o.val("OR"),t.val(n+" "+Math.floor((new Date).getTime()/1e3)),window.setTimeout(function(){t.val(n),o.val("AND")},200)}}),e.find('input[name="searchRange"]').on("click",function(){var t="all";"current"===$(this).val()&&(t=pageInfo.fid),e.find('input[name="f_fid"]').val(t)});var t=e.find('input[name="searchRange"][value="current"]');e.find("#searchType").change(function(){var e=$(this).val();t.data("enabled")&&t.prop("disabled","gjc"===e||"username"===e)}),"threadPage"!==pageId&&"readPage"!==pageId||t.prop("disabled",!1).data("enabled",!0).click()},handleLogoutButton=function(){$(document).on("click","#dropdownItemLogout",function(){if(!window.confirm("是否登出账号？"))return!1})},handleAtTipsBtn=function(){$("#atTips").click(function(){var e=$(this),t=e.data("time"),a=getCookie("at_tips_time");if(t&&t!==a){if(a)a!==t&&setCookie("prev_at_tips_time",a);else{var n=(new Date).getDate();setCookie("prev_at_tips_time",(n<10?"0"+n:n)+"日00时00分")}setCookie("at_tips_time",t,getDate("+3d")),e.removeClass("btn-outline-danger").addClass("btn-outline-primary")}})},highlightUnReadAtTipsMsg=function(){if(pageInfo.gjc===pageInfo.userName){var e=getCookie("prev_at_tips_time");if(e&&/^\d+日\d+时\d+分$/.test(e)){var t="";$(".thread-list-item time").each(function(a){var n=$(this),o=$.trim(n.text());return 0===a&&(t=o),e<o&&t>=o&&(n.addClass("text-danger"),void(t=o))}),$(document).on("click",".thread-list-item .thread-link-item a",function(){setCookie("prev_at_tips_time","",getDate("-1d"))})}}},handleIndexThreadPanel=function(){config.activeNewReplyPanel&&$('a[data-toggle="tab"][href="{0}"]'.replace("{0}",config.activeNewReplyPanel)).tab("show"),config.activeTopRecommendPanel&&$('a[data-toggle="tab"][href="{0}"]'.replace("{0}",config.activeTopRecommendPanel)).tab("show"),$(document).on("shown.bs.tab",'a[data-toggle="tab"]',function(e){var t=$(e.target);readConfig();var a=t.attr("href"),n="";a.indexOf("NewReplyPanel")>0?n="activeNewReplyPanel":a.indexOf("TopRecommendPanel")>0&&(n="activeTopRecommendPanel"),n&&(config[n]=t.attr("href"),writeConfig())})},handlePageNav=function(e){$(document).on("click",".page-item.active > .page-link",function(t){if(t.preventDefault(),!(pageInfo.maxPageNum<=1)){var a=parseInt(window.prompt("要跳转到第几页？（共"+pageInfo.maxPageNum+"页）",pageInfo.currentPageNum));a&&a>0&&(location.href=makeUrl(e,"page="+a,!0))}})},showFloorLink=function(){$(document).on("click",".floor-num",function(e){e.preventDefault(),window.prompt("本楼的跳转链接：",getHostNameUrl()+$(this).attr("href"))})},handleFastReplyBtn=function(){$(document).on("click",".fast-reply-btn",function(e){e.preventDefault();var t=$(this),a=t.data("floor"),n=t.data("username");$("#articleGjc").val(n);var o=$("#articleContent").get(0);o.value="[quote]回 {0}楼({1}) 的帖子[/quote]\n".replace("{0}",a).replace("{1}",n),o.selectionStart=o.value.length,o.selectionEnd=o.value.length,o.focus()})},handleBuyThreadBtn=function(){$(document).on("click",".buy-thread-btn",function(e){e.preventDefault();var t=$(this),a=t.data("pid"),n=t.data("price");n>5&&!window.confirm("此贴售价{0}KFB，是否购买？".replace("{0}",n))||(location.href=makeUrl("job/buytopic","tid={0}&pid={1}&verify={2}".replace("{0}",pageInfo.tid).replace("{1}",a).replace("{2}",pageInfo.verify)))})},addSmileCode=function(){$(".smile-panel").on("click","img",function(){$(".smile-panel").addClass("open");var e=$("#articleContent").get(0);if(e){var t="[s:"+$(this).data("id")+"]";addCode(e,t,""),e.blur()}}).parent().on("shown.bs.dropdown",function(){$(".smile-panel img").each(function(){var e=$(this);e.attr("src")||e.attr("src",e.data("src"))})}).on("hide.bs.dropdown",function(e){var t=$(e.relatedTarget);return t.data("open")?e.preventDefault():void t.removeData("open")}),$("#smileDropdownBtn").click(function(){var e=$(this);e.data("open",!e.data("open"))})},alertPostArticle=function(){$("#articleForm").submit(function(){var e=12,t=$("#articleContent");if(getStrLen($.trim(t.val()))<e)return alert("文章内容少于 "+e+" 个字节"),!1})},tuiThread=function(){$(".tui-btn").click(function(e){e.preventDefault();var t=$(this);t.data("wait")||(t.data("wait",!0),$.ajax({type:"POST",url:"/diy_read_tui.php",data:"tid="+pageInfo.tid+"&safeid="+pageInfo.safeId,success:function(e){var a=/<span.+?\+\d+!<\/span>\s*(\d+)/i.exec(e);if(a){var n=t.find("span:first");n.text("+1"),window.setTimeout(function(){n.text(a[1])},1e3)}else/已推过/.test(e)?alert("已推过"):alert("操作失败")},error:function(){alert("操作失败")},complete:function(){t.removeData("wait")}}))})},copyCode=function(){$(document).on("click",".copy-code",function(e){e.preventDefault();var t=$(this),a=t.data("code");if(a)t.text("复制代码").removeData("code"),t.next("textarea").remove(),t.after('<pre class="pre-scrollable">'+a+"</pre>");else{var n=t.next("pre"),o=n.html();t.text("还原代码").data("code",o),o=decodeHtmlSpecialChar(o);var i=n.height();i<50&&(i=50),i>340&&(i=340),n.remove(),$('<textarea class="form-control code-textarea" style="height: '+i+'px" wrap="off">'+o+"</textarea>").insertAfter(t).select().focus()}})},checkDonationBtnStatus=function(){$('form[name="rvrc1"] .input-group-addon:contains("已捐款")').length>0&&$('form[name="rvrc1"]').find("input, button").prop("disabled",!0)},handleGameIntroSearchArea=function(){$("#gameSearchKeyword").val(pageInfo.keyword),$("#gameSearchType").val(pageInfo.searchType)},tuiGame=function(){$(".tui-btn").click(function(e){e.preventDefault();var t=$(this);if(!t.data("wait")){if(getCookie("g_intro_tui_"+pageInfo.gameId,""))return void alert("你在48小时内已经推过");t.data("wait",!0),$.ajax({type:"GET",url:makeUrl("game_intro/game","id="+pageInfo.gameId+"&tui=1"),success:function(){var e=t.find("span:first"),a=parseInt(e.text());e.text("+1"),window.setTimeout(function(){e.text(++a)},1e3)},error:function(){alert("操作失败")},complete:function(){t.removeData("wait")}})}})};$(function(){"loginPage"!==pageId&&(readConfig(),handleMainMenu(),handleBackToTop(),handleSearchDialog(),handleLogoutButton(),"indexPage"===pageId?(handleAtTipsBtn(),handleIndexThreadPanel()):"threadPage"===pageId?handlePageNav("thread/index"):"readPage"===pageId?(handlePageNav("read/index"),tuiThread(),showFloorLink(),handleFastReplyBtn(),handleBuyThreadBtn(),alertPostArticle(),copyCode(),addSmileCode()):"searchPage"===pageId?handlePageNav("search/index"):"gjcPage"===pageId?highlightUnReadAtTipsMsg():"growUpPage"===pageId?checkDonationBtnStatus():"myReplyPage"===pageId?handlePageNav("personal/reply"):"gameIntroSearchPage"===pageId?(handlePageNav("game_intro/search"),handleGameIntroSearchArea()):"gameIntroPage"===pageId&&tuiGame())});
//# sourceMappingURL=app.js.map
