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
this text will be ignored as well\n\
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
`Like this`\n\
\<strong\>Even HTML will work <\/strong>\
\n\
## Note however\n\
**There are better options for editing markdown (online or offline)**  \n\
ownsheet shines when it comes to displaying markdown not so much when it comes to editing it";

        var sheetNameParam = $routeParams.sheetName;

        $scope.sheet = {};
        if (sheetNameParam) {
            $scope.sheet.name = sheetNameParam;
            sheet = chromeStorageService.getFromStorage(sheetNameParam);
            sheet.then(function (value) {
                if (value[sheetNameParam]) {
                    $scope.content = value[sheetNameParam].content;
                    $scope.sheet.message = "Edit sheet "
                        + sheetNameParam;
                } else {
                    $scope.newSheet = true;
                    $scope.sheet.message = "You currently have no sheet named " + sheetNameParam + " but you can easily add one below.";
                    $scope.content = defaultContent;
                }
            });
        } else {
            $scope.newSheet = true;
            $scope.sheet.message = "Add new sheet";
            $scope.content = defaultContent;
        }


        this.submit = function () {
            var sheetKey, storagePromise, storageObject;
            if ($scope.sheet.name) {
                sheetKey = $scope.sheet.name;
                storageObject = {};
                storageObject[sheetKey] = {
                    name: sheetKey,
                    content: $scope.content
                };
                chromeStorageService.pushToStorage(storageObject);
                $window.open('main.html#/view/' + sheetKey, "_self");
            }
            else {
                sheetKey = $scope.sheet.newName;
                if (!sheetKey) {
                    $scope.sheet.message = "Give your sheet a name."
                } else {
                    storagePromise = chromeStorageService.getFromStorage(sheetKey);
                    storagePromise.then(function (value) {
                        if (value[sheetKey]) {
                            $scope.sheet.message = "sheet with name " + sheetKey + " is already defined. Please try another name."
                        } else {
                            storageObject = {};
                            storageObject[sheetKey] = {
                                name: sheetKey,
                                content: $scope.content
                            };
                            chromeStorageService.pushToStorage(storageObject);
                            $window.open('main.html#/view/' + sheetKey, "_self");
                        }
                    });
                }
            }
        }
    }
]);

