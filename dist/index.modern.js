import e,{useState as r,useEffect as n,useRef as t}from"react";import o from"react-dom";function a(){return(a=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e}).apply(this,arguments)}function c(e,r){(null==r||r>e.length)&&(r=e.length);for(var n=0,t=new Array(r);n<r;n++)t[n]=e[n];return t}var i={mapContainer:"_THUc8",map:"_1sPx9","address-card":"_1XKj7","map-container":"_2_kUN","geo-address":"_16-L6",markerIcon:"_13l5f",defaultSearchPosition:"_1e2LW",searchLoading:"_36eVq",mapItemUL:"_1Iwzh",mapItem:"_2XwNY",searchH1:"_2z0jc",searchH2:"_2GzpA"};function l(e,r){return e(r={exports:{}},r.exports),r.exports}var s=l(function(e){
/*!
    Copyright (c) 2017 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
  */
!function(){var r={}.hasOwnProperty;function n(){for(var e=[],t=0;t<arguments.length;t++){var o=arguments[t];if(o){var a=typeof o;if("string"===a||"number"===a)e.push(o);else if(Array.isArray(o)&&o.length){var c=n.apply(null,o);c&&e.push(c)}else if("object"===a)for(var i in o)r.call(o,i)&&o[i]&&e.push(i)}}return e.join(" ")}e.exports?(n.default=n,e.exports=n):window.classNames=n}()}),u="function"==typeof Symbol&&Symbol.for,m=u?Symbol.for("react.element"):60103,f=u?Symbol.for("react.portal"):60106,p=u?Symbol.for("react.fragment"):60107,d=u?Symbol.for("react.strict_mode"):60108,g=u?Symbol.for("react.profiler"):60114,y=u?Symbol.for("react.provider"):60109,h=u?Symbol.for("react.context"):60110,b=u?Symbol.for("react.async_mode"):60111,v=u?Symbol.for("react.concurrent_mode"):60111,w=u?Symbol.for("react.forward_ref"):60112,S=u?Symbol.for("react.suspense"):60113,_=u?Symbol.for("react.suspense_list"):60120,C=u?Symbol.for("react.memo"):60115,N=u?Symbol.for("react.lazy"):60116,k=u?Symbol.for("react.block"):60121,P=u?Symbol.for("react.fundamental"):60117,E=u?Symbol.for("react.responder"):60118,O=u?Symbol.for("react.scope"):60119;
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function j(e){if("object"==typeof e&&null!==e){var r=e.$$typeof;switch(r){case m:switch(e=e.type){case b:case v:case p:case g:case d:case S:return e;default:switch(e=e&&e.$$typeof){case h:case w:case N:case C:case y:return e;default:return r}}case f:return r}}}function M(e){return j(e)===v}var I={AsyncMode:b,ConcurrentMode:v,ContextConsumer:h,ContextProvider:y,Element:m,ForwardRef:w,Fragment:p,Lazy:N,Memo:C,Portal:f,Profiler:g,StrictMode:d,Suspense:S,isAsyncMode:function(e){return M(e)||j(e)===b},isConcurrentMode:M,isContextConsumer:function(e){return j(e)===h},isContextProvider:function(e){return j(e)===y},isElement:function(e){return"object"==typeof e&&null!==e&&e.$$typeof===m},isForwardRef:function(e){return j(e)===w},isFragment:function(e){return j(e)===p},isLazy:function(e){return j(e)===N},isMemo:function(e){return j(e)===C},isPortal:function(e){return j(e)===f},isProfiler:function(e){return j(e)===g},isStrictMode:function(e){return j(e)===d},isSuspense:function(e){return j(e)===S},isValidElementType:function(e){return"string"==typeof e||"function"==typeof e||e===p||e===v||e===g||e===d||e===S||e===_||"object"==typeof e&&null!==e&&(e.$$typeof===N||e.$$typeof===C||e.$$typeof===y||e.$$typeof===h||e.$$typeof===w||e.$$typeof===P||e.$$typeof===E||e.$$typeof===O||e.$$typeof===k)},typeOf:j};function L(){}function T(){}l(function(e,r){}),l(function(e){e.exports=I}),function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var r={},n=0;n<10;n++)r["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(r).map(function(e){return r[e]}).join(""))return!1;var t={};"abcdefghijklmnopqrst".split("").forEach(function(e){t[e]=e}),Object.keys(Object.assign({},t)).join("")}catch(e){return!1}}(),Function.call.bind(Object.prototype.hasOwnProperty),T.resetWarningCache=L;var $=l(function(e){e.exports=function(){function e(e,r,n,t,o,a){if("SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"!==a){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function r(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:r,element:e,elementType:e,instanceOf:r,node:e,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:T,resetWarningCache:L};return n.PropTypes=n,n}()}),x=require("./left-arrow~EgzQkufV.svg"),A=function(t){var o=t.placeholder,a=t.className,c=r(!0),i=c[0],l=c[1],u=e.createRef();return n(function(){u.current.focus()},[u]),e.createElement("div",{className:s("_14K7s",a,i?"_17s3a":"_23bw5"),onTransitionEnd:function(e){t.onClose()}},e.createElement("div",{className:"_3n9r_"},e.createElement("div",{className:"img-sec",onClick:function(){return l(!1)}},e.createElement("img",{src:x})),e.createElement("input",{type:"text",className:"_1DPib",onChange:function(e){var r;t.onChange(null==e||null===(r=e.target)||void 0===r?void 0:r.value)},ref:u,placeholder:o})),t.children)};A.propTypes={placeHolder:$.string,onChange:$.func,onClose:$.func},A.defaultProps={placeHolder:"Search here",onChange:function(){},onClose:function(){}};var z=require("./marker~fVJYJDHQ.svg"),H={zoom:15,zoomControl:!1,mapTypeControl:!1,fullscreenControl:!1,streetViewControl:!1,clickableIcons:!1,mapTypeId:"roadmap"},q=require("./search-icon~gbikSNDM.png"),R=function(r){return e.createElement("div",a({},r,{className:s("_1tqcp",r.className)}),e.createElement("div",{className:"_14pA0"}),e.createElement("div",{className:"_4A79G"},e.createElement("span",{className:"_1X7J4"}," Location "),e.createElement("span",{className:"_BXP-z"},r.value)),e.createElement("img",{src:q,className:"_lEzl3"}))},F=function(c){var l=c.appKey,u=c.mapOptions,m=c.mapClassName,f=c.hasMarker,p=c.hasSearch,d=c.mapSearchPlace,g=c.debounceTime,y=c.inputClassName,h=c.markerIcon,b=c.searchPlaceHolder,v=c.searchClassName,w=c.libraries,S=c.children,_=c.onSelect,C=c.customMarkers,N=c.autoCenter,k=c.allowSinglePopup,P=c.lat,E=c.lng,O=r([]),j=O[0],M=O[1],I=r(!1),L=I[0],T=I[1],$=r(1),x=$[0],z=$[1],q=r(!1),F=q[0],K=q[1],U=r({}),V=U[0],W=U[1],D=r(""),J=D[0],X=D[1],G=r(null),B=G[0],Y=G[1];C&&C.length>0&&(P=C[0][0],E=C[0][1]);var Q,Z,ee,re=t(null),ne=t(null),te=function(){d&&(ne={current:document.querySelector(d)}),oe(P,E)},oe=function(e,r){if(window.google){var n={center:new window.google.maps.LatLng(e,r)};console.log("MAP INSTANXE",re.current),re.current&&Y(new window.google.maps.Map(re.current,a({},n,H,u)))}else console.error("google map library not found!")},ae=function(){p&&(ne.current?o.render(e.createElement(R,{value:J,onClick:function(){return T(!0)},className:y}),ne.current):console.error("mapSearchPlace element not found!","Selector = ",d))},ce=function(e,r){var n={lat:e,lng:r};B.setCenter(n),B.panTo(n),V.lat!==n.lat&&V.lng!==n.lng&&(X("Searching..."),function(e){var r=new window.google.maps.Geocoder;return new Promise(function(n,t){r.geocode({location:e},function(e,r){"OK"===r?e[0]?n(e[0],r):t(-1):t(r)})})}(n).then(function(e,r){X(e.formatted_address),le(!0,e,r)},function(e){X("Unable to fetch location"),le(!1,{},e)})),console.log("setMapLastPosition",n),W(n)},ie=(Q=function(e){e&&e.length<3||(z(0),M([]),function(e){return new Promise(function(r,n){var t={query:e,fields:["name","formatted_address","geometry"]};new window.google.maps.places.PlacesService(B).textSearch(t,function(e,t){t===window.google.maps.places.PlacesServiceStatus.OK?r(e,t):n(t)})})}(e).then(function(e){M(e),z(1)},function(){z(-1)}))},Z=g,ee=null,function(){for(var e=this,r=arguments.length,n=new Array(r),t=0;t<r;t++)n[t]=arguments[t];clearTimeout(ee),ee=setTimeout(function(){Q.apply(e,n)},Z)}),le=function(e,r,n){if(_&&"function"==typeof _){var t=JSON.parse(JSON.stringify(r));_(e,t,n)}};return n(function(){l?(document.head.querySelector("#google-map")?te():(window.gm_authFailure=function(){K(!0),le(!1,{message:"Map load failed!"},-1)},function(e,r){var n=document.createElement("script");n.src=function(e,r){return"https://maps.googleapis.com/maps/api/js?key="+e+"&callback=initMapScript&libraries="+r}(e,r),n.setAttribute("id","google-map"),document.querySelector("head").appendChild(n)}(l,w)),window.initMapScript=function(){console.log("Map script successfull"),te()}):console.error("google map appKey not found!!!")},[l]),n(function(){B&&(ce(P,E),ae(),function(){if(C){var e=null;C.forEach(function(r){console.log("Setting marker",r,new window.google.maps.LatLng(r[0],r[1]),B);var n=new window.google.maps.Marker({position:new window.google.maps.LatLng(r[0],r[1]),map:B,title:"Hello World!",visible:!0,icon:h});r[2]&&n.addListener("click",function(){k&&e&&e.close(),(e=new window.google.maps.InfoWindow({content:r[2]})).open(B,n)}),n.setMap(B)})}}())},[B]),n(function(){J&&ae()},[J]),n(function(){return B&&f&&N&&(B.addListener("dragend",function(){ce(B.center.lat(),B.center.lng())}),B.addListener("zoom_changed",function(){console.log("Last position",V),ce(V.lat,V.lng)})),function(){window.google&&B&&(window.google.maps.event.clearListeners(B,"dragend"),window.google.maps.event.clearListeners(B,"zoom_changed"))}},[V]),e.createElement("div",{className:s(i.mapContainer,m)},e.createElement("div",{ref:re,className:i.map}),f&&N&&!F&&e.createElement("div",{className:i.markerIcon,style:{backgroundImage:"url("+h+")"}}," "),p&&!F&&!d&&e.createElement("div",{ref:ne,className:i.defaultSearchPosition}),S,L&&!F&&e.createElement(A,{onClose:function(){return T(!1)},onChange:function(e){ie(e)},placeholder:b,className:v},e.createElement("div",{className:i.searchResultContainer},e.createElement("div",{className:i.searchLoading},0===x&&"Loading...",-1===x&&"No Results Found"),e.createElement("ul",{onClick:function(e){var r=e.target&&e.target.closest(".mapItem");if(r.hasAttribute("index")){var n=j[Number(r.getAttribute("index"))];T(!1),ce(n.geometry.location.lat(),n.geometry.location.lng())}},className:s(i.mapItemUL,"mapItem")},j.map(function(r,n){return e.createElement("li",{key:n,index:n,className:s(i.mapItem,"mapItem")},e.createElement("div",{className:i.searchH1},r.name),e.createElement("div",{className:i.searchH2},r.formatted_address))})))))};F.propTypes={appKey:$.string,lat:$.number,lng:$.number,mapOptions:$.object,mapClassName:$.string,hasMarker:$.bool,hasSearch:$.bool,autoCenter:$.bool,mapSearchPlace:$.string,debounceTime:$.number,inputClassName:$.string,markerIcon:$.string,searchPlaceHolder:$.string,searchClassName:$.string,libraries:$.string,onSelect:$.func,children:$.element,customMarkers:$.array,allowSinglePopup:$.bool},F.defaultProps={appKey:"",lat:28.7041,lng:77.1025,mapOptions:{},mapClassName:"",hasMarker:!0,hasSearch:!1,autoCenter:!0,mapSearchPlace:"",debounceTime:1e3,inputClassName:"",markerIcon:z,searchPlaceHolder:"Search here",searchClassName:"",libraries:"places",onSelect:function(){},children:null,customMarkers:[],allowSinglePopup:!0};var K=function(e){return void 0===e&&(e=[]),function e(r,n,t){if(void 0===r&&(r=[]),void 0===n&&(n=0),void 0===t&&(t={}),r.length<1)return t;var o=r[n];if(!o)return t;var a=o.long_name;if(r.length>n){for(var i,l=function(e,r){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,r){if(e){if("string"==typeof e)return c(e,void 0);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(e,void 0):void 0}}(e))){n&&(e=n);var t=0;return function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}(o.types);!(i=l()).done;)switch(i.value){case"street_number":case"premise":t.streetNumber=a;break;case"route":t.route=a;break;case"postal_code":t.pin=a;break;case"country":t.country=a;break;case"administrative_area_level_1":t.state=a;break;case"locality":t.locality=a;break;case"sublocality":t.sublocality=t.sublocality?t.sublocality+", "+a:a}return e(r,++n,t)}return t}(e)},U=require("../package.json");console.log(" >> 🗺🗺🗺 G-Mapify : Version: "+U.version+", Build: production <<");export{K as AddressFormatter,F as GMapify};
