"use strict";var pageId=$("body").attr("id"),configName="kf_config",Config={},Const={multiQuoteStorageName:"kf_multi_quote",atTipsTimeCookieName:"at_tips_time",prevAtTipsTimeCookieName:"prev_at_tips_time",bgStyleCookieName:"bg_style"},setCookie=function(e,t,a,n){document.cookie="{0}{1}={2}{3};path=/;".replace("{0}","undefined"==typeof n||null===n?pageInfo.cookiePrefix:n).replace("{1}",e).replace("{2}",encodeURI(t)).replace("{3}",a?";expires="+a.toUTCString():"")},getCookie=function(e,t){var a=new RegExp("(^| ){0}{1}=([^;]*)(;|$)".replace("{0}","undefined"==typeof t||null===t?pageInfo.cookiePrefix:t).replace("{1}",e)),n=document.cookie.match(a);return n?decodeURI(n[2]):null},getDate=function(e){var t=new Date,a=/^(-|\+)?(\d+)([a-zA-Z]{1,2})$/.exec(e);if(!a)return null;var n="undefined"==typeof a[1]?0:"+"===a[1]?1:-1,o=n===-1?-parseInt(a[2]):parseInt(a[2]),i=a[3];switch(i){case"Y":t.setFullYear(o);break;case"y":t.setFullYear(0===n?o:t.getFullYear()+o);break;case"M":t.setMonth(0===n?o:t.getMonth()+o);break;case"d":t.setDate(0===n?o:t.getDate()+o);break;case"h":t.setHours(0===n?o:t.getHours()+o);break;case"m":t.setMinutes(0===n?o:t.getMinutes()+o);break;case"s":t.setSeconds(0===n?o:t.getSeconds()+o);break;case"ms":t.setMilliseconds(0===n?o:t.getMilliseconds()+o);break;default:return null}return t},getStrLen=function(e){for(var t=0,a=e.indexOf("\n")!==-1?e.replace(/\r?\n/g,"_").length:e.length,n=2,o=0;o<a;o++)t+=e.charCodeAt(o)<0||e.charCodeAt(o)>255?n:1;return t},getHostNameUrl=function(){return location.protocol+"//"+location.host},addCode=function(e,t,a){var n=""===a?t.indexOf("]")+1:t.indexOf(a);if("undefined"!=typeof e.selectionStart){var o=e.selectionStart;e.value=e.value.substr(0,o)+t+e.value.substr(e.selectionEnd),e.selectionStart=o+n,e.selectionEnd=o+n+a.length}else e.value+=t},getSelText=function(e){return e.value.substr(e.selectionStart,e.selectionEnd-e.selectionStart)},extractQueryStr=function(e){var t={};return $.each(e.split("&"),function(e,a){if(a){var n=a.split("=");t[n[0]]="undefined"!=typeof n[1]?n[1]:""}}),t},buildQueryStr=function(e){var t="";return $.each(e,function(e,a){t+="/"+e+"/"+a}),t},makeUrl=function(e,t,a){var n="",o=extractQueryStr(t?t:"");a&&(o=$.extend(extractQueryStr(pageInfo.urlParam),o));var i=0===location.pathname.indexOf(pageInfo.baseFile);n=i?pageInfo.baseFile:pageInfo.rootPath.substr(0,pageInfo.rootPath.length-1);var r="";return $.isEmptyObject(o)||(r=buildQueryStr(o)),n+=2===pageInfo.urlType?"?s=/"+e+r:"/"+e+r},decodeHtmlSpecialChar=function(e){return 0===e.length?"":e.replace(/<br\s*\/?>/gi,"\n").replace(/&quot;/gi,'"').replace(/&#39;/gi,"'").replace(/&nbsp;/gi," ").replace(/&gt;/gi,">").replace(/&lt;/gi,"<").replace(/&amp;/gi,"&")},selectAll=function(e){e.prop("checked",!0)},selectReverse=function(e){e.each(function(){var e=$(this);e.prop("checked",!e.prop("checked"))})},bindFastSubmitKeydown=function(e){e.keydown(function(e){13===e.keyCode&&e.ctrlKey&&$(this).closest("form").submit()})},showValidationMsg=function(e,t,a){"error"===t&&(t="danger"),e.removeClass("form-control-success form-control-warning form-control-danger");var n=e.parent();n.removeClass("has-success has-warning has-danger"),$.inArray(t,["success","warning","danger"]>-1)&&e.addClass("form-control-"+t).parent().addClass("has-"+t);var o=n.find(".form-control-feedback");"wait"===t?o.html('<span class="text-muted"><i class="fa fa-spinner fa-spin" aria-hidden="true"></i> '+a+"</span>"):o.text(a?a:"")},readConfig=function(){var e=localStorage.configName;if(e){try{e=JSON.parse(e)}catch(e){return}e&&"object"===$.type(e)&&!$.isEmptyObject(e)&&(Config=e)}},writeConfig=function(){localStorage.configName=JSON.stringify(Config)},handleMainMenu=function(){$("#mainMenuTogglerBtn").click(function(){$("#mainMenu").css("max-height",document.documentElement.clientHeight-49+"px")})},handleRollToTopOrBottomBtn=function(){$(window).scroll(function(){var e=$("#rollToTopOrBottom");if($(window).scrollTop()>640){if("top"===e.data("direction"))return;e.data("direction","top").attr("aria-label","滚动到页顶").find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up")}else{if("bottom"===e.data("direction"))return;e.data("direction","bottom").attr("aria-label","滚动到页底").find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down")}}),$("#rollToTopOrBottom").click(function(){var e="bottom"===$(this).data("direction")?$("body").height():0;$("body, html").animate({scrollTop:e})})},handleSearchDialog=function(){var e=$("#searchDialog");e.on("shown.bs.modal",function(){$("#searchKeyword").select().focus()}).find("form").submit(function(){var e=$(this),t=e.find("#searchKeyword"),a=e.find("#searchType").val(),n=$.trim(t.val());if("gjc"===a)e.attr("action",makeUrl("gjc/"+n));else if("username"===a)e.attr("action",makeUrl("user/username/"+n));else if(e.attr("action",makeUrl("search")),t.attr("name","author"===a?"pwuser":"keyword"),"title"===a&&n.length&&getStrLen(n)<=2){var o=e.find('input[name="method"]');o.val("OR"),t.val(n+" "+Math.floor((new Date).getTime()/1e3)),window.setTimeout(function(){t.val(n),o.val("AND")},200)}}),e.find('input[name="searchRange"]').on("click",function(){var t="all";"current"===$(this).val()&&(t=pageInfo.fid),e.find('input[name="f_fid"]').val(t)});var t=e.find('input[name="searchRange"][value="current"]');e.find("#searchType").change(function(){var e=$(this).val();t.data("enabled")&&t.prop("disabled","gjc"===e||"username"===e)}),"threadPage"!==pageId&&"readPage"!==pageId||t.prop("disabled",!1).data("enabled",!0).click()},handleAtTipsBtn=function(){$("#atTips").click(function(){var e=$(this),t=e.data("time"),a=getCookie(Const.atTipsTimeCookieName);if(t&&t!==a){if(a)a!==t&&setCookie(Const.prevAtTipsTimeCookieName,a);else{var n=(new Date).getDate();setCookie(Const.prevAtTipsTimeCookieName,(n<10?"0"+n:n)+"日00时00分")}setCookie(Const.atTipsTimeCookieName,t,getDate("+3d")),e.removeClass("btn-outline-danger").addClass("btn-outline-primary")}})},highlightUnReadAtTipsMsg=function(){if(pageInfo.gjc===pageInfo.userName){var e=getCookie(Const.prevAtTipsTimeCookieName);if(e&&/^\d+日\d+时\d+分$/.test(e)){var t="";$(".thread-list-item time").each(function(a){var n=$(this),o=$.trim(n.text());return 0===a&&(t=o),e<o&&t>=o&&(n.addClass("text-danger"),void(t=o))}),$(document).on("click",".thread-list-item .thread-link-item a",function(){setCookie(Const.prevAtTipsTimeCookieName,"",getDate("-1d"))})}}},handleIndexThreadPanel=function(){Config.activeNewReplyPanel&&$('a[data-toggle="tab"][href="{0}"]'.replace("{0}",Config.activeNewReplyPanel)).tab("show"),Config.activeTopRecommendPanel&&$('a[data-toggle="tab"][href="{0}"]'.replace("{0}",Config.activeTopRecommendPanel)).tab("show"),$(document).on("shown.bs.tab",'a[data-toggle="tab"]',function(e){var t=$(e.target);readConfig();var a=t.attr("href"),n="";a.indexOf("NewReplyPanel")>0?n="activeNewReplyPanel":a.indexOf("TopRecommendPanel")>0&&(n="activeTopRecommendPanel"),n&&(Config[n]=t.attr("href"),writeConfig())})},handleSelectBgImage=function(){$("#selectBgImage").on("click","img",function(){var e=$(this),t=e.data("id"),a=e.data("filename"),n=e.parent().data("path");t&&a&&n&&window.confirm("是否选择此背景图片？")&&(setCookie(Const.bgStyleCookieName,t,getDate("+1y")),$("body, .modal-content").css("background-image",'url("'+n+a+'")'),alert("背景已更换"))})},handleSelectBgColor=function(){$("#selectBgImage").on("click","[data-color]",function(){var e=$(this),t=e.data("color");t&&window.confirm("是否选择此背景颜色？")&&(setCookie(Const.bgStyleCookieName,t,getDate("+1y")),$("body, .modal-content").css("background",t),alert("背景已更换"))})},handleCustomBgStyle=function(){$("#customBgStyle").click(function(){var e=getCookie(Const.bgStyleCookieName);e&&!parseInt(e)||(e=""),e=window.prompt("请输入背景图片URL或颜色代码：\n（例：http://xxx.com/abc.jpg 或 #fcfcfc，留空表示恢复默认背景）\n（注：建议选择简洁、不花哨、偏浅色系的背景图片或颜色）",e),null!==e&&(""===e?(setCookie(Const.bgStyleCookieName,"",getDate("-1d")),alert("背景已恢复默认"),location.reload()):/^https?:\/\/[^"\']+/.test(e)?(setCookie(Const.bgStyleCookieName,e,getDate("+1y")),$("body, .modal-content").css("background-image",'url("'+e+'")'),alert("背景已更换")):/^#[0-9a-f]{6}$/i.test(e)?(setCookie(Const.bgStyleCookieName,e,getDate("+1y")),$("body, .modal-content").css("background",e.toLowerCase()),alert("背景已更换")):alert("格式不正确"))})},handlePageNav=function(e){$(document).on("click",".page-item.active > .page-link",function(t){if(t.preventDefault(),!(pageInfo.maxPageNum&&pageInfo.maxPageNum<=1)){var a=parseInt(window.prompt("要跳转到第几页？"+(pageInfo.maxPageNum?"（共"+pageInfo.maxPageNum+"页）":""),pageInfo.currentPageNum));a&&a>0&&(location.href=makeUrl(e,"page="+a,!0))}})},showFloorLink=function(){$(document).on("click",".floor-num",function(e){e.preventDefault(),window.prompt("本楼的跳转链接：",getHostNameUrl()+$(this).attr("href"))})},handleFastReplyBtn=function(){$(document).on("click",".fast-reply-btn",function(e){e.preventDefault();var t=$(this).closest("article"),a=t.data("floor"),n=t.data("username");$("#postGjc").val(n);var o=$("#postContent").get(0);o.value="[quote]回 {0}楼({1}) 的帖子[/quote]\n".replace("{0}",a).replace("{1}",n),o.selectionStart=o.value.length,o.selectionEnd=o.value.length,o.focus()})},handleBlockFloorBtn=function(){$(document).on("click",".block-floor",function(){if(!window.confirm("确认要屏蔽该回帖？本操作不可恢复！（屏蔽后该回帖将对大家不可见）"))return!1})},handleBuyThreadBtn=function(){$(document).on("click",".buy-thread-btn",function(e){e.preventDefault();var t=$(this),a=t.data("pid"),n=t.data("price");n>5&&!window.confirm("此贴售价{0}KFB，是否购买？".replace("{0}",n))||(location.href=makeUrl("job/buytopic","tid={0}&pid={1}&verify={2}".replace("{0}",pageInfo.tid).replace("{1}",a).replace("{2}",pageInfo.verify)))})},copyBuyThreadList=function(){$(document).on("change",".buy-thread-list",function(){var e=$(this);if("copyList"===e.val()){var t=e.find("option").map(function(e){var t=$(this).text();return 0===e||1===e||"-----------"===t?null:t}).get().join("\n");if(!t)return alert("暂时无人购买"),void(e.get(0).selectedIndex=0);$("#buyThreadListContent").val(t),$("#buyThreadListDialog").modal("show"),e.get(0).selectedIndex=0}}),$("#buyThreadListDialog").on("shown.bs.modal",function(){$("#buyThreadListContent").select().focus()})},handleFloorImage=function(){$(document).on("click",".img",function(){var e=$(this);e.parent().is("a")||this.naturalWidth<=e.closest(".read-content").width()||(location.href=e.attr("src"))})},addSmileCode=function(e){$(".smile-panel").on("click","img",function(){$(".smile-panel").addClass("open");var t=e.get(0);if(t){var a="[s:"+$(this).data("id")+"]";addCode(t,a,""),t.blur()}}).parent().on("shown.bs.dropdown",function(){$(".smile-panel img").each(function(){var e=$(this);e.attr("src")||e.attr("src",e.data("src"))})}).on("hide.bs.dropdown",function(e){var t=$(e.relatedTarget);return t.data("open")?e.preventDefault():void t.removeData("open")}),$("#smileDropdownBtn").click(function(){var e=$(this);e.data("open",!e.data("open"))})},fastGotoFloor=function(){if($(".fast-goto-floor").click(function(e){if(e.preventDefault(),!Config.perPageFloorNum){var t=parseInt(window.prompt("你的论坛设置里“文章列表每页个数”为多少（10、20、30）？\n注：如修改了论坛中的此项设置，请访问账号设置页面即可自动同步本地设置",10));if(!t||$.inArray(t,[10,20,30])===-1)return;Config.perPageFloorNum=t,writeConfig()}var a=parseInt(window.prompt("你要跳转到哪一层楼？"));!a||a<=0||(location.href=makeUrl("read/index","tid={0}&page={1}&floor={2}".replace("{0}",pageInfo.tid).replace("{1}",Math.floor(a/Config.perPageFloorNum)+1).replace("{2}",a)))}),pageInfo.floor&&pageInfo.floor>0){var e=$('article[data-floor="'+pageInfo.floor+'"]').prev("a").attr("name");e&&(location.hash="#"+e)}},tuiThread=function(){$(".tui-btn").click(function(e){e.preventDefault();var t=$(this);t.data("wait")||(t.data("wait",!0),$.ajax({type:"POST",url:"/diy_read_tui.php",data:"tid="+pageInfo.tid+"&safeid="+pageInfo.safeId,success:function(e){var a=/<span.+?\+\d+!<\/span>\s*(\d+)/i.exec(e);if(a){var n=t.find("span:first");n.text("+1"),window.setTimeout(function(){n.text(a[1])},1e3)}else/已推过/.test(e)?alert("已推过"):alert("操作失败")},error:function(){alert("操作失败")},complete:function(){t.removeData("wait")}}))})},copyCode=function(){$(document).on("click",".copy-code",function(e){e.preventDefault();var t=$(this),a=t.data("code");if(a)t.text("复制代码").removeData("code"),t.next("textarea").remove(),t.after('<pre class="pre-scrollable">'+a+"</pre>");else{var n=t.next("pre"),o=n.html();t.text("还原代码").data("code",o),o=decodeHtmlSpecialChar(o);var i=n.height();i<50&&(i=50),i>340&&(i=340),n.remove(),$('<textarea class="form-control code-textarea" style="height: '+i+'px" wrap="off">'+o+"</textarea>").insertAfter(t).select().focus()}})},getCheckedMultiQuoteData=function(){var e=[];return $(".multi-quote-check:checked").each(function(){var t=$(this).closest("article");e.push({floor:t.data("floor"),pid:t.data("pid"),userName:t.data("username")})}),e},bindMultiQuoteCheckClick=function(){$(document).on("click",".multi-quote-check",function(){var e=localStorage[Const.multiQuoteStorageName];if(e)try{e=JSON.parse(e),!e||"object"!==$.type(e)||$.isEmptyObject(e)?e=null:"undefined"!=typeof e.tid&&e.tid===pageInfo.tid&&"object"===$.type(e.quoteList)||(e=null)}catch(t){e=null}else e=null;var t=getCheckedMultiQuoteData();e||(localStorage.removeItem(Const.multiQuoteStorageName),e={tid:pageInfo.tid,quoteList:{}}),t.length>0?e.quoteList[pageInfo.currentPageNum]=t:delete e.quoteList[pageInfo.currentPageNum],localStorage[Const.multiQuoteStorageName]=JSON.stringify(e)}),$(".multi-reply-btn").click(function(e){e.preventDefault(),handleMultiQuote(1)})},handleMultiQuote=function(e){var t=localStorage[Const.multiQuoteStorageName];if(t){try{t=JSON.parse(t)}catch(e){return}if(t&&"object"===$.type(t)&&!$.isEmptyObject(t)&&pageInfo.tid&&"undefined"!=typeof t.tid&&t.tid===pageInfo.tid&&"object"===$.type(t.quoteList)&&(2!==e||pageInfo.fid)){var a=[];for(var n in t.quoteList)if("array"===$.type(t.quoteList[n]))for(var o in t.quoteList[n])a.push(t.quoteList[n][o]);if(!a.length)return void localStorage.removeItem(Const.multiQuoteStorageName);var i=[],r="";$.each(a,function(t,a){"undefined"!=typeof a.floor&&"undefined"!=typeof a.pid&&($.inArray(a.userName,i)===-1&&i.push(a.userName),2===e||(r+="[quote]回 {0}楼({1}) 的帖子[/quote]\n".replace("{0}",a.floor).replace("{1}",a.userName)))}),$('input[name="diy_guanjianci"]').val(i.join(",")),$("#postForm").submit(function(){localStorage.removeItem(Const.multiQuoteStorageName)}),1===e&&$("#postContent").val(r).focus()}}},handleClearMultiQuoteDataBtn=function(e){$(".clear-multi-quote-data-btn").click(function(t){t.preventDefault(),localStorage.removeItem(Const.multiQuoteStorageName),$('input[name="diy_guanjianci"]').val(""),2===e?$("#textarea").val(""):$("#postContent").val(""),alert("多重引用数据已被清除")})},handleGameIntroSearchArea=function(){$("#gameSearchKeyword").val(pageInfo.keyword),$("#gameSearchType").val(pageInfo.searchType)},tuiGameIntro=function(e){var t="";t="company"===e?"g_intro_inc_tui_":"type"===e?"g_intro_adv_tui_":"property"===e?"g_intro_moe_tui_":"g_intro_tui_",t+=pageInfo.id;var a=makeUrl("game_intro/"+e,"id="+pageInfo.id+"&tui=1");$(".tui-btn").click(function(e){e.preventDefault();var n=$(this);if(!n.data("wait")){if(getCookie(t,""))return void alert("你在48小时内已经推过");n.data("wait",!0),$.ajax({type:"GET",url:a,success:function(){var e=n.find("span:first"),t=parseInt(e.text());e.text("+1"),window.setTimeout(function(){e.text(++t)},1e3)},error:function(){alert("操作失败")},complete:function(){n.removeData("wait")},dataType:"html"})}})},randomSelectSmBox=function(){$("#smBoxRandom").click(function(){var e=$("#smBoxPanel .table a"),t=Math.floor(Math.random()*e.length);$(this).html("你选择了<b>No. "+t+"</b>").off("click"),window.setTimeout(function(){location.href=e.eq(t).attr("href")},1e3)})},bindFavorPageBtnsClick=function(){var e=$('form[name="favorForm"]');$(document).on("click",".remove-catalog",function(){return window.confirm("是否删除该目录？")}),$("#addCatalog").click(function(t){t.preventDefault();var a=$.trim(window.prompt("请输入收藏夹目录名称："));a&&(e.find('input[name="job"]').val("addtype"),e.find('input[name="type"]').val(a),e.submit())}),$("#favorActionBtns").on("click","button",function(){var t=$(this).data("action");if("selectAll"===t)selectAll($('input[name="delid[]"]'));else if("selectReverse"===t)selectReverse($('input[name="delid[]"]'));else if("delete"===t){var a=$('input[name="delid[]"]:checked');a.length>0&&window.confirm("是否删除这{0}项？".replace("{0}",a.length))&&(e.find('input[name="job"]').val("clear"),e.submit())}}),$("#convertCatalogDropdownMenu").on("click","a",function(t){t.preventDefault();var a=$(this).data("type"),n=$('input[name="delid[]"]:checked');n.length>0&&window.confirm("是否将这{0}项转换到指定目录？".replace("{0}",n.length))&&(e.find('input[name="job"]').val("change"),e.find('input[name="type"]').val(a),e.submit())})},bindFriendPageBtnsClick=function(){$("#friendActionBtns").on("click",'button[type="button"]',function(){var e=$(this).data("action");"selectAll"===e?selectAll($('input[name="selid[]"]')):"selectReverse"===e&&selectReverse($('input[name="selid[]"]'))})},assignBirthdayField=function(){$("#birthday").change(function(){var e=$.trim($(this).val()),t=/(\d{4})-(\d{1,2})-(\d{1,2})/.exec(e),a="",n="",o="";t&&(a=parseInt(t[1]),n=parseInt(t[2]),o=parseInt(t[3])),$('input[name="proyear"]').val(a),$('input[name="promonth"]').val(n),$('input[name="proday"]').val(o)})},syncPerPageFloorNum=function(){var e=function(){var e=parseInt($('select[name="p_num"]').val());0===e&&(e=10),isNaN(e)||e===Config.perPageFloorNum||(Config.perPageFloorNum=e,writeConfig())};e(),$("#creator").submit(function(){readConfig(),e()})},handleUploadAvatarFileBtn=function(){$("#browseAvatar").change(function(){var e=$(this),t=/\.(\w+)$/.exec(e.val());t&&$.inArray(t[1].toLowerCase(),["jpg","gif","png"])!==-1||alert("头像图片类型不匹配")})},transferKfbAlert=function(){$("#transferKfbForm").submit(function(){var e=$(this),t=parseInt(e.find('input[name="to_money"]').val()),a=parseInt($("#fixedDeposit").text()),n=parseInt($("#currentDeposit").text());if(t>0&&a>0&&t>n&&!window.confirm("你的活期存款不足，转账金额将从定期存款里扣除，是否继续？"))return!1})},bindMessageActionBtnsClick=function(){$("#messageActionBtns").on("click","button",function(){var e=$("#messageListForm"),t=$(this).data("action");if("selectAll"===t)selectAll($('input[name="delid[]"]'));else if("selectReverse"===t)selectReverse($('input[name="delid[]"]'));else if("selectCustom"===t){var a=$.trim(window.prompt("请填写所要选择的包含指定字符串的短消息标题（可用|符号分隔多个标题）","收到了他人转账的KFB|银行汇款通知|您的文章被评分|您的文章被删除"));if(!a)return;$('input[name="delid[]"]').prop("checked",!1),$("a.thread-link").each(function(){var e=$(this);$.each(a.split("|"),function(t,a){e.text().toLowerCase().indexOf(a.toLowerCase())>-1&&e.parent().find('input[name="delid[]"]').prop("checked",!0)})})}else if("download"===t){var n=$('input[name="delid[]"]:checked');n.length>0&&window.confirm("是否下载这{0}项？".replace("{0}",n.length))&&(e.attr("action","/message.php").find('input[name="action"]').val("down"),e.submit())}else if("delete"===t){var n=$('input[name="delid[]"]:checked');n.length>0&&window.confirm("是否删除这{0}项？".replace("{0}",n.length))&&(e.attr("action",makeUrl("message/job")).find('input[name="action"]').val("del"),e.submit())}})},handleEditorBtns=function(){var e=$("#postContent").get(0);$(document).on("click",".editor-btn-group button[data-action]",function(){var t=$(this).data("action"),a="";switch(t){case"link":a=window.prompt("请输入链接URL：","http://");break;case"img":a=window.prompt("请输入图片URL：","http://");break;case"sell":a=window.prompt("请输入出售金额：",1);break;case"hide":a=window.prompt("请输入神秘等级：",1);break;case"audio":a=window.prompt("请输入HTML5音频实际地址：\n（可直接输入网易云音乐或虾米的单曲地址，将自动转换为外链地址）","http://");var n=/^https?:\/\/music\.163\.com\/(?:#\/)?song\?id=(\d+)/i.exec(a);n&&(a="http://music.miaola.info/163/{0}.mp3".replace("{0}",n[1])),n=/^https?:\/\/www\.xiami\.com\/song\/(\d+)/i.exec(a),n&&(a="http://music.miaola.info/xiami/{0}.mp3".replace("{0}",n[1]));break;case"video":a=window.prompt("请输入HTML5视频实际地址：\n（可直接输入YouTube视频页面的地址，将自动转换为外链地址）","http://");var n=/^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([\w\-]+)/i.exec(a);n&&(a="http://video.miaola.info/youtube/{0}".replace("{0}",n[1])),n=/^https?:\/\/youtu\.be\/([\w\-]+)$/i.exec(a),n&&(a="http://video.miaola.info/youtube/{0}".replace("{0}",n[1]))}if(null!==a){var o="",i="";switch(t){case"link":o=getSelText(e),i="[url={0}]{1}[/url]".replace("{0}",a).replace("{1}",o);break;case"img":i="[img]{0}[/img]".replace("{0}",a);break;case"quote":o=getSelText(e),i="[quote]{0}[/quote]".replace("{0}",o);break;case"code":o=getSelText(e),i="[code]{0}[/code]".replace("{0}",o);break;case"sell":o=getSelText(e),i="[sell={0}]{1}[/sell]".replace("{0}",a).replace("{1}",o);break;case"hide":o=getSelText(e),i="[hide={0}]{1}[/hide]".replace("{0}",a).replace("{1}",o);break;case"bold":o=getSelText(e),i="[b]{0}[/b]".replace("{0}",o);break;case"italic":o=getSelText(e),i="[i]{0}[/i]".replace("{0}",o);break;case"underline":o=getSelText(e),i="[u]{0}[/u]".replace("{0}",o);break;case"strike":o=getSelText(e),i="[strike]{0}[/strike]".replace("{0}",o);break;case"super":o=getSelText(e),i="[sup]{0}[/sup]".replace("{0}",o);break;case"sub":o=getSelText(e),i="[sub]{0}[/sub]".replace("{0}",o);break;case"horizontal":i="[hr]";break;case"align-left":o=getSelText(e),i="[align=left]{0}[/align]".replace("{0}",o);break;case"align-center":o=getSelText(e),i="[align=center]{0}[/align]".replace("{0}",o);break;case"align-right":o=getSelText(e),i="[align=right]{0}[/align]".replace("{0}",o);break;case"fly":o=getSelText(e),i="[fly]{0}[/fly]".replace("{0}",o);break;case"audio":i="[audio]{0}[/audio]".replace("{0}",a);break;case"video":i="[video]{0}[/video]".replace("{0}",a)}i&&(addCode(e,i,o),e.focus())}}),$("#fontSizeDropdownMenu").on("click","a",function(t){t.preventDefault();var a=$(this).data("size"),n=getSelText(e),o="[size={0}]{1}[/size]".replace("{0}",a).replace("{1}",n);addCode(e,o,n),e.focus()}),$("#colorDropdownMenu, #bgColorDropdownMenu").on("click","span",function(){var t=$(this),a=t.parent().is("#bgColorDropdownMenu")?"backcolor":"color",n=t.data("color"),o=getSelText(e),i="[{0}={1}]{2}[/{0}]".replace(/\{0\}/g,a).replace("{1}",n).replace("{2}",o);addCode(e,i,o),e.focus()})},checkPostForm=function(){$("#postForm").submit(function(){var e=$("#postType");if(e.length>0&&!e.val())return alert("没有选择主题分类"),e.focus(),!1;var t=$("#postTitle");if(t.length>0){var a=getStrLen(t.val());if(!a)return alert("标题不能为空"),t.focus(),!1;if(a>100)return alert("标题超过最大长度 100 个字节"),t.focus(),!1}var n=$("#voteItemContent");if(n.length>0&&!$.trim(n.val()))return alert("投票选项不能为空"),n.focus(),!1;var o=$("#postContent");if(o.length>0){var a=getStrLen($.trim(o.val()));if(a<12)return alert("文章内容少于 12 个字节"),o.focus(),!1;if(a>5e4)return alert("文章内容大于 50000 个字节"),o.focus(),!1}var i=$("#postGjc");return i.length>0&&"new"===pageInfo.action&&!$.trim(i.val())?(alert("请在内容文本框的下方填写关键词，以方便搜索，也可以在标题中选择任意一个词填入"),i.focus(),!1):void 0})},handleAttachBtns=function(){$(document).on("click",".attach-area a[data-action]",function(e){e.preventDefault();var t=$(this),a=t.closest(".attach-area"),n=t.data("action"),o=a.data("id");if(o)if("insert"===n){var i=t.data("type"),r=$("#postContent").get(0),l="[{0}={1}]".replace("{0}","new"===i?"upload":"attachment").replace("{1}",o);addCode(r,l,""),r.focus()}else"update"===n?(a.find(".attach-info").prop("hidden",!0).after('<label><input name="replace_{0}" type="file" aria-label="选择附件"></label>'.replace("{0}",o)),t.data("action","cancel").text("取消").blur(),$(document).data("attachUpdateAlert")||(alert("本反向代理服务器为了提高性能对图片设置了缓存，更新附件图片后可能需等待最多30分钟才能看到效果"),$(document).data("attachUpdateAlert",!0))):"cancel"===n?(a.find(".attach-info").prop("hidden",!1).next("label").remove(),t.data("action","update").text("更新").blur()):"delete"===n&&a.remove()}),$(document).on("change",'[type="file"]',function(){var e=$(this),t=/\.(\w+)$/.exec(e.val());if(!t||$.inArray(t[1].toLowerCase(),["jpg","gif","png","torrent"])===-1)return void alert("附件类型不匹配");var a=e.data("type");if("new"===a){e.removeData("type").parent().next().prop("hidden",!1);var n=$("#newAttachArea"),o=n.find('[type="file"]').length;if(o>=5)return;var i=n.find('[type="file"]:last').closest(".attach-area"),r=parseInt(i.data("id"));if(!r)return;$('<div class="form-group row font-size-sm attach-area" data-id="{0}">  <div class="col-xs-12 col-form-label">    <label>      <input name="attachment_{0}" data-type="new" type="file" aria-label="选择附件">    </label>    <span hidden>      <a data-action="insert" data-type="new" href="#">插入</a>&nbsp;      <a data-action="delete" href="#">删除</a>    </span>  </div>  <div class="col-xs-4">    <label class="sr-only" for="atc_downrvrc{0}">神秘系数</label>    <input class="form-control form-control-sm" id="atc_downrvrc{0}" name="atc_downrvrc{0}" data-toggle="tooltip" type="number" value="0" min="0" title="神秘系数" placeholder="神秘系数">  </div>  <div class="col-xs-8">    <label class="sr-only" for="atc_desc{0}">描述</label>    <input class="form-control form-control-sm" id="atc_desc{0}" name="atc_desc{0}" data-toggle="tooltip" type="text" title="描述" placeholder="描述">  </div></div>'.replace(/\{0\}/g,++r)).insertAfter(i).find('[data-toggle="tooltip"]').tooltip({container:"body"})}})},validateRegisterField=function(){$(document).on("change","input[name]",function(){var e=$(this),t=e.attr("name"),a=e.val();return a?void("regemail"===t?(showValidationMsg(e,"wait","检查中，请稍等&hellip;"),$.post(makeUrl("register/check"),"username="+a,function(t){e.val()===t.username&&showValidationMsg(e,t.type,t.msg)}).fail(function(){showValidationMsg(e,"error","响应失败")})):"regpwd"===t?a.length>16||a.length<6?showValidationMsg(e,"error","密码长度不正确"):(showValidationMsg(e,"clear"),$('[name="regpwdrepeat"]').trigger("change")):"regpwdrepeat"===t&&(a!==$('[name="regpwd"]').val()?showValidationMsg(e,"error","两次输入的密码不相符"):showValidationMsg(e,"clear"))):void showValidationMsg(e,"clear")}),$("#registerForm").submit(function(){if($(this).find(".has-danger").length>0)return alert("请正确填写表单"),!1})};$(function(){if("loginPage"!==pageId){if("registerPage"===pageId)return void validateRegisterField();readConfig(),handleMainMenu(),handleRollToTopOrBottomBtn(),handleSearchDialog(),"indexPage"===pageId?(handleAtTipsBtn(),handleIndexThreadPanel(),handleSelectBgImage(),handleSelectBgColor(),handleCustomBgStyle()):"threadPage"===pageId?handlePageNav("thread/index"):"readPage"===pageId?(fastGotoFloor(),handlePageNav("read/index"),tuiThread(),showFloorLink(),handleFastReplyBtn(),handleBlockFloorBtn(),handleBuyThreadBtn(),copyBuyThreadList(),handleFloorImage(),checkPostForm(),bindFastSubmitKeydown($("#postContent")),copyCode(),bindMultiQuoteCheckClick(),handleClearMultiQuoteDataBtn(1),addSmileCode($("#postContent"))):"searchPage"===pageId?handlePageNav("search/index"):"gjcPage"===pageId?highlightUnReadAtTipsMsg():"myReplyPage"===pageId?handlePageNav("personal/reply"):"gameIntroSearchPage"===pageId?(handlePageNav("game_intro/search"),handleGameIntroSearchArea()):"gameIntroPage"===pageId?tuiGameIntro("game"):"gameIntroCompanyPage"===pageId?tuiGameIntro("company"):"gameIntroTypePage"===pageId?tuiGameIntro("type"):"gameIntroPropertyPage"===pageId?tuiGameIntro("property"):"smBoxPage"===pageId?randomSelectSmBox():"favorPage"===pageId?bindFavorPageBtnsClick():"friendPage"===pageId?bindFriendPageBtnsClick():"modifyPage"===pageId?(syncPerPageFloorNum(),assignBirthdayField(),handleUploadAvatarFileBtn()):"bankPage"===pageId?transferKfbAlert():"bankLogPage"===pageId?handlePageNav("bank/log"):"messagePage"===pageId?(handlePageNav("message/index"),bindMessageActionBtnsClick()):"readMessagePage"===pageId?(handleFloorImage(),copyCode()):"writeMessagePage"===pageId?(bindFastSubmitKeydown($("#msgContent")),addSmileCode($("#msgContent"))):"messageBannedPage"===pageId?bindFastSubmitKeydown($("#banidinfo")):"selfRateLatestPage"===pageId?handlePageNav("self_rate/latest"):"selfRateCompletePage"===pageId?handlePageNav("self_rate/complete"):"postPage"===pageId&&(checkPostForm(),bindFastSubmitKeydown($("#postContent")),handleEditorBtns(),addSmileCode($("#postContent")),handleAttachBtns()),$('[data-toggle="tooltip"]').tooltip({container:"body"})}});
//# sourceMappingURL=app.js.map
