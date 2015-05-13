/**
 * Created by sebastian on 5/8/15.
 */

"use strict";

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('viewController', ["$scope", "$window", "$routeParams", "$sce",
    "chromeStorageService", "mdParserService",
    function ($scope, $window, $routeParams, $sce, chromeStorageService, mdParserService) {

        var mdContent, sheetPromise;
        var sheetNameParam = $routeParams.sheetName;

        $scope.sheet = {};
        if (sheetNameParam) {
            $scope.sheet.name = sheetNameParam;
            $scope.sheet.message = "cheat sheet for " + sheetNameParam;
            sheetPromise = chromeStorageService.getFromStorage(sheetNameParam);
            sheetPromise.then(function (value) {
                if (value[sheetNameParam]) {
                    mdContent = value[sheetNameParam].content;
                    var content = document.getElementById('content');
                    content.innerHTML = mdParserService.parse(mdContent) + "\</div>\</div>";
                    console.log(content.innerHTML);
                    initializeMasonry();
                } else {
                    $scope.sheet.name = "";
                    $scope.sheet.message = "No sheet here. Do you want to add one?"
                }
            });
        } else {
            $scope.sheet.name = "";
            $scope.sheet.message = "No sheet here. Do you want to add one?"
        }
    }]);



function initializeMasonry(){
    var container = document.querySelector('#masonry-container');
    var msnry = new Masonry(container, {
        // options
        columnWidth: 50, // width between each box
        itemSelector: '.box'
    });
}