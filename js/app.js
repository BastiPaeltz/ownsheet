/**
 *
 * Created by sebastian on 5/3/15.
 */

var ownsheetApp = angular.module("ownsheetApp", ["ngRoute"]);

ownsheetApp.config(function ($routeProvider) {
    $routeProvider
        .when("edit", {
            // TODO implement me
            templateUrl: "../edit.html",
            controller: "mainController"
        })

        .otherwise({redirectTo: '/edit'});
});