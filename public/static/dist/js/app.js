"use strict";var pageId=$("body").attr("id"),configName="kf_config",Config={},Const={multiQuoteStorageName:"kf_multi_quote"},setCookie=function(e,t,a,n){document.cookie="{0}{1}={2}{3};path=/;".replace("{0}","undefined"==typeof n||null===n?pageInfo.cookiePrefix:n).replace("{1}",e).replace("{2}",encodeURI(t)).replace("{3}",a?";expires="+a.toUTCString():"")},getCookie=function(e,t){var a=new RegExp("(^| ){0}{1}=([^;]*)(;|$)".replace("{0}","undefined"==typeof t||null===t?pageInfo.cookiePrefix:t).replace("{1}",e)),n=document.cookie.match(a);return n?decodeURI(n[2]):null},getDate=function(e){var t=new Date,a=/^(-|\+)?(\d+)([a-zA-Z]{1,2})$/.exec(e);if(!a)return null;var n="undefined"==typeof a[1]?0:"+"===a[1]?1:-1,o=n===-1?-parseInt(a[2]):parseInt(a[2]),i=a[3];switch(i){case"Y":t.setFullYear(o);break;case"y":t.setYear(0===n?o:t.getYear()+o);break;case"M":t.setMonth(0===n?o:t.getMonth()+o);break;case"d":t.setDate(0===n?o:t.getDate()+o);break;case"h":t.setHours(0===n?o:t.getHours()+o);break;case"m":t.setMinutes(0===n?o:t.getMinutes()+o);break;case"s":t.setSeconds(0===n?o:t.getSeconds()+o);break;case"ms":t.setMilliseconds(0===n?o:t.getMilliseconds()+o);break;default:return null}return t},getStrLen=function(e){for(var t=0,a=e.indexOf("\n")!==-1?e.replace(/\r?\n/g,"_").length:e.length,n=2,o=0;o<a;o++)t+=e.charCodeAt(o)<0||e.charCodeAt(o)>255?n:1;return t},getHostNameUrl=function(){return location.protocol+"//"+location.host},addCode=function(e,t,a){var n=""===a?t.indexOf("]")+1:t.indexOf(a);if("undefined"!=typeof e.selectionStart){var o=e.selectionStart;e.value=e.value.substr(0,o)+t+e.value.substr(e.selectionEnd),e.selectionStart=o+n,e.selectionEnd=o+n+a.length}else e.value+=t},getSelText=function(e){return e.value.substr(e.selectionStart,e.selectionEnd-e.selectionStart)},extractQueryStr=function(e){var t={};return $.each(e.split("&"),function(e,a){if(a){var n=a.split("=");t[n[0]]="undefined"!=typeof n[1]?n[1]:""}}),t},buildQueryStr=function(e){var t="";return $.each(e,function(e,a){t+="/"+e+"/"+a}),t},makeUrl=function(e,t,a){var n="",o=extractQueryStr(t?t:"");a&&(o=$.extend(extractQueryStr(pageInfo.urlParam),o));var i=0===location.pathname.indexOf(pageInfo.baseFile);n=i?pageInfo.baseFile:pageInfo.rootPath.substr(0,pageInfo.rootPath.length-1);var r="";return $.isEmptyObject(o)||(r=buildQueryStr(o)),n+=2===pageInfo.urlType?"?s=/"+e+r:"/"+e+r},decodeHtmlSpecialChar=function(e){return 0===e.length?"":e.replace(/<br\s*\/?>/gi,"\n").replace(/&quot;/gi,'"').replace(/&#39;/gi,"'").replace(/&nbsp;/gi," ").replace(/&gt;/gi,">").replace(/&lt;/gi,"<").replace(/&amp;/gi,"&")},selectAll=function(e){e.prop("checked",!0)},selectReverse=function(e){e.each(function(){var e=$(this);e.prop("checked",!e.prop("checked"))})},readConfig=function(){var e=localStorage.configName;if(e){try{e=JSON.parse(e)}catch(e){return}e&&"object"===$.type(e)&&!$.isEmptyObject(e)&&(Config=e)}},writeConfig=function(){localStorage.configName=JSON.stringify(Config)},handleMainMenu=function(){$("#mainMenuTogglerBtn").click(function(){$("#mainMenu").css("max-height",document.documentElement.clientHeight-49+"px")})},handleBackToTop=function(){$(window).scroll(function(){$(window).scrollTop()>300?$("#backToTop").fadeIn():$("#backToTop").fadeOut()}),$("#backToTop").click(function(){$("body, html").animate({scrollTop:0})})},handleSearchDialog=function(){var e=$("#searchDialog");e.on("shown.bs.modal",function(){$("#searchKeyword").select().focus()}).find("form").submit(function(){var e=$(this),t=e.find("#searchKeyword"),a=e.find("#searchType").val(),n=$.trim(t.val());if("gjc"===a)e.attr("action",makeUrl("gjc/"+n));else if("username"===a)e.attr("action",makeUrl("user/username/"+n));else if(e.attr("action",makeUrl("search")),t.attr("name","author"===a?"pwuser":"keyword"),"title"===a&&n.length&&getStrLen(n)<=2){var o=e.find('input[name="method"]');o.val("OR"),t.val(n+" "+Math.floor((new Date).getTime()/1e3)),window.setTimeout(function(){t.val(n),o.val("AND")},200)}}),e.find('input[name="searchRange"]').on("click",function(){var t="all";"current"===$(this).val()&&(t=pageInfo.fid),e.find('input[name="f_fid"]').val(t)});var t=e.find('input[name="searchRange"][value="current"]');e.find("#searchType").change(function(){var e=$(this).val();t.data("enabled")&&t.prop("disabled","gjc"===e||"username"===e)}),"threadPage"!==pageId&&"readPage"!==pageId||t.prop("disabled",!1).data("enabled",!0).click()},handleLogoutButton=function(){$(document).on("click","#dropdownItemLogout",function(){if(!window.confirm("是否登出账号？"))return!1})},handleAtTipsBtn=function(){$("#atTips").click(function(){var e=$(this),t=e.data("time"),a=getCookie("at_tips_time");if(t&&t!==a){if(a)a!==t&&setCookie("prev_at_tips_time",a);else{var n=(new Date).getDate();setCookie("prev_at_tips_time",(n<10?"0"+n:n)+"日00时00分")}setCookie("at_tips_time",t,getDate("+3d")),e.removeClass("btn-outline-danger").addClass("btn-outline-primary")}})},highlightUnReadAtTipsMsg=function(){if(pageInfo.gjc===pageInfo.userName){var e=getCookie("prev_at_tips_time");if(e&&/^\d+日\d+时\d+分$/.test(e)){var t="";$(".thread-list-item time").each(function(a){var n=$(this),o=$.trim(n.text());return 0===a&&(t=o),e<o&&t>=o&&(n.addClass("text-danger"),void(t=o))}),$(document).on("click",".thread-list-item .thread-link-item a",function(){setCookie("prev_at_tips_time","",getDate("-1d"))})}}},handleIndexThreadPanel=function(){Config.activeNewReplyPanel&&$('a[data-toggle="tab"][href="{0}"]'.replace("{0}",Config.activeNewReplyPanel)).tab("show"),Config.activeTopRecommendPanel&&$('a[data-toggle="tab"][href="{0}"]'.replace("{0}",Config.activeTopRecommendPanel)).tab("show"),$(document).on("shown.bs.tab",'a[data-toggle="tab"]',function(e){var t=$(e.target);readConfig();var a=t.attr("href"),n="";a.indexOf("NewReplyPanel")>0?n="activeNewReplyPanel":a.indexOf("TopRecommendPanel")>0&&(n="activeTopRecommendPanel"),n&&(Config[n]=t.attr("href"),writeConfig())})},handlePageNav=function(e){$(document).on("click",".page-item.active > .page-link",function(t){if(t.preventDefault(),!(pageInfo.maxPageNum<=1)){var a=parseInt(window.prompt("要跳转到第几页？（共"+pageInfo.maxPageNum+"页）",pageInfo.currentPageNum));a&&a>0&&(location.href=makeUrl(e,"page="+a,!0))}})},showFloorLink=function(){$(document).on("click",".floor-num",function(e){e.preventDefault(),window.prompt("本楼的跳转链接：",getHostNameUrl()+$(this).attr("href"))})},handleFastReplyBtn=function(){$(document).on("click",".fast-reply-btn",function(e){e.preventDefault();var t=$(this).closest("article"),a=t.data("floor"),n=t.data("username");$("#articleGjc").val(n);var o=$("#articleContent").get(0);o.value="[quote]回 {0}楼({1}) 的帖子[/quote]\n".replace("{0}",a).replace("{1}",n),o.selectionStart=o.value.length,o.selectionEnd=o.value.length,o.focus()})},handleBlockFloorBtn=function(){$(document).on("click",".block-floor",function(){if(!window.confirm("确认要屏蔽该回帖？本操作不可恢复！（屏蔽后该回帖将对大家不可见）"))return!1})},handleBuyThreadBtn=function(){$(document).on("click",".buy-thread-btn",function(e){e.preventDefault();var t=$(this),a=t.data("pid"),n=t.data("price");n>5&&!window.confirm("此贴售价{0}KFB，是否购买？".replace("{0}",n))||(location.href=makeUrl("job/buytopic","tid={0}&pid={1}&verify={2}".replace("{0}",pageInfo.tid).replace("{1}",a).replace("{2}",pageInfo.verify)))})},copyBuyThreadList=function(){$(document).on("change",".buy-thread-list",function(){var e=$(this);if(!("copyList"!==e.val()||e.children().length<=3)){var t=e.find("option:gt(2)").map(function(){return $(this).text()}).get().join("\n");$("#buyThreadListContent").val(t),$("#buyThreadListDialog").modal("show"),e.get(0).selectedIndex=0}}),$("#buyThreadListDialog").on("shown.bs.modal",function(){$("#buyThreadListContent").select().focus()})},handleFloorImage=function(){$(document).on("click",".img",function(){var e=$(this);e.parent().is("a")||this.naturalWidth<=e.closest(".read-floor").width()||(location.href=e.attr("src"))})},addSmileCode=function(){$(".smile-panel").on("click","img",function(){$(".smile-panel").addClass("open");var e=$("#articleContent").get(0);if(e){var t="[s:"+$(this).data("id")+"]";addCode(e,t,""),e.blur()}}).parent().on("shown.bs.dropdown",function(){$(".smile-panel img").each(function(){var e=$(this);e.attr("src")||e.attr("src",e.data("src"))})}).on("hide.bs.dropdown",function(e){var t=$(e.relatedTarget);return t.data("open")?e.preventDefault():void t.removeData("open")}),$("#smileDropdownBtn").click(function(){var e=$(this);e.data("open",!e.data("open"))})},handlePostForm=function(){$("#articleForm").submit(function(){var e=12,t=$("#articleContent");if(getStrLen($.trim(t.val()))<e)return alert("文章内容少于 "+e+" 个字节"),!1}).keydown(function(e){13===e.keyCode&&e.ctrlKey&&$(this).submit()})},fastGotoFloor=function(){if($(".fast-goto-floor").click(function(e){if(e.preventDefault(),!Config.perPageFloorNum){var t=parseInt(window.prompt("你的论坛设置里“文章列表每页个数”为多少（10、20、30）？\n注：如修改了论坛中的此项设置，请访问账号设置页面即可自动同步本地设置",10));if(!t||$.inArray(t,[10,20,30])===-1)return;Config.perPageFloorNum=t,writeConfig()}var a=parseInt(window.prompt("你要跳转到哪一层楼？"));!a||a<=0||(location.href=makeUrl("read/index","tid={0}&page={1}&floor={2}".replace("{0}",pageInfo.tid).replace("{1}",Math.floor(a/Config.perPageFloorNum)+1).replace("{2}",a)))}),pageInfo.floor&&pageInfo.floor>0){var e=$('article[data-floor="'+pageInfo.floor+'"]').prev("a").attr("name");e&&(location.hash="#"+e)}},tuiThread=function(){$(".tui-btn").click(function(e){e.preventDefault();var t=$(this);t.data("wait")||(t.data("wait",!0),$.ajax({type:"POST",url:"/diy_read_tui.php",data:"tid="+pageInfo.tid+"&safeid="+pageInfo.safeId,success:function(e){var a=/<span.+?\+\d+!<\/span>\s*(\d+)/i.exec(e);if(a){var n=t.find("span:first");n.text("+1"),window.setTimeout(function(){n.text(a[1])},1e3)}else/已推过/.test(e)?alert("已推过"):alert("操作失败")},error:function(){alert("操作失败")},complete:function(){t.removeData("wait")}}))})},copyCode=function(){$(document).on("click",".copy-code",function(e){e.preventDefault();var t=$(this),a=t.data("code");if(a)t.text("复制代码").removeData("code"),t.next("textarea").remove(),t.after('<pre class="pre-scrollable">'+a+"</pre>");else{var n=t.next("pre"),o=n.html();t.text("还原代码").data("code",o),o=decodeHtmlSpecialChar(o);var i=n.height();i<50&&(i=50),i>340&&(i=340),n.remove(),$('<textarea class="form-control code-textarea" style="height: '+i+'px" wrap="off">'+o+"</textarea>").insertAfter(t).select().focus()}})},getCheckedMultiQuoteData=function(){var e=[];return $(".multi-quote-check:checked").each(function(){var t=$(this).closest("article");e.push({floor:t.data("floor"),pid:t.data("pid"),userName:t.data("username")})}),e},bindMultiQuoteCheckClick=function(){$(document).on("click",".multi-quote-check",function(){var e=localStorage[Const.multiQuoteStorageName];if(e)try{e=JSON.parse(e),!e||"object"!==$.type(e)||$.isEmptyObject(e)?e=null:"undefined"!=typeof e.tid&&e.tid===pageInfo.tid&&"object"===$.type(e.quoteList)||(e=null)}catch(t){e=null}else e=null;var t=getCheckedMultiQuoteData();e||(localStorage.removeItem(Const.multiQuoteStorageName),e={tid:pageInfo.tid,quoteList:{}}),t.length>0?e.quoteList[pageInfo.currentPageNum]=t:delete e.quoteList[pageInfo.currentPageNum],localStorage[Const.multiQuoteStorageName]=JSON.stringify(e)}),$(".multi-reply-btn").click(function(e){e.preventDefault(),handleMultiQuote(1)})},handleMultiQuote=function(e){var t=localStorage[Const.multiQuoteStorageName];if(t){try{t=JSON.parse(t)}catch(e){return}if(t&&"object"===$.type(t)&&!$.isEmptyObject(t)&&pageInfo.tid&&"undefined"!=typeof t.tid&&t.tid===pageInfo.tid&&"object"===$.type(t.quoteList)&&(2!==e||pageInfo.fid)){var a=[];for(var n in t.quoteList)if("array"===$.type(t.quoteList[n]))for(var o in t.quoteList[n])a.push(t.quoteList[n][o]);if(!a.length)return void localStorage.removeItem(Const.multiQuoteStorageName);var i=[],r="";$.each(a,function(t,a){"undefined"!=typeof a.floor&&"undefined"!=typeof a.pid&&($.inArray(a.userName,i)===-1&&i.push(a.userName),2===e||(r+="[quote]回 {0}楼({1}) 的帖子[/quote]\n".replace("{0}",a.floor).replace("{1}",a.userName)))}),$('input[name="diy_guanjianci"]').val(i.join(",")),$("#articleForm").submit(function(){localStorage.removeItem(Const.multiQuoteStorageName)}),1===e&&$("#articleContent").val(r).focus()}}},handleClearMultiQuoteDataBtn=function(e){$(".clear-multi-quote-data-btn").click(function(t){t.preventDefault(),localStorage.removeItem(Const.multiQuoteStorageName),$('input[name="diy_guanjianci"]').val(""),2===e?$("#textarea").val(""):$("#articleContent").val(""),alert("多重引用数据已被清除")})},checkDonationBtnStatus=function(){$('form[name="rvrc1"] .input-group-addon:contains("已捐款")').length>0&&$('form[name="rvrc1"]').find("input, button").prop("disabled",!0)},handleGameIntroSearchArea=function(){$("#gameSearchKeyword").val(pageInfo.keyword),$("#gameSearchType").val(pageInfo.searchType)},tuiGameIntro=function(e){var t="";t="company"===e?"g_intro_inc_tui_":"type"===e?"g_intro_adv_tui_":"property"===e?"g_intro_moe_tui_":"g_intro_tui_",t+=pageInfo.id;var a=makeUrl("game_intro/"+e,"id="+pageInfo.id+"&tui=1");$(".tui-btn").click(function(e){e.preventDefault();var n=$(this);if(!n.data("wait")){if(getCookie(t,""))return void alert("你在48小时内已经推过");n.data("wait",!0),$.ajax({type:"GET",url:a,success:function(){var e=n.find("span:first"),t=parseInt(e.text());e.text("+1"),window.setTimeout(function(){e.text(++t)},1e3)},error:function(){alert("操作失败")},complete:function(){n.removeData("wait")},dataType:"html"})}})},randomSelectSmBox=function(){$("#smBoxRandom").click(function(){var e=$("#smBoxPanel .table a"),t=Math.floor(Math.random()*e.length);$(this).html("你选择了<b>No. "+t+"</b>").off("click"),window.setTimeout(function(){location.href=e.eq(t).attr("href")},1e3)})},bindFavorPageBtnsClick=function(){var e=$('form[name="favorForm"]');$(document).on("click",".remove-catalog",function(){return window.confirm("是否删除该目录？")}),$("#addCatalog").click(function(t){t.preventDefault();var a=$.trim(window.prompt("请输入收藏夹目录名称："));a&&(e.find('input[name="job"]').val("addtype"),e.find('input[name="type"]').val(a),e.submit())}),$("#favorActionBtns").on("click","button",function(){var t=$(this).data("action");if("selectAll"===t)selectAll($('input[name="delid[]"]'));else if("selectReverse"===t)selectReverse($('input[name="delid[]"]'));else if("delete"===t){var a=$('input[name="delid[]"]:checked');a.length>0&&window.confirm("是否删除这{0}项？".replace("{0}",a.length))&&(e.find('input[name="job"]').val("clear"),e.submit())}}),$("#convertCatalogDropdownMenu").on("click","a",function(t){t.preventDefault();var a=$(this).data("type"),n=$('input[name="delid[]"]:checked');n.length>0&&window.confirm("是否将这{0}项转换到指定目录？".replace("{0}",n.length))&&(e.find('input[name="job"]').val("change"),e.find('input[name="type"]').val(a),e.submit())})},bindFriendPageBtnsClick=function(){$("#friendActionBtns").on("click",'button[type="button"]',function(){var e=$(this).data("action");"selectAll"===e?selectAll($('input[name="selid[]"]')):"selectReverse"===e&&selectReverse($('input[name="selid[]"]'))})},assignBirthdayFiled=function(){$("#birthday").change(function(){var e=$.trim($(this).val()),t=/(\d{4})-(\d{1,2})-(\d{1,2})/.exec(e),a="",n="",o="";t&&(a=parseInt(t[1]),n=parseInt(t[2]),o=parseInt(t[3])),$('input[name="proyear"]').val(a),$('input[name="promonth"]').val(n),$('input[name="proday"]').val(o)})},uploadAvatar=function(){$("#uploadAvatar").click(function(e){e.preventDefault();var t=$("#browseAvatar");if(!t.val())return void alert("请选择要上传的图片");var a=new FormData;a.append("facetype","3"),a.append("step","2"),a.append("upload",t.get(0).files[0]),$.ajax({type:"POST",url:"/profile.php?action=ajaxface",data:a,cache:!1,contentType:!1,processData:!1,success:function(e){console.log(e)},error:function(){alert("上传失败")}})})},syncPerPageFloorNum=function(){var e=function(){var e=parseInt($('select[name="p_num"]').val());0===e&&(e=10),isNaN(e)||e===Config.perPageFloorNum||(Config.perPageFloorNum=e,writeConfig())};e(),$("#creator").submit(function(){readConfig(),e()})},transferKfbAlert=function(){$("#transferKfbForm").submit(function(){var e=$(this),t=parseInt(e.find('input[name="to_money"]').val()),a=parseInt($("#fixedDeposit").text()),n=parseInt($("#currentDeposit").text());if(t>0&&a>0&&t>n&&!window.confirm("你的活期存款不足，转账金额将从定期存款里扣除，是否继续？"))return!1})},bindMessageActionBtnsClick=function(){$("#messageActionBtns").on("click","button",function(){var e=$("#messageListForm"),t=$(this).data("action");if("selectAll"===t)selectAll($('input[name="delid[]"]'));else if("selectReverse"===t)selectReverse($('input[name="delid[]"]'));else if("selectCustom"===t){var a=$.trim(window.prompt("请填写所要选择的包含指定字符串的短消息标题（可用|符号分隔多个标题）","收到了他人转账的KFB|银行汇款通知|您的文章被评分|您的文章被删除"));if(!a)return;$('input[name="delid[]"]').prop("checked",!1),$("a.thread-link").each(function(){var e=$(this);$.each(a.split("|"),function(t,a){e.text().toLowerCase().indexOf(a.toLowerCase())>-1&&e.parent().find('input[name="delid[]"]').prop("checked",!0)})})}else if("download"===t){var n=$('input[name="delid[]"]:checked');n.length>0&&window.confirm("是否下载这{0}项？".replace("{0}",n.length))&&(e.attr("action","/message.php").find('input[name="action"]').val("down"),e.submit())}else if("delete"===t){var n=$('input[name="delid[]"]:checked');n.length>0&&window.confirm("是否删除这{0}项？".replace("{0}",n.length))&&(e.attr("action",makeUrl("message/job")).find('input[name="action"]').val("del"),e.submit())}})};$(function(){"loginPage"!==pageId&&(readConfig(),handleMainMenu(),handleBackToTop(),handleSearchDialog(),handleLogoutButton(),"indexPage"===pageId?(handleAtTipsBtn(),handleIndexThreadPanel()):"threadPage"===pageId?handlePageNav("thread/index"):"readPage"===pageId?(fastGotoFloor(),handlePageNav("read/index"),tuiThread(),showFloorLink(),handleFastReplyBtn(),handleBlockFloorBtn(),handleBuyThreadBtn(),copyBuyThreadList(),handleFloorImage(),handlePostForm(),copyCode(),bindMultiQuoteCheckClick(),handleClearMultiQuoteDataBtn(1),addSmileCode()):"searchPage"===pageId?handlePageNav("search/index"):"gjcPage"===pageId?highlightUnReadAtTipsMsg():"growUpPage"===pageId?checkDonationBtnStatus():"myReplyPage"===pageId?handlePageNav("personal/reply"):"gameIntroSearchPage"===pageId?(handlePageNav("game_intro/search"),handleGameIntroSearchArea()):"gameIntroPage"===pageId?tuiGameIntro("game"):"gameIntroCompanyPage"===pageId?tuiGameIntro("company"):"gameIntroTypePage"===pageId?tuiGameIntro("type"):"gameIntroPropertyPage"===pageId?tuiGameIntro("property"):"smBoxPage"===pageId?randomSelectSmBox():"favorPage"===pageId?bindFavorPageBtnsClick():"friendPage"===pageId?bindFriendPageBtnsClick():"modifyPage"===pageId?(syncPerPageFloorNum(),assignBirthdayFiled()):"bankPage"===pageId?transferKfbAlert():"bankLogPage"===pageId?handlePageNav("bank/log"):"messagePage"===pageId&&(handlePageNav("message/index"),bindMessageActionBtnsClick()),$('[data-toggle="tooltip"]').tooltip({container:"body"}))});
//# sourceMappingURL=app.js.map
