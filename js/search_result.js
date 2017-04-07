 // _showLoading()
/*搜索控制*/
function onInput(_this){
    var len = _this.value.length;
    if(len){
        $('[data-role="js-hide-del"]').show();
    }else{
        $('[data-role="js-hide-del"]').hide();
    }
}
/*清除搜索的值*/
function clearValue(){
    $('.search_ipt').val('');
    $('[data-role="js-hide-del"]').hide();
}
function search(){
    console.log('搜索');
    return  false
}

/*tab手势切换*/
var tabSwiper = new Swiper('.swiper-container',{
    // scrollbar:'.swiper-scrollbar',
    // scrollbarHide:false,
    onSlideChangeStart: function(){
      $("#js-swiper-tab>li.active").removeClass('active');
      $("#js-swiper-tab>li").eq(tabSwiper.activeIndex).addClass('active');
    }
}); 

$("#js-swiper-tab>li").on('touchstart mousedown',function(){
    $("#js-swiper-tab>li.active").removeClass('active');
    $(this).addClass('active');
    tabSwiper._slideTo($(this).index());
})

/*伸缩内容*/
function toggleContent(_this){
    var item = $(_this).parents('.dict_list').find('[data-role="toggle_item"]'),
        currItem = $(_this).next('[data-role="toggle_item"]');
    item.not(currItem).hide();
    currItem.slideToggle();
    // var pos = $(_this).offset().top;
    // $('#main').animate({scrollTop:pos}, 300,function(){
    // 	currItem.slideToggle();
    // });
}

