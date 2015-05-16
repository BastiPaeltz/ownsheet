/**
 * Created by sebastian on 5/8/15.
 */

"use strict";

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('editController', ["$scope", "$routeParams",
    "chromeStorageService", "$window", "previewContentService",
    function ($scope, $routeParams, chromeStorageService, $window, previewContentService) {

        var sheet;
        var defaultContent = "# ownsheet ignores these headings\n\
\n\
This text will be ignored as well.\n\
\n\
## each of these headings will form a box\n\
\n\
This text will be content of a box.\n\
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
ownsheet shines when it comes to displaying not so much when it comes to editing markdown.";

        var sheetNameParam = $routeParams.sheetName;
        var bufferedContent = previewContentService.getBuffer();
        $scope.alerts = [];
        $scope.sheet = {};
        if (sheetNameParam) {
            $scope.sheet.name = sheetNameParam;
            if (!bufferedContent) {
                sheet = chromeStorageService.getFromStorage(sheetNameParam);
                sheet.then(function (value) {
                    if (value[sheetNameParam]) {
                        $scope.content = value[sheetNameParam].content;
                        $scope.initialContent = $scope.content;
                        $scope.sheet.message = sheetNameParam;
                    } else {
                        $scope.newSheet = true;
                        $scope.sheet.message = "You currently have no sheet named " + sheetNameParam + " but you can easily add one below.";
                        $scope.content = defaultContent;
                        $scope.initialContent = $scope.content;
                    }
                });
            } else {
                $scope.content = bufferedContent;
                $scope.initialContent = $scope.content;
                $scope.sheet.message = sheetNameParam;
            }
        } else {

            $scope.newSheet = true;
            $scope.sheet.message = "Add new sheet";
            if (!bufferedContent) {
                $scope.content = defaultContent;
                $scope.initialContent = $scope.content;
            } else {
                $scope.content = bufferedContent;
                $scope.initialContent = $scope.content;
            }
        }


        document.title = "ownsheet - edit sheet";

        //prevent from leaving page
        $scope.$on('$locationChangeStart', function (event) {
            if (!$scope.safeToNavigate && ($scope.initialContent !== $scope.content)) {
                var answer = confirm("You started editing  - are you sure you want to leave this page?");
                if (!answer) {
                    event.preventDefault();
                }
            }
        });

        this.preview = function () {
            if (isValidContent($scope)) {
                previewContentService.add($scope.content);
                $scope.safeToNavigate = true;
                $window.open('main.html#/preview', "_self");
            }
        };

        this.submit = function () {
            if (isValidContent($scope)) {
                var sheetKey, storagePromise, storageObject;
                if ($scope.sheet.name && !$scope.newSheet) {
                    sheetKey = $scope.sheet.name;
                    storageObject = {};
                    storageObject[sheetKey] = {
                        name: sheetKey,
                        content: $scope.content
                    };
                    chromeStorageService.pushToStorage(storageObject);
                    $scope.safeToNavigate = true;
                    $window.open('main.html#/view/' + sheetKey, "_self");
                }
                else {
                    sheetKey = $scope.sheet.newName;
                    if (!sheetKey) {
                        $scope.alerts.push({
                            type: "danger",
                            msg: "Give your sheet a name."
                        });
                        $scope.closeAlert = function (index) {
                            $scope.alerts.splice(index, 1);
                        };
                    }
                    else {
                        storagePromise = chromeStorageService.getFromStorage(sheetKey);
                        storagePromise.then(function (value) {
                            if (value[sheetKey]) {
                                $scope.alerts.push({
                                    type: "danger",
                                    msg: "sheet with name " + sheetKey + " is already defined. Please try another name."
                                });
                                $scope.closeAlert = function (index) {
                                    $scope.alerts.splice(index, 1);
                                };
                            } else {
                                storageObject = {};
                                storageObject[sheetKey] = {
                                    name: sheetKey,
                                    content: $scope.content
                                };
                                chromeStorageService.pushToStorage(storageObject);
                                $scope.safeToNavigate = true;
                                $window.open('main.html#/view/' + sheetKey, "_self");
                            }
                        });
                    }
                }
            }
        }
    }
]);

function isValidContent($scope) {
    if ($scope.content.indexOf('##') === -1) {
        $scope.alerts.push({
            type: "danger",
            msg: "Please include at least one '##' heading inside your text."
        });
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
        return false;
    }
    return true;
}

