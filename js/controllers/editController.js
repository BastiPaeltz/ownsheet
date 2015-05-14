/**
 * Created by sebastian on 5/8/15.
 */

"use strict";

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('editController', ["$scope", "$routeParams", "mdParserService",
    "chromeStorageService", "$window", "previewContentService",
    function ($scope, $routeParams, mdParserService,
              chromeStorageService, $window, previewContentService) {

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
\<strong\>Even HTML will work <\/strong>\n\
\n\
## Note however\n\
**There are better options for editing markdown (online or offline)**  \n\
ownsheet shines when it comes to displaying not so much when it comes to editing markdown";

        var sheetNameParam = $routeParams.sheetName;
        var bufferedContent = previewContentService.getBuffer();

        $scope.sheet = {};
        if (sheetNameParam) {
            $scope.sheet.name = sheetNameParam;
            if (!bufferedContent) {
                sheet = chromeStorageService.getFromStorage(sheetNameParam);
                sheet.then(function (value) {
                    if (value[sheetNameParam]) {
                        $scope.content = value[sheetNameParam].content;
                        $scope.sheet.message = sheetNameParam;
                    } else {
                        $scope.newSheet = true;
                        $scope.sheet.message = "You currently have no sheet named " + sheetNameParam + " but you can easily add one below.";
                        $scope.content = defaultContent;
                    }
                });
            } else {
                $scope.content = bufferedContent;
                $scope.sheet.message = sheetNameParam;
            }
        } else {

            $scope.newSheet = true;
            $scope.sheet.message = "Add new sheet";
            if (!bufferedContent) {
                $scope.content = defaultContent;
            }else {
                $scope.content = bufferedContent;
            }
        }

        this.preview = function () {
            previewContentService.add($scope.content);
            $window.open('main.html#/preview', "_self");
        };

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

