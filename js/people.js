function searchLetter(param){
    console.log(param);
}
// 显示通讯录字母检索
function toggleEN(flag){
    var $letter_list = $('#letter_search .letter_list');
    $letter_list.css({
        top:$('#header').height(),
        left:'auto',
        right:0
    });
    if (arguments.length && !flag) {
        $letter_list.hide(100);
    }else{
        $letter_list.toggle(100);
    };
}

// 使用 Mock生成随机数据
var data = Mock.mock('/path/to/file',{
    'result|10':[{
        'dept': "@sentence(1, 2)",
        'name':"@name",
        'enName':"@cname",
        'num|1-100':100
    }]
});
window.Random = Mock.Random;

//列表数据
function listData(){
    _showLoading();
    $.ajax({
        url: '/path/to/file',
        type: 'GET',
        dataType: 'json',
    })
    .done(function(data) {
        var str = '',
            len = data.result.length;
        for (var i = 0; i < len; i++) {
            str += '<li class="flexbox">'
                +     '<div class="flexbox_item js_address_left">'
                +        '<input type="checkbox" class="checkbox" data-index="index'+i+'" data-value="'+data.result[i].name+'" value="'+data.result[i].dept+'" hidden><i></i><b class="ellipsis">'+data.result[i].dept+'</b>'
                +    '</div>'
                +    '<a href="people_details.html" class="address_list_r">'+data.result[i].num+'</a>'
                + '</li>';
        };
        $('#address_list').append(str);  //组装数据
        _hideLoading();
    })  
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
}

listData();

//开始选人
function selectStart(){
    $('#address_list>li').addClass('item_in');
    if (!$('.js_label').length) {
        $('.js_address_left').wrapInner('<label class="db js_label"><span class="js_label_in"></span></div>')
    };
}

//选人
function peopleList(obj){
    // _showLoading();
    $.ajax({
        url: '/path/to/file',
        type: 'GET',
        dataType: 'json',
    })
    .done(function(data) {
        var str = '',
            len = data.result.length,
            mt = +new Date();   //用来生成一个唯一的class，便于操作
        for (var i = 0; i < len; i++) {
            str += '<li class="js_'+mt+'">'
                +'<img src="images/user2.jpeg">'
                +'<div>'
                +    '<b class="ellipsis">'+data.result[i].name+'</b>'
                +    '<b class="ellipsis">'+data.result[i].enName+'</b>'
                +'</div>'
                +'<a href="javascript:;" class="del_icon_btn"></a>'
            +'</li>';
        };
        $('#person_list').append(str);  //组装数据
        $('#person_list>li.js_'+mt+'').attr('data-index',$(obj).attr('data-index'));
        // _hideLoading();
        var len = $('#person_list>li').length;
        if ($('.up_arrow').hasClass('rotate225')) {
            $('#person_list>li').slice(6, len).show();
        };
    })  
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
}
$(document).on('change','.js_address_left input[type="checkbox"]',function(){
    var isCheck = this.checked,
        _this = this,
        $index = $(_this).attr('data-index');
    $('#selectedPeople').show();
    if (isCheck) {
        peopleList(_this);
        
    }else { //unchecked
        console.log('index:'+$index);
        $('#person_list>li[data-index="'+$index+'"]').remove();
        if ( !$('#person_list>li').length) {
            cancelSelect()
        };
    };
})
//删除单个人
$(document).on('click','.del_icon_btn',function(){
    var _this = this,
        $li = $(_this).parent('li');
    $li.fadeOut(function() {
        $li.remove();
    })
})

//展开选中的人
function showPersonList(){
    var len = $('#person_list>li').length;
    $('.up_arrow').toggleClass('rotate225');
    console.log($('#person_list>li').slice(6, len));
    if ($('.up_arrow').hasClass('rotate225')) {
        $('#person_list>li').slice(6, len).show();
    }else{
        $('#person_list>li').slice(6, len).hide();
    };
    
}
//取消选人
function cancelSelect(){
    $('#selectedPeople').hide();
    $('.js_label_in').unwrap(); 
    $('.js_address_left input[type="checkbox"]').attr('checked',false);
    $('#address_list>li').removeClass('item_in')
    $('#person_list>li').remove();
}

$('#cancel').on('click',function(){
    cancelSelect()
})

//创建群聊提示
$('#submit_btn').on('click',function(){
    _alert('','<div class="msg_tips_con"><img src="images/icon/warm.png"><p>确定创建此群聊吗？</p></div>','NO|YES',{'ok':function(){
        var len = $('#person_list>li').length;
        console.log(len);
        if (len > 50) {
            _alert('','<div class="msg_tips_con"><img src="images/icon/warm.png"><p>创建群聊人数上限为50人如您有创建大于50人的群聊需求，请联系<a href="mailTo:todd.ye@nio.com">todd.ye@nio.com</a></p></div>','OK ,  I GOT IT');
        };
    }});
})