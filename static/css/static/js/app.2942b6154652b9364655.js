webpackJsonp([1],{"+HSz":function(t,e,i){"use strict";e.a={name:"progress",props:["perc"],data:function(){return{qx:95,range:10}},methods:{_flow:function(){var t=this,e=this.qx+this.range/2,i=this.qx-this.range/2,n=!0;!function s(){n?t.qx+=.1:t.qx-=.1,t.qx>=e?n=!1:t.qx<=i&&(n=!0),requestAnimationFrame(s)}()}},mounted:function(){this._flow()},computed:{bottom:function(){return 100-100*this.perc},d:function(){return"M0 "+this.bottom+"L0 100L100 100L100 "+this.bottom+"Q"+this.qx+" "+(this.bottom+10)+" 90 "+this.bottom+"T80 "+this.bottom+"T70 "+this.bottom+"T60 "+this.bottom+"T50 "+this.bottom+"T40 "+this.bottom+"T30 "+this.bottom+"T20 "+this.bottom+"T10 "+this.bottom+"T0 "+this.bottom}}}},"/4i9":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("keep-alive",[i("router-view")],1)],1)},s=[],o={render:n,staticRenderFns:s};e.a=o},"8Sqt":function(t,e){},M93x:function(t,e,i){"use strict";function n(t){i("Yipf")}var s=i("xJD8"),o=i("/4i9"),a=i("VU/8"),r=n,u=a(s.a,o.a,r,null,null);e.a=u.exports},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("/5sW"),s=i("M93x"),o=i("YaEn");n.a.config.productionTip=!1,new n.a({el:"#app",router:o.a,render:function(t){return t(s.a)}})},X7kc:function(t,e,i){"use strict";function n(t){i("8Sqt")}var s=i("+HSz"),o=i("zMYJ"),a=i("VU/8"),r=n,u=a(s.a,o.a,r,null,null);e.a=u.exports},YaEn:function(t,e,i){"use strict";var n=i("/5sW"),s=i("/ocq"),o=i("hYS1"),a=i("X7kc");n.a.use(s.a),e.a=new s.a({routes:[{path:"/",component:o.a},{path:"/pro",component:a.a}]})},Yipf:function(t,e){},eCEX:function(t,e){},gZCx:function(t,e,i){"use strict";var n=i("c/Tr"),s=i.n(n),o=i("X7kc");e.a={name:"hello",data:function(){return{disable:!1,info:"可以上传多个文件...",files:[],percent:0,url:"/upload"}},methods:{addshadow:function(t){t.target.classList.add("click"),"file"===t.target.getAttribute("target")&&(this.info="选择文件中。。。。")},removeshadow:function(t){t.target.classList.remove("click")},getfiles:function(){if(this.files=s()(this.$refs.inputFile.files),0===this.files.length)return void(this.info="请选择文件再传送。。。");this.info="你已经选择了"+this.files.length+"个文件,可以按传送开始传送"},getTotalSize:function(t){return 0===Math.floor(t/1024)?t+"b":Math.floor(t/1024)<1024?Math.round(t/1024)+"kb":Math.round(t/1024/1024)+"M"},getType:function(t){return/\//.test(t)?t.split("/")[1]:t},_xhr:function(){var t=this;this.info="正在传送文件，不可以再选择文件，请等文件传送完毕。。",this.disable=!0;var e=new FormData;this.files.forEach(function(t){e.append(t.name,t)});var i=new XMLHttpRequest;i.open("POST",this.url,!0),i.onreadystatechange=function(){204!=i.status&&(t.info="出现错误，请联系我")},i.upload.onloadstart=function(){window.onbeforeunload=function(t){return void alert("uploading")}},i.upload.onabort=function(){t.info="出现错误，可以刷新重试，也可以联系我"},i.upload.onprogress=function(e){e=e||window.event,t.percent=e.loaded/e.total,1===t.percent&&(t.info="上传完成",t.files=[],t.disable=!1)},i.send(e)},sendFiles:function(){if(this.disable)return!1;0===this.files.length?this.info="请选择文件再传送。。。":this._xhr()}},mounted:function(){},components:{prog:o.a}}},hYS1:function(t,e,i){"use strict";function n(t){i("eCEX")}var s=i("gZCx"),o=i("xYnj"),a=i("VU/8"),r=n,u=a(s.a,o.a,r,"data-v-67565eb4",null);e.a=u.exports},xJD8:function(t,e,i){"use strict";e.a={name:"app"}},xYnj:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("h1",[t._v(t._s(t.info))]),t._v(" "),i("div",{attrs:{id:"outer"}},[i("label",{attrs:{for:"file"},on:{mousedown:t.addshadow,mouseup:t.removeshadow}},[t._v("点击选择")]),t._v(" "),i("div",{staticClass:"content"},[i("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"inputFile",attrs:{disabled:t.disable,type:"file",id:"file",multiple:""},on:{change:t.getfiles}}),t._v(" "),i("div",{staticClass:"list",attrs:{id:"listForFiles"}},[t._m(0),t._v(" "),t._l(t.files,function(e){return i("div",[i("span",[t._v(t._s(e.name))]),t._v(" "),i("span",[t._v(t._s(t.getTotalSize(e.size)))]),t._v(" "),i("span",[t._v(t._s(t.getType(e.type)))])])})],2)]),t._v(" "),i("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{type:"button",id:"button"}}),t._v(" "),i("label",{attrs:{for:"button"},on:{mousedown:t.addshadow,mouseup:t.removeshadow,click:t.sendFiles}},[t._v("传送")])]),t._v(" "),i("div",{staticClass:"highest"}),t._v(" "),i("div",{staticClass:"container"},[i("prog",{attrs:{perc:t.percent}})],1)])},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("span",[t._v("名字")]),t._v(" "),i("span",[t._v("大小")]),t._v(" "),i("span",[t._v("属性")])])}],o={render:n,staticRenderFns:s};e.a=o},zMYJ:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("svg",{attrs:{id:"svg",width:"100%",height:"100%",preserveAspectRatio:"none",viewBox:"0,0,100,100"}},[i("path",{attrs:{d:t.d,fill:"#0ebef9","fill-opacity":"0.75"}}),t._v(" "),i("path",{attrs:{id:"topLeft",d:"M50 0 L0 0 L0 50 Q0 0 50 0",fill:"white"}}),t._v(" "),i("path",{attrs:{id:"topRight",d:"M50 0 L100 0 L100 50 Q100 0 50 0",fill:"white"}}),t._v(" "),i("path",{attrs:{id:"bottomLeft",d:"M0 50L0 100 L50 100 Q0 100 0 50",fill:"white"}}),t._v(" "),i("path",{attrs:{id:"bottomRight",d:"M100 50L100 100L50 100Q100 100 100 50",fill:"white"}}),t._v(" "),i("path",{attrs:{id:"border",d:"M50 0Q0 0 0 50Q0 100 50 100Q100 100 100 50Q100 0 50 0",fill:"none",stroke:"#0ab8f3","stroke-width":"1"}})])},s=[],o={render:n,staticRenderFns:s};e.a=o}},["NHnr"]);
//# sourceMappingURL=app.2942b6154652b9364655.js.map