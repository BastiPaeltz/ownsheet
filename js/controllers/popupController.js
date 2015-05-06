/**
 *
 * Created by sebastian on 5/3/15.
 */

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('popupController', ["$scope", "chromeStorageService", function ($scope, chromeStorageService){

    var sheets = chromeStorageService.getFromStorage(null);
    if(!sheets){
        $scope.emptyMessage = "No sheets added yet."
    }
    else $scope.sheets = [sheets];
}]);

