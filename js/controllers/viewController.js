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
                    $scope.sheet.content = $sce.trustAsHtml(mdParserService.parse(mdContent));
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

