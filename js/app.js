/**
 *
 * Created by sebastian on 5/3/15.
 */
"use strict";

var ownsheetApp = angular.module("ownsheetApp", ['ngRoute', 'ui.bootstrap', 'LocalStorageModule']);

ownsheetApp.config(function ($routeProvider) {
    $routeProvider
        .when("/edit/:sheetName?", {
            templateUrl: "../templates/edit.html",
            controller: "editController"
        })

        .when("/view/:sheetName", {
            templateUrl: "../templates/sheet.html",
            controller: "viewController"
        })

        .when("/preview", {
            templateUrl: "../templates/sheet.html",
            controller: "viewController"
        })

        .when("/general", {
            templateUrl: "../templates/general.html",
            controller: "generalController"
        })

        //.otherwise({redirectTo: '/general'});


});

ownsheetApp.run(['$anchorScroll', function($anchorScroll) {
        $anchorScroll.yOffset = 100;   // always scroll by 100 extra pixels
    }])