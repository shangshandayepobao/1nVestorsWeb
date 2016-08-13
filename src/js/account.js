/*
* @Author: asdfasd
* @Date:   2016-07-19 14:22:53
* @Last Modified by:   asdfasd
* @Last Modified time: 2016-07-19 14:23:07
*/

function bind(id) {
    $('body').css("overflow", "hidden")
    $("#" + id).css('visibility', 'visible');
}

function cancel(id) {
    $('body').css("overflow", "auto")
    $("#" + id).css('visibility', 'hidden');
}