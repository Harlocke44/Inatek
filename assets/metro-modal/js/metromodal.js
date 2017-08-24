(function ($) 
{


var mmBox = 0;
var mmLoading;
var ColorTimeInterval;

// Mobile check
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

// Touch enabled
!function(a,b){"use strict";var c,d,e,f="._tap",g="._tapActive",h="tap",i="clientX clientY screenX screenY pageX pageY".split(" "),j={count:0,event:0},k=function(a,c){var d=c.originalEvent,e=b.Event(d);e.type=a;for(var f=0,g=i.length;g>f;f++)e[i[f]]=c[i[f]];return e},l=function(a){if(a.isTrigger)return!1;var c=j.event,d=Math.abs(a.pageX-c.pageX),e=Math.abs(a.pageY-c.pageY),f=Math.max(d,e);return a.timeStamp-c.timeStamp<b.tap.TIME_DELTA&&f<b.tap.POSITION_DELTA&&(!c.touches||1===j.count)&&o.isTracking},m=function(a){if(!e)return!1;var c=Math.abs(a.pageX-e.pageX),d=Math.abs(a.pageY-e.pageY),f=Math.max(c,d);return Math.abs(a.timeStamp-e.timeStamp)<750&&f<b.tap.POSITION_DELTA},n=function(a){if(0===a.type.indexOf("touch")){a.touches=a.originalEvent.changedTouches;for(var b=a.touches[0],c=0,d=i.length;d>c;c++)a[i[c]]=b[i[c]]}a.timeStamp=Date.now?Date.now():+new Date},o={isEnabled:!1,isTracking:!1,enable:function(){o.isEnabled||(o.isEnabled=!0,c=b(a.body).on("touchstart"+f,o.onStart).on("mousedown"+f,o.onStart).on("click"+f,o.onClick))},disable:function(){o.isEnabled&&(o.isEnabled=!1,c.off(f))},onStart:function(a){a.isTrigger||(n(a),(!b.tap.LEFT_BUTTON_ONLY||a.touches||1===a.which)&&(a.touches&&(j.count=a.touches.length),o.isTracking||(a.touches||!m(a))&&(o.isTracking=!0,j.event=a,a.touches?(e=a,c.on("touchend"+f+g,o.onEnd).on("touchcancel"+f+g,o.onCancel)):c.on("mouseup"+f+g,o.onEnd))))},onEnd:function(a){var c;a.isTrigger||(n(a),l(a)&&(c=k(h,a),d=c,b(j.event.target).trigger(c)),o.onCancel(a))},onCancel:function(a){a&&"touchcancel"===a.type&&a.preventDefault(),o.isTracking=!1,c.off(g)},onClick:function(a){return!a.isTrigger&&d&&d.isDefaultPrevented()&&d.target===a.target&&d.pageX===a.pageX&&d.pageY===a.pageY&&a.timeStamp-d.timeStamp<750?(d=null,!1):void 0}};b(a).ready(o.enable),b.tap={POSITION_DELTA:10,TIME_DELTA:400,LEFT_BUTTON_ONLY:!0}}(document,jQuery);

//Colors
(function(a,b){function m(a,b,c){var d=h[b.type]||{};return a==null?c||!b.def?null:b.def:(a=d.floor?~~a:parseFloat(a),isNaN(a)?b.def:d.mod?(a+d.mod)%d.mod:0>a?0:d.max<a?d.max:a)}function n(b){var c=f(),d=c._rgba=[];return b=b.toLowerCase(),l(e,function(a,e){var f,h=e.re.exec(b),i=h&&e.parse(h),j=e.space||"rgba";if(i)return f=c[j](i),c[g[j].cache]=f[g[j].cache],d=c._rgba=f._rgba,!1}),d.length?(d.join()==="0,0,0,0"&&a.extend(d,k.transparent),c):k[b]}function o(a,b,c){return c=(c+1)%1,c*6<1?a+(b-a)*c*6:c*2<1?b:c*3<2?a+(b-a)*(2/3-c)*6:a}var c="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",d=/^([\-+])=\s*(\d+\.?\d*)/,e=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(a){return[a[1],a[2],a[3],a[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(a){return[a[1]*2.55,a[2]*2.55,a[3]*2.55,a[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(a){return[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(a){return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(a){return[a[1],a[2]/100,a[3]/100,a[4]]}}],f=a.Color=function(b,c,d,e){return new a.Color.fn.parse(b,c,d,e)},g={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},h={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},i=f.support={},j=a("<p>")[0],k,l=a.each;j.style.cssText="background-color:rgba(1,1,1,.5)",i.rgba=j.style.backgroundColor.indexOf("rgba")>-1,l(g,function(a,b){b.cache="_"+a,b.props.alpha={idx:3,type:"percent",def:1}}),f.fn=a.extend(f.prototype,{parse:function(c,d,e,h){if(c===b)return this._rgba=[null,null,null,null],this;if(c.jquery||c.nodeType)c=a(c).css(d),d=b;var i=this,j=a.type(c),o=this._rgba=[],p;d!==b&&(c=[c,d,e,h],j="array");if(j==="string")return this.parse(n(c)||k._default);if(j==="array")return l(g.rgba.props,function(a,b){o[b.idx]=m(c[b.idx],b)}),this;if(j==="object")return c instanceof f?l(g,function(a,b){c[b.cache]&&(i[b.cache]=c[b.cache].slice())}):l(g,function(b,d){var e=d.cache;l(d.props,function(a,b){if(!i[e]&&d.to){if(a==="alpha"||c[a]==null)return;i[e]=d.to(i._rgba)}i[e][b.idx]=m(c[a],b,!0)}),i[e]&&a.inArray(null,i[e].slice(0,3))<0&&(i[e][3]=1,d.from&&(i._rgba=d.from(i[e])))}),this},is:function(a){var b=f(a),c=!0,d=this;return l(g,function(a,e){var f,g=b[e.cache];return g&&(f=d[e.cache]||e.to&&e.to(d._rgba)||[],l(e.props,function(a,b){if(g[b.idx]!=null)return c=g[b.idx]===f[b.idx],c})),c}),c},_space:function(){var a=[],b=this;return l(g,function(c,d){b[d.cache]&&a.push(c)}),a.pop()},transition:function(a,b){var c=f(a),d=c._space(),e=g[d],i=this.alpha()===0?f("transparent"):this,j=i[e.cache]||e.to(i._rgba),k=j.slice();return c=c[e.cache],l(e.props,function(a,d){var e=d.idx,f=j[e],g=c[e],i=h[d.type]||{};if(g===null)return;f===null?k[e]=g:(i.mod&&(g-f>i.mod/2?f+=i.mod:f-g>i.mod/2&&(f-=i.mod)),k[e]=m((g-f)*b+f,d))}),this[d](k)},blend:function(b){if(this._rgba[3]===1)return this;var c=this._rgba.slice(),d=c.pop(),e=f(b)._rgba;return f(a.map(c,function(a,b){return(1-d)*e[b]+d*a}))},toRgbaString:function(){var b="rgba(",c=a.map(this._rgba,function(a,b){return a==null?b>2?1:0:a});return c[3]===1&&(c.pop(),b="rgb("),b+c.join()+")"},toHslaString:function(){var b="hsla(",c=a.map(this.hsla(),function(a,b){return a==null&&(a=b>2?1:0),b&&b<3&&(a=Math.round(a*100)+"%"),a});return c[3]===1&&(c.pop(),b="hsl("),b+c.join()+")"},toHexString:function(b){var c=this._rgba.slice(),d=c.pop();return b&&c.push(~~(d*255)),"#"+a.map(c,function(a,b){return a=(a||0).toString(16),a.length===1?"0"+a:a}).join("")},toString:function(){return this._rgba[3]===0?"transparent":this.toRgbaString()}}),f.fn.parse.prototype=f.fn,g.hsla.to=function(a){if(a[0]==null||a[1]==null||a[2]==null)return[null,null,null,a[3]];var b=a[0]/255,c=a[1]/255,d=a[2]/255,e=a[3],f=Math.max(b,c,d),g=Math.min(b,c,d),h=f-g,i=f+g,j=i*.5,k,l;return g===f?k=0:b===f?k=60*(c-d)/h+360:c===f?k=60*(d-b)/h+120:k=60*(b-c)/h+240,j===0||j===1?l=j:j<=.5?l=h/i:l=h/(2-i),[Math.round(k)%360,l,j,e==null?1:e]},g.hsla.from=function(a){if(a[0]==null||a[1]==null||a[2]==null)return[null,null,null,a[3]];var b=a[0]/360,c=a[1],d=a[2],e=a[3],f=d<=.5?d*(1+c):d+c-d*c,g=2*d-f,h,i,j;return[Math.round(o(g,f,b+1/3)*255),Math.round(o(g,f,b)*255),Math.round(o(g,f,b-1/3)*255),e]},l(g,function(c,e){var g=e.props,h=e.cache,i=e.to,j=e.from;f.fn[c]=function(c){i&&!this[h]&&(this[h]=i(this._rgba));if(c===b)return this[h].slice();var d,e=a.type(c),k=e==="array"||e==="object"?c:arguments,n=this[h].slice();return l(g,function(a,b){var c=k[e==="object"?a:b.idx];c==null&&(c=n[b.idx]),n[b.idx]=m(c,b)}),j?(d=f(j(n)),d[h]=n,d):f(n)},l(g,function(b,e){if(f.fn[b])return;f.fn[b]=function(f){var g=a.type(f),h=b==="alpha"?this._hsla?"hsla":"rgba":c,i=this[h](),j=i[e.idx],k;return g==="undefined"?j:(g==="function"&&(f=f.call(this,j),g=a.type(f)),f==null&&e.empty?this:(g==="string"&&(k=d.exec(f),k&&(f=j+parseFloat(k[2])*(k[1]==="+"?1:-1))),i[e.idx]=f,this[h](i)))}})}),f.hook=function(b){var c=b.split(" ");l(c,function(b,c){a.cssHooks[c]={set:function(b,d){var e,g,h="";if(a.type(d)!=="string"||(e=n(d))){d=f(e||d);if(!i.rgba&&d._rgba[3]!==1){g=c==="backgroundColor"?b.parentNode:b;while((h===""||h==="transparent")&&g&&g.style)try{h=a.css(g,"backgroundColor"),g=g.parentNode}catch(j){}d=d.blend(h&&h!=="transparent"?h:"_default")}d=d.toRgbaString()}try{b.style[c]=d}catch(d){}}},a.fx.step[c]=function(b){b.colorInit||(b.start=f(b.elem,c),b.end=f(b.end),b.colorInit=!0),a.cssHooks[c].set(b.elem,b.start.transition(b.end,b.pos))}})},f.hook(c),a.cssHooks.borderColor={expand:function(a){var b={};return l(["Top","Right","Bottom","Left"],function(c,d){b["border"+d+"Color"]=a}),b}},k=a.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}})(jQuery);

$.MetroModal = function(settings, callback){

	var content = "";

	settings = $.extend({
			position: "center",
        	html: undefined,
        	title: undefined,
        	width: "300px",
        	height: undefined,
        	top: "10px",
        	left: "10px",
        	bottom: undefined,
        	right: undefined,
        	contentcolor: "#000000",
        	backcolor: "#ffffff",
        	backshadow: true,
			backscreen: true,
			backscreencolor: "#000000",
			backscreenopacity: 0.4,
			controls: true,
			clickoutside: true,
			iframe: undefined,
			iframecache: true,
			loadingtext: "Loading",
			youtube: undefined,
			youtubecontrols:false,
			youtubeinfo:false,
			vimeo: undefined,
			googlelatitud: undefined, 
			googlelongitud: undefined,
			googlezoom: 17,
			googlemaptypeid: "roadmap",
			timeout: undefined,
			animation: "fadeIn fast",
			mobilehidebuttons: false,
			uniqueclasstomodal: undefined,
			colors: undefined,
			colortimer: 1500,
			colorchangespeed: 1000,
        }, settings);


	mmBox +=1;

	if( settings.youtubecontrols === false ){
		settings.youtubecontrols = 0;
	}else{
		settings.youtubecontrols = 1;
	}
	if( settings.youtubeinfo === false ){
		settings.youtubeinfo = 0;
	}else{
		settings.youtubeinfo = 1;
	}

	var OverFlowClass = "mmOverFlow";
	var HTML5Class = "animated";

	if( settings.youtube !== undefined ){
		settings.iframe = "https://www.youtube.com/embed/"+ settings.youtube +"?autoplay=1&controls="+ settings.youtubecontrols +"&disablekb=1&showinfo="+ settings.youtubeinfo +"&autohide=0&color=white";
		settings.iframecache = false;
		OverFlowClass = "";
		HTML5Class = "";
	}

	if( settings.vimeo !== undefined ){
		settings.iframe = "https://player.vimeo.com/video/"+settings.vimeo +"?autoplay=1";
		settings.iframecache = false;
		OverFlowClass = "";
		HTML5Class = "";
	}


	// Preparing google maps
	if( settings.googlelatitud !==undefined || settings.googlelongitud !== undefined ){
		settings.html = undefined;
		OverFlowClass = "";
		HTML5Class = "";
	}


	if( jQuery.browser.mobile === true && settings.timeout == undefined && settings.mobilehidebuttons == false){
		settings.controls = true;
	}


	if( settings.backscreen ){
		content += '<div id="mmBG'+ mmBox +'" class="mmBG" data-mmbox="'+ mmBox +'" style="background-color:'+ settings.backscreencolor +'"></div>';
		$("body").prepend(content);
		
		var divBG = $("#mmBG"+mmBox);

		divBG.animate({
				opacity: settings.backscreenopacity
			},300);
	}

	var mmWidth  = settings.width;

	var mmPosition = settings.position;

	var mmStyle  = "";
		mmStyle += "width:" + settings.width + ";";
		mmStyle += "height:" + settings.height + ";";
		mmStyle += "background-color:" + settings.backcolor + ";";
		mmStyle += "color:" + settings.contentcolor + ";";

	var customClass = "";

		if( settings.backshadow ){
			customClass = "mmShadow";
		}

	if( settings.uniqueclasstomodal == undefined ){
		// if you want to create a modal from zero.
		content  =	'<div id="mmBox'+ mmBox +'" class="mmBox '+ HTML5Class +' ' + settings.animation +' '+ customClass +' '+ OverFlowClass +'" style="'+ mmStyle +'" data-mmbox="'+ mmBox +'" data-animation="'+ settings.animation +'" data-mmwidth="'+mmWidth+'" data-position="'+ mmPosition +'" data-mouseover="1" data-closeout="'+ settings.clickoutside +'">';
		content +=  '<i class="mmSpecialClose" id="mmSpecialClose'+mmBox+'" class="mmSpecialClose" data-animation="'+ settings.animation +'" data-mmbox="'+ mmBox +'"></i>';

		if( settings.title !== undefined || settings.controls === true){

		content +=		'<div class="mmTitle" align="center">';

			if( settings.controls ){
				content +=			'<div class="mmButtons"><span id="mmClose'+mmBox+'" class="mmCloseButton" data-animation="'+ settings.animation +'" data-mmbox="'+ mmBox +'">X</span> <span class="mmMinButton" data-mmbox="'+ mmBox +'"> _ </span> <span class="mmMaxButton" data-mmbox="'+ mmBox +'"> O </span></div>';
			}

			if( settings.title !==undefined ){
				content +=			'<span class="mmTitleSpan">'+ settings.title +'</span>';
			}

		content +=		'</div>';

		}//title


		if( settings.html !== undefined ){

			content +=		'<div class="mmContent">';
			content +=			settings.html;
			content +=		'</div>';
		}else if( settings.iframe !== undefined){

			var MobileClass ="";
			if( jQuery.browser.mobile === true ){
				MobileClass = "mmMobileScrollClass";
			}

			if( settings.title !== undefined){
				content += 	'<div class="mmiFrameContainerWT '+ MobileClass +'">';
			}else{
				content += 	'<div class="mmiFrameContainerWNT '+ MobileClass +'">';
			}

			if(settings.iframecache === false){
				content += 		'<iframe class="mmiFrame" src="'+ settings.iframe +'" allowfullscreen></iframe>';
			}else{
				content += 		'<table class="mmTableLoading"><tr><td align="center">'+ settings.loadingtext +' <i class="mmLoading">&nbsp;&nbsp;&nbsp;</i></td></tr></table>';
			}
			
			content += 	'</div>';

		}else if( settings.googlelatitud !==undefined || settings.googlelongitud !== undefined ){
			// Google Maps
			if( settings.title !== undefined){
				content += 	'<div class="mmiFrameContainerWT">';
			}else{
				content += 	'<div class="mmiFrameContainerWNT">';
			}

			content += 	'<div id="mmGoogle'+ mmBox +'" class="mmGoogleMaps"></div>';
			
			content += 	'</div>';
		}


		content +=	'</div>';


		$("body").prepend(content);
		var MetroModal = $("#mmBox"+mmBox);
		
	}
	else{
		// If the user wants to convert a div into a Metro Modal
		var MetroModal = $("."+settings.uniqueclasstomodal);
			MetroModal.attr("data-originalclass",settings.uniqueclasstomodal)
					  .attr("id","mmBox"+mmBox)
					  .attr("style",mmStyle)
					  .attr("data-mmbox",mmBox)
					  .attr("data-animation",settings.animation)
					  .attr("data-mmwidth",mmWidth)
					  .attr("data-position",mmPosition)
					  .attr("data-mouseover","1")
					  .attr("data-closeout",settings.clickoutside)
					  .addClass("mmBox animated " + settings.animation + " " + customClass);

		content = '<i class="mmSpecialClose" id="mmSpecialClose'+mmBox+'" class="mmSpecialClose" data-animation="'+ settings.animation +'" data-mmbox="'+ mmBox +'"></i>';

		if( settings.title !== undefined || settings.controls === true){

		content +=		'<div class="mmTitle" align="center">';

			if( settings.controls ){
				content +=			'<div class="mmButtons"><span id="mmClose'+mmBox+'" class="mmCloseButton" data-animation="'+ settings.animation +'" data-mmbox="'+ mmBox +'">X</span> <span class="mmMinButton" data-mmbox="'+ mmBox +'"> _ </span> <span class="mmMaxButton" data-mmbox="'+ mmBox +'"> O </span></div>';
			}

			if( settings.title !==undefined ){
				content +=			'<span class="mmTitleSpan">'+ settings.title +'</span>';
			}

		content +=		'</div>';

		}//title


		MetroModal.prepend(content);
		// SetMiddle(MetroModal);

		MetroModal.show();
	}

	


	// Block until Metro Modal is on the screen
	setTimeout(function() {
		MetroModal.attr("data-mouseover","0");
	}, 100);


	// Background Color
	if( settings.colors !== undefined ){

        clearInterval(ColorTimeInterval);
        divBG.attr("data-colorcount","0");

        ColorTimeInterval = setInterval(function(){

            var ColorIndex = divBG.attr("data-colorcount");

            divBG.animate({
                backgroundColor: settings.colors[ColorIndex],
            },settings.colorchangespeed);

            if(ColorIndex < settings.colors.length-1)
                divBG.attr("data-colorcount",((ColorIndex*1)+1));
            else
                divBG.attr("data-colorcount",0);
                
        },settings.colortimer)

	}


	MetroModalWidthFix(MetroModal);



	if( settings.timeout !== undefined ){
		
		setTimeout(function(){

			var isMouseOver = MetroModal.attr("data-mouseover");

			if( isMouseOver == 1){
				MetroModal.on("mouseout",function(){
					MetroModal.find(".mmSpecialClose").click();	
				});
			}else{
				MetroModal.find(".mmSpecialClose").click();
			}

			
		}, settings.timeout);

	}


	// Custom Positioning
	if( settings.position === "center" ){
		SetMiddle(MetroModal);
	}else{
		// Saving the original positioning
		if( settings.bottom !== undefined ){
			MetroModal.attr("data-bottom",settings.bottom);
		}else{
			MetroModal.attr("data-top",settings.top);
		}

		if( settings.right !== undefined ){
			MetroModal.attr("data-right",settings.right);
		}else{
			MetroModal.attr("data-left",settings.left);
		}

		SetCustomPosition(MetroModal);
	}

	// Loading Google Maps Api
	if ( settings.googlelatitud !==undefined || settings.googlelongitud !== undefined ){
		MetroGoogleMapLoad( "mmGoogle"+mmBox, settings );
	}

	// Loading functions
	var Point = 0;
	if( settings.iframe !== undefined && settings.iframecache === true){

		var lblLoading = MetroModal.find(".mmLoading");
		clearInterval(mmLoading);

		Point = 1;

		mmLoading = setInterval(function(){

			switch(Point){
				case 1:
					lblLoading.html(".&nbsp;&nbsp;");
					Point = 2;
				break;

				case 2:
					lblLoading.html("..&nbsp;");
					Point = 3;
				break;

				case 3:
					lblLoading.html("...");
					Point = 1;
				break;
			}

		}, 1000);

		LoadiFrameWithCache(MetroModal, settings.iframe);		
	}

	// Close Metro Modal
	$("#mmSpecialClose"+mmBox).bind("click", function(){

		// Call Callback
		if (typeof callback === "function") {   
            if(callback)callback();
        }

		var mmBoxNumber = $(this).attr("data-mmbox");
		var mmBox = $("#mmBox"+ mmBoxNumber);
		var mmBG  = $("#mmBG" + mmBoxNumber);


		DestroyMetroModal( mmBox, mmBG );

	});

};



var Rezising;
$(window).on("resize",function(){
	ResizeFix();
});


function ResizeFix(){
	clearTimeout(Rezising);
	Rezising = setTimeout(function() {


		$(".mmBox").each(function(){

			var MetroModal = $(this);
			
			MetroModalWidthFix(MetroModal);

			var Position = MetroModal.attr("data-position");
			if(Position === "center"){
				SetMiddle(MetroModal,true);
			}


		});

	}, 300);
}



//Load Google Maps
function MetroGoogleMapLoad( ElementID, pSettings ) {

	var mapCanvas = document.getElementById(ElementID);

	pSettings.googlemaptypeid = pSettings.googlemaptypeid.toUpperCase();

	var mapOptions = {
	  center: new google.maps.LatLng(pSettings.googlelatitud, pSettings.googlelongitud),
	  zoom: pSettings.googlezoom,
	  mapTypeId: eval("google.maps.MapTypeId." + pSettings.googlemaptypeid),
	}
	var map = new google.maps.Map(mapCanvas, mapOptions);

	var marker = new google.maps.Marker({
	      position: map.getCenter(),
	      map: map
	    });

}


// Fix the width
function MetroModalWidthFix(MetroModal){

	var WW = $(window).width();
	var YW = MetroModal.width() + 20; // Padding and other stuff
	
	var WH = $(window).height();
	var YH = MetroModal.height() + 20;

	var isCenter = MetroModal.attr("data-position");
	var isTop    = MetroModal.attr("style").indexOf("top");


	
	//I need to apply some corrections
	if(WW <= YW){
		MetroModal.css("width", (WW-20) + "px");
	}

	if(WH <= YH){
		MetroModal.css("height", (WH-20) + "px");	
	}


	if(isCenter != "center" && isTop >= 0){
		MetroModal.css("top","10");
	}else{
		MetroModal.css("bottom","10");
	}

}



// Destroy Metro Modal
function DestroyMetroModal(MetroModal, mmBG){

	var Animation = MetroModal.attr("data-animation");

	clearInterval(ColorTimeInterval);
	mmBG.animate({
		opacity: 0
	},350,function(){
		mmBG.remove();
	});

	var UniqueID = MetroModal.attr("data-originalclass");

	if(UniqueID !== undefined){
		
		var OriginalClass = MetroModal.attr("data-originalclass");
		var Animation     = MetroModal.attr("data-animation");

		MetroModal.removeClass(Animation);

		MetroModal.fadeOut(300,function(){

			MetroModal.removeAttr("data-originalclass")
					  .removeAttr("id")
					  .removeAttr("style")
					  .removeAttr("data-mmbox")
					  .removeAttr("data-animation")
					  .removeAttr("data-mmwidth")
					  .removeAttr("data-position")
					  .removeAttr("data-mouseover")
					  .removeAttr("data-closeout")
					  .removeClass();

			MetroModal.addClass(OriginalClass + " metromodaldiv");
			MetroModal.find(".mmSpecialClose").remove();
			MetroModal.find(".mmTitle").remove();
		});


	}else{
		MetroModal.removeClass(Animation).addClass("fadeOut fast").delay(350).queue(function(){
			$(this).remove();
		});
	}


}

// iFrame Cache Loading
function LoadiFrameWithCache(MetroModal, URL){

	$iframe = $('<iframe>');
	$iframe.attr({src: URL });

	$iframe.appendTo( MetroModal.find('.mmiFrameContainerWT') );
	$iframe.appendTo( MetroModal.find('.mmiFrameContainerWNT') );

	// var YoseContent = MetroModal.find('.YoseIframe');

	$iframe.load(function() {
		clearInterval(mmLoading);
	    MetroModal.find('.mmTableLoading').remove();
	    $iframe.addClass("animated fadeIn fast");
	});
}


// Positioning center
function SetMiddle(MetroModal, animated){

	var MetroModalWidth  = MetroModal.width();
	var MetroModalHeight = MetroModal.height();

	var WindowWidth = $(window).width();
	var WindowHeight = $(window).height();

	var MiddleW = (WindowWidth/2) - (MetroModalWidth/2);
	var MiddleH = (WindowHeight/2) - (MetroModalHeight/2);

	MetroModal.attr("data-mmheight", MetroModalHeight +"px");

	if( animated === true ){
		
		MetroModal.animate({
			"left": MiddleW + "px",
			"top": MiddleH +"px",
		},200);

	}else{
		MetroModal.css({
			"left": MiddleW + "px",
			"top": MiddleH +"px",
		});
	}

}

// Positioning custom
function SetCustomPosition(MetroModal){

	var top    = MetroModal.attr("data-top");
	var bottom = MetroModal.attr("data-bottom");
	var left   = MetroModal.attr("data-left");
	var right  = MetroModal.attr("data-right");


	if( bottom !== undefined ){
		MetroModal.css("top","auto");
		MetroModal.css("bottom",bottom);
	}else{
		MetroModal.css("bottom","auto");
		MetroModal.css("top",top);
	}

	if( right !== undefined ){
		MetroModal.css("left","auto");
		MetroModal.css("right",right);
	}else{
		MetroModal.css("right","auto");
		MetroModal.css("left",left);
	}

	var MetroModalHeight = MetroModal.height();
	MetroModal.attr("data-mmheight", MetroModalHeight +"px");

}


// Ready functions
$(document).ready(function(){

	$("body").on("click",".mmBG",function(){

		var mmBoxID = $(this).attr("data-mmbox");
		var MetroModal = $("#mmBox"+mmBoxID);

		var ClosesOutside = MetroModal.attr("data-closeout");

		if( ClosesOutside === "false" ){
			return false;
		}


		var isClosing = $(this).attr("data-closing");

		if( isClosing !== "1"){
			$(this).attr("data-closing","1");
			$("#mmSpecialClose"+mmBoxID).click();
		}

	});

	$("body").on("tap",".mmBG",function(){

		var mmBoxID = $(this).attr("data-mmbox");
		var MetroModal = $("#mmBox"+mmBoxID);

		var ClosesOutside = MetroModal.attr("data-closeout");

		if( ClosesOutside === "false" ){
			return false;
		}


		var isClosing = $(this).attr("data-closing");

		if( isClosing !== "1"){
			$(this).attr("data-closing","1");
			$("#mmSpecialClose"+mmBoxID).click();
		}

	});

	$("body").on("mouseover",".mmBox",function(){
		$(this).attr("data-mouseover","1");
	});

	$("body").on("mouseleave",".mmBox",function(){
		$(this).attr("data-mouseover","0");
	});

	$("body").on("click",function(){

		$(".mmBox").each(function(){

			var MetroModal = $(this);

			var isMouseOver   = MetroModal.attr("data-mouseover");
			var ClosesOutside = MetroModal.attr("data-closeout");
			var mmBoxID       = MetroModal.attr("data-mmbox");

			var mmBG = $("#mmBG" + mmBoxID);

			if( isMouseOver === "0" && ClosesOutside === "true" ){
				DestroyMetroModal( $(this), mmBG );
			}

		});

	});

	// Close Button
	$("body").on("click",".mmCloseButton",function(){

		$(this).attr("data-closing","1");
		var mmBoxID = $(this).attr("data-mmbox");
		$("#mmSpecialClose"+mmBoxID).click();

	});

	// Max button
	$("body").on("click",".mmMaxButton",function(){
		
		var mmBoxID = $(this).attr("data-mmbox");
		var MetroModal = $("#mmBox"+mmBoxID);

		var Animation = MetroModal.attr("data-animation");

		MetroModal.removeClass(Animation);


		MetroModal.animate({
			opacity:0,
		},200,function(){

			// Move the Metro Modal to Top Position
			MetroModal.css({
				top: "10px",
				left: "10px",
				width: "calc(100% - 20px)",
				height: "calc(100% - 20px)",
			});
			

			MetroModal.animate({opacity:1},200);

		});
	});


	// Min Button
	$("body").on("click",".mmMinButton",function(){

		var mmBoxID = $(this).attr("data-mmbox");
		var MetroModal = $("#mmBox"+mmBoxID);

		var Animation = MetroModal.attr("data-animation");

		MetroModal.removeClass(Animation);



		var mmWidth = MetroModal.attr("data-mmwidth");
		var mmHeight = MetroModal.attr("data-mmheight");

		var mmPosition = MetroModal.attr("data-position");


		MetroModal.animate({
			opacity:0,
		},200,function(){

			// Move the Metro Modal to Top Position
			MetroModal.css({
				width: mmWidth,
				height: mmHeight,
			});

			if( mmPosition === "center" ){
				SetMiddle(MetroModal);
			}else{
				SetCustomPosition(MetroModal);
			}

			MetroModal.animate({opacity:1},200);

		});


	});
	


});//end ready


 $.fn.MetroModal = function(settings,callback) {

 	var HasTitle = $(this).attr("mmtitle");

 	var UniqueClass = $(this).attr("class");

 	var find = ' ';
	var re = new RegExp(find, 'g');

	UniqueClass = UniqueClass.replace(re, '').replace("metromodaldiv","");

	settings = $.extend({
        	uniqueclasstomodal: UniqueClass,
        }, settings);

	$.MetroModal(settings,callback);
 }



$.MetroModalCloseAll = function(){

	$(".mmBox").each(function(){

		var MetroModal = $(this);
		var mmBoxID    = MetroModal.attr("data-mmbox");
		var BG = $("#mmBG"+ mmBoxID);

		DestroyMetroModal(MetroModal,BG);

	});

}

})(jQuery);