/*
 * @Author: asdfasd
 * @Date:   2016-06-28 16:29:58
 * @Last Modified by:   asdfasd
 */

var type;
var idArr = [];
$(function() {

    $(".add").click(function() {
        type = 'creat';

    })

    $.ajax({
            type: 'GET',
            url: '../js/data.json',
            datatype: 'json',
            data: {},
            success: function(data) {

                industryArr = data;
                $("#first-list").change(function() {

                    var industry = $(this).find('option:selected').val();

                    industryArr.forEach(function(item, index) {
                        if (industry == item.name) {
                            if(!item.industries.length){
                                $('#second-list').hide();
                            }else{
                                 $('#second-list').show();
                                 $('#second-list').html("");
                                 item.industries.forEach(function(_item,index){
                                    $('#second-list').append("<option>"+_item.name+"</option>")

                                 })
                            }
                        }
                    })
                })
            },
            error: function(xhr, type) {

            }
        })
        // $.common.apiGet('../js/data.json', function(data) {
        //     console.log(data);
        //     industryArr = data;
        //     $("#first-list").change(function() {
        //         console.log(1);
        //         var industry = $(this).val();
        //         industryArr.forEach(function(item, index) {
        //             if (industry == item.name) {
        //                 console.log(item);
        //             }
        //         })
        //     })
        // })

    // 下拉菜单切换值
    $(".dropdown-menu>li>a").click(function() {
        $(this).parents("ul").siblings(".select").html($(this).html());
    })

    //点击下一步
    $(".nextStep").click(function() {
        var index = $(this).index(".nextStep");
        var statu = nextStep();
        if (statu == false) {
            return;
        } else {

            $(".box").eq(index + 1).show().siblings(".box").hide();

            $(".creat-project>span>ul>li").eq(index + 1).addClass("active").siblings().removeClass("active");
            if (index == 2) {
                console.log(1);
                var statu2 = lastStep();
                console.log(statu2);
                if (statu2 == false) {
                    return;
                } else {
                    location.href = "success.html";
                }

                location.href = "success.html";
            }
        }
    })

    //点击上一步
    //  $(".before").click(function() {
    //    $(window).scrollTop(0);
    //  var index = $(this).index(".before");
    //  if (index >= 1) {
    //      $(".box").eq(index - 1).show().siblings(".box").hide();
    //      $(".creat-project>span>ul>li").eq(index - 1).addClass("active").siblings().removeClass("active");
    //  } else {
    //    return false;
    //  }
    //  })

    //模态框数据提交
    $(".modal-submit").click(function() {
        var supportMoney = $("#supportMoney").val();
        var limitNum = $("#limitNum").val();
        var repayTime = $("#repayTime").val();
        var repayCon = $("#repayCon").val();
        var repayDesc = $("#repayDesc").val();
        var pic3 = $("#doc3").val();

        if (!supportMoney) {
            $.common.showMsg("supportMoneyError", "支持金额不能为空");
            return false;
        } else {
            $("#supportMoneyError").hide();
        }
        if (!limitNum) {
            $.common.showMsg("limitNumError", "限定人数不能为空");
            return false;
        } else {
            $("#limitNumError").hide();
        }
        if (!repayTime) {
            $.common.showMsg("repayTimeError", "回报时间不能为空");
            return false;
        } else {
            $("#repayTimeError").hide();
        }
        if (!repayCon) {
            $.common.showMsg("repayConError", "回报内容不能为空");
            return false;
        } else {
            $("#repayConError").hide();
        }
        if (!repayDesc) {
            $.common.showMsg("repayDescError", "回报描述不能为空");
            return false;
        } else if (repayDesc.length > 256) {
            $.common.showMsg("repayDescError", "回报描述不能超过256个字");
            return false;
        } else {
            $("#repayDescError").hide();
        }
        if (!pic3) {
            $.common.showToast("请上传图片", 1000);
            return false;
        }
        console.log(pic3);

        $(this).attr('data-dismiss', 'modal');
        var html = '';
        html += '<div class="cont pos-rlt" >';
        html += '<div class="edit">';
        html += '<div class="text f-l">';
        html += '<i>￥' + supportMoney + '</i>';
        html += '<p class="mg-r-20">限定人数：' + limitNum + '</p>';
        html += '</div>';
        html += '<div class="icon f-r">';
        html += '<img src="../img/edit.png" data-toggle="modal" data-target="#myModal2" onclick=Edit(event) alt="">';
        html += '<p data-toggle="modal" data-target="#myModal2" onclick=Edit(event)>编辑</p>';
        html += '<img src="../img/delete.png" onclick=del(event) alt="">';
        html += '<p onclick=del(event)>删除</p>';
        html += '</div>';
        html += '</div>';
        html += '<div class="bottom">';
        html += '<p>' + repayCon + '</p>';
        html += '<p>' + repayDesc + '</p>';
        html += '<img src="../img/list_img.png" alt="">';
        html += '</div>';
        html += '</div>';




        var url = window.location.search;
        var arr = url.split("=");
        var id = arr[arr.length - 1];
        var params = {
            project_id: id,
            product_amount: supportMoney,
            limit_number: limitNum,
            return_time: repayTime,
            content: repayCon,
            return_description: repayDesc,
            photo: pic3
        }

        console.log(type);

        if (type == 'creat') {
            $(".other").before(html);
            if ($('.cont').length > 0) {
                $('.message').css('display', 'none');
            } else {
                $('.message').css('display', 'block');
            }
            $.common.apiPost('/project/returnset', params, function(data) {
                console.log(data);
                idArr.push(data.data[0].id);
            });
            $(".cont").each(function(index, cont) {
                cont.attr('id', idArr(index));
            })
        } else {
            $.common.apiPost('/project/returnupdate', params, function(data) {
                console.log(data);
            });
        }




    })

    //添加时清空原有内容
    $(".other .add").click(function() {
        $("#supportMoney").val('');
        $("#limitNum").val('');
        $("#repayTime").val('');
        $("#repayCon").val('');
        $("#repayDesc").val('');
        $("#doc3").val('');
        console.log($(".cont").eq($(".cont").length - 1).children('.mess').length);
        if ($(".cont").eq($(".cont").length - 1).children('.mess').length > 0) {
            $(".mess").remove();
        }
    })
});



