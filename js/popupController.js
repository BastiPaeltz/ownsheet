/**
 *
 * Created by sebastian on 5/3/15.
 */

var ownsheet = angular.module("ownsheet-app");

ownsheet.controller('landingController', function ($scope){

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
