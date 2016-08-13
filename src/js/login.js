function loginIn(mobile,pwd){
	var telvalid = /^1[3|4|5|8][0-9]\d{4,8}$/ ;
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

	if(!pwd){
		$.common.showMsg("pwdError","密码不能为空");
		return;
	}else if(pwd.length<6 || pwd.length > 20){
        $.common.showMsg("pwdError","请输入6-20位字符的密码");
        return;
	}else{
		$("#pwdError").hide();
	}

	var params = {
			username : mobile,
			password : pwd
	};
	location.href="index.html"

	// $.common.apiPost('/v2/ecapi.auth.signin', params, function(data) {
	// 	console.log(data);
	// 	if (data.code == 0) {

	// 	}
	// });

}




