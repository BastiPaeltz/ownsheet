/**
 *
 * Created by sebastian on 5/3/15.
 */
"use strict";

var ownsheetApp = angular.module("ownsheetApp", ["ngRoute"]);

ownsheetApp.config(function ($routeProvider) {
    $routeProvider
        .when("/edit/:sheetName?", {
            templateUrl: "../partials/edit.html",
            controller: "editController"
        })

        .when("/view/:sheetName?", {
            templateUrl: "../partials/sheet.html",
            controller: "viewController"
        })

        .otherwise({redirectTo: '/'});
});