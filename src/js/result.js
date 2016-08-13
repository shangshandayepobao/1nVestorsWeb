var InterValObj; //timer变量，控制时间
var curCount= 5;//当前剩余秒数


// 找回密码 或 注册 结果
function initResult(){
	var value = $.common.getQueryStringByName('type') ;
	if(value == 'signup'){
		$("#resultContent").html("注册成功");
	}else{
		$("#resultContent").html("密码修改成功");
	}
	InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
}


//timer处理函数
function SetRemainTime() {
        if (curCount == 0) {                
            window.clearInterval(InterValObj);//停止计时器
            location.href = "index.html" ;
        }
        else {
            curCount--;
            $("#countTimer").html(curCount);
        }
}