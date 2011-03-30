(function(a,b){"use strict";var c=a.document,d=a.History=a.History||{};if(typeof d.initHtml4!="undefined")throw new Error("History.js HTML4 Support has already been loaded...");d.initHtml4=function(){if(typeof d.initHtml4.initialized!="undefined")return!1;d.initHtml4.initialized=!0,d.savedHashes=[],d.isLastHash=function(a){var b=d.getHashByIndex(),c=a===b;return c},d.saveHash=function(a){if(d.isLastHash(a))return!1;d.savedHashes.push(a);return!0},d.getHashByIndex=function(a){var b=null;typeof a=="undefined"?b=d.savedHashes[d.savedHashes.length-1]:a<0?b=d.savedHashes[d.savedHashes.length+a]:b=d.savedHashes[a];return b},d.discardedHashes={},d.discardedStates={},d.discardState=function(a,b,c){var e=d.getHashByState(a),f={discardedState:a,backState:c,forwardState:b};d.discardedStates[e]=f;return!0},d.discardHash=function(a,b,c){var e={discardedHash:a,backState:c,forwardState:b};d.discardedHashes[a]=e;return!0},d.discardedState=function(a){var b=d.getHashByState(a),c=d.discardedStates[b]||!1;return c},d.discardedHash=function(a){var b=d.discardedHashes[a]||!1;return b},d.recycleState=function(a){var b=d.getHashByState(a);d.discardedState(a)&&delete d.discardedStates[b];return!0},d.emulated.hashChange&&(d.hashChangeInit=function(){d.checkerFunction=null;var b="";if(d.isInternetExplorer()){var e="historyjs-iframe",f=c.createElement("iframe");f.setAttribute("id",e),f.style.display="none",c.body.appendChild(f),f.contentWindow.document.open(),f.contentWindow.document.close();var g="",h=!1;d.checkerFunction=function(){if(h)return!1;h=!0;var c=d.getHash()||"",e=d.unescapeHash(f.contentWindow.document.location.hash)||"";c!==b?(b=c,e!==c&&(g=e=c,f.contentWindow.document.open(),f.contentWindow.document.close(),f.contentWindow.document.location.hash=d.escapeHash(c)),d.Adapter.trigger(a,"hashchange")):e!==g&&(g=e,d.setHash(e,!1)),h=!1;return!0}}else d.checkerFunction=function(){var c=d.getHash();c!==b&&(b=c,d.Adapter.trigger(a,"hashchange"));return!0};setInterval(d.checkerFunction,d.options.hashChangeInterval);return!0},d.Adapter.onDomLoad(d.hashChangeInit)),d.emulated.pushState&&(d.onHashChange=function(b){var e=b&&b.newURL||c.location.href,f=d.getHashByUrl(e),g=null,h=null,i=null;if(d.isLastHash(f)){d.busy(!1);return!1}d.doubleCheckComplete(),d.saveHash(f),g=d.extractState(f||c.location.href);if(!g){d.Adapter.trigger(a,"anchorchange"),d.busy(!1);return!1}if(d.isLastSavedState(g)){d.busy(!1);return!1}h=d.getHashByState(g);var j=d.discardedState(g);if(j){d.getHashByIndex(-2)===d.getHashByState(j.forwardState)?d.back(!1):d.forward(!1),d.busy(!1);return!1}d.pushState(g.data,g.title,g.url,!1);return!0},d.Adapter.bind(a,"hashchange",d.onHashChange),d.pushState=function(b,e,f,g){if(d.getHashByUrl(f))throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(g!==!1&&d.busy()){d.pushQueue({scope:d,callback:d.pushState,args:arguments,queue:g});return!1}d.busy(!0);var h=d.createStateObject(b,e,f),i=d.getHashByState(h),j=d.getState(!1),k=d.getHashByState(j),l=d.getHash();d.storeState(h),d.expectedStateId=h.id,d.recycleState(h),d.setTitle(h);if(i===k){d.busy(!1);return!1}if(i!==l&&i!==d.getShortUrl(c.location.href)){d.setHash(i,!1);return!1}d.saveState(h),d.Adapter.trigger(a,"statechange"),d.busy(!1);return!0},d.replaceState=function(a,b,c,e){if(d.getHashByUrl(c))throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(e!==!1&&d.busy()){d.pushQueue({scope:d,callback:d.replaceState,args:arguments,queue:e});return!1}d.busy(!0);var f=d.createStateObject(a,b,c),g=d.getState(!1),h=d.getStateByIndex(-2);d.discardState(g,f,h),d.pushState(f.data,f.title,f.url,!1);return!0},d.saveState(d.storeState(d.createStateObject({},"",c.location.href))),d.getHash()&&!d.emulated.hashChange&&d.Adapter.onDomLoad(function(){d.Adapter.trigger(a,"hashchange")}))},d.init()})(window)