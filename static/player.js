!function(){"use strict";function l(e){if(r(e)){for(;e&&r(e);)e=o(e).parent;return null!=e?e:null}return e.parentNode}function r(e){return 11===e.nodeType}function o(e,t){var n=e;return null==n.parent&&(n.parent=null!=t?t:null),null==n.firstChildNode&&(n.firstChildNode=e.firstChild),null==n.lastChildNode&&(n.lastChildNode=e.lastChild),n}const C={createElement:function(e,t){return document.createElement(e,t)},createElementNS:function(e,t,n){return document.createElementNS(e,t,n)},createTextNode:function(e){return document.createTextNode(e)},createDocumentFragment:function(){return o(document.createDocumentFragment())},createComment:function(e){return document.createComment(e)},insertBefore:function(t,e,n){if(r(t)){let e=t;for(;e&&r(e);){var l=o(e);e=l.parent}t=null!==e&&void 0!==e?e:t}r(e)&&(e=o(e,t)),n&&r(n)&&(n=o(n).firstChildNode),t.insertBefore(e,n)},removeChild:function(e,t){e.removeChild(t)},appendChild:function(e,t){r(t)&&(t=o(t,e)),e.appendChild(t)},parentNode:l,nextSibling:function(e){var t,n;return r(e)?(t=l(n=o(e)))&&n.lastChildNode&&(n=(t=Array.from(t.childNodes)).indexOf(n.lastChildNode),null!=(t=t[n+1]))?t:null:e.nextSibling},tagName:function(e){return e.tagName},setTextContent:function(e,t){e.textContent=t},getTextContent:function(e){return e.textContent},isElement:function(e){return 1===e.nodeType},isText:function(e){return 3===e.nodeType},isComment:function(e){return 8===e.nodeType},isDocumentFragment:r};function N(e,t,n,l,r){return{sel:e,data:t,children:n,text:l,elm:r,key:void 0===t?void 0:t.key}}const T=Array.isArray;function b(e){return"string"==typeof e||"number"==typeof e||e instanceof String||e instanceof Number}function k(e){return void 0===e}function w(e){return void 0!==e}const E=N("",{},[],void 0,void 0);function S(e,t){var n=e.key===t.key,l=(null==(l=e.data)?void 0:l.is)===(null==(l=t.data)?void 0:l.is),r=e.sel===t.sel,e=!(!e.sel&&e.sel===t.sel)||typeof e.text==typeof t.text;return r&&n&&l&&e}function L(){throw new Error("The document fragment is not supported on this platform.")}const i=["create","update","remove","destroy","pre","post"];function m(e,t,n){if(e.ns="http://www.w3.org/2000/svg","foreignObject"!==n&&void 0!==t)for(let e=0;e<t.length;++e){var l,r=t[e];"string"!=typeof r&&void 0!==(l=r.data)&&m(l,r.children,r.sel)}}function t(e,t,n){let l={},r,o,i;if(void 0!==n?(null!==t&&(l=t),T(n)?r=n:b(n)?o=n.toString():n&&n.sel&&(r=[n])):null!=t&&(T(t)?r=t:b(t)?o=t.toString():t&&t.sel?r=[t]:l=t),void 0!==r)for(i=0;i<r.length;++i)b(r[i])&&(r[i]=N(void 0,void 0,void 0,r[i],void 0));return"s"!==e[0]||"v"!==e[1]||"g"!==e[2]||3!==e.length&&"."!==e[3]&&"#"!==e[3]||m(l,r,e),N(e,l,r,o,void 0)}function e(e,t){var n;let l;var r=t.elm,o=e.data.class,i=t.data.class;if((o||i)&&o!==i){for(l in i=i||{},o=o||{})o[l]&&!Object.prototype.hasOwnProperty.call(i,l)&&r.classList.remove(l);for(l in i)(n=i[l])!==o[l]&&r.classList[n?"add":"remove"](l)}}var n={create:e,update:e};function u(e,t){var n=e.type,l=t.data.on;l&&l[n]&&!function t(n,l,r){if("function"==typeof n)n.call(l,r,l);else if("object"==typeof n)for(let e=0;e<n.length;e++)t(n[e],l,r)}(l[n],t,e)}function a(e,t){var n=e.data.on,l=e.listener,r=e.elm,o=t&&t.data.on,i=t&&t.elm;let a;if(n!==o){if(n&&l)if(o)for(a in n)o[a]||r.removeEventListener(a,l,!1);else for(a in n)r.removeEventListener(a,l,!1);if(o){var d=t.listener=e.listener||function e(t){u(t,e.vnode)};if(d.vnode=t,n)for(a in o)n[a]||i.addEventListener(a,d,!1);else for(a in o)i.addEventListener(a,d,!1)}}}var d={create:a,update:a,destroy:a};function s(e,t){let n;var l,r=t.elm,o=e.data.props,i=t.data.props;if((o||i)&&o!==i)for(n in o=o||{},i=i||{})l=i[n],o[n]===l||"value"===n&&r[n]===l||(r[n]=l)}var c={create:s,update:s};const f="undefined"!=typeof window&&window.requestAnimationFrame.bind(window)||setTimeout,v=function(e){f(function(){f(e)})};let h=!1;function p(e,t){let n,l;var r=t.elm,o=e.data.style,i=t.data.style;if((o||i)&&o!==i){var i=i||{},a="delayed"in(o=o||{});for(l in o)i[l]||("-"===l[0]&&"-"===l[1]?r.style.removeProperty(l):r.style[l]="");for(l in i)if(n=i[l],"delayed"===l&&i.delayed)for(const d in i.delayed)n=i.delayed[d],a&&n===o.delayed[d]||!function(e,t,n){v(function(){e[t]=n})}(r.style,d,n);else"remove"!==l&&n!==o[l]&&("-"===l[0]&&"-"===l[1]?r.style.setProperty(l,n):r.style[l]=n)}}function g(e){O(e.target.value)}function y(e){return t("div",{class:{}},[t("div",t("input",{props:{spellcheck:"false",autocomplete:"off",placeholder:"Search",enterkeyhint:"search"},on:{input:g}})),e&&0!=e.length?t("div",{class:{"search-results":!0}},e.map(function(e){return t("a",{class:{link:!0},props:{href:"/player/".concat(e.id)}},[t("br"),e.name])})):null])}var x=function(e,t,v){const m={create:[],update:[],remove:[],destroy:[],pre:[],post:[]},h=void 0!==t?t:C;for(const l of i)for(const r of e){var n=r[l];void 0!==n&&m[l].push(n)}function p(e,t){let n,l=e.data;void 0!==l&&w(o=null==(o=l.hook)?void 0:o.init)&&(o(e),l=e.data);var r=e.children,o=e.sel;if("!"===o)k(e.text)&&(e.text=""),e.elm=h.createComment(e.text);else if(void 0!==o){var i=o.indexOf("#"),a=o.indexOf(".",i),d=0<i?i:o.length,u=0<a?a:o.length,i=-1!==i||-1!==a?o.slice(0,Math.min(d,u)):o,s=e.elm=w(l)&&w(n=l.ns)?h.createElementNS(n,i,l):h.createElement(i,l);for(d<u&&s.setAttribute("id",o.slice(d+1,u)),0<a&&s.setAttribute("class",o.slice(u+1).replace(/\./g," ")),n=0;n<m.create.length;++n)m.create[n](E,e);if(T(r))for(n=0;n<r.length;++n){var c=r[n];null!=c&&h.appendChild(s,p(c,t))}else b(e.text)&&h.appendChild(s,h.createTextNode(e.text));i=e.data.hook;w(i)&&(null!=(d=i.create)&&d.call(i,E,e),i.insert)&&t.push(e)}else if(null!=(a=null==v?void 0:v.experimental)&&a.fragments&&e.children){for(e.elm=(null!=(o=h.createDocumentFragment)?o:L)(),n=0;n<m.create.length;++n)m.create[n](E,e);for(n=0;n<e.children.length;++n){var f=e.children[n];null!=f&&h.appendChild(e.elm,p(f,t))}}else e.elm=h.createTextNode(e.text);return e.elm}function g(e,t,n,l,r,o){for(;l<=r;++l){var i=n[l];null!=i&&h.insertBefore(e,p(i,o),t)}}function a(t){var e,n=t.data;if(void 0!==n){null!=(e=null==(n=null==n?void 0:n.hook)?void 0:n.destroy)&&e.call(n,t);for(let e=0;e<m.destroy.length;++e)m.destroy[e](t);if(void 0!==t.children)for(let e=0;e<t.children.length;++e){var l=t.children[e];null!=l&&"string"!=typeof l&&a(l)}}}function y(e,t,n,l){for(;n<=l;++n){var r,o=t[n];if(null!=o)if(w(o.sel)){a(o),i=m.remove.length+1,r=function(t,n){return function(){var e;0==--n&&(e=h.parentNode(t),h.removeChild(e,t))}}(o.elm,i);for(let e=0;e<m.remove.length;++e)m.remove[e](o,r);var i=null==(i=null==(i=null==o?void 0:o.data)?void 0:i.hook)?void 0:i.remove;w(i)?i(o,r):r()}else o.children?(a(o),y(e,o.children,0,o.children.length-1)):h.removeChild(e,o.elm)}}function d(e,t,n,l){let r=0,o=0,i=t.length-1,a=t[0],d=t[i],u=n.length-1,s=n[0],c=n[u],f;for(var v,m;r<=i&&o<=u;)null==a?a=t[++r]:null==d?d=t[--i]:null==s?s=n[++o]:null==c?c=n[--u]:S(a,s)?(x(a,s,l),a=t[++r],s=n[++o]):S(d,c)?(x(d,c,l),d=t[--i],c=n[--u]):S(a,c)?(x(a,c,l),h.insertBefore(e,a.elm,h.nextSibling(d.elm)),a=t[++r],c=n[--u]):s=(S(d,s)?(x(d,s,l),h.insertBefore(e,d.elm,a.elm),d=t[--i]):k(v=(f=void 0===f?function(t,n,l){var r={};for(let e=n;e<=l;++e){var o=null==(o=t[e])?void 0:o.key;void 0!==o&&(r[o]=e)}return r}(t,r,i):f)[s.key])||(m=t[v]).sel!==s.sel?h.insertBefore(e,p(s,l),a.elm):(x(m,s,l),t[v]=void 0,h.insertBefore(e,m.elm,a.elm)),n[++o]);o<=u&&g(e,null==n[u+1]?null:n[u+1].elm,n,o,u,l),r<=i&&y(e,t,r,i)}function x(t,n,e){var l=null==(l=n.data)?void 0:l.hook,r=(null!=(r=null==l?void 0:l.prepatch)&&r.call(l,t,n),n.elm=t.elm);if(t!==n){if(void 0!==n.data||w(n.text)&&n.text!==t.text){null!=n.data||(n.data={}),null!=t.data||(t.data={});for(let e=0;e<m.update.length;++e)m.update[e](t,n);null!=(o=null==(i=null==(i=n.data)?void 0:i.hook)?void 0:i.update)&&o.call(i,t,n)}var o=t.children,i=n.children;k(n.text)?w(o)&&w(i)?o!==i&&d(r,o,i,e):w(i)?(w(t.text)&&h.setTextContent(r,""),g(r,null,i,0,i.length-1,e)):w(o)?y(r,o,0,o.length-1):w(t.text)&&h.setTextContent(r,""):t.text!==n.text&&(w(o)&&y(r,o,0,o.length-1),h.setTextContent(r,n.text)),null!=(i=null==l?void 0:l.postpatch)&&i.call(l,t,n)}}return function(e,t){let n,l,r;var o,i,a,d=[];for(n=0;n<m.pre.length;++n)m.pre[n]();for(i=h,a=e,i.isElement(a)?(a=(i=e).id?"#"+i.id:"",o=(o=i.getAttribute("class"))?"."+o.split(" ").join("."):"",e=N(h.tagName(i).toLowerCase()+a+o,{},[],void 0,i)):(a=h,o=e,a.isDocumentFragment(o)&&(e=N(void 0,{},[],void 0,e))),S(e,t)?x(e,t,d):(l=e.elm,r=h.parentNode(l),p(t,d),null!==r&&(h.insertBefore(r,t.elm,h.nextSibling(l)),y(r,[e],0,0))),n=0;n<d.length;++n)d[n].data.hook.insert(d[n]);for(n=0;n<m.post.length;++n)m.post[n]();return t}}([n,c,{pre:function(){h=!1},create:p,update:p,destroy:function(e){let t,n;var l=e.elm;if((e=e.data.style)&&(t=e.destroy))for(n in t)l.style[n]=t[n]},remove:function(l,r){var o=l.data.style;if(o&&o.remove){h||(l.elm.offsetLeft,h=!0);let e;const u=l.elm;let t=0;var i=o.remove;let n=0;var a=[];for(e in i)a.push(e),u.style[e]=i[e];for(var d=getComputedStyle(u)["transition-property"].split(", ");t<d.length;++t)-1!==a.indexOf(d[t])&&n++;u.addEventListener("transitionend",function(e){e.target===u&&--n,0===n&&r()})}else r()}},d]),O=function(e){return 3<=e.length?fetch("/api/search?t=player&"+new URLSearchParams({t:"player",q:e})).then(function(e){return e.json().then(function(e){console.log(e),j=x(j,y(e))})}):j=x(j,y([]))},j=x(function n(l,r){var o=void 0!==r?r:C;let e;if(o.isElement(l)){var i,a=l.id?"#"+l.id:"",d=(d=l.getAttribute("class"))?"."+d.split(" ").join("."):"",a=o.tagName(l).toLowerCase()+a+d,u={},s={},d={},c=[];let e,t;var f=l.attributes,v=l.childNodes;for(e=0,t=f.length;e<t;e++)"d"===(i=f[e].nodeName)[0]&&"a"===i[1]&&"t"===i[2]&&"a"===i[3]&&"-"===i[4]?s[i.slice(5)]=f[e].nodeValue||"":"id"!==i&&"class"!==i&&(u[i]=f[e].nodeValue);for(e=0,t=v.length;e<t;e++)c.push(n(v[e],r));return 0<Object.keys(u).length&&(d.attrs=u),0<Object.keys(s).length&&(d.dataset=s),"s"!==a[0]||"v"!==a[1]||"g"!==a[2]||3!==a.length&&"."!==a[3]&&"#"!==a[3]||m(d,c,a),N(a,d,c,void 0,l)}return o.isText(l)?N(void 0,void 0,void 0,e=o.getTextContent(l),l):o.isComment(l)?N("!",{},[],e=o.getTextContent(l),l):N("",{},[],void 0,l)}(document.querySelector(".search-container")),y([]))}();