function nextStep() {
    $(window).scrollTop(0);
    var name = $("#projectName").val();
    var money = $("#money").val();
    var companyName = $("#companyName").val();
    var personName = $("#personName").val();
    var telNum = $("#telNum").val();
    var pic1 = $("#doc1").val();
    var pic2 = $("#doc2").val();
    var agree = $("#checkbox-1").is(":checked");
    console.log($("#doc2").files[0]);
    // var imgUrlArr = pic2.split('\/');
    //     console.log(imgUrlArr);



    // if (!name) {
    //     $.common.showMsg("projectError", "项目名称不能为空");
    //     return false;
    // } else if (name.length > 15) {
    //     $.common.showMsg("projectError", "项目名称不能超过15个字");
    //     return false;
    // } else {
    //     $("#projectError").hide();
    // }
    // if (!money) {
    //     $.common.showMsg("moneyError", "目标金额不能为空");
    //     return false;
    // } else {
    //     $("#moneyError").hide();
    // }
    // if (!companyName) {
    //     $.common.showMsg("companyError", "公司名称不能为空");
    //     return false;
    // } else if (companyName.length > 128) {
    //     $.common.showMsg("companyError", "公司名称不能超过128个字");
    //     return false;
    // } else {
    //     $("#companyError").hide();
    // }
    // if (!personName) {
    //     $.common.showMsg("personError", "联系人不能为空");
    //     return false;
    // } else {
    //     $("#personError").hide();
    // }
    // if (!telNum) {
    //     $.common.showMsg("telError", "手机号不能为空");
    //     return false;
    // } else if (telNum.length > 11) {
    //     $.common.showMsg("telError", "请输入正确的手机号");
    //     return false;
    // } else {
    //     $("#telError").hide();
    // }
    // if (!pic1) {
    //     $.common.showToast("请上传图片", 1000);
    //     return false;
    // }
    // if (!pic2) {
    //     $.common.showToast("请上传图片", 1000);
    //     return false;
    // }
    // if (agree == false) {

    //     $.common.showToast("请阅读并同意协议", 1000);
    //     return false;
    // }
}

function lastStep() {
    if ($(".cont").length < 3) {
        console.log(1);

        $.common.showToast("请设置至少 3 档与项目有直接关联的回报", 1000);

        // $(".cont").eq($(".cont").length - 1)
        //     .append('<div class="mess pos-abt">请设置至少 3 档与项目有直接关联的回报。</div>');
        return false;
    }
}

