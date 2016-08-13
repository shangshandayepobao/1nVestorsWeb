function projectDetail() {
    location.href = "projectDetail.html";
}

$(function() {
    //搜索
    $("#search").keydown(function(e) {
        if (e.keyCode == 13) {
            location.href = "search.html";
        }
    })

    //切换导航
    $(".content-tab >ul > li").click(function() {
            $(this).addClass('active');
            if ($(this).hasClass('active')) {
                $(this).siblings('li').removeClass('active');
            }
        })
        //导航条变色
    $(window).scroll(function() {
        if ($(window).scrollTop() > 740) {
            $(".navbar-fixed-top").addClass('bg-cl-474C52');
        } else {
            $(".navbar-fixed-top").removeClass('bg-cl-474C52');
        }
    })

    //ie8兼容
    $(window).resize(function() {
        if (document.body.clientWidth < 755) {
            $("#example-navbar-collapse").css('display', 'none');
        } else {
            $("#example-navbar-collapse").css('display', 'block');
        }
    })

    //控制小火箭的显示
    $(window).scroll(function() {

        if ($(window).scrollTop() > 500) {

            $(".gototop").css('display', 'block');
        } else {
            $(".gototop").css('display', 'none');
        }
    })

    //小火箭操作
    $(".gototop").mouseover(function() {
        $(this).attr('src', '../img/top_sel.png');
    })
    $(".gototop").mouseout(function() {
        $(this).attr('src', '../img/top.png');
    })
    $(".gototop").click(function() {
        $(window).scrollTop(0);
    })
})
