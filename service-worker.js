"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/index.html","481537106f4f342a78484c188dc6d089"],["/static/css/main.c58e6aa1.css","74bb9c660353c9e7e6b7242db8b2a4bf"],["/static/js/main.4a143517.js","7b8c1ebe00010b39f54e3a8e7e8e42dc"],["/static/media/carousel-1.0854960f.jpg","0854960f7b69f7734918fddf0654d356"],["/static/media/carousel-2.7b20234c.jpg","7b20234c6551cb5feb361a6d119acc6d"],["/static/media/carousel-3.74273883.jpg","7427388314a16a6927ff9cce01c1e267"],["/static/media/close.15f419cb.svg","15f419cbf20533e1b4ff96a2127d430c"],["/static/media/commit-1.31435971.svg","314359715a769795139f6c02f328641e"],["/static/media/commit-2.259fb5b5.svg","259fb5b59cdcaf27e5b51324a07f1632"],["/static/media/commit-3.33d28b05.svg","33d28b05547a6608c785f42781822517"],["/static/media/commit-4.61e6f7a6.svg","61e6f7a668ee03ee8a02a98302ab64f6"],["/static/media/goods-1.07d9980c.png","07d9980c00b34bd20d5266ff5d41193f"],["/static/media/goods-1.f1f7508d.jpg","f1f7508df738ea4d4571276a1b0fec83"],["/static/media/goods-2.ad552fcc.png","ad552fcc4f096e51e464e5bb977feac8"],["/static/media/goods-3.54751179.png","54751179492972a4626f663b6ab4746c"],["/static/media/goods-4.065fa9be.png","065fa9be7b89ee5c5b655b5d11707bbd"],["/static/media/img_avatar1.cec4ccb3.png","cec4ccb30e41198c7b0a5e117c55eb2b"],["/static/media/login.00e808a6.svg","00e808a67fa5f2c2423fd829012639ff"],["/static/media/logo.523c9fc8.svg","523c9fc8be1d4381a6600e107880b37e"],["/static/media/map.039cbff4.jpg","039cbff4bb7f70c625586f04f4977ce3"],["/static/media/sketch_logo.bfe39d92.jpg","bfe39d923cc6e1dcf59753a2f215f23a"],["/static/media/video-cover.68ac4e77.jpg","68ac4e771d888aad0e1734583ea75041"],["/static/media/wechat_pay.804c2f6e.png","804c2f6e541d99f0e20045ab9c3bfe64"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],c=new URL(t,self.location),n=createCacheKey(c,hashParamName,a,/\.\w{8}\./);return[c.toString(),n]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var c=new Request(a,{credentials:"same-origin"});return fetch(c).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("/index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});