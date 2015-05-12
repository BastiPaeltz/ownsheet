/**
 *
 * Created by sebastian on 5/3/15.
 */
"use strict";

var ownsheetApp = angular.module("ownsheetApp", ["ngRoute"]);

ownsheetApp.config(function ($routeProvider) {
    $routeProvider
        .when("/edit/:sheetName?", {
            templateUrl: "../templates/edit.html",
            controller: "editController"
        })

        .when("/view/:sheetName?", {
            templateUrl: "../templates/sheet.html",
            controller: "viewController"
        })

        .otherwise({redirectTo: '/'});
});