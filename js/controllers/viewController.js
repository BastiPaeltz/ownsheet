
/**
 * Created by sebastian on 5/8/15.
 */

"use strict";

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('viewController', ["$scope", "$window", "$routeParams", "chromeStorageService",
    function ($scope, $window, $routeParams, chromeStorageService) {

        var sheetName = $routeParams.sheetName;
        $scope.sheet = {};
        if (sheetName) {
            $scope.sheet.name = sheetName;
        } else {
            $scope.sheet.name = "";
            $scope.sheet.message = "No sheet here. Do you want to add one?"
        }

        this.goToView = function(){
            $window.open('main.html#/view/'+$scope.sheet.name);
        };

        this.goToEdit = function(){
            $window.open('main.html#/edit/'+$scope.sheet.name);
        };
    }]);

