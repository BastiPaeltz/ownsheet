/**
 *
 * Created by sebastian on 5/3/15.
 */

var ownsheetApp = angular.module("ownsheetApp", ["ngRoute", "LocalStorageModule"]);

ownsheetApp.config(function ($routeProvider) {
    $routeProvider
        .when("/edit/:sheetName?", {
            // TODO implement me
            templateUrl: "../partials/edit.html",
            controller: "editController"
        })

        .when("/view/:sheetName?", {
            // TODO implement me
            templateUrl: "../partials/sheet.html",
            controller: "sheetController"
        })

        .otherwise({redirectTo: '/edit'});
});