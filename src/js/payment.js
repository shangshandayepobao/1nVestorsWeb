/*
* @Author: asdfasd
* @Date:   2016-07-05 17:01:10
* @Last Modified by:   asdfasd
* @Last Modified time: 2016-07-05 18:16:46
*/

$(function(){

  //选择支付方式
  $(".pay-way").click(function(){
    $(this).addClass('selected');
    if($(this).has(".f-r").length!=0){
      $(this).children('.f-r').remove();
    }
    if($(this).hasClass('selected')){
      $(this).siblings('span').removeClass('selected');
      $(this).append('<img class="f-r" src="../img/sel_tag.png" alt="">');
      $(this).siblings('span').children('.f-r').remove();
    }
  })


})