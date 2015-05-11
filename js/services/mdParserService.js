/**
 * Created by sebastian on 5/7/15.
 */

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.service('mdParserService', function () {

    this.parse = function (textToParse) {

        if(textToParse.indexOf('h2') !== -1 ) {
            textToParse = textToParse.replace(/\<[^/]*?(h2).*?\>/g, "<$1 class=\"box\">");
        }

        if(textToParse.indexOf('h1') !== -1 ) {
            textToParse = textToParse.replace(/\<[^/]*?(h1).*?\>/g, "<$1 class=\"hidden\">");
        }

        var customRenderer = new marked.Renderer();
        customRenderer.heading = function (text, level) {
            if (level === 1) {
                return '\<h1 class\=\"hideH1\"\>' + text + '\<\/h1\>';
            } else if (level === 2) {
                return '\<h2 class\=\"box\"\>' + text + '\<\/h2\>';
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


