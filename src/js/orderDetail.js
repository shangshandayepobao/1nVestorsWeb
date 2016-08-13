/*
* @Author: asdfasd
* @Date:   2016-07-19 23:27:41
* @Last Modified by:   asdfasd
* @Last Modified time: 2016-07-21 12:23:26
*/

//取消订单
function cancelOrder(event,text) {
    event = event ? event : window.event;
    var obj = event.srcElement ? event.srcElement : event.target;
    $('#myModal3').find('p').text(text);
    $(obj).attr({ 'data-toggle': 'modal', 'data-target': '#myModal3' });
}
function sendoutMess() {
    $('body').css("overflow", "hidden")
    $("#send-out").css('visibility','visible');
}
function closeMess(){
    $('body').css("overflow", "auto")
    $("#send-out").css('visibility','hidden');
}