function del(event) {
    event = event ? event : window.event;
    var obj = event.srcElement ? event.srcElement : event.target;
    $(obj).attr({ 'data-toggle': 'modal', 'data-target': '#myModal3' });

    $("#myModal3 .confirm").click(function() {
        $(obj).parents('.cont').remove();
        if ($('.cont').length > 0) {
            $('.message').css('display', 'none');
        } else {
            $('.message').css('display', 'block');
        }

        var url2 = window.location.search;
        console.log(url2);
        var arr = url2.split("=");
        var id = arr[arr.length - 1];
        console.log(id);
        var params = {
            project_id: id,
        }
        $.common.apiPost('/project/returndelete', params, function(data) {
            console.log(data);
            // if (data.code == 0) {

            // }
        });

    })

}

function Edit(event) {
    event = event ? event : window.event;
    var obj = event.srcElement ? event.srcElement : event.target;
    type = "edit";
}

// function upPreviewImg(docObj, previewObj, width1, height1, width2, height2) {
//     var
//         isIE = function() { //是否IE
//             return !!window.ActiveXObject;
//         },

//         isIE6 = function() { //是否IE6
//             return isIE() && !window.XMLHttpRequest;
//         },

//         isIE7 = function() { //是否IE7
//             return isIE() && !isIE6() && !isIE8();
//         },

//         isIE8 = function() { //是否IE8
//             return isIE() && !!document.documentMode;
//         },

//         setCss = function(_this, cssOption) { //设置元素样式
//             if (!_this || _this.nodeType === 3 || _this.nodeType === 8 || !_this.style) {
//                 return;
//             }
//             for (var cs in cssOption) {
//                 _this.style[cs] = cssOption[cs];
//             }
//             return _this;
//         }
//     var docObj = document.getElementById(docObj);
//     var previewObj = document.getElementById(previewObj);
//     previewObj.setAttribute("src", "");
//     console.log($(previewObj).attr('src'));
//     previewObj.style.width = "auto";
//     previewObj.style.height = "auto";
//     var _v = docObj.value,
//         _body = document.body;
//     picReg = /(.JPEG|.jpeg|.JPG|.jpg|.GIF|.gif|.PNG|.png){1}/; //图片正则

//     if (!picReg.test(_v)) { //简单的图片格式验证
//         $.common.showToast("图片类型必须是.gif,jpeg,jpg,png中的一种", 1000);
//         return false;
//     }

//     if (typeof FileReader == 'undefined') { //不支持FileReader
//         if (docObj.file) {
//             previewObj.setAttribute("src", this.file.files[0].getAsDataURL());
//             previewObj.style.display = "block";


//         } else if (isIE6()) {
//             //ie6支持
//             previewObj.setAttribute("src", _v);
//             previewObj.style.display = "block";
//         } else {
//             _v = _v.replace(/[)'"%]/g, function(str) {
//                 return escape(escape(str));
//             });
//             setCss(previewObj, {
//                 "filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src=\"" + _v + "\")",
//                 "display": "block"
//             });
//             previewObj.setAttribute("src", (isIE6() || isIE7() ? "!blankImage" :
//                 "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="));


//         }


//     } else {

//         var reader = new FileReader(),
//             _file = docObj.files[0]; //读取被加载的文件对象

//         reader.onload = (function(file) { //监听load事件
//             return function() {

//                 previewObj.setAttribute("src", this.result);
//                 // previewObj.style.display = "block";

//                 var widthImg = previewObj.offsetWidth;
//                 var heightImg = previewObj.offsetHeight;

//                 console.log(widthImg);
//                 console.log(heightImg);

//                 if (widthImg != width2 && heightImg != height2) {
//                     // previewObj.style.display = "none";

//                     // _v = " ";
//                     $.common.showToast("请上传宽高为" + width2 + "px * " + height2 + "px的图片", 1000);
//                     // _v = " ";
//                     previewObj.setAttribute("src", "../img/default.png");
//                     return false;
//                 } else {

//                     previewObj.style.width = width1 + 'px';
//                     previewObj.style.height = height1 + 'px';
//                     $.common.showToast("上传成功", 1000);
//                     return;

//                 }


//             };
//         })(_file);

//         reader.onerror = function() { //监听文件读取的错误处理
//             alert("文件读取数据出错");
//         }

//         reader.readAsDataURL(_file); //读取文件内容···
//     }

// }
