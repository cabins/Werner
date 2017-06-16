/**
 * Created by konglingcun on 3/15/16.
 */

$(document).ready(function () {
    init();
    $.get("/pingback/show/with/date/", function (result) {
        $("#pinglist").html(result);
        tree_grid();
    });
});

function init() {
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    $("#datePicker").val(today);

    var sy = undefined;
    for (var i = 2010; i < 2020; i++) {
        if (i == now.getFullYear()) {
            sy += "<option value=" + i + " selected>" + i + "</option>'";
        } else {
            sy += "<option value=" + i + ">" + i + "</option>'";
        }
    }
    $("#sm-y, #sq-y, #sy-y").html(sy);

    var sm = undefined;
    for (var i = 1; i <= 12; i++) {
        if (i == now.getMonth() + 1) {
            sm += "<option value=" + i + " selected>" + i + "</option>'";
        } else {
            sm += "<option value=" + i + ">" + i + "</option>'";
        }
    }
    $("#sm-m").html(sm);

    var sq = undefined;
    for (var i = 1; i <= 4; i++) {
        if (i == currentQ()) {
            sq += "<option value=" + i + " selected>" + i + "</option>'";
        } else {
            sq += "<option value=" + i + ">" + i + "</option>'";
        }
    }
    $("#sq-q").html(sq);
}

function currentQ() {
    var now = new Date();
    var month = now.getMonth() + 1;
    if (month % 3 == 0) {
        return month / 3
    } else {
        return Math.floor(month / 3 + 1);
    }
}

$(function () {
    // 按日期统计
    $("#datePicker").on("change", function () {
        $.get("/pingback/show/with/date/?date=" + $("#datePicker").val(), function (result) {
            $("#pinglist").html(result);
            tree_grid();
        });
    });
    $("#sd").on("click", function () {
        $.get("/pingback/show/with/date/?date=" + $("#datePicker").val(), function (result) {
            $("#pinglist").html(result);
            tree_grid();
        });
    });

    // 按季度统计
    $("#sq-y, #sq-q").on('change', function () {
        $.get("/pingback/show/with/date/?y=" + $("#sq-y").val() + "&q=" + $("#sq-q").val(),
            function (result) {
                $("#pinglist").html(result);
                tree_grid();
            });
    });
    $("#sq").on('click', function () {
        $.get("/pingback/show/with/date/?y=" + $("#sq-y").val() + "&q=" + $("#sq-q").val(),
            function (result) {
                $("#pinglist").html(result);
                tree_grid();
            });
    });

    // 按月份统计
    $("#sm-y, #sm-m").on('change', function () {
        $.get("/pingback/show/with/date/?y=" + $("#sm-y").val() + "&m=" + $("#sm-m").val(),
            function (result) {
                $("#pinglist").html(result);
                tree_grid();
            });
    });
    $("#sm").on('click', function () {
        $("#pinglist").html("请稍候……");
        $.get("/pingback/show/with/date/?y=" + $("#sm-y").val() + "&m=" + $("#sm-m").val(),
            function (result) {
                $("#pinglist").html(result);
                tree_grid();
            });
    });

    // 按年份统计
    $("#sy-y").on('change', function () {
        $.get("/pingback/show/with/date/?y=" + $("#sy-y").val(),
            function (result) {
                $("#pinglist").html(result);
                tree_grid();
            });
    });
    $("#sy").on('click', function () {
        $.get("/pingback/show/with/date/?y=" + $("#sy-y").val(),
            function (result) {
                $("#pinglist").html(result);
                tree_grid();
            });
    });

    // 加入统计
    $("#manuals").on('click', function () {
        $.get("/docs/pingback/send/",
            function (result) {
                $("#pinglist").html(result);
                tree_grid();
            });
    });
});

function tree_grid() {
    $(".tree").treegrid({
        expanderExpandedClass: 'glyphicon glyphicon-triangle-bottom',
        expanderCollapsedClass: 'glyphicon glyphicon-triangle-right'
    }).treegrid("collapseAll");
}