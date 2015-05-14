/**
 *
 * Created by sebastian on 5/3/15.
 */

"use strict";

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('popupController', ["$scope", "$window", "chromeStorageService",
    function ($scope, $window, chromeStorageService) {

        chromeStorageService.getFromStorage(null).then(function (value) {
            if (Object.getOwnPropertyNames(value).length === 0) {
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
            // TODO: question - "are you sure" before removing
            chromeStorageService.removeFromStorage(sheetName);
            removeFromScope($scope, sheetName);

            if ($scope.sheets.length === 0) {
                $scope.message = "No sheets added yet."
            }

        };

        this.goToSheet = function (sheetName) {
            $window.open('main.html#/view/' + sheetName);
        };

    }]);

function removeFromScope($scope, sheetName){
    var sheetIndex = $scope.sheets.indexOf(sheetName);
    $scope.sheets.splice(sheetIndex, 1);
}
