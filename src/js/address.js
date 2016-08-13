/*
* @Author: asdfasd
* @Date:   2016-07-18 15:06:55
* @Last Modified by:   asdfasd
* @Last Modified time: 2016-07-19 15:29:46
*/

function addAddress() {
    $('body').css("overflow", "hidden")
    $("#cover").css('visibility','visible');
}
function closeAddress(){
    $('body').css("overflow", "auto")
    $("#cover").css('visibility','hidden');
}
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

var type;
//提交数据时判断
$(function(){
    $('#add').click(function(){
        type = 'add';
    })
    $('.edit-address').click(function(){
        type = 'edit';
    })

    $('.complete').click(function(){
        var city = $("#city-picker3").val();
        var detail = $("#detail").val();
        var shipperName = $("#shipper-name").val();
        var shipperTel = $("#shipper-tel").val();

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

