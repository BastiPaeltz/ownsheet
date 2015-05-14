/**
 * Created by sebastian on 5/10/15.
 */


"use strict";

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('mainController', ["$scope", "$window", "$routeParams",
    function ($scope, $window, $routeParams) {
        var sheetName = $routeParams.sheetName;
        $scope.sheet = {};
        if (sheetName) {
            $scope.sheet.name = sheetName;
        } else {
            $scope.sheet.name = "";
        }

        //this.goToView = function(){
        //    $window.open('main.html#/view/'+$scope.sheet.name);
        //};
        //
        //this.goToEdit = function(){
        //    $window.open('main.html#/edit/'+$scope.sheet.name);
        //};
    }]);

