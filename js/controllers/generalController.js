/**
 * Created by sebastian on 5/15/15.
 */
/**
 *
 * Created by sebastian on 5/3/15.
 */

"use strict";

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('generalController', ["$scope", "$window", "localStorageService",
    function ($scope, $window, localStorageService) {

        $scope.colors = localStorageService.get('colors') || ["#2d9f34", "#4b65c3", "#48456a", "#4f7a4e",
                "#d61115", "#59582f"];

        this.addFont = function(){
            $scope.colors.push("Enter a hex color code.")
        };

        this.removeFont = function(){
            $scope.colors.pop();
        };

        this.submit = function(){
            // TODO : validate hex
            localStorageService.set('colors', $scope.colors)
        };

        this.reset = function(){
            $scope.colors = ["#2d9f34", "#4b65c3", "#48456a", "#4f7a4e",
                "#d61115", "#59582f"];
        }

    }]);

