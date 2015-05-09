/**
 *
 * Created by sebastian on 5/3/15.
 */

"use strict";

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('popupController', ["$scope", "$window", "localStorageService", "chromeStorageService",
    function ($scope, $window, localStorageService, chromeStorageService) {

        $scope.emptyMessage;
        chromeStorageService.getFromStorage(null).then(function (value) {
            if (!value) {
                $scope.emptyMessage = "No sheets added yet."
            }
            else {
                $scope.sheets = [];
                for (var sheet in value) {

                    $scope.sheets.push(value[sheet]);
                    localStorageService.set(value[sheet].name, value[sheet].content);
                }

            }
        });

        this.newSheet = function () {
            $window.open('main.html#/edit');
        };

        this.editSheet = function (sheetName) {
            $window.open('main.html#/edit/'+sheetName);
        };

        this.removeSheet = function (sheetName) {
            console.log("remove" + sheetName);
        };

        this.goToSheet = function (sheetName) {
            $window.open('main.html#/view/'+sheetName);
        };

    }]);

