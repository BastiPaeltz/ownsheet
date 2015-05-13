/**
 * Created by sebastian on 5/13/15.
 */


var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.service('previewContentService', function () {
    var preview = this;

    preview.add = function(content){
        preview.content = content;
    };

    preview.get = function(){
        return preview.content;
    };

});


