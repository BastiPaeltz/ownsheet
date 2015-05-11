/**
 *
 * Created by sebastian on 5/3/15.
 */
"use strict";

var ownsheetApp = angular.module("ownsheetApp", ["ngRoute"]);

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