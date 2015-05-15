/**
 * Created by sebastian on 5/7/15.
 */

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.service('mdParserService', function () {

    var isFirst = true;

    this.parse = function (textToParse) {
        var customRenderer;

        if (textToParse.indexOf('h2') !== -1) {
            textToParse = textToParse.replace(/\<.*?h2[^>]*\>(.*?)\<\/.*?h2[^>]*\>/g, "## $1");
        }

        if (textToParse.indexOf('h1') !== -1) {
            textToParse = textToParse.replace(/\<.*?h1[^>]*\>(.*?)\<\/.*?h1[^>]*\>/g, "# $1");
        }

        customRenderer = new marked.Renderer();
        customRenderer.heading = function (text, level) {
            if (level === 1) {
                if (isFirst) {
                    isFirst = false;
                    return '\<div class\=\"hideH1\"\> \<\h1\>' + text + '\<\/h1\>';
                }else {
                    return '<\/div> \<div class\=\"hideH1\"\> \<\h1\>' + text + '\<\/h1\>';
                }
            } else if (level === 2) {
                if (isFirst) {
                    isFirst = false;
                    return '\<div class\=\"box\"\> \<\h2\>' + text + '\<\/h2\>';
                }else{
                    return '<\/div> \<div class\=\"box\"\> \<\h2\>' + text + '\<\/h2\>';
                }
            } else {
                return '<h' + level + '>' + text + '</h' + level + '>';
            }
        };

        marked.setOptions({
            renderer: customRenderer,
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        });
        return marked(textToParse);
    }
});


