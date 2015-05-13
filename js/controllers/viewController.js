/**
 * Created by sebastian on 5/8/15.
 */

"use strict";

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('viewController', ["$scope", "$window", "$routeParams", "$sce",
    "chromeStorageService", "mdParserService", "previewContentService",
    function ($scope, $window, $routeParams, $sce, chromeStorageService,
              mdParserService, previewContentService) {

        var mdContent, sheetPromise;
        var sheetNameParam = $routeParams.sheetName;
        $scope.sheet = {};

        if ($window.location.href.endsWith('/preview')) {
            $scope.sheet.name = "preview";
            $scope.mode = "preview";
            $scope.mdContent= previewContentService.get();
            if ($scope.mdContent) {
                renderContent($scope.mdContent, mdParserService);
            } else {
                $scope.sheet.message = "No preview here";
            }
        } else {
            if (sheetNameParam) {
                $scope.sheet.name = sheetNameParam;
                $scope.sheet.message = "";
                sheetPromise = chromeStorageService.getFromStorage(sheetNameParam);
                sheetPromise.then(function (value) {
                    if (value[sheetNameParam]) {
                        // if there is content in storage
                        renderContent(value[sheetNameParam].content, mdParserService);
                    } else {
                        // if there isn't
                        $scope.sheet.name = "";
                        $scope.sheet.message = "No sheet here. Do you want to add one?"
                    }
                });
            } else {
                // when just /view gets entered, show error message
                $scope.sheet.name = "";
                $scope.sheet.message = "No sheet here. Do you want to add one?"
            }
        }

        this.goToEdit = function () {
            if ($scope.mode !== "preview") {
                $window.open('main.html#/edit/' + $scope.sheet.name, "_self");
            } else {
                previewContentService.buffer($scope.mdContent);
                $window.history.back();
            }
        }

    }]);


function initializeMasonry() {
    var container = document.querySelector('#masonry-container');
    var msnry = new Masonry(container, {
        // options
        columnWidth: 50, // width between each box
        itemSelector: '.box'
    });
}

function renderContent(mdContent, mdParserService) {
    var content = document.getElementById('content');
    content.innerHTML = mdParserService.parse(mdContent) + "\</div>\</div>";
    initializeMasonry();
}

String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};