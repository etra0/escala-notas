(this["webpackJsonpescala-notas"]=this["webpackJsonpescala-notas"]||[]).push([[0],{109:function(e,a,n){e.exports=n(121)},114:function(e,a,n){},115:function(e,a,n){},121:function(e,a,n){"use strict";n.r(a);var t=n(0),o=n.n(t),r=n(13),i=n.n(r),c=(n(114),n(6)),l=n(74),u=n(38),s=n(171),v=(n(115),n(172)),m=n(85),d=Object(u.a)({palette:{type:"dark"}});function f(e){var a=e.keyName,n=e.values,t=e.handler,r=n.name,i=n.value;return o.a.createElement("div",{className:"input-box"},o.a.createElement(l.a,{label:r,onChange:function(e){return t(a,e.target.value)},type:"number",fullWidth:!0,value:i,InputProps:"exigencia"===a?{endAdornment:"%"}:{},error:isNaN(i)||i<0}))}var p=function(){var e=Object(t.useState)({}),a=Object(c.a)(e,2),n=a[0],r=a[1];Object(t.useEffect)((function(){var e=JSON.parse(localStorage.getItem("data"))||{exigencia:{name:"Exigencia",value:60},notaAprobacion:{name:"Nota aprobaci\xf3n",value:4},notaMin:{name:"Nota m\xednima",value:2},notaMax:{name:"Nota m\xe1xima",value:7},puntajeMin:{name:"Puntaje m\xednimo",value:0},puntajeMax:{name:"Puntaje m\xe1ximo",value:100},incremento:{name:"Incremento",value:1}};r(e)}),[]);var i=Object(t.useState)([]),l=Object(c.a)(i,2),u=l[0],p=l[1],g=Object(t.useState)(!1),h=Object(c.a)(g,2),b=(h[0],h[1]),j=function(e,a){var t=JSON.parse(JSON.stringify(n));t[e].value=a,r(t)};Object(t.useEffect)((function(){var e=0===Object.keys(n).reduce((function(e,a){return e+("undefined"===typeof n[a].value||isNaN(parseFloat(n[a].value)))}),0);b(e);var a=JSON.parse(JSON.stringify(n));if(Object.keys(a).forEach((function(e){return a[e].values=parseFloat(a[e].values)})),!(0===Object.keys(a).length||a.incremento.value<=0)&&e){for(var t=function(e){var n=a.exigencia.value/100,t=a.puntajeMax.value*n,o=(a.notaAprobacion.value-a.notaMin.value)/(t-a.puntajeMin.value),r=a.notaMin.value-o*a.puntajeMin.value,i=(a.notaMax.value-a.notaAprobacion.value)/(a.puntajeMax.value-t),c=a.notaMax.value-i*a.puntajeMax.value;return e>=t?i*e+c:o*e+r},o=[],r=+a.puntajeMin.value,i=0;r<=+a.puntajeMax.value;r+=+a.incremento.value,i++)o.push({id:i,score:+r,grade:t(r).toFixed(1)});p(o),localStorage.setItem("data",JSON.stringify(a))}}),[n]);var w=[{field:"score",headerName:"Puntaje",width:150},{field:"grade",headerName:"Nota",width:150,cellClassName:function(e){return+e.value<+n.notaAprobacion.value?"rojo":""}}];return o.a.createElement(s.a,{theme:d},o.a.createElement("div",{className:"App"},o.a.createElement("div",{className:"App-body"},o.a.createElement("div",{className:"App-content"},o.a.createElement(v.a,{container:!0,spacing:3},o.a.createElement(v.a,{item:!0,xs:12,md:4},Object.keys(n).map((function(e){return o.a.createElement(f,{key:e,keyName:e,values:n[e],handler:j})}))),o.a.createElement(v.a,{item:!0,xs:12,md:8,style:{width:"100%",minHeight:"400px"}},o.a.createElement(m.a,{rows:u,columns:w,autoPageSize:!0})))))))},g=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function h(e,a){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),a&&a.onUpdate&&a.onUpdate(e)):(console.log("Content is cached for offline use."),a&&a.onSuccess&&a.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}i.a.render(o.a.createElement(p,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/escala-notas",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var a="".concat("/escala-notas","/service-worker.js");g?(!function(e,a){fetch(e).then((function(n){var t=n.headers.get("content-type");404===n.status||null!=t&&-1===t.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):h(e,a)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(a,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):h(a,e)}))}}()}},[[109,1,2]]]);
//# sourceMappingURL=main.245934ec.chunk.js.map