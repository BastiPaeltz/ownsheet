/**
 *
 * Created by sebastian on 5/3/15.
 */

"use strict";

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('popupController', ["$scope", "$window", "chromeStorageService",
    function ($scope, $window, chromeStorageService) {

        // populate scope initially
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

        this.removeSheet = function (sheetName) {
            var confirmed = $window.confirm('Do you really want to do delete this sheet?');
            if (confirmed) {
                chromeStorageService.removeFromStorage(sheetName);
                removeFromScope($scope, sheetName);
                if ($scope.sheets.length === 0) {
                    $scope.message = "No sheets added yet."
                }
            }
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
