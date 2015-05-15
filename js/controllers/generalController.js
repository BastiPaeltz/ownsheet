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
        $scope.colors = localStorageService.get('colors') || [
                {code: "#2d9f34"}, {code: "#4b65c3"}, {code: "#48456a"}, {code: "#4f7a4e"},
                {code: "#d61115"}, {code: "#59582f"}];

        this.addFont = function () {
            $scope.colors.push({code: "Enter a hex color code."})
        };

        this.removeFont = function () {
            $scope.colors.pop();
        };

        this.submit = function () {
            for(var index in $scope.colors){
                // test if valid hex color
                if(/^#[0-9A-F]{6}$/i.test($scope.colors[index].code) === false){
                    $scope.colors.splice(index, 1);
                }
            }
            localStorageService.set('colors', $scope.colors)
        };

        this.reset = function () {

            $scope.colors = [
                {code: "#2d9f34"}, {code: "#4b65c3"}, {code: "#48456a"}, {code: "#4f7a4e"},
                {code: "#d61115"}, {code: "#59582f"}];
            localStorageService.set('colors', $scope.colors)
        }

    }]);

