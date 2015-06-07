/**
 *
 * Created by sebastian on 5/3/15.
 */

"use strict";

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('popupController', ["$scope", "$window", "chromeStorageService",
    "localStorageService", function ($scope, $window, 
        chromeStorageService, localStorageService) {
        // populate scope initially
        $scope.showRevert = false;
        chromeStorageService.getFromStorage(null).then(function (value) {
            if(value === "Error"){
                $scope.message = "Storage error. Please open ownsheet again. " +
                    "If this problem persists, consider contacting the developer."
            }
            else if (Object.getOwnPropertyNames(value).length === 0) {
                $scope.message = "No sheets added yet."
            }
            else {
                $scope.sheets = [];
                Object.keys(value).forEach(function (sheet) {
                    $scope.sheets.push(sheet);
                });
            }
        });

        this.newSheet = function () {
            $window.open('main.html#/edit');
        };

        this.editSheet = function (sheetName) {
            $window.open('main.html#/edit/' + sheetName);
        };

        this.revert = function() {
            var deletedSheet = localStorageService.get("revert");
            chromeStorageService.pushToStorage(deletedSheet);
            Object.keys(deletedSheet).forEach(function (sheet) {
                $scope.sheets.push(sheet);
                $scope.showRevert = false;
                $scope.message = "";
            });
        };

        this.removeSheet = function (sheetName) {
            var storagePromise = chromeStorageService.getFromStorage(sheetName);
            storagePromise.then(function (value) {
                localStorageService.set("revert", value);
                chromeStorageService.removeFromStorage(sheetName);
            });
            removeFromScope($scope, sheetName);
            if ($scope.sheets.length === 0) {
                $scope.message = "No sheets added yet."
            }
            $scope.showRevert = true;
        };

        this.goToSheet = function (sheetName) {
            $window.open('main.html#/view/' + sheetName);
        };

        this.goToGeneral = function (sheetName) {
            $window.open('main.html#/general');
        };

    }]);

function removeFromScope($scope, sheetName) {
    var sheetIndex = $scope.sheets.indexOf(sheetName);
    $scope.sheets.splice(sheetIndex, 1);
}
