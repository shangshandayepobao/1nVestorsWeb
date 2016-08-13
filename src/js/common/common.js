$(function() {
	$.common = $();


//获取url
	var $hosturl = window.location.hostname;
	console.log($hosturl);
	// ajax调用post请求

	$.common.apiPost = function($url, $params, $callback) {
				$.ajax({
				type : 'POST',
				contentType : "application/json;charset=UTF-8",
				url : $url,
				data : JSON.stringify($params),
				success : function(data) {
					data = eval("(" + data + ")");// 返回的格式字符串转对象
					$callback(data);
				},
				error : function(xhr, type) {
					$callback('Ajax error!');
				}
			});
	};

	$.common.apiGet = function($url, $params, $callback) {
				$.ajax({
				type : 'GET',
				contentType : "application/json;charset=UTF-8",
				url :  $url,
				data : JSON.stringify($params),
				success : function(data) {
					data = eval("(" + data + ")");// 返回的格式字符串转对象
					$callback(data);
				},
				error : function(xhr, type) {
					$callback('Ajax error!');
				}
			});
	};

	//展示错误信息
	$.common.showMsg = function(id,content){
			var htm="<img src='../img/warning.png' alt='' >" ;
			htm += content ;
			$("#"+id).show();
			console.log($("#"+id));
			$("#"+id).html(htm);
	}

	var dialog = '<div id="toastTiger" class="toastTiger"></div>';


	$.common.showToast=function(content,time){
		$(document.body).append(dialog);
		$("#toastTiger").html(content);
		setTimeout(function(){
			$("#toastTiger").remove();
			//$(document.body).removeAttr($("#toastTiger"));
		},time);
	}

    // 获取 连接上的参数
	$.common.getQueryStringByName = function (name){
		var result = location.search.match(new RegExp(
			"[\?\&]" + name + "=([^\&]+)", "i"));
		if (result == null || result.length < 1) {
			return "";
		}
		return  result[1];
	}



});



