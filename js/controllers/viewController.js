/**
 * Created by sebastian on 5/8/15.
 */

"use strict";

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('viewController', ["$scope", "$window", "$routeParams", "$sce",
    "chromeStorageService", "mdParserService", "previewContentService", "localStorageService",
    function ($scope, $window, $routeParams, $sce, chromeStorageService,
              mdParserService, previewContentService, localStorageService) {
        var mdContent, sheetPromise;
        var sheetNameParam = $routeParams.sheetName;
        $scope.sheet = {};

        if ($window.location.href.endsWith('main.html#/preview')) {
            $scope.sheet.name = "preview";
            $scope.mode = "preview";
            $scope.mdContent = previewContentService.get();
            if ($scope.mdContent) {
                renderContent($scope.mdContent, mdParserService);
                colorPage(localStorageService);
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
                    colorPage(localStorageService);
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

function colorPage(localStorageService) {
    var colorList = [];
    var colorsFromStorage = localStorageService.get('colors');
    if (!colorsFromStorage) {
        // default
        colorList = [
            {code: "#2d9f34"}, {code: "#4b65c3"}, {code: "#48456a"}, {code: "#4f7a4e"},
            {code: "#d61115"}, {code: "#59582f"}];
    } else {
        for (var indx in colorsFromStorage) {
            colorList.push(colorsFromStorage[indx].code);
        }
    }

    var boxSizeFromStorage = localStorageService.get('box-size') || 250;

    $('.box').each(function (index) {
        $(this).css("width", boxSizeFromStorage);
        $(this).css("background-color", colorList[index % colorList.length]);
    });

    $('a').each(function(){
        (this).target = "_blank";
    });

    var backgroundColorFromStorage = localStorageService.get('background-color');
    if (backgroundColorFromStorage) {
        $('html, body').css('background-color', backgroundColorFromStorage);
    }

    initializeMasonry();
}

function renderContent(mdContent, mdParserService) {
    var content = document.getElementById('ms-content');
    content.innerHTML = mdParserService.parse(mdContent) + "\</div>\</div>";
}

String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};