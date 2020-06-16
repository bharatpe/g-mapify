import e,{useState as n,useEffect as r,useRef as t}from"react";import o from"react-dom";import a from"classnames";function c(){return(c=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e}).apply(this,arguments)}function i(e,n){(null==n||n>e.length)&&(n=e.length);for(var r=0,t=new Array(n);r<n;r++)t[r]=e[r];return t}var s={mapContainer:"_THUc8",map:"_1sPx9","address-card":"_1XKj7","map-container":"_2_kUN","geo-address":"_16-L6",markerIcon:"_13l5f",defaultSearchPositoin:"_1H8GY",searchLoading:"_36eVq",mapTextarea:"_Lybmg",mapItemUL:"_1Iwzh",mapItem:"_2XwNY",searchH1:"_2z0jc",searchH2:"_2GzpA"};function l(e,n){return e(n={exports:{}},n.exports),n.exports
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */}var u="function"==typeof Symbol&&Symbol.for,f=u?Symbol.for("react.element"):60103,p=u?Symbol.for("react.portal"):60106,m=u?Symbol.for("react.fragment"):60107,d=u?Symbol.for("react.strict_mode"):60108,y=u?Symbol.for("react.profiler"):60114,v=u?Symbol.for("react.provider"):60109,g=u?Symbol.for("react.context"):60110,b=u?Symbol.for("react.async_mode"):60111,h=u?Symbol.for("react.concurrent_mode"):60111,S=u?Symbol.for("react.forward_ref"):60112,w=u?Symbol.for("react.suspense"):60113,E=u?Symbol.for("react.suspense_list"):60120,O=u?Symbol.for("react.memo"):60115,N=u?Symbol.for("react.lazy"):60116,_=u?Symbol.for("react.block"):60121,C=u?Symbol.for("react.fundamental"):60117,P=u?Symbol.for("react.responder"):60118,j=u?Symbol.for("react.scope"):60119;function x(e){if("object"==typeof e&&null!==e){var n=e.$$typeof;switch(n){case f:switch(e=e.type){case b:case h:case m:case y:case d:case w:return e;default:switch(e=e&&e.$$typeof){case g:case S:case N:case O:case v:return e;default:return n}}case p:return n}}}function $(e){return x(e)===h}var I={AsyncMode:b,ConcurrentMode:h,ContextConsumer:g,ContextProvider:v,Element:f,ForwardRef:S,Fragment:m,Lazy:N,Memo:O,Portal:p,Profiler:y,StrictMode:d,Suspense:w,isAsyncMode:function(e){return $(e)||x(e)===b},isConcurrentMode:$,isContextConsumer:function(e){return x(e)===g},isContextProvider:function(e){return x(e)===v},isElement:function(e){return"object"==typeof e&&null!==e&&e.$$typeof===f},isForwardRef:function(e){return x(e)===S},isFragment:function(e){return x(e)===m},isLazy:function(e){return x(e)===N},isMemo:function(e){return x(e)===O},isPortal:function(e){return x(e)===p},isProfiler:function(e){return x(e)===y},isStrictMode:function(e){return x(e)===d},isSuspense:function(e){return x(e)===w},isValidElementType:function(e){return"string"==typeof e||"function"==typeof e||e===m||e===h||e===y||e===d||e===w||e===E||"object"==typeof e&&null!==e&&(e.$$typeof===N||e.$$typeof===O||e.$$typeof===v||e.$$typeof===g||e.$$typeof===S||e.$$typeof===C||e.$$typeof===P||e.$$typeof===j||e.$$typeof===_)},typeOf:x},T=l(function(e,n){"production"!==process.env.NODE_ENV&&function(){var e="function"==typeof Symbol&&Symbol.for,r=e?Symbol.for("react.element"):60103,t=e?Symbol.for("react.portal"):60106,o=e?Symbol.for("react.fragment"):60107,a=e?Symbol.for("react.strict_mode"):60108,c=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,s=e?Symbol.for("react.context"):60110,l=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,f=e?Symbol.for("react.forward_ref"):60112,p=e?Symbol.for("react.suspense"):60113,m=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,v=e?Symbol.for("react.block"):60121,g=e?Symbol.for("react.fundamental"):60117,b=e?Symbol.for("react.responder"):60118,h=e?Symbol.for("react.scope"):60119;function S(e){if("object"==typeof e&&null!==e){var n=e.$$typeof;switch(n){case r:var m=e.type;switch(m){case l:case u:case o:case c:case a:case p:return m;default:var v=m&&m.$$typeof;switch(v){case s:case f:case y:case d:case i:return v;default:return n}}case t:return n}}}var w=u,E=s,O=i,N=r,_=f,C=o,P=y,j=d,x=t,$=c,I=a,T=p,k=!1;function A(e){return S(e)===u}n.AsyncMode=l,n.ConcurrentMode=w,n.ContextConsumer=E,n.ContextProvider=O,n.Element=N,n.ForwardRef=_,n.Fragment=C,n.Lazy=P,n.Memo=j,n.Portal=x,n.Profiler=$,n.StrictMode=I,n.Suspense=T,n.isAsyncMode=function(e){return k||(k=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),A(e)||S(e)===l},n.isConcurrentMode=A,n.isContextConsumer=function(e){return S(e)===s},n.isContextProvider=function(e){return S(e)===i},n.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===r},n.isForwardRef=function(e){return S(e)===f},n.isFragment=function(e){return S(e)===o},n.isLazy=function(e){return S(e)===y},n.isMemo=function(e){return S(e)===d},n.isPortal=function(e){return S(e)===t},n.isProfiler=function(e){return S(e)===c},n.isStrictMode=function(e){return S(e)===a},n.isSuspense=function(e){return S(e)===p},n.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===o||e===u||e===c||e===a||e===p||e===m||"object"==typeof e&&null!==e&&(e.$$typeof===y||e.$$typeof===d||e.$$typeof===i||e.$$typeof===s||e.$$typeof===f||e.$$typeof===g||e.$$typeof===b||e.$$typeof===h||e.$$typeof===v)},n.typeOf=S}()}),k=l(function(e){e.exports="production"===process.env.NODE_ENV?I:T}),A=Object.getOwnPropertySymbols,M=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;function L(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}var V=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var n={},r=0;r<10;r++)n["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(n).map(function(e){return n[e]}).join(""))return!1;var t={};return"abcdefghijklmnopqrst".split("").forEach(function(e){t[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},t)).join("")}catch(e){return!1}}()?Object.assign:function(e,n){for(var r,t,o=L(e),a=1;a<arguments.length;a++){for(var c in r=Object(arguments[a]))M.call(r,c)&&(o[c]=r[c]);if(A){t=A(r);for(var i=0;i<t.length;i++)R.call(r,t[i])&&(o[t[i]]=r[t[i]])}}return o},z="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",F=function(){};if("production"!==process.env.NODE_ENV){var q=z,D={},H=Function.call.bind(Object.prototype.hasOwnProperty);F=function(e){var n="Warning: "+e;"undefined"!=typeof console&&console.error(n);try{throw new Error(n)}catch(e){}}}function U(e,n,r,t,o){if("production"!==process.env.NODE_ENV)for(var a in e)if(H(e,a)){var c;try{if("function"!=typeof e[a]){var i=Error((t||"React class")+": "+r+" type `"+a+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[a]+"`.");throw i.name="Invariant Violation",i}c=e[a](n,a,t,r,null,q)}catch(e){c=e}if(!c||c instanceof Error||F((t||"React class")+": type specification of "+r+" `"+a+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof c+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),c instanceof Error&&!(c.message in D)){D[c.message]=!0;var s=o?o():"";F("Failed "+r+" type: "+c.message+(null!=s?s:""))}}}U.resetWarningCache=function(){"production"!==process.env.NODE_ENV&&(D={})};var K=U,W=Function.call.bind(Object.prototype.hasOwnProperty),J=function(){};function Y(){return null}function G(){}function X(){}"production"!==process.env.NODE_ENV&&(J=function(e){var n="Warning: "+e;"undefined"!=typeof console&&console.error(n);try{throw new Error(n)}catch(e){}}),X.resetWarningCache=G;var B=l(function(e){e.exports="production"!==process.env.NODE_ENV?function(e,n){var r="function"==typeof Symbol&&Symbol.iterator,t={array:i("array"),bool:i("boolean"),func:i("function"),number:i("number"),object:i("object"),string:i("string"),symbol:i("symbol"),any:c(Y),arrayOf:function(e){return c(function(n,r,t,o,c){if("function"!=typeof e)return new a("Property `"+c+"` of component `"+t+"` has invalid PropType notation inside arrayOf.");var i=n[r];if(!Array.isArray(i))return new a("Invalid "+o+" `"+c+"` of type `"+l(i)+"` supplied to `"+t+"`, expected an array.");for(var s=0;s<i.length;s++){var u=e(i,s,t,o,c+"["+s+"]",z);if(u instanceof Error)return u}return null})},element:c(function(n,r,t,o,c){var i=n[r];return e(i)?null:new a("Invalid "+o+" `"+c+"` of type `"+l(i)+"` supplied to `"+t+"`, expected a single ReactElement.")}),elementType:c(function(e,n,r,t,o){var c=e[n];return k.isValidElementType(c)?null:new a("Invalid "+t+" `"+o+"` of type `"+l(c)+"` supplied to `"+r+"`, expected a single ReactElement type.")}),instanceOf:function(e){return c(function(n,r,t,o,c){var i;return n[r]instanceof e?null:new a("Invalid "+o+" `"+c+"` of type `"+((i=n[r]).constructor&&i.constructor.name?i.constructor.name:"<<anonymous>>")+"` supplied to `"+t+"`, expected instance of `"+(e.name||"<<anonymous>>")+"`.")})},node:c(function(e,n,r,t,o){return s(e[n])?null:new a("Invalid "+t+" `"+o+"` supplied to `"+r+"`, expected a ReactNode.")}),objectOf:function(e){return c(function(n,r,t,o,c){if("function"!=typeof e)return new a("Property `"+c+"` of component `"+t+"` has invalid PropType notation inside objectOf.");var i=n[r],s=l(i);if("object"!==s)return new a("Invalid "+o+" `"+c+"` of type `"+s+"` supplied to `"+t+"`, expected an object.");for(var u in i)if(W(i,u)){var f=e(i,u,t,o,c+"."+u,z);if(f instanceof Error)return f}return null})},oneOf:function(e){if(!Array.isArray(e))return"production"!==process.env.NODE_ENV&&J(arguments.length>1?"Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).":"Invalid argument supplied to oneOf, expected an array."),Y;function n(n,r,t,c,i){for(var s=n[r],l=0;l<e.length;l++)if(o(s,e[l]))return null;var f=JSON.stringify(e,function(e,n){return"symbol"===u(n)?String(n):n});return new a("Invalid "+c+" `"+i+"` of value `"+String(s)+"` supplied to `"+t+"`, expected one of "+f+".")}return c(n)},oneOfType:function(e){if(!Array.isArray(e))return"production"!==process.env.NODE_ENV&&J("Invalid argument supplied to oneOfType, expected an instance of array."),Y;for(var n=0;n<e.length;n++){var r=e[n];if("function"!=typeof r)return J("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+f(r)+" at index "+n+"."),Y}return c(function(n,r,t,o,c){for(var i=0;i<e.length;i++)if(null==(0,e[i])(n,r,t,o,c,z))return null;return new a("Invalid "+o+" `"+c+"` supplied to `"+t+"`.")})},shape:function(e){return c(function(n,r,t,o,c){var i=n[r],s=l(i);if("object"!==s)return new a("Invalid "+o+" `"+c+"` of type `"+s+"` supplied to `"+t+"`, expected `object`.");for(var u in e){var f=e[u];if(f){var p=f(i,u,t,o,c+"."+u,z);if(p)return p}}return null})},exact:function(e){return c(function(n,r,t,o,c){var i=n[r],s=l(i);if("object"!==s)return new a("Invalid "+o+" `"+c+"` of type `"+s+"` supplied to `"+t+"`, expected `object`.");var u=V({},n[r],e);for(var f in u){var p=e[f];if(!p)return new a("Invalid "+o+" `"+c+"` key `"+f+"` supplied to `"+t+"`.\nBad object: "+JSON.stringify(n[r],null,"  ")+"\nValid keys: "+JSON.stringify(Object.keys(e),null,"  "));var m=p(i,f,t,o,c+"."+f,z);if(m)return m}return null})}};function o(e,n){return e===n?0!==e||1/e==1/n:e!=e&&n!=n}function a(e){this.message=e,this.stack=""}function c(e){function n(n,r,t,o,c,i,s){if(o=o||"<<anonymous>>",i=i||t,s!==z){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}return null==r[t]?n?new a(null===r[t]?"The "+c+" `"+i+"` is marked as required in `"+o+"`, but its value is `null`.":"The "+c+" `"+i+"` is marked as required in `"+o+"`, but its value is `undefined`."):null:e(r,t,o,c,i)}process;var r=n.bind(null,!1);return r.isRequired=n.bind(null,!0),r}function i(e){return c(function(n,r,t,o,c,i){var s=n[r];return l(s)!==e?new a("Invalid "+o+" `"+c+"` of type `"+u(s)+"` supplied to `"+t+"`, expected `"+e+"`."):null})}function s(n){switch(typeof n){case"number":case"string":case"undefined":return!0;case"boolean":return!n;case"object":if(Array.isArray(n))return n.every(s);if(null===n||e(n))return!0;var t=function(e){var n=e&&(r&&e[r]||e["@@iterator"]);if("function"==typeof n)return n}(n);if(!t)return!1;var o,a=t.call(n);if(t!==n.entries){for(;!(o=a.next()).done;)if(!s(o.value))return!1}else for(;!(o=a.next()).done;){var c=o.value;if(c&&!s(c[1]))return!1}return!0;default:return!1}}function l(e){var n=typeof e;return Array.isArray(e)?"array":e instanceof RegExp?"object":function(e,n){return"symbol"===e||!!n&&("Symbol"===n["@@toStringTag"]||"function"==typeof Symbol&&n instanceof Symbol)}(n,e)?"symbol":n}function u(e){if(null==e)return""+e;var n=l(e);if("object"===n){if(e instanceof Date)return"date";if(e instanceof RegExp)return"regexp"}return n}function f(e){var n=u(e);switch(n){case"array":case"object":return"an "+n;case"boolean":case"date":case"regexp":return"a "+n;default:return n}}return a.prototype=Error.prototype,t.checkPropTypes=K,t.resetWarningCache=K.resetWarningCache,t.PropTypes=t,t}(k.isElement):function(){function e(e,n,r,t,o,a){if(a!==z){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function n(){return e}e.isRequired=e;var r={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:n,element:e,elementType:e,instanceOf:n,node:e,objectOf:n,oneOf:n,oneOfType:n,shape:n,exact:n,checkPropTypes:X,resetWarningCache:G};return r.PropTypes=r,r}()}),Q=require("./left-arrow~EgzQkufV.svg"),Z=function(t){var o=t.placeholder,c=t.className,i=n(!0),s=i[0],l=i[1],u=e.createRef();return r(function(){u.current.focus()},[u]),e.createElement("div",{className:a("_14K7s",c,s?"_17s3a":"_23bw5"),onTransitionEnd:function(e){console.log("onTransitionEndEvent -> event",e),t.onClose()}},e.createElement("div",{className:"_3n9r_"},e.createElement("div",{className:"img-sec",onClick:function(){return l(!1)}},e.createElement("img",{src:Q})),e.createElement("input",{type:"text",className:"_1DPib",onChange:function(e){var n,r;console.log("Searching ...",null==e||null===(n=e.target)||void 0===n?void 0:n.value),t.onChange(null==e||null===(r=e.target)||void 0===r?void 0:r.value)},ref:u,placeholder:o})),t.children)};Z.propTypes={placeHolder:B.string,onChange:B.func,onClose:B.func},Z.defaultProps={placeHolder:"Search here",onChange:function(){},onClose:function(){}};var ee={zoom:15,zoomControl:!1,mapTypeControl:!1,fullscreenControl:!1,streetViewControl:!1,clickableIcons:!1,mapTypeId:"roadmap"},ne=function(n){return e.createElement("textarea",c({},n,{placeholder:"Search Location",className:a(s.mapTextarea,n.className)}))},re=function(i){var l=i.appKey,u=i.lat,f=i.lng,p=i.mapOptions,m=i.mapClassName,d=i.hasMarker,y=i.hasSearch,v=i.mapSearchPlace,g=i.debounceTime,b=i.inputClassName,h=i.markerIcon,S=i.searchPlaceHolder,w=i.searchClassName,E=i.libraries,O=i.children,N=i.onSelect,_=n([]),C=_[0],P=_[1],j=n(!1),x=j[0],$=j[1],I=n(1),T=I[0],k=I[1],A=n(!1),M=A[0],R=A[1],L=n({}),V=L[0],z=L[1],F=n(""),q=F[0],D=F[1],H=n(null),U=H[0],K=H[1],W=t(null),J=t(null),Y=function(){v&&(J={current:document.querySelector(v)}),G(u,f)},G=function(e,n){if(window.google){var r={center:new window.google.maps.LatLng(e,n)};console.log("MAP INSTANXE",W.current),W.current&&K(new window.google.maps.Map(W.current,c({},r,ee,p)))}else console.error("google map library not found!")},X=function(){y&&(J.current?o.render(e.createElement(ne,{value:q,onFocus:function(){return $(!0)},className:b}),J.current):console.error("mapSearchPlace element not found!","Selector = ",v))},B=function(e,n){var r={lat:e,lng:n};U.setCenter(r),U.panTo(r),V.lat!==r.lat&&V.lng!==r.lng&&(D("Loading..."),Q(r).then(function(e,n){D(e.formatted_address),te(!0,e,n)},function(e){D("Unable to fetch location"),te(!1,{},e)})),z(r)},Q=function(e){var n=new window.google.maps.Geocoder;return new Promise(function(r,t){n.geocode({location:e},function(e,n){"OK"===n?e[0]?r(e[0],n):t(-1):t(n)})})},re=function(e){e&&e.length<3||(k(0),function(e){return new Promise(function(n,r){var t={query:e,fields:["name","formatted_address","geometry"]},o=new window.google.maps.places.PlacesService(U);console.log("Service",o,U),o.textSearch(t,function(e,t){t===window.google.maps.places.PlacesServiceStatus.OK?n(e,t):r(t)})})}(e).then(function(e){P(e),k(1)},function(){P(C),k(-1)}))},te=function(e,n,r){if(N&&"function"==typeof N){var t=JSON.parse(JSON.stringify(n));N(e,t,r)}};return r(function(){l?(function(){if(document.head.querySelector("#google-map"))Y();else{window.gm_authFailure=function(){R(!0),te(!1,{message:"Map load failed!"},-1)};var e=document.createElement("script");e.src="https://maps.googleapis.com/maps/api/js?key="+l+"&callback=initMapScript&libraries="+E,e.setAttribute("id","google-map"),document.querySelector("head").appendChild(e)}}(),window.initMapScript=function(){var e,n,r;console.log("Map script successfull"),Y(),e=re,n=g,r=null,re=function(){for(var t=this,o=arguments.length,a=new Array(o),c=0;c<o;c++)a[c]=arguments[c];clearTimeout(r),r=setTimeout(function(){e.apply(t,a)},n)}}):console.error("google map appKey not found!!!")},[l]),r(function(){U&&(B(u,f),U&&d&&(U.addListener("dragend",function(){B(U.center.lat(),U.center.lng())}),U.addListener("zoom_changed",function(){B(V.lat,V.lng)})),X())},[U]),r(function(){q&&X()},[q]),r(function(){return function(){window.google&&U&&(window.google.maps.event.clearListeners(U,"dragend"),window.google.maps.event.clearListeners(U,"zoom_changed"))}},[]),e.createElement("div",{className:a(s.mapContainer,m)},e.createElement("div",{ref:W,className:s.map}),d&&!M&&e.createElement("div",{className:s.markerIcon,style:{backgroundImage:"url("+h+")"}}," "),y&&!M&&!v&&e.createElement("div",{ref:J,className:s.defaultSearchPositoin}),O,x&&!M&&e.createElement(Z,{onClose:function(){return $(!1)},onChange:function(e){re(e)},placeholder:S,className:w},e.createElement("div",{className:s.searchResultContainer},e.createElement("div",{className:s.searchLoading},0===T&&"Loading...",-1===T&&"No Results Found"),e.createElement("ul",{onClick:function(e){var n=e.target&&e.target.closest(".mapItem");if(n.hasAttribute("index")){var r=C[Number(n.getAttribute("index"))];$(!1),B(r.geometry.location.lat(),r.geometry.location.lng())}},className:a(s.mapItemUL,"mapItem")},C.map(function(n,r){return e.createElement("li",{key:r,index:r,className:a(s.mapItem,"mapItem")},e.createElement("div",{className:s.searchH1},n.name),e.createElement("div",{className:s.searchH2},n.formatted_address))})))))};re.propTypes={appKey:B.string,lat:B.number,lng:B.number,mapOptions:B.object,mapClassName:B.string,hasMarker:B.bool,hasSearch:B.bool,mapSearchPlace:B.string,debounceTime:B.number,inputClassName:B.string,markerIcon:B.string,searchPlaceHolder:B.string,searchClassName:B.string,libraries:B.string,onSelect:B.func,children:B.element},re.defaultProps={appKey:"",lat:28.7041,lng:77.1025,mapOptions:{},mapClassName:"",hasMarker:!0,hasSearch:!1,mapSearchPlace:"",debounceTime:1e3,inputClassName:"",markerIcon:"https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",searchPlaceHolder:"Search here",searchClassName:"",libraries:"places",onSelect:function(){},children:null};var te=function(e){return void 0===e&&(e=[]),function e(n,r,t){if(void 0===n&&(n=[]),void 0===r&&(r=0),void 0===t&&(t={}),n.length<1)return t;var o=n[r];if(!o)return t;var a=o.long_name;if(n.length>r){for(var c,s=function(e,n){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=function(e,n){if(e){if("string"==typeof e)return i(e,void 0);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?i(e,void 0):void 0}}(e))){r&&(e=r);var t=0;return function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(r=e[Symbol.iterator]()).next.bind(r)}(o.types);!(c=s()).done;)switch(c.value){case"postal_code":t.pin=a;break;case"country":t.country=a;break;case"administrative_area_level_1":t.state=a;break;case"locality":t.locality=a;break;case"sublocality":t.sublocality=t.sublocality?t.sublocality+", "+a:a}return e(n,++r,t)}return t}(e)};export{te as AddressFormatter,re as GMapify};
