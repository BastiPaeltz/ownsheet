/**
 *
 * Created by sebastian on 5/3/15.
 */

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('popupController', ["$scope", "chromeStorageService", function ($scope, chromeStorageService) {
    chromeStorageService.getFromStorage(null).then(function (value) {
        if (!value) {
            $scope.emptyMessage = "No sheets added yet."
        }
        else {
            $scope.sheets = [value];
        }
    });
}]);

