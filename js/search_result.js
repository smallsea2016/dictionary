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
    highLight('.search_ipt');
    setTimeout(setScrollCss,500);
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
    setScrollCss();
}

/*滚动加载*/
function setScrollCss(){
    var getDivHeight = function(){
        var topHeights = document.querySelectorAll('[data-role="top-height"]');
         var h = [],r;
        for (var i = 0; i < topHeights.length; i++) {
            h.push(topHeights[i].clientHeight);
            r = eval(h.join('+'))
        };
        return r
    }
    $('[data-role="scroll-height"]').css({
        height: ($(window).height() - getDivHeight())+'px',
        overflowY: 'auto'
    });
}
setScrollCss();

var globalTime = null;
function scrollFn(_this){
    var nScrollHight = _this.scrollHeight;
    var nScrollTop = _this.scrollTop;
    var nDivHight = _this.clientHeight;
   if(nScrollTop + nDivHight >= nScrollHight){
        clearTimeout(globalTime);
        globalTime = setTimeout(function(){ //这里用定时器是为了节流
            // loadData();  
            console.log('加载更多');
        },100)   
    } 
}

/*搜索结果高亮*/
function highLight(el) {
    var searchTerm = $(el).val();
    // console.log("searchTerm:"+searchTerm);
    $('body').removeHighlight();
    if ( searchTerm ) {
        $('body').highlight( searchTerm );
    }
}