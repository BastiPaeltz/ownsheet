/**
 * Created by sebastian on 5/8/15.
 */

"use strict";

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('editController', ["$scope", "$location", "$routeParams",
    "chromeStorageService", "$window", "previewContentService",
    function ($scope, $location, $routeParams, chromeStorageService, $window, previewContentService) {

        var sheetPromise;
        var defaultContent = "\
## WELCOME TO OWNSHEET! \n\
You can write your sheets with markdown. It is a **simple** and **easy to learn** markup language.\n\
\n\
# Here is how ownsheet transforms markdown - it's really simple.\n\
\n\
# Level 1 headings will be ignored\n\
This text will be omitted as well.\n\
\n\
## each of these level 2 headings will form a box\n\
###This subheading will be content of a box\n\
* you can fill in **ANY** markdown you want\n\
* it will be part of the box  \n\
\n\
## Github Flavored Markdown is supported as well\n\
[Learn more about it!](https://help.github.com/articles/github-flavored-markdown//)\n\
\n\
## Fully customizable!\n\
Don't like the default colors? Just head to the **Explore** section and define your own!\n\
\n\
## Compatible with a lot of cheat sheets out there.\n\
Markdown is a common tool for writing cheat sheets, documentations and the likes.\n\
So you can easily **incorporate parts or entire external sheets** into ownsheet.\n\
*You may find the converter on the Explore section useful for this.*\n\
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
            // check buffered content (from previewContentService) first
            if (!bufferedContent) {
                // if no buffered content is found, check storage for it
                sheetPromise = chromeStorageService.getFromStorage(sheetNameParam);
                sheetPromise.then(function (value) {
                    if (value[sheetNameParam]) {
                        $scope.content = value[sheetNameParam].content;
                        $scope.initialContent = $scope.content;
                        $scope.sheet.message = sheetNameParam;
                    } else {
                        // if storage doesn't have content either, print message
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
            // check buffered content
            if (!bufferedContent) {
                // if it isnt found, print default content
                $scope.content = defaultContent;
                $scope.initialContent = $scope.content;
            } else {
                $scope.content = bufferedContent;
                $scope.initialContent = $scope.content;
            }
        }


        document.title = "ownsheet - edit sheet";

        // prevent from leaving page unasked when not save to leave
        window.onbeforeunload = function (event) {
            if (!$scope.safeToNavigate && ($scope.initialContent !== $scope.content)) {
                return "You started editing  - are you sure you want to leave this page?";
            }
        };

        this.preview = function () {
            if (isValidContent($scope)) {
                previewContentService.add($scope.content);
                $scope.safeToNavigate = true;
                $location.path('/preview');
                //$window.open('main.html#/preview', "_self");
            }
        };

        this.submit = function () {
            if (isValidContent($scope)) {
                var sheetKey, storagePromise, storageObject;
                // if a sheet name is defined and it is not a new sheet.
                if ($scope.sheet.name && !$scope.newSheet) {
                    // this guarantees that no collision will be there
                    sheetKey = $scope.sheet.name;
                    saveToStorageAndCleanup(sheetKey, chromeStorageService, $scope, $window)
                }
                else {
                    // if it is a new sheet ...
                    sheetKey = $scope.sheet.newName;
                    if (!sheetKey) {
                        // if no name is defined, print alert message
                        $scope.alerts.push({
                            type: "danger",
                            msg: "Give your sheet a name."
                        });
                        $scope.closeAlert = function (index) {
                            $scope.alerts.splice(index, 1);
                        };
                    }
                    else {
                        // else try to save to storage
                        storagePromise = chromeStorageService.getFromStorage(sheetKey);
                        storagePromise.then(function (value) {
                            if (value[sheetKey]) {
                                // sheet is already present and defined in storage
                                // -> print alert
                                $scope.alerts.push({
                                    type: "danger",
                                    msg: "sheet with name " + sheetKey + " is already defined. Please try another name."
                                });
                                $scope.closeAlert = function (index) {
                                    $scope.alerts.splice(index, 1);
                                };
                            } else {
                                // no collision on sheet is found
                                // save to storage
                                saveToStorageAndCleanup(sheetKey, chromeStorageService, $scope, $window)
                            }
                        });
                    }
                }
            }
        }
    }
]);


function saveToStorageAndCleanup(sheetKey ,chromeStorageService, $scope, $window){
    var storageObject = {};
    storageObject[sheetKey] = {
        name: sheetKey,
        content: $scope.content
    };
    chromeStorageService.pushToStorage(storageObject);
    $scope.safeToNavigate = true;
    $window.open('main.html#/view/' + sheetKey, "_self");
}

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

