/**
 *
 * Created by sebastian on 5/3/15.
 */

var ownsheetApp = angular.module("ownsheetApp");

ownsheetApp.controller('popupController', function ($scope){

    // TODO: Get sheets from chrome storage
    $scope.sheets = [
        {
            name : 'git',
            description : 'version control done right.',
            content : 'git push --force'
        },
        {
            name : 'express',
            description : 'lightweight nodejs framework',
            content : 'request - response - router'
        }
    ];
});
