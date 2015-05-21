"use strict";function saveToStorageAndCleanup(e,t,n,o){var a={};a[e]={name:e,content:n.content},t.pushToStorage(a),n.safeToNavigate=!0,o.open("main.html#/view/"+e,"_self")}function isValidContent(e){return-1===e.content.indexOf("##")?(e.alerts.push({type:"danger",msg:"Please include at least one '##' heading inside your text."}),e.closeAlert=function(t){e.alerts.splice(t,1)},!1):!0}var ownsheetApp=angular.module("ownsheetApp");ownsheetApp.controller("editController",["$scope","$routeParams","chromeStorageService","$window","previewContentService",function(e,t,n,o,a){var i,s="## WELCOME TO OWNSHEET! \nYou can write your sheets with markdown. It is a **simple** and **easy to learn** markup language.\n\n# Here is how ownsheet transforms markdown - it's really simple.\n\n# Level 1 headings will be ignored\nThis text will be omitted as well.\n\n## each of these level 2 headings will form a box\n###This subheading will be content of a box\n* you can fill in **ANY** markdown you want\n* it will be part of the box  \n\n## Github Flavored Markdown is supported as well\n[Learn more about it!](https://help.github.com/articles/github-flavored-markdown//)\n\n## Fully customizable!\nDon't like the default colors? Just head to the **Explore** section and define your own!\n\n## Compatible with a lot of cheat sheets out there.\nMarkdown is a common tool for writing cheat sheets, documentations and the likes.\nSo you can easily **incorporate parts or entire external sheets** into ownsheet.\n*You may find the converter on the Explore section useful for this.*\n\n## Note however\n**There are better options for editing markdown (online or offline)**  \nownsheet shines when it comes to displaying not so much when it comes to editing markdown.",r=t.sheetName,l=a.getBuffer();e.alerts=[],e.sheet={},r?(e.sheet.name=r,l?(e.content=l,e.initialContent=e.content,e.sheet.message=r):(i=n.getFromStorage(r),i.then(function(t){t[r]?(e.content=t[r].content,e.initialContent=e.content,e.sheet.message=r):(e.newSheet=!0,e.sheet.message="You currently have no sheet named "+r+" but you can easily add one below.",e.content=s,e.initialContent=e.content)}))):(e.newSheet=!0,e.sheet.message="Add new sheet",l?(e.content=l,e.initialContent=e.content):(e.content=s,e.initialContent=e.content)),document.title="ownsheet - edit sheet",window.onbeforeunload=function(){return e.safeToNavigate||e.initialContent===e.content?void 0:"You started editing  - are you sure you want to leave this page?"},this.preview=function(){isValidContent(e)&&(a.add(e.content),e.safeToNavigate=!0,o.open("main.html#/preview","_self"))},this.submit=function(){if(isValidContent(e)){var t,a;e.sheet.name&&!e.newSheet?(t=e.sheet.name,saveToStorageAndCleanup(t,n,e,o)):(t=e.sheet.newName,t?(a=n.getFromStorage(t),a.then(function(a){a[t]?(e.alerts.push({type:"danger",msg:"sheet with name "+t+" is already defined. Please try another name."}),e.closeAlert=function(t){e.alerts.splice(t,1)}):saveToStorageAndCleanup(t,n,e,o)})):(e.alerts.push({type:"danger",msg:"Give your sheet a name."}),e.closeAlert=function(t){e.alerts.splice(t,1)}))}}}]);