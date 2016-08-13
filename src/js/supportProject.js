/*
 * @Author: asdfasd
 * @Date:   2016-07-05 16:22:49
 * @Last Modified by:   asdfasd
 * @Last Modified time: 2016-07-19 15:28:46
 */
//点击下一步的时候要做的判断
function nextStep() {
    var address = $(".change-address").is(":checked");
    var agree = $("#checkbox-1").is(":checked");
    if (agree == false) {
        $.common.showToast("请阅读并同意协议", 2000);
        return false;
    }
    if (address == false) {
        $.common.showToast("请选择收货地址", 2000);
        return false;
    }
}



$(function() {
    $("#next-step").click(function() {
        var statu = nextStep();
        if (statu == false) {
            return;
        } else {
            location.href = "payment.html";
        }
    })

    //修改地址的时候要做的判断
    $(".change-address").click(function() {
        if ($(this).is(":checked") == true) {
            $(this).parents(".sel-address")
                .siblings('.sel-address')
                .find(".change-address").attr("checked", false);
        }
    })

    $(".txt").click(function() {
        if ($(this).find('img').length == 0) {
            console.log(1);
            $(this).prepend('<img src="../img/sel_right.png" class="f-r" alt="">');
            $(this).parents(".sel-address").find(".address-bg").attr("src", "../img/address_sel_bg.png");
            $(this).parents(".sel-address")
                .siblings('.sel-address')
                .find(".address-bg").attr("src", "../img/address_bg.png");

            $(this).parents(".sel-address")
                .siblings('.sel-address')
                .find(".txt").children('.f-r').remove();
        }else{
            return;
        }

    })

    $('.complete').click(function(){
        var city = $("#city-picker3").val();
        var detail = $("#detail").val();
        var shipperName = $("#shipper-name").val();
        var shipperNel = $("#shipper-tel").val();

        if(!city){
            $.common.showToast("请选择省市区", 1000);
            return false;
        }
        if(!detail){
            $.common.showToast("请填写详细地址", 1000);
            return false;
        }
        if(!shipperName){
            $.common.showToast("请填写收货人姓名", 1000);
            return false;
        }
        if(!shipperTel){
            $.common.showToast("请填写收货人联系方式", 1000);
            return false;
        }else{
            closeAddress();
        }
    })


})


//删除地址
function del(event) {
    event = event ? event : window.event;
    var obj = event.srcElement ? event.srcElement : event.target;
    if ($('.sel-address').length <= 1) {
        $.common.showToast("请至少保留一个地址", 1000);
        return;
    } else {
        $(obj).attr({ 'data-toggle': 'modal', 'data-target': '#myModal3' });
        $("#myModal3 .confirm").click(function() {
            $(obj).parents('.sel-address').remove();
        })

    }

}

function addAddress() {
    $('body').css("overflow", "hidden")
    $("#cover").css('visibility','visible');
}
function closeAddress(){
    $('body').css("overflow", "auto")
    $("#cover").css('visibility','hidden');
}
