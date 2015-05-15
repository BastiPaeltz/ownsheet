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

        if ($window.location.href.endsWith('main.html#/preview')) {
            $scope.sheet.name = "preview";
            $scope.mode = "preview";
            $scope.mdContent = previewContentService.get();
            if ($scope.mdContent) {
                renderContent($scope.mdContent, mdParserService);
                colorBoxes();
                $scope.buttonType = "edit";
            } else {
                $scope.sheet.message = "No preview here";
                $scope.buttonType = "new";
            }
        } else {
            // sheetNameParam is definitely defined
            $scope.sheet.name = sheetNameParam;
            $scope.sheet.message = "";
            sheetPromise = chromeStorageService.getFromStorage(sheetNameParam);
            sheetPromise.then(function (value) {
                if (value[sheetNameParam]) {
                    // if there is content in storage
                    renderContent(value[sheetNameParam].content, mdParserService);
                    colorBoxes();
                    $scope.buttonType = "edit";
                } else {
                    // if there isn't
                    $scope.sheet.name = "";
                    $scope.sheet.message = "No sheet here. Do you want to add one?";
                    $scope.buttonType = "new"
                }
            });

        }
        document.title = $scope.sheet.name + " cheat sheet";

        this.goToEdit = function () {
            if ($scope.mode !== "preview") {
                $window.open('main.html#/edit/' + $scope.sheet.name, "_self");
            } else {
                previewContentService.buffer($scope.mdContent);
                $window.history.back();
            }
        };

        this.new = function () {
            $window.open('main.html#/edit', "_self");
        }

    }]);


function initializeMasonry() {
    var container = document.querySelector('#masonry-container');
    var msnry = new Masonry(container, {
        // options
        columnWidth: 50,
        itemSelector: '.box'
    });
}

function colorBoxes() {
    var colorList = ["#2d9f34", "#4b65c3", "#48456a", "#4f7a4e",
        "#d61115", "#59582f"];
    $('.box').each(function (index) {
        $(this).css("background-color", colorList[index % colorList.length]);
    });
}

function renderContent(mdContent, mdParserService) {
    var content = document.getElementById('ms-content');
    content.innerHTML = mdParserService.parse(mdContent) + "\</div>\</div>";
    initializeMasonry();
}

String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};