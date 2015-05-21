/**
 * Created by sebastian on 5/13/15.
 */


var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.service('previewContentService', function ($q) {
    var preview = this;

    preview.add = function(content){
        preview.content = content;
    };

    preview.get = function(){
        var deferred = $q.defer();
        setTimeout(function () {
            deferred.resolve(preview.content);
        }, 0);
        return deferred.promise;
    };

    preview.buffer = function(bufferedContent){
        preview.bufferedContent = bufferedContent;
    };

    preview.getBuffer = function(){
        return preview.bufferedContent;
    };

});


