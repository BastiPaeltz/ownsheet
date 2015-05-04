/**
 *
 * Created by sebastian on 5/3/15.
 */

var ownsheetApp = angular.module("ownsheetApp", ["ngRoute"]);

ownsheetApp.config(function ($routeProvider) {
    $routeProvider
        .when("/main", {
            // TODO implement me
            templateUrl: "../views/main.html",
            controller: "mainController"
        })
        .otherwise({redirectTo: '/main'});
});