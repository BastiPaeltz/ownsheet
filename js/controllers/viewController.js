/**
 * Created by sebastian on 5/8/15.
 */

"use strict";

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('viewController', ["$scope", "$window", "$routeParams", "$sce",
    "localStorageWrapper", "mdParserService", "previewContentService", "localStorageService",
    function ($scope, $window, $routeParams, $sce, localStorageWrapper,
              mdParserService, previewContentService, localStorageService) {
        var mdContent, sheetPromise;
        var sheetNameParam = $routeParams.sheetName;
        $scope.sheet = {};

        // case: preview
        if ($window.location.href.endsWith('main.html#/preview')) {
            $scope.sheet.name = "preview";
            $scope.mode = "preview";
            $scope.mdContent = previewContentService.get();
            if ($scope.mdContent) {
                startSpinner();
                renderContent($scope.mdContent, mdParserService);
                customizePage(localStorageService);
                $scope.buttonType = "edit";
            } else {
                $scope.sheet.message = "No preview here";
                $scope.buttonType = "new";
            }
        } else {
            // sheetNameParam is definitely defined
            $scope.sheet.name = sheetNameParam;
            $scope.sheet.message = "";
            sheetPromise = localStorageWrapper.getFromStorage(sheetNameParam);
            sheetPromise.then(function (value) {
                if (value[sheetNameParam]) {
                    // if there is content in storage
                    startSpinner();
                    renderContent(value[sheetNameParam].content, mdParserService);
                    customizePage(localStorageService);
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

function customizePage(localStorageService) {
    var colorList = [];
    var colorsFromStorage = localStorageService.get('colors');
    if (!colorsFromStorage) {
        // default
        colorList = ["#2d9f34", "#4b65c3", "#48456a", "#4f7a4e",
            "#d61115", "#59582f"];
    } else {
        for (var indx in colorsFromStorage) {
            colorList.push(colorsFromStorage[indx].code);
        }
    }

    var boxSizeFromStorage = localStorageService.get('box-size') || 250;
    $('.box').each(function (index) {
        $(this).css("width", boxSizeFromStorage + "px");
        $(this).css("background-color", colorList[index % colorList.length]);
    });

    $('a').each(function () {
        (this).target = "_blank";
    });

    $('img').each(function () {
        $(this).remove();
    });

    $('pre').before("\<button class=\"pre-button\" \>Show/Hide code block\<\/button\>");
    $(".pre-button").click(function () {
        $(this).next().find("code").toggle();
        initializeMasonry();
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

function startSpinner() {
    var opts = {
        lines: 13, // The number of lines to draw
        length: 20, // The length of each line
        width: 10, // The line thickness
        radius: 30, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#000', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent
        left: '50%' // Left position relative to parent
    };
    var target = document.getElementById('ms-content');
    var spinner = new Spinner(opts).spin(target);
}
