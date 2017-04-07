;(function($){
	$.Loading = {
		show:function(options){
			var defaults = {
				place:'center',
				position:'fixed',
				left:'50%',
				top:'50%',
				bottom:50,
				transform:'translate(-50%,-50%)',
				webkitTransform:'translate(-50%,-50%)',
				zIndex:'10000',
				width:'160px',
				height:'65px',
				padding:'10px',
				text:"",
				background:'rgba(0,0,0,.5)',
				color:'white',
				fontSize:'16px',
				borderRadius:'5px',
			};
			var obj = $.extend(defaults,options);
			var str = '';
			if(obj.place == "bottom"){
				str += '<div id="_loadingMask" style="width:'+obj.width+';padding:5px;background:'+obj.background+';position:'+obj.position+';left:'+obj.left+';bottom:'+obj.bottom+'px;transform:translateX(-50%);-webkit-transform:translateX(-50%);z-index:'+obj.zIndex+';color:'+obj.color+';font-size:'+obj.fontSize+';border-radius:'+obj.borderRadius+'"><div style="text-align:center"><i class="loading_animation" style="width:25px;height:25px;"></i><b class="ml10 ib">'+obj.text+'</b></div></div>';
			}else{
				str += '<div id="_loadingMaskWrap" style="position:fixed;left:0;top:0;width:100%;height:100%;z-index:9999"></div><div id="_loadingMask" style="width:'+obj.height+';height:'+obj.height+';padding:'+obj.padding+';background:rgba(0, 0, 0,.5);position:'+obj.position+';left:'+obj.left+';top:'+obj.top+';transform:'+obj.transform+';-webkit-transform:'+obj.webkitTransform+';z-index:'+obj.zIndex+';color:'+obj.color+';font-size:'+obj.fontSize+';border-radius:'+obj.borderRadius+'"><div class="centerBoxModal"><i class="loading_animation"></i><p style="font-size:12px">'+obj.text+'</p></div>';
			}
			$('body').append(str);
		},
		hide:function(){
			$('#_loadingMaskWrap, #_loadingMask').remove();
		}
	}

	$.errorTips = {
		show:function(options){
			var defaults = {
				text:"努力加载中...",
			};
			var obj = $.extend(defaults,options);
			var str = '<div id="mask"></div><div class="pop_up"style=""><h2 class="pop_tilte">提示</h2><div class="pop_content"><div class="pl10 pr10">'+obj.text+'</div><ul class="btn_group flexbox"><li class="flexItem"><button type="button"class="ui_btn wl_btn w100p">确定</button></li><li class="flexItem"><button type="button"class="ui_btn wl_white_btn w100p">取消</button></li></ul></div></div>';
			$('body').append(str);
		},
		hide:function(){
			$('#_loadingMask').remove();
		}
	}
})(jQuery)

function _showLoading(_text,_place){
	 $.Loading.show({
         text:_text,
         place:_place
     });
}
function _hideLoading(){
	$.Loading.hide();
}

function errorTips(text){
	var str = '<div id="mask"></div><div class="pop_up"><h2 class="pop_tilte">提示</h2><div class="pop_content"><div class="p10 tc">'+text+'</div><div class="tc pt10 pb10"><button class="start_btn">确定</button></div></div></div>';
	$('body').append(str);
	$('.start_btn').on('click',function(){
		$('#mask, .pop_up').remove();
	})
}

