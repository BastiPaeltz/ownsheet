var ownsheetApp=angular.module("ownsheetApp");ownsheetApp.service("mdParserService",function(){var e=!0;this.parse=function(h){var r;return-1!==h.indexOf("h2")&&(h=h.replace(/\<.*?h2[^>]*\>(.*?)\<\/.*?h2[^>]*\>/g,"## $1")),-1!==h.indexOf("h1")&&(h=h.replace(/\<.*?h1[^>]*\>(.*?)\<\/.*?h1[^>]*\>/g,"# $1")),r=new marked.Renderer,r.heading=function(h,r){return 1===r?e?(e=!1,'<div class="hideH1"> <h1>'+h+"</h1>"):'</div> <div class="hideH1"> <h1>'+h+"</h1>":2===r?e?(e=!1,'<div class="box"> <h2>'+h+"</h2>"):'</div> <div class="box"> <h2>'+h+"</h2>":"<h"+r+">"+h+"</h"+r+">"},marked.setOptions({renderer:r,highlight:function(e){return hljs.highlightAuto(e).value},gfm:!0,tables:!0,breaks:!0,pedantic:!1,sanitize:!1,smartLists:!0,smartypants:!1}),marked(h)}});