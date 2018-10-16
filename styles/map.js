(function(config){var ca=navigator.userAgent.toLowerCase(),e=window,da=document,ha=da.documentElement;function S(a){return-1!==ca.indexOf(a)}var ia=/([a-z0-9]*\d+[a-z0-9]*)/;
function ja(){var a=ka;if(!a)return null;var a=a.toLowerCase(),b=null;if(b=a.match(/angle \((.*)\)/))a=b[1],a=a.replace(/\s*direct3d.*$/,"");a=a.replace(/\s*\([^\)]*wddm[^\)]*\)/,"");if(0<=a.indexOf("intel")){b=["Intel"];0<=a.indexOf("mobile")&&b.push("Mobile");(0<=a.indexOf("gma")||0<=a.indexOf("graphics media accelerator"))&&b.push("GMA");if(0<=a.indexOf("haswell"))b.push("Haswell");else if(0<=a.indexOf("ivy"))b.push("HD 4000");else if(0<=a.indexOf("sandy"))b.push("HD 3000");else if(0<=a.indexOf("ironlake"))b.push("HD");
else{0<=a.indexOf("hd")&&b.push("HD");var c=a.match(ia);c&&b.push(c[1].toUpperCase())}return b=b.join(" ")}return 0<=a.indexOf("nvidia")||0<=a.indexOf("quadro")||0<=a.indexOf("geforce")||0<=a.indexOf("nvs")?(b=["nVidia"],0<=a.indexOf("geforce")&&b.push("geForce"),0<=a.indexOf("quadro")&&b.push("Quadro"),0<=a.indexOf("nvs")&&b.push("NVS"),a.match(/\bion\b/)&&b.push("ION"),a.match(/gtx\b/)?b.push("GTX"):a.match(/gts\b/)?b.push("GTS"):a.match(/gt\b/)?b.push("GT"):a.match(/gs\b/)?b.push("GS"):a.match(/ge\b/)?
b.push("GE"):a.match(/fx\b/)&&b.push("FX"),(c=a.match(ia))&&b.push(c[1].toUpperCase().replace("GS","")),0<=a.indexOf("titan")?b.push("TITAN"):0<=a.indexOf("ti")&&b.push("Ti"),b=b.join(" ")):0<=a.indexOf("amd")||0<=a.indexOf("ati")||0<=a.indexOf("radeon")||0<=a.indexOf("firegl")||0<=a.indexOf("firepro")?(b=["AMD"],0<=a.indexOf("mobil")&&b.push("Mobility"),c=a.indexOf("radeon"),0<=c&&b.push("Radeon"),0<=a.indexOf("firepro")?b.push("FirePro"):0<=a.indexOf("firegl")&&b.push("FireGL"),0<=a.indexOf("hd")&&
b.push("HD"),0<=c&&(a=a.substring(c)),(c=a.match(ia))&&b.push(c[1].toUpperCase().replace("HD","")),b=b.join(" ")):a.substring(0,100)}
var la="microsoft basic render driver;vmware svga 3d;Intel 965GM;Intel B43;Intel G41;Intel G45;Intel G965;Intel GMA 3600;Intel Mobile 4;Intel Mobile 45;Intel Mobile 965".split(";"),ma="ActiveXObject"in e,na="devicePixelRatio"in e&&1<e.devicePixelRatio||ma&&"matchMedia"in e&&e.matchMedia("(min-resolution:144dpi)")&&e.matchMedia("(min-resolution:144dpi)").matches,qa=S("windows nt"),sa=-1!==ca.search(/windows nt [1-5]\./),ta=-1!==ca.search(/windows nt 5\.[12]/),ua=sa&&!ta;S("windows nt 10");
var va=S("windows phone"),wa=S("macintosh"),xa=S("Mb2345Browser"),ya=S("ipad;")||S("ipad "),za=ya&&na,Aa=S("ipod touch;"),Ca=S("iphone;")||S("iphone "),Da=Ca||ya||Aa,Ea=Da&&-1!==ca.search(/ os [456]_/);Da&&ca.search(/ os [4-8]_/);var Ha=Da&&-1!==ca.search(/ os [78]_/);Da&&S("os 8_");var Ia=Da&&S("os 10_"),Ja=S("android"),Ka=-1!==ca.search(/android [123]/),La=S("android 4");Ja&&-1===ca.search(/android [1-4]/)||ca.search(/android 4.4/);
var Ma=Ja?"android":Da?"ios":qa?"windows":wa?"mac":"other",Na=ma&&!e.XMLHttpRequest,Oa=ma&&!da.querySelector,Pa=ma&&!da.addEventListener,Qa=ma&&S("ie 9"),Ra=ma&&S("msie 10"),Sa=ma&&S("rv:11"),Ua=S("alipay")||Ja&&Ta,Va=S("edge"),Wa=S("qtweb"),Ta=S("ucbrowser"),Xa=S("miuibrowser"),Ya=S("micromessenger"),Za=S("mqqbrowser"),$a=S("baidubrowser"),chrome=(S("chrome")||S("crios"))&&!Ya&&!$a&&!Za&&!Va&&!Xa,ab=chrome&&S("chromium"),bb=chrome&&!ab&&30<=parseInt(ca.split("chrome/")[1]),cb=S("firefox"),db=(wa||
Da)&&S("safari")&&S("version/"),eb=Da&&S("aliapp"),fb=Da&&(!Za&&!Ta&&!Ya&&!chrome&&!cb&&!db||eb),gb=Ja||Da||va||S("mobile"),hb=e.navigator&&e.navigator.msPointerEnabled&&!!e.navigator.msMaxTouchPoints,ib=e.navigator&&e.navigator.pointerEnabled&&!!e.navigator.maxTouchPoints,jb=ib||hb,kb="ontouchstart"in da||jb,lb=function(){if(!gb)return e.devicePixelRatio||1;var a=document.getElementsByTagName("meta");if(window.parent&&window.parent!==window)try{if(window.parent.location.origin==window.location.origin)a=
window.parent.document.getElementsByTagName("meta");else return 1}catch(b){return 1}for(var c=a.length-1;0<=c;c--)if("viewport"===a[c].name){var c=a[c].content,d;-1!==c.indexOf("initial-scale")&&(d=parseFloat(c.split("initial-scale=")[1]));a=-1!==c.indexOf("minimum-scale")?parseFloat(c.split("minimum-scale=")[1]):0;c=-1!==c.indexOf("maximum-scale")?parseFloat(c.split("maximum-scale=")[1]):Infinity;if(d){if(c>=a)return d>c?c:d<a?a:d}else if(c>=a)return 1<=a?1:Math.min(c,1);console&&console.log&&console.log("viewport\u53c2\u6570\u4e0d\u5408\u6cd5");
return null}}(),mb=ma&&"transition"in ha.style,nb=!!da.createElementNS&&!!da.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,ob=da.createElement("canvas"),rb=!(!ob||!ob.getContext),sb=window.URL||window.webkitURL,tb=!ma&&!(Ta&&Ja)&&window.Worker&&sb&&sb.createObjectURL&&window.Blob,ub="",ka="",vb={alpha:!0,antialias:!0,depth:!1,failIfMajorPerformanceCaveat:!0,preserveDrawingBuffer:!1,stencil:!1},wb=function(){if(!rb||!tb||fb)return!1;for(var a=["webgl","experimental-webgl","moz-webgl"],
b=null,c=0;c<a.length;c+=1){try{b=ob.getContext(a[c],vb)}catch(d){}if(b){if(b.drawingBufferWidth!==ob.width||b.drawingBufferHeight!==ob.height)break;if(!b.getShaderPrecisionFormat||!b.getParameter||!b.getExtension)break;if(23>b.getShaderPrecisionFormat(35632,36338).precision||23>b.getShaderPrecisionFormat(35633,36338).precision)break;ka=b.getExtension("WEBGL_debug_renderer_info")?b.getParameter(37446):null;if((b=ja())&&-1!==la.indexOf(b))break;ub=a[c];return!0}}return!1}(),xb=wb&&!gb&&bb&&("mac"==
Ma||"windows"==Ma),yb=!rb||Wa||va||gb&&cb||Qa||Ea||za||Aa||Ka||S("gt-n710")||ua,zb=!yb&&!xb&&(La||Ha||Da&&Ya||!gb),Ab=xb?"vw":yb?"d":zb?"dv":"v",Bb=S("webkit"),Cb="WebKitCSSMatrix"in e&&"m11"in new window.WebKitCSSMatrix,Db="MozPerspective"in ha.style,Eb="OTransition"in ha.style,Fb=mb||Cb||Db||Eb,Gb=void 0!==config[8]?config[8]:!0,Hb=void 0!==config[9]?config[9]:!0,Ib=void 0!==config[10]?config[10]:!0,Jb=!nb&&gb&&rb,Kb=!1;try{Kb="undefined"!==typeof e.localStorage}catch(Lb){}
config.j={size:Ca?100:Ja?200:400,Gt:wa,Y5:qa,oJ:Da,nY:Ia,Lf:Ja,N2:Ka,qI:Ua,rq:Ma,gy:$a,V4:Za,qL:db,s1:Ya,mn:ma,kg:Na,Zp:Oa,g4:Qa,ZX:Ra,pd:Pa,aY:ma&&!Sa,QY:xa,Ft:Kb,geolocation:gb||ma&&!Pa||Va,xB:Ta&&!chrome,chrome:chrome,Iy:na&&chrome,mI:cb,U:gb,F4:gb&&Bb,TY:gb&&Cb,E4:gb&&e.opera,Jc:na,DB:lb,pa:na&&(!gb||!!lb&&1<=lb),ed:kb,ZY:hb,LK:ib,MK:jb,AV:57<=parseInt(ca.split("chrome/")[1]),q1:Bb,f4:mb,r1:Cb,z3:Db,K4:Eb,IU:Fb,Pi:nb,cq:rb,BJ:tb,Iu:Ib,lV:wb,pn:xb,n1:ub,o1:vb,TI:ka,G1:!1,RW:Gb,dg:Gb&&!yb,UU:Gb?
Ab:"d",qn:Hb&&!!e.WebSocket&&!$a,I4:Jb,wZ:rb||Jb?"c":"d"};var e=window,Mb={overlay:["style"],"AMap.IndoorMap":["AMap.CustomLayer","cvector"],"AMap.MarkerList":["AMap.TplUtils"]},Nb="http map anip layers overlay0 brender mrender".split(" ");config.sd="main";config.j.ed&&(Nb+=",touch",config.sd+="t");config.j.U||(Nb+=",mouse",config.sd+="m");config.sd+="c";config.j.dg&&(config.sd+="v",Nb+=",vectorlayer,overlay",config.j.pn?(config.sd+="w",Nb+=",wgl"):(config.sd+="cg",Nb+=",cmng,cgl"));
if(config[7]){for(var Ob=[],Pb=config[7].split(","),W=0;W<Pb.length;W+=1){var Qb=Pb[W];Mb[Qb]&&Ob.push.apply(Ob,Mb[Qb]);Ob.push(Qb)}Nb+=","+Ob.join(",");config.sd+=config[7].replace(",","").replace(eval("/AMap./gi"),"")}config.bn=Mb;Nb+=",sync";config.eM=Nb.split(",");window.AMap=window.AMap||{};window.AMap.gi="1.3.25.10";var Rb=window.AMap.CB={},Sb=config[2].split(",")[0],Tb=Sb+"/theme/v"+config[4]+"/style1.3.25.10.css",Ub=document.head||document.getElementsByTagName("head")[0];if(Ub){var Vb=document.createElement("link");Vb.setAttribute("rel","stylesheet");Vb.setAttribute("type","text/css");Vb.setAttribute("href",Tb);Ub.insertBefore(Vb,Ub.firstChild)}else document.write("<link rel='stylesheet' href='"+Tb+"'/>");
function Wb(a){var b=document,c=b.createElement("script");c.charset="utf-8";c.src=a;(a=b.body||Ub)&&a.appendChild(c)}
function kc(){for(var a=Sb+"/maps/main?v="+config[4]+"&key="+config[0]+"&m="+config.eM.join(",")+"&vrs=1.3.25.10",b=document.getElementsByTagName("script"),c,d=0;d<b.length;d+=1)if(0===b[d].src.indexOf(Sb.split(":")[1]+"/maps?")){c=b[d];break}config[5]||c&&c.async?Wb(a):(document.write('<script id="amap_main_js" src=\''+a+"' type='text/javascript'>\x3c/script>"),setTimeout(function(){document.getElementById("amap_main_js")||Wb(a)},1))}var lc=(new Date).getTime();
Rb.__load__=function(a){a(config,lc);Rb.__load__=null};try{if(window.localStorage){var mc=window.localStorage["_AMap_"+config.sd],nc=!1;mc?(mc=JSON.parse(mc),mc.version===window.AMap.gi?(eval(mc.script),Rb.loaded=!0):nc=!0):nc=!0;if(nc)for(W in window.localStorage)window.localStorage.hasOwnProperty(W)&&0===W.indexOf("_AMap_")&&window.localStorage.removeItem(W)}}catch(oc){}Rb.loaded||(kc(),config.eM=void 0);
})(["d3f5d8b3b05231fa6a11375492310e3a",[115.423411,39.442758,117.514625,41.060816,116.405285,39.904989],"http://webapi.amap.com",1,"1.3",null,"110000","AMap.Geocoder",true,true,true])