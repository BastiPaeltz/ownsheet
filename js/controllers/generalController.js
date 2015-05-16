/**
 * Created by sebastian on 5/15/15.
 */
/**
 *
 * Created by sebastian on 5/3/15.
 */

"use strict";

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('generalController', ["$scope", "$window", "chromeStorageService", "localStorageService",
    function ($scope, $window, chromeStorageService, localStorageService) {
        $scope.colors = localStorageService.get('colors') || [
                {code: "#2d9f34"}, {code: "#4b65c3"}, {code: "#48456a"}, {code: "#4f7a4e"},
                {code: "#d61115"}, {code: "#59582f"}];

        document.title = "Explore ownsheet";
        this.addFont = function () {
            $scope.colors.push({code: "Enter a hex color code."})
        };

        this.removeFont = function () {
            $scope.colors.pop();
            if ($scope.colors.length < 1) {
                $scope.colors = [
                    {code: "#2d9f34"}, {code: "#4b65c3"}, {code: "#48456a"}, {code: "#4f7a4e"},
                    {code: "#d61115"}, {code: "#59582f"}];
            }
        };

        this.submit = function () {

            for (var index in $scope.colors) {
                // test if valid hex color
                if (/^#[0-9A-F]{6}$/i.test($scope.colors[index].code) === false) {
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
        };

        this.import = function () {
            readFile(document.getElementById('importFile').files[0], $scope, function (readyCallback) {
                validateAndCheckForDuplicates(readyCallback.target.result, chromeStorageService, $scope);

            });
        };

        this.export = function () {

            var entireStoragePromise = chromeStorageService.getFromStorage(null);
            entireStoragePromise.then(function (value) {
                var blob = new Blob([JSON.stringify(value)], {type: "application/json;charset=utf-8"});
                saveAs(blob, "ownsheet-content.json");
            });
        }
    }]);


function startImportDialog(summary, $scope) {
    console.log(summary);
    if (summary.conflicts !== []) {
        console.log(summary);
        for (var index = 0; index < summary.conflicts.length; index++) {

            var decision;
            var length = summary.conflicts.length - index;
            bootbox.dialog({
                message: summary.safe + " out of " + summary.total +
                " sheets were imported. Conflicts on " + length +
                " remaining sheets. \<br\/>\<br\/> Conflict on sheet:<b>'" + summary.conflicts[index].name + "'\<\/b>",
                title: "Import into ownsheet",
                buttons: {
                    success: {
                        label: "Skip",
                        className: "btn-success",
                        callback: function () {
                        }
                    },
                    main: {
                        label: "Override",
                        className: "btn-primary",
                        callback: function () {
                            chromeStorageService.pushToStorage(summary.conflicts[index]);
                        }
                    },
                    danger: {
                        label: "Override all",
                        className: "btn-danger",
                        callback: function () {
                            for (i = index; i < summary.conflicts.length; i++) {
                                chromeStorageService.pushToStorage(summary.conflicts[index]);
                            }
                        }
                    }
                }
            });
        }
    } else {
        console.log("Hier");
        $scope.message = "Importing successful without conflicts."
    }
}

function validateAndCheckForDuplicates(fileContent, chromeStorageService, $scope) {
    function isValidSheetObject(sheet) {
        return sheet === json[sheet].name &&
            Object.getOwnPropertyNames(json[sheet]).length === 2
            && json[sheet].content;
    }

    var json;
    try {
        json = JSON.parse(fileContent);
    } catch (e) {
        $scope.error = "Couldn't parse JSON file."
    }

    var storagePromise = chromeStorageService.getFromStorage(null);
    storagePromise.then(function (value) {
        var conflicts = [];
        var safeImports;
        var totalItems;
        var failedImports;
        console.log(value);
        console.log(json);
        Object.keys(json).forEach(function (sheet) {
            if (isValidSheetObject(sheet)) {
                totalItems += 1;
                // check for conflict
                if (value[sheet]) {
                    conflicts.push(json[sheet]);
                } else {
                    chromeStorageService.pushToStorage(json[sheet]);
                    safeImports += 1;
                }
            } else {
                failedImports += 1;
                delete json[sheet];
            }
        });
        var summary = {
            conflicts: conflicts,
            failed: failedImports,
            safe: safeImports,
            total: totalItems
        };
        startImportDialog(summary, $scope);
    });

}

function readFile(file, $scope, onLoadCallback) {
    var reader = new FileReader();
    reader.onload = onLoadCallback;
    try {
        reader.readAsText(file);
    } catch (e) {
        $scope.error = "Not a valid JSON file."
    }
}
