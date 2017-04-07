// _showLoading('努力加载中...');   //加载中
// _hideLoading();  //加载完成
// errorTips('发生未知错误');

/*滚动加载*/
// var wrap = $('#main');
// var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
// var nScrollTop = 0;   //滚动到的当前位置
// var num = 0;
// var nDivHight = wrap.height();
// wrap.scroll(function(){
//   nScrollHight = $(this)[0].scrollHeight;
//   nScrollTop = $(this)[0].scrollTop;
//   console.log(nScrollTop+'\n'+nDivHight+'\n'+nScrollHight);
//   if(nScrollTop + nDivHight >= nScrollHight){
//         num++;
//         console.log("滚动条到底部了"+num);
//         // loadData(); //加载数据
//     }
// });

/**
  * 滚动加载（需要注意的是，有滚动条才能滚动，事件才能生效）
  * @param wrap要滚动的元素
  * @param callback滚动到底的回调函数
*/
function scrollLoadData(wrap,callback){
  var wrap = $(wrap);
  var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
  var nScrollTop = 0;   //滚动到的当前位置
  var nDivHight = wrap.height();
  wrap.scroll(function(){
    nScrollHight = $(this)[0].scrollHeight;
    nScrollTop = $(this)[0].scrollTop;
    if(nScrollTop + nDivHight >= nScrollHight){
      if(callback && typeof callback === "function"){
          console.log("滚动条到底部了")
          callback();
      } 
    }else{
      console.log('nDivHight滚动元素的高度是:'+nDivHight
        +'\n'+'nScrollTop滚动的距离是'+nScrollTop
        +'\n'+'nScrollHight滚动条的高度是'+nScrollHight);
    }
  });
}
