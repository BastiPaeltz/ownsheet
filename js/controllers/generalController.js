/**
 * Created by sebastian on 5/15/15.
 */
/**
 *
 * Created by sebastian on 5/3/15.
 */

"use strict";

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('generalController', ["$scope", "$window", "$q", "chromeStorageService", "localStorageService",
    function ($scope, $window, $q, chromeStorageService, localStorageService) {
        $scope.colors = localStorageService.get('colors') || [
                {code: "#2d9f34"}, {code: "#4b65c3"}, {code: "#48456a"}, {code: "#4f7a4e"},
                {code: "#d61115"}, {code: "#59582f"}];

        $scope.backgroundColor = localStorageService.get('background-color') || "#b3b3b3";

        $scope.boxSize = localStorageService.get('box-size') || 250;

        $scope.alerts = [];
        document.title = "Explore ownsheet";

        $scope.converter = "\
## headings will be converted. \n\
You can convert headings UP or DOWN.\n\
\n\
### Subheadings will be converted up to level 4.\n\
\n\
### You can test it with this example text.\n\
\n\
Any content will stay the same.\n";

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

        this.submitFonts = function () {

            for (var index in $scope.colors) {
                // test if valid hex color
                if (/^#[0-9A-F]{6}$/i.test($scope.colors[index].code) === false) {
                    $scope.colors.splice(index, 1);
                }
            }
            if ($scope.colors.length < 1) {
                $scope.colors = [
                    {code: "#2d9f34"}, {code: "#4b65c3"}, {code: "#48456a"}, {code: "#4f7a4e"},
                    {code: "#d61115"}, {code: "#59582f"}];
                bootbox.alert("Please enter valid hex color codes!");
            } else {
                localStorageService.set('colors', $scope.colors);
                bootbox.alert($scope.colors.length + " custom colors saved!");
            }
        };

        this.resetFonts = function () {

            $scope.colors = [
                {code: "#2d9f34"}, {code: "#4b65c3"}, {code: "#48456a"}, {code: "#4f7a4e"},
                {code: "#d61115"}, {code: "#59582f"}];
            localStorageService.set('colors', $scope.colors);
            bootbox.alert("Box colors reset!");
        };

        this.convertUp = function(){
            $scope.converter = ($scope.converter).replace(/(\n|^)[\#]{3}([^\#])/g, "$1####$2");
            $scope.converter = ($scope.converter).replace(/(\n|^)[\#]{2}([^\#])/g, "$1###$2");
            $scope.converter = ($scope.converter).replace(/(\n|^)[\#]{1}([^\#])/g, "$1##$2");

        };

        this.convertDown = function(){
            $scope.converter = ($scope.converter).replace(/(\n|^)[\#]{2}([^\#])/g, "$1#$2");
            $scope.converter = ($scope.converter).replace(/(\n|^)[\#]{3}([^\#])/g, "$1##$2");
            $scope.converter = ($scope.converter).replace(/(\n|^)[\#]{4}([^\#])/g, "$1###$2");
        };

        this.submitBGColor = function () {

            if (/^#[0-9A-F]{6}$/i.test($scope.backgroundColor) === false) {
                $scope.backgroundColor = "#b3b3b3";
                bootbox.alert("Please enter valid hex color codes!");
            } else {
                localStorageService.set('background-color', $scope.backgroundColor);
                bootbox.alert("Background color saved!");
            }
        };

        this.resetBGColor = function () {
            $scope.backgroundColor = "#b3b3b3";
            localStorageService.set('background-color', $scope.backgroundColor);
            bootbox.alert("Background color reset!");
        };


        this.submitBoxSize = function () {
            if($.isNumeric($scope.boxSize) && $scope.boxSize > 100 && $scope.boxSize < 700) {
                localStorageService.set('box-size', $scope.boxSize);
                bootbox.alert("Box size saved!");
            }else{
                $scope.boxSize = 250;
                bootbox.alert("Please enter an integer number between 100 and 700.");
            }
        };

        this.resetBoxSize = function () {

            $scope.boxSize = 250;
            localStorageService.set('box-size', $scope.boxSize);
            bootbox.alert("Box size reset!");
        };


        this.import = function () {
            readFile(document.getElementById('importFile').files[0], $scope, function (readyCallback) {
                validateAndCheckForDuplicates(readyCallback.target.result, chromeStorageService, $scope, $q);

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


function startImportDialog(summary, $scope, $q, chromeStorageService) {

    if (summary.conflicts.length === 0) {
        printSuccessBootBox(summary);
    } else {
        printAndProcessBootBox(summary, 0, $q, chromeStorageService);
    }
}

function printAndProcessBootBox(summary, index, $q, chromeStorageService) {
    if (index === summary.conflicts.length) {
        var boxPromise = bootBoxDialog(summary, index, $q);
        boxPromise.then(function (value) {
            // value = decision
            switch (value) {
                case "skip":
                    index += 1;
                    printAndProcessBootBox(summary, index, $q, chromeStorageService);
                    break;
                case "override":
                    var storageObject = {};
                    storageObject[summary.conflicts[index].name] = summary.conflicts[index];
                    chromeStorageService.pushToStorage(storageObject);
                    index += 1;
                    printAndProcessBootBox(summary, index, $q, chromeStorageService);
                    break;
                case "override-all":
                    var storageObject = {};
                    for (var i = index; i < summary.conflicts.length; i++) {
                        storageObject[summary.conflicts[index].name] = summary.conflicts[index];
                        chromeStorageService.pushToStorage(storageObject);
                    }
                    break;
            }
        });
    } else {
        printSuccessBootBox(summary);
    }
};

function validateAndCheckForDuplicates(fileContent, chromeStorageService, $scope, $q) {
    function isValidSheetObject(sheet) {
        return sheet === json[sheet].name &&
            Object.getOwnPropertyNames(json[sheet]).length === 2
            && json[sheet].content;
    }

    var json;
    try {
        json = JSON.parse(fileContent);
    } catch (e) {
        $scope.alerts.push({
            type: "danger",
            msg: "Couldn't parse input file." +
            " Make sure this is the ownsheet-content.json file you exported earlier."
        });
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
    }

    var storagePromise = chromeStorageService.getFromStorage(null);
    storagePromise.then(function (value) {
        var conflicts = [];
        var safeImports = 0;
        var totalItems = 0;
        var failedImports = 0;
        Object.keys(json).forEach(function (sheet) {
            if (isValidSheetObject(sheet)) {
                totalItems += 1;
                // check for conflict - conflict case when sheet is already defined and
                // contents differ.
                if (value[sheet]) {
                    // case: conflict
                    if (value[sheet].content !== json[sheet].content) {
                        conflicts.push(json[sheet]);
                    } else {
                        safeImports += 1;
                    }
                } else {
                    // case: no conflict
                    var storageObject = {};
                    storageObject[sheet] = json[sheet];
                    chromeStorageService.pushToStorage(storageObject);
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
        console.log(summary);
        startImportDialog(summary, $scope, $q, chromeStorageService);
    });

}

function readFile(file, $scope, onLoadCallback) {
    var reader = new FileReader();
    reader.onload = onLoadCallback;
    try {
        reader.readAsText(file);
    } catch (e) {
        $scope.alerts.push({
            type: "danger",
            msg: "Can't read import file."
        });
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
    }
}

function bootBoxDialog(summary, index, $q) {
    var deferred = $q.defer();
    bootbox.dialog({
        message: "Detected " + summary.failed + " invalid sheet. " + summary.safe +
        " out of " + summary.total + " valid sheets were successfully imported. Conflicts on " +
        (summary.conflicts.length - index) + " remaining sheets. \<br\/>\<br\/> Conflict on sheet <b>'"
        + summary.conflicts[index].name + "'\<\/b>",
        title: "Import into ownsheet",
        buttons: {
            success: {
                label: "Keep",
                className: "btn-success",
                callback: function () {
                    deferred.resolve("skip")
                }
            },
            main: {
                label: "Override",
                className: "btn-primary",
                callback: function () {
                    deferred.resolve("override")
                }
            },
            danger: {
                label: "Override all",
                className: "btn-danger",
                callback: function () {
                    deferred.resolve("override-all")
                }

            }
        }
    });
    return deferred.promise;
}

function printSuccessBootBox(summary) {
    bootbox.alert("Detected " + summary.failed + " invalid sheet. " + summary.safe +
        " out of " + summary.total +
        " valid sheets were successfully imported. No remaining conflicts.\<br\/>\<br\/> <b>Import completed!\<\/b>")
}