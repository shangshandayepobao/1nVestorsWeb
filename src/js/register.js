var InterValObj; //timer变量，控制时间
var count = 5; //间隔函数，1秒执行
var curCount= 60;//当前剩余秒数

var telvalid = /^1[3|4|5|8][0-9]\d{4,8}$/ ;   //手机号格式

$(function(){
	//获取手机号验证码
	$("#getMobileCode").click(function(){
		var mobile = $("#mobile").val();   //mobile
		if(!mobile){
			$.common.showMsg("mobileError","手机号不能为空");
			return;
		}else if(mobile.length<11){
	        $.common.showMsg("mobileError","请输入正确的手机号");
	        return;
		}else if(!telvalid.test(mobile)){
			$.common.showMsg("mobileError","请输入正确的手机号");
			return;
		}else{
			$("#mobileError").hide();
		}

	　　//设置button效果，开始计时
			
	    
	     var params={
	     	mobile:mobile
	     }
		$.common.apiPost('/service/sms/sendcode', params, function(data) {
			console.log(data);
			 $("#getMobileCode").addClass("font-cl-A3A3A3");
			 $("#getMobileCode").attr("disabled", "true");
	         $("#getMobileCode").html(curCount + "秒后重新发送");
	         InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
		});

	})

	


// 下拉菜单切换值
    $(".dropdown-menu>li>a").click(function() {
        $(this).parents("ul").siblings(".select").html($(this).html());
    })

})
//注册 、 找回 用户信息
function saveUser(type){
	var mobile = $("#mobile").val();   //mobile

		var mobileCode = $("#mobileCode").val();  //code
		var userpwd = $("#userpwd").val(); //password
		var repwd = $("#repwd").val(); //确认密码
		
		if(!mobile){
			$.common.showMsg("mobileError","手机号不能为空");
			return;
		}else if(mobile.length<11){
	        $.common.showMsg("mobileError","请输入正确的手机号");
	        return;
		}else if(!telvalid.test(mobile)){
			$.common.showMsg("mobileError","请输入正确的手机号");
			return;
		}else{
			$("#mobileError").hide();
		}
		if(!mobileCode){
			$.common.showMsg("codeError","验证码不能为空");
			return;
		}else{
			$("#codeError").hide();
		}

		if(!userpwd){
			$.common.showMsg("pwdError","密码不能为空");
			return;
		}else if(userpwd.length<6 || userpwd.length > 20){
	        $.common.showMsg("pwdError","请输入6-20位字符的密码");
	        return;
		}else{
			$("#pwdError").hide();
		}
		if(!repwd){
			$.common.showMsg("repwdError","确认密码不能为空");
			return;
		}else if(repwd.length<6 || repwd.length > 20){
	        $.common.showMsg("repwdError","请输入6-20位字符的密码");
	        return;
		}else if(repwd != userpwd){
			 $.common.showMsg("repwdError","密码不一致");
	        return;
		}else{
			$("#repwdError").hide();
		}

		location.href="result.html?type=" + type ;
}


//timer处理函数
function SetRemainTime() {
        if (curCount == 0) {                
            window.clearInterval(InterValObj);//停止计时器
            $("#getMobileCode").removeClass("font-cl-A3A3A3");
            $("#getMobileCode").removeAttr("disabled");//启用按钮
            $("#getMobileCode").html("重新发送验证码");
            curCount = 60;
        }
        else {
            curCount--;
            $("#getMobileCode").html( curCount + "秒后重新发送");
        }
}

