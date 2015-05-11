/**
 * Created by sebastian on 5/8/15.
 */

"use strict";

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('editController', ["$scope", "$routeParams", "mdParserService",
    "chromeStorageService", "$window",
    function ($scope, $routeParams, mdParserService, chromeStorageService, $window) {

        var sheet;
        var defaultContent = "# ownsheet ignores these headings\n\
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

        var sheetNameParam = $routeParams.sheetName;

        $scope.sheet = {};
        if (sheetNameParam) {
            sheet = chromeStorageService.getFromStorage(sheetNameParam);
            sheet.then(function (value) {
                if (value[sheetNameParam]) {
                    $scope.content = value[sheetNameParam].content;
                } else {
                    $scope.content = defaultContent;
                }
            });
            $scope.sheet.name = sheetNameParam;
        } else {
            $scope.newSheet = true;
            $scope.sheet.name = "Add new sheet";
            $scope.content = defaultContent;
        }


        this.submit = function () {
            var sheetKey;
            if ($scope.sheet.name !== "Add new sheet") {
                sheetKey = $scope.sheet.name;
            }
            else {
                sheetKey = $scope.sheet.newName;
            }
            var storageObject = {};
            storageObject[sheetKey] = {
                name: sheetKey,
                content: $scope.content
            };
            chromeStorageService.pushToStorage(storageObject);
            $window.open('main.html#/view/' + sheetKey);
        }
    }])
;

