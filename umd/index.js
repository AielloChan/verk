!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e=e||self).violent=n()}(this,function(){"use strict";function n(e,n,t,o){e.hasAttribute(t)&&n(e),e.querySelectorAll(o).forEach(n)}var t=0;function f(e){return void 0===e&&(e="u"),999<(t+=1)&&(t=0),e+Date.now()+"_"+t}function e(n){var t,o=new Set;return function(e){o.has(e)||o.add(e),t&&cancelAnimationFrame(t),t=requestAnimationFrame(function(){o.forEach(n),o.clear(),t=null})}}var r=[];function p(n,t,o){console.error(n,t),r.forEach(function(e){e(n,t,o||"")})}var i=new Set(["abort","animationcancel","animationend","animationiteration","animationstart","auxclick","blur","cancel","canplay","canplaythrough","change","click","close","contextmenu","copy","cuechange","cut","dblclick","drag","dragend","dragenter","dragexit","dragleave","dragover","dragstart","drop","durationchange","emptied","ended","error","focus","focusin","focusout","fullscreenchange","fullscreenerror","gotpointercapture","input","invalid","keydown","keypress","keyup","load","loadeddata","loadedmetadata","loadstart","lostpointercapture","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","paste","pause","play","playing","pointercancel","pointerdown","pointerenter","pointerleave","pointermove","pointerout","pointerover","pointerup","progress","ratechange","reset","resize","scroll","securitypolicyviolation","seeked","seeking","select","selectionchange","selectstart","stalled","submit","suspend","timeupdate","toggle","touchcancel","touchend","touchmove","touchstart","transitioncancel","transitionend","transitionrun","transitionstart","volumechange","waiting","wheel"]);function l(e){function n(r){if(r&&r.attributes)for(var e=r.attributes.length,a=r.getAttribute("query"),n=function(e){var o=r.attributes.item(e);if(o&&i.has(o.name)){var n="on"+o.name;r[n]=function(e){var n,t=e&&e.target&&e.target.value;try{n=new Function("$self","$event","$value","return "+o.value)(r,e,t)}catch(e){p(e,r)}"function"==typeof n&&n(e),j(a)}}},t=0;t<e;t++)n(t)}e.getAttribute("on")&&n(e),e.querySelectorAll("[click], [input], [change], [scroll], [submit], [keydown], [all-events]").forEach(n)}var a=["oninput","onchange"];var o=["screen-xs","screen-sm","screen-md","screen-lg","screen-xl","vw","vh"],c=["auto","0","px","xs","sm","md","lg","xl","2xl","3xl","4xl","5xl","6xl"],s=["primary","white","black","gray","red","orange","yellow","green","teal","blue","indigo","purple","pink"];var u="";u+="--rate-0: 0%;";for(var d=1;d<12;d++)u+="--rate-"+d+": "+(100*d/12).toFixed(6)+"%; ";var m="\n:root {\n"+(u+="--rate-12: 100%;")+'\nfont-size: 16px;\n--media: 640px;\n--none: none;\n--auto: auto;\n--px: 0.5px;\n--vw: 100vw;\n--vh: 100vh;\n--screen-xs: 480px;\n--screen-sm: 640px;\n--screen-md: 720px;\n--screen-lg: 1024px;\n--screen-xl: 1280px;\n--fs-0: 0rem;\n--fs-auto: auto;\n--fs-px: 0.5em;\n--fs-xs: .75em;\n--fs-sm: .875em;\n--fs-md: 1em;\n--fs-lg: 1.125em;\n--fs-xl: 1.25em;\n--fs-2xl: 1.5em;\n--fs-3xl: 1.875em;\n--fs-4xl: 2.25em;\n--fs-5xl: 3em;\n--fs-6xl: 4em;\n--pt-0: 0px;\n--pt-auto: auto;\n--pt-px: 1px;\n--pt-xs: 4px;\n--pt-sm: 8px;\n--pt-md: 16px;\n--pt-lg: 24px;\n--pt-xl: 34px;\n--pt-2xl: 48px;\n--pt-3xl: 64px;\n--pt-4xl: 170px;\n--pt-5xl: 260px;\n--pt-6xl: 340px;\n--li-0: 0px;\n--li-auto: auto;\n--li-px: 1px;\n--li-xs: 2px;\n--li-sm: 4px;\n--li-md: 6px;\n--li-lg: 8px;\n--li-xl: 12px;\n--li-2xl: 18px;\n--li-3xl: 24px;\n--li-4xl: 32px;\n--li-5xl: 42px;\n--li-6xl: 999px;\n--white: 255,255,255;\n--black: 0,0,0;\n--primary-100: 235,248,255;\n--primary-200: 190,227,248;\n--primary-300: 144,205,244;\n--primary-400: 98,179,237;\n--primary-500: 66,153,225;\n--primary-600: 49,130,206;\n--primary-700: 43,109,176;\n--primary-800: 44,82,130;\n--primary-900: 43,67,101;\n--gray-100: 247,250,252;\n--gray-200: 237,242,246;\n--gray-300: 226,232,240;\n--gray-400: 204,213,224;\n--gray-500: 160,174,192;\n--gray-600: 113,128,150;\n--gray-700: 73,85,104;\n--gray-800: 44,55,72;\n--gray-900: 26,32,44;\n--red-100: 254,245,245;\n--red-200: 255,215,215;\n--red-300: 254,178,178;\n--red-400: 246,173,84;\n--red-500: 236,137,54;\n--red-600: 221,106,31;\n--red-700: 192,85,33;\n--red-800: 155,66,33;\n--red-900: 123,52,30;\n--orange-100: 255,250,240;\n--orange-200: 255,235,200;\n--orange-300: 251,211,141;\n--orange-400: 246,173,84;\n--orange-500: 236,137,54;\n--orange-600: 221,106,31;\n--orange-700: 192,85,33;\n--orange-800: 155,66,33;\n--orange-900: 123,52,30;\n--yellow-100: 255,255,240;\n--yellow-200: 255,252,191;\n--yellow-300: 250,240,136;\n--yellow-400: 245,224,94;\n--yellow-500: 235,200,75;\n--yellow-600: 215,158,46;\n--yellow-700: 182,121,31;\n--yellow-800: 151,90,23;\n--yellow-900: 116,65,16;\n--green-100: 240,255,244;\n--green-200: 198,246,213;\n--green-300: 155,230,180;\n--green-400: 104,211,145;\n--green-500: 72,187,129;\n--green-600: 56,161,105;\n--green-700: 47,132,90;\n--green-800: 39,104,73;\n--green-900: 33,84,61;\n--teal-100: 230,255,250;\n--teal-200: 177,245,234;\n--teal-300: 129,231,217;\n--teal-400: 78,209,197;\n--teal-500: 55,179,172;\n--teal-600: 49,151,149;\n--teal-700: 46,122,123;\n--teal-800: 39,94,97;\n--teal-900: 35,78,82;\n--blue-100: 235,248,255;\n--blue-200: 190,227,248;\n--blue-300: 144,205,244;\n--blue-400: 98,179,237;\n--blue-500: 66,153,225;\n--blue-600: 49,130,206;\n--blue-700: 43,109,176;\n--blue-800: 44,82,130;\n--blue-900: 43,67,101;\n--indigo-100: 236,244,255;\n--indigo-200: 195,218,254;\n--indigo-300: 162,191,250;\n--indigo-400: 127,156,244;\n--indigo-500: 102,126,234;\n--indigo-600: 89,104,216;\n--indigo-700: 76,82,191;\n--indigo-800: 67,64,144;\n--indigo-900: 60,54,107;\n--purple-100: 250,245,255;\n--purple-200: 233,217,253;\n--purple-300: 215,188,250;\n--purple-400: 182,147,244;\n--purple-500: 159,121,234;\n--purple-600: 128,90,213;\n--purple-700: 108,71,193;\n--purple-800: 85,60,154;\n--purple-900: 67,51,122;\n--pink-100: 255,245,247;\n--pink-200: 255,214,226;\n--pink-300: 251,182,206;\n--pink-400: 245,136,179;\n--pink-500: 237,99,166;\n--pink-600: 214,63,140;\n--pink-700: 184,50,128;\n--pink-800: 151,39,109;\n--pink-900: 112,35,89;\n--shadow-color: 0,0,0;\n--shadow-opacity: 0.13;\n--ease: cubic-bezier(0.23, 1, 0.32, 1);\n--ease-in: cubic-bezier(0.4, 0, 1, 1);\n--ease-out: cubic-bezier(0, 0, 0.2, 1);\n--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\n--sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";\n--serif: Georgia, Cambria, "Times New Roman", Times, serif;\n--mono: Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;\n}\n',b="--move-x: 0; --move-y: 0; --rotate: 0; --skew-x: 0; --skew-y: 0; --scale-x: 1; --scale-y: 1; transform: translateX(var(--move-x)) translateY(var(--move-y)) rotate(var(--rotate)) skewX(var(--skew-x)) skewY(var(--skew-y)) scaleX(var(--scale-x)) scaleY(var(--scale-y));";m+="\n.sans\t{font-family: var(--sans)}\n.serif {font-family: var(--serif)}\n.mono\t{font-family: var(--mono)}\n.transform {"+b+"}\n.smoothing { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }\n.smoothing-auto { -webkit-font-smoothing: auto; -moz-osx-font-smoothing: auto; }\n.outline-none {outline:none}\n@keyframes flavorcss-spin { 0% {transform: rotate(0deg);} 100% {transform: rotate(359deg);}}\n\n:root {\n  --mini-scrollbar-color: 150,151,155;\n  --mini-scrollbar-bg: 100,101,105;\n  --mini-scrollbar-bg-opacity: 0;\n  --mini-scrollbar-color-opacity:.45;\n  --mini-scrollbar-hover: 150,151,155;\n  --mini-scrollbar-hover-opacity:.65;\n  --mini-scrollbar-size: 6px;\n}\n.mini-scrollbar {\n  -webkit-overflow-scrolling: touch;\n}\n.mini-scrollbar::-webkit-scrollbar {\n  width: var(--mini-scrollbar-size);\n  height: var(--mini-scrollbar-size);\n}\n.mini-scrollbar::-webkit-scrollbar-track {\n  background: rgba(var(--mini-scrollbar-bg), var(--mini-scrollbar-bg-opacity));\n}\n.mini-scrollbar::-webkit-scrollbar-thumb {\n  border-radius: 0px;\n  background: rgba(var(--mini-scrollbar-color), var(--mini-scrollbar-color-opacity));\n}\n.mini-scrollbar::-webkit-scrollbar-thumb:hover {\n  background: rgba(var(--mini-scrollbar-hover), var(--mini-scrollbar-hover-opacity));\n}\n.mini-scrollbar-hidden::-webkit-scrollbar-thumb {\n  background: rgba(100, 100, 100, 0) !important;\n}\n\n";var h={center:"center",start:"flex-start",end:"flex-end",between:"flex-between",around:"flex-around",auto:"auto",baseline:"baseline",stretch:"stretch"},g={};function v(e,n){g[e]=n}var x=function(n){0<n&&v("transition-"+100*n,"transition: all "+100*n+"ms var(--ease);will-change:transform; "+b),v("spin-"+500*n,"animation: flavorcss-spin "+500*n+"ms linear infinite"),v("delay-"+500*n,"transition-delay: "+500*n+"ms"),[["opacity","opacity"],["transform","transform"]].forEach(function(e){v("transition-"+e[0]+"-"+100*n,"transition: "+e[1]+" "+100*n+"ms var(--ease); will-change:"+e[1]+"; "+b)})};for(d=0;d<=10;d++)x(d);v("transition-0",b),o.forEach(function(e){v("move-x-"+e,"--move-x:var(--"+e+")"),v("move-y-"+e,"--move-y:var(--"+e+")"),v("move-x--"+e,"--move-x:calc(0px - var(--"+e+"))"),v("move-y--"+e,"--move-y:calc(0px - var(--"+e+"))")}),c.forEach(function(e){v("move-x-"+e,"--move-x:var(--pt-"+e+")"),v("move-y-"+e,"--move-y:var(--pt-"+e+")"),v("move-x--"+e,"--move-x:calc(0px - var(--pt-"+e+"))"),v("move-y--"+e,"--move-y:calc(0px - var(--pt-"+e+"))")});for(d=0;d<=12;d++)v("move-x-"+d+"\\/12","--move-x:var(--rate-"+d+");"),v("move-y-"+d+"\\/12","--move-y:var(--rate-"+d+")"),v("move-x--"+d+"\\/12","--move-x:calc(0px - var(--rate-"+d+"));"),v("move-y--"+d+"\\/12","--move-y:calc(0px - var(--rate-"+d+"))");for(d=-100;d<=201;d+=10){v("scale-"+d,"--scale-x:"+(k=d?d/100:0)+";--scale-y:"+k),v("scale-x-"+d,"--scale-x: "+k),v("scale-y-"+d,"--scale-y: "+k)}for(d=0;d<=36;d++)v("rotate-"+10*d,"--rotate:"+10*d+"deg"),v("rotate--"+10*d,"--rotate:-"+10*d+"deg");for(d=0;d<=101;d+=5)v("skew-x-"+d,"--skew-x:"+d+"deg"),v("skew-y-"+d,"--skew-y:"+d+"deg");v("border-box","box-sizing: border-box"),v("content-box","box-sizing: content-box"),["right","left","none","both"].forEach(function(e){v("float-"+e,"float: "+e),v("clear-"+e,"clear: "+e)}),["contain","cover","fill","none","scale-down"].forEach(function(e){v("object-"+e,"object-fit: "+e)}),["auto","default","pointer","wait","text","move","not-allowed"].forEach(function(e){v("cursor-"+e,"cursor: "+e)});for(var y=0;y<=4;y++)for(var w=0;w<=4;w++)v("bg-"+(y*=25)+"-"+(w*=25),"background-position:"+y+"% "+w+"%"),v("object-"+y+"-"+w,"object-position:"+y+"% "+w+"%"),v("orign-"+25*y+"-"+25*w,"transform-orign:"+25*y+"% "+25*w+"%");["repeat","no-repeat","repeat-x","repeat-y","round","space"].forEach(function(e){v("bg-"+e,"background-repeat:"+e)}),["auto","cover","contain"].forEach(function(e){v("bg-"+e,"background-size:"+e)}),["none","auto"].forEach(function(e){v("events-"+e,"pointer-events:"+e)}),["none","auto","text","all"].forEach(function(e){v("select-"+e,"user-select:"+e)}),v("fill-current","fill: currentColor"),v("stroke-current","stroke: currentColor"),[["none","none"],["both","both"],["x","vertical"],["y","horizontal"]].forEach(function(e){v("resize-"+e[0],"resize:"+e[1])}),["hidden","visible"].forEach(function(e){v("overflow-"+e,"overflow:"+e)}),["scroll","auto"].forEach(function(e){v("overflow-"+e,"-webkit-overflow-scrolling:touch; overflow:"+e)}),[["x","hidden"],["y","hidden"],["x","visible"],["y","visible"]].forEach(function(e){v("overflow-"+e[0]+"-"+e[1],"overflow-"+e[0]+":"+e[1])}),[["x","auto"],["y","auto"],["x","scroll"],["y","scroll"]].forEach(function(e){v("overflow-"+e[0]+"-"+e[1],"-webkit-overflow-scrolling:touch; overflow-"+e[0]+":"+e[1])}),v("scrolling-touch","-webkit-overflow-scrolling:touch"),v("scrolling-auto","-webkit-overflow-scrolling:auto"),["static","fixed","absolute","relative","sticky"].forEach(function(e){v(""+e,"position: "+e)}),v("visible","visibility:visible"),v("hidden","visibility:hidden"),v("appearance-none","appearance:none; -moz-appearance:none;-webkit-appearance:none;"),[["row","row"],["row-r","row-reverse"],["col","column"],["col-r","column-reverse"]].forEach(function(e){v(e[0],"display:flex; flex-direction:"+e[1])}),["nowrap","wrap","wrap-r"].forEach(function(e){v("flex-"+e,"flex-wrap:"+e)}),v("flex-1","flex:1 1 0%"),v("flex-0","flex:0 1 auto");for(var k=0;k<=12;k++)for(var E=0;E<=1;E++)v("flex-"+k+"-"+E,"flex:"+k+" "+E+" 0%"),v("flex-"+k+"-"+E+"-auto","flex:"+k+" "+E+" auto");v("flex-none","flex: none"),[0,1].forEach(function(e){v("flex-grow-"+e,"flex-grow:"+e),v("flex-shrink-"+e,"flex-shrink:"+e)});for(d=-2;d<=12;d++)v("order-"+d,"order: "+d),v("grid-cols-"+d,"\tgrid-template-columns: repeat("+d+", minmax(0,"+d+"fr));"),v("grid-rows-"+d,"\tgrid-template-rows: repeat("+d+",minmax(0, "+d+"fr));");v("order-first","order: -9999"),v("order-last","order: 9999");for(y=0;y<=13;y++)for(w=0;w<=13;w++)13===y&&(y="auto"),13===w&&(w="auto"),v("row-"+y+"-"+w,"grid-row-start: "+y+"; grid-row-end: "+w),v("col-"+y+"-"+w,"grid-column-start: "+y+";grid-column-end: "+w);v("grid-cols-none","\tgrid-template-columns:none"),v("grid-rows-none","\tgrid-template-rows:none"),[["row","row"],["col","column"],["row-d","row dense"],["col-d","column dense"]].forEach(function(e){v("grid-flow-"+e[0],"grid-auto-flow:"+e[1])}),["auto","start","center","end","stretch"].forEach(function(e){v("self-"+e,"align-self:"+h[e])}),["start","center","end","between","around"].forEach(function(n){v("content-"+n,"align-content:"+h[n]),["start","center","end","baseline","auto"].forEach(function(e){v(n+"-"+e,"justify-content: "+h[n]+"; align-items:"+h[e])})}),[["ease","var(--ease)"],["ease-linear","linear"],["ease-in","var(--ease-in)"],["ease-out","var(--ease-out)"],["ease-in-out","var(--ease-in-out)"]].forEach(function(e){v(e[0],"--ease:"+e[1]+";")});for(d=0;d<=12;d++)v("f-"+d,"flex:"+d);[["auto","auto"],["scroll","scroll-position"],["contents","contents"],["transform","transform"],["left-top","left, top"]].forEach(function(e){v("will-change-"+e[0],"will-change:"+e[1]+";")});for(d=0;d<=100;d++)v("z-"+10*d,"z-index:"+10*d);v("z-auto","z-index:zuto"),[["fs","font-size"]].forEach(function(n){c.forEach(function(e){return v(n[0]+"-"+e,n[1]+":var(--fs-"+e+")")})}),[["italic","italic"],["not-italic","normal"]].forEach(function(e){v(e[0],"font-style: "+e[1])}),["left","center","right","justify"].forEach(function(e){v("text-"+e,"text-align:"+e)}),v("text-transform-none","text-transform: none"),["uppercase","lowercase","capitalize"].forEach(function(e){v(e,"text-transform: "+e)}),["normal","nowrap","pre","pre-line","pre-wrap"].forEach(function(e){v("writespace-"+e,"white-space:"+e)}),["fixed","local","scroll"].forEach(function(e){v("bg-"+e,"background-attachment:"+e)}),v("break-normal","work-break:normal;overflow-wrap:normal;"),v("break-word","overflow-wrap:break-word;"),v("break-all","work-break:break-all;"),v("wrap-hidden","overflow:hidden;text-overflow:ellipsis;white-space:nowrap"),v("wrap","overflow:hidden;overflow-wra:break-word; word-break:break-all;"),["baseline","top","middle","bottom","text-top","text-bottom"].forEach(function(e){v("align-"+e,"vertical-align:"+e)});for(d=-5;d<=10;d++)v("letter-"+d,"letter-spacing:"+(.025*d).toFixed(3)+"em");v("line-none","line-height:1"),c.forEach(function(e){v("line-"+e,"line-height:var(--fs-"+e+")")});for(d=1;d<=9;d++)v("fw-"+d+"00","font-weight:"+d+"00");["none","disc","decimal"].forEach(function(e){v("list-"+e,"list-style-type:"+e)}),["inside","outside"].forEach(function(e){v("list-"+e,"list-style-position:"+e)}),[["underline","underline"],["none-underline","none"]].forEach(function(e){v(e[0],"text-decoration:"+e[1])}),["collapse","separate"].forEach(function(e){v("border-"+e,"border-collapse:"+e)}),[["left","left"],["top","top"],["right","right"],["bottom","bottom"]].forEach(function(n){o.forEach(function(e){v(n[0]+"-"+e,n[1]+":var(--"+e+")"),v(n[0]+"--"+e,n[1]+":calc(0px - var(--"+e+"))")}),c.forEach(function(e){v(n[0]+"-"+e,n[1]+":var(--pt-"+e+")"),v(n[0]+"--"+e,n[1]+":calc(0px - var(--pt-"+e+"))")});for(var e=0;e<=12;e++)v(n[0]+"-"+e+"\\/12",n[1]+":var(--rate-"+e+")"),v(n[0]+"--"+e+"\\/12",n[1]+":calc(0px - var(--rate-"+e+"))")}),[["w","width"],["min-w","min-width"],["max-w","max-width"],["h","height"],["min-h","min-height"],["max-h","max-height"],["p","padding"],["m","margin"]].forEach(function(n){o.forEach(function(e){return v(n[0]+"-"+e,n[1]+":var(--"+e+")")}),c.forEach(function(e){v(n[0]+"-"+e,n[1]+":var(--pt-"+e+")")});for(var e=0;e<=12;e++)v(n[0]+"-"+e+"\\/12",n[1]+":var(--rate-"+e+")")});for(d=0;d<=4;d++)v("stroke-"+d,"stroke-width: "+d);[["radius","border-radius"],["radius-q","border-top-left-radius"],["radius-w","border-top-right-radius"],["radius-a","border-bottom-left-radius"],["radius-s","border-bottom-right-radius"]].forEach(function(n){c.forEach(function(e){v(n[0]+"-"+e,n[1]+":var(--li-"+e+")")})}),[["px","padding-left","padding-right"],["py","padding-top","padding-bottom"],["mx","margin-left","margin-right"],["my","margin-top","margin-bottom"],["gap","gap"],["row-gap","row-gap"],["col-gap","column-gap"]].forEach(function(n){c.forEach(function(e){return v(n[0]+"-"+e,n[1]+":var(--pt-"+e+"); "+n[2]+":var(--pt-"+e+")")})}),[["pt","padding-top"],["pb","padding-bottom"],["pl","padding-left"],["pr","padding-right"],["mt","margin-top"],["mb","margin-bottom"],["ml","margin-left"],["mr","margin-right"]].forEach(function(n){c.forEach(function(e){v(n[0]+"-"+e,n[1]+": var(--pt-"+e+")"),v(n[0]+"--"+e,n[1]+": calc(0px - var(--pt-"+e+"))")})}),[["b","border"],["bt","border-top"],["bb","border-bottom"],["bl","border-left"],["br","border-right"],["outline","outline"]].forEach(function(n){c.forEach(function(e){v(n[0]+"-"+e,n[1]+"-width: var(--li-"+e+"); "+n[1]+"-style: solid;")}),["solid","dotted","dashed","double","none"].forEach(function(e){v(n[0]+"-"+e,n[1]+"-style: "+e)})}),v("shadow"," box-shadow: 0 1px 3px 0 rgba(var(--shadow-color), var(--shadow-opacity)), 0 1px 2px 0 rgba(var(--shadow-color), calc(var(--shadow-opacity) / 2));"),[["xs","0 0 0 1px","0 0 0 0"],["sm","0 1px 2px 0","0 0 0 0"],["md","0 4px 6px -1px","0 2px 4px -1px"],["lg","0 10px 15px -3px","0 4px 6px -2px"],["xl","0 20px 25px -5px","0 10px 10px -5px"],["2xl","0 25px 50px -12px","0 0 0 0"],["inner","inset 0 2px 4px 0","0 0 0 0"],["outline","0 0 0 3px","0 0 0 0"]].forEach(function(e){v("shadow-"+e[0],"box-shadow: "+e[1]+" rgba(var(--shadow-color), var(--shadow-opacity)), "+e[2]+" rgba(var(--shadow-color), calc(var(--shadow-opacity) / 2));")}),[["bg","background-color"],["b","border-color"],["c","color"],["placeholder","color"],["shadow","shadow-color"],["outline","outline-color"]].forEach(function(e){var r=e[0],a=e[1];s.forEach(function(e){var n="white"===e||"black"===e;if("shadow"===r)if(n)v(r+"-"+e,"--"+r+"-color:var(--"+e+");");else for(var t=1;t<=9;t++)v(r+"-"+e+"-"+t+"00","--"+r+"-color:var(--"+e+"-"+t+"00);");else{var o="";if("placeholder"===r&&(o="::-webkit-input-placeholder"),n)v(r+"-"+e+o,"--"+r+"-opacity: 1; "+a+":rgba(var(--"+e+"), var(--"+r+"-opacity));");else for(t=1;t<=9;t++)v(r+"-"+e+"-"+t+"00"+o,"--"+r+"-opacity: 1; "+a+":rgba(var(--"+e+"-"+t+"00), var(--"+r+"-opacity));")}});for(var n=0;n<=100;n+=5)v(r+"-opacity-"+n,"--"+r+"-opacity: "+(0==n?0:n/100))}),[["bg","background-color"],["b","border-color"],["c","color"],["placeholder","color"],["shadow","shadow-color"],["outline","outline-color"]].forEach(function(e){v(e[0]+"-current",e[1]+":currentColor")});for(d=0;d<=100;d+=5)v("opacity-"+d,"opacity: "+(0===d?0:d/100));function A(e,n){var t=document.createElement("style");t.type="text/css",t.innerText=e,t.id=n,document.head.appendChild(t)}v("sr-only","position: absolute;width: 1px;height: 1px;padding: 0;margin: -1px;overflow: hidden;clip: rect(0, 0, 0, 0);white-space: nowrap;border-width: 0;"),v("not-sr-only","position: static;width: auto;height: auto;padding: 0;margin: 0;overflow: visible;clip: auto;white-space: normal;"),v("table-fixed","table-layout: fixed"),v("table-auto","table-layout: auto"),v("flex","display:-webkit-box;display:-moz-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display: flex;"),v("flex","display:-webkit-box;display:-moz-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display: flex;"),["none","block","flow-root","inline-block","grid","inline-grid","table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row"].forEach(function(e){v(e,"display: "+e)}),A(m,"flavorcss-base-css");var z={};function q(e){z[e]||(e.split(" ").forEach(function(e){if(e&&(e=e.trim(),!z[e])){if(-1<e.indexOf(":")){var n=e.split(":");e=n[n.length-1]}e=e.replace(/\//g,"\\/");var t=g[e];t&&A(function(o,r){var a="",i="";return i+="."+o+"{"+r+"} ",a+="[class] .pc\\:"+o+"{"+r+"} ",a+="[class] .hover\\:"+o+":hover{"+r+"} ",a+="[class] .group:hover .group\\:hover\\:"+o+"{"+r+"} ",["focus","active","checked","disable","required"].forEach(function(e){i+="."+e+"\\:"+o+":"+e+"{"+r+"} ",i+=".group:"+e+" .group\\:"+e+"\\:"+o+"{"+r+"} ",a+="[class] .pc\\:"+e+"\\:"+o+":"+e+"{"+r+"} "}),[["first","first-child"],["last","last-child"],["odd","nth-child(odd)"]].forEach(function(e){var n=e[0],t=e[1];i+="."+n+"\\:"+o+":"+t+"{"+r+"} ",i+=".group:"+n+" .group\\:"+t+"\\:"+o+"{"+r+"} ",a+="[class] .pc\\:"+n+"\\:"+o+":"+t+"{"+r+"} "}),i+" @media (min-width: 640px){"+a+"}"}(e,t),"flavorcss-"+e),z[e]=!0}}),z[e]=!0)}var S={},F={},T={};function _(e){e.querySelectorAll("template[lib]").forEach(function(e){var n=e.getAttribute("lib");if(n&&!S[n]){var t=document.createElement("div");t.innerHTML=e.innerHTML;var o=t.querySelector("script");o&&(F[n]=new Function("$props",o.innerHTML),o.remove(),e.remove()),S[n]=t.innerHTML}})}function M(n){var e=n.getAttribute("if");if(e){var t=void 0;try{t=new Function("return "+e)()}catch(e){p(e,n)}if(!t)return!1}var o=n.getAttribute("route");if(o&&1!==(location.hash||"/").indexOf(o))return!1;return!0}function $(u){u.querySelectorAll("template[init]:not([uuid])").forEach(function(o){var e=o.getAttribute("init");if(e){var n=S[e];if(n&&o.parentElement){if(!M(o))return;var t=o.getAttribute("props")||"{}",r=f(),a=e+"_"+r,i=e+"_props_"+r;o.setAttribute("uuid",a);try{window[i]=new Function("return "+t)()}catch(e){p(e,o,t)}var l=n.replace(/\$state/g,a);l=(l=n.replace(/\$id/g,"'"+a+"'")).replace(/\$props/g,i),o.innerHTML=o.innerHTML.replace(/\$renderState/g,a);var c=document.createElement("div");c.innerHTML=l,c.querySelectorAll("*").forEach(function(e,n){e.setAttribute(a,n+1)}),c.querySelectorAll("slot").forEach(function(e){var n=e.getAttribute("name"),t=o.content.querySelector('[slot="'+n+'"]');t&&c.replaceChild(t,e)}),o.insertAdjacentHTML("afterend",c.innerHTML);var s=F[e];if(s)try{window[a]=s()}catch(e){p(e,o,s)}requestAnimationFrame(function(){L(u)})}}})}function L(e){!function(o){o.querySelectorAll("template[fetch]:not([fetch-loaded])").forEach(function(e){e.setAttribute("fetch-loaded","1");var t=e.getAttribute("fetch");t&&!T[t]&&fetch(t).then(function(e){return e.text()}).then(function(e){if(e){var n=document.createElement("div");n.innerHTML=e,_(n),T[t]=!0,requestAnimationFrame(function(){L(o)})}})})}(e),_(e),requestAnimationFrame(function(){$(e)})}function j(e){e?document.body.querySelectorAll(e).forEach(function(e){H(e)}):H(document.body)}var H=e(function(e){N(e)}),C=[function(e){e.querySelectorAll("template[uuid]").forEach(function(e){var n=e.getAttribute("uuid");n&&(M(e)||(e.removeAttribute("uuid"),document.body.querySelectorAll("["+n+"]").forEach(function(e){e.remove()})))})},$,function(e){n(e,function(n){var e;try{e=new Function("return "+n.getAttribute("if"))()}catch(e){p(e,n)}var t=n.getAttribute("uuid");if(e){if(!t){t=f("if"),n.setAttribute("uuid",t);var o=document.createElement("div");o.innerHTML=n.innerHTML,o.querySelectorAll("*").forEach(function(e){e.setAttribute(t,"1")}),n.insertAdjacentHTML("afterend",o.innerHTML)}}else t&&(document.body.querySelectorAll("["+t+"]").forEach(function(e){e.remove()}),n.removeAttribute("uuid"))},"if","template[if]:not([init])")},function(e){function n(o){if(!o.__forcode){o.__forcode=o.getAttribute("for"),o.__html=o.innerHTML;try{o.__forData=new Function("return "+o.__forcode)()}catch(e){p(e,o)}}var e=o.__forData;if(e&&o.getAttribute("for-length")!=e.length){var r=o.__html,a="";e.forEach(function(e,n){var t=r.replace(/\$v/g,o.__forcode+"["+n+"]");t=(t=t.replace(/\$i/g,n)).replace(/\$_/g,"$"),a+=t}),o.innerHTML=a,o.setAttribute("for-length",e.length),l(o)}}var t=[],o=e.querySelectorAll("[for]"),r=o.length;o.forEach(function(e,n){t[r-n-1]=e}),t.forEach(n),e.hasAttribute("for")&&n(e)},function(e){n(e,function(n){var e;try{e=new Function("return "+n.getAttribute("show"))()}catch(e){p(e,n)}e?n.style.removeProperty("display"):n.style.display="none"},"show","[show]")},function(e){n(e,function(n){var e=n.getAttribute("css");if(e){var t="";if(-1<e.indexOf("{")){var o;try{o=new Function("return "+e)()}catch(e){p(e,n)}Object.keys(o).forEach(function(e){o[e]&&(t+=e+" ")})}else t=e;q(t),n.className!==t&&(n.className=t)}},"css","[css]")},function(e){n(e,function(t){var e,o=t.getAttribute("bind"),r=t.getAttribute("query");a.forEach(function(e){t[e]||(t[e]=function(e){var n=e.target&&e.target.value||"";try{new Function(o+"='"+n+"'")()}catch(e){p(e,t)}j(r)})});try{e=new Function("return "+o)()||""}catch(e){console.error(t,"return "+o)}t.value!==e&&requestAnimationFrame(function(){requestAnimationFrame(function(){t.value=e})})},"bind","[bind]")},function(e){n(e,function(n){var e;n.getAttribute("text-save")||n.setAttribute("text-save",n.getAttribute("text")||n.textContent);try{e=new Function("return "+n.getAttribute("text-save"))()}catch(e){p(e,n)}n.textContent!==e&&(n.textContent=e)},"text","[text]")},function(e){n(e,function(n){try{new Function("$self",n.getAttribute("watch"))(n)}catch(e){p(e,n)}},"watch","[watch]")}];function N(n){C.forEach(function(e){e(n)})}var O=[L,l],U=e(function(n){N(n),O.forEach(function(e){e(n)})}),B={childList:!0,attributes:!1,subtree:!0},I=new MutationObserver(function(e){for(var n=0;n<e.length;n++)0<e[n].addedNodes.length&&e[n].addedNodes.forEach(function(e){1===e.nodeType&&U(e)})});for(var D=["$target","$self","$value","$event","$props","$renderState"],X="",Y=0;Y<8;Y++)D.push("$"+X+"v"),D.push("$"+X+"i"),X+="_";D.forEach(function(e){void 0===window[e]&&(window[e]="")});var R={init:U,update:H,queryUpdate:j,middlewareByUpdate:C,middlewareByInit:O};return window.addEventListener("load",function(){I.observe(document.body,B),document.querySelector("[flavorcss-effect]")&&A("\nhtml{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}\n\nblockquote,dl,dd,h1,h2,h3,h4,h5,h6,figure,p,pre {\n  margin: 0;\n  font-size: 1em;\n}\nh1,h2,h3,h4,h5,h6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\na {\n  text-decoration:none;\n}\nol,ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\nimg, image {\n  object-fit: cover;\n  object-position: 50% 50%;\n}\nimg,svg,video,canvas,audio,iframe,embed,object {\n  display: block;\n  vertical-align: middle;\n}\n\n*,\n*::before,\n*::after {\n  border-width: 0;\n  border-style: solid;\n  border-color: currentColor;\n  -webkit-tap-highlight-color: transparent;\n}\ntable {border-collapse: collapse}\nbody {padding:0px;margin:0px;font-family: var(--sans);}\n* {box-sizing: border-box; outline:0;-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;}\n","flavorcss-effect-css"),document.querySelectorAll("template").forEach(function(e){L(e)}),U(document.body),setTimeout(function(){"hidden"===document.body.style.visibility&&(document.body.style.visibility="visible")},200)}),R});
