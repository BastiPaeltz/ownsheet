/**
 * Created by sebastian on 5/8/15.
 */

/**
 *
 * Created by sebastian on 5/3/15.
 */
"use strict";

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('editController', ["$scope", "$routeParams", "mdParserService",
    "localStorageService", "$window",
    function ($scope, $routeParams, mdParserService, localStorageService, $window) {
        var sheetContent;


        var sheetName = $routeParams.sheetName;

        $scope.sheet = {};
        if (sheetName) {
            sheetContent = localStorageService.get(sheetName);
            $scope.sheet.name = sheetName;
        } else {
            $scope.sheet.name = "Add new sheet";
        }

        if (sheetContent) {
            $scope.content = sheetContent;
        } else {
            $scope.content = "# ownsheet ignores these headings\n\
\n\
this text will be ignored\n\
\n\
## each of these headings will form a box\n\
\n\
this text will be content of a box\n\
\n\
## another box\n\
\n\
* you can fill in any markdown you want\n\
* it will be part of the box\n\
\n\
`Like these`\n\
\n\
\
\n\
## Note however that there are better options for editing markdown (online or offline)\n\
\n\
### ownsheet shines when it comes to displaying markdown not so much when it comes to editing it"
        }

        this.submit = function () {
            localStorageService.set($scope.sheet.name, $scope.content);
            chromeStorageService.pushToStorage($scope.sheet.name, $scope.content);
            $window.open('main.html#/view/'+$scope.sheet.name);
        }
    }]);

