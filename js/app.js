/**
 *
 * Created by sebastian on 5/3/15.
 */

var ownsheet = angular.module('ownsheet-app', ["ngRoute"]);

ownsheet.config(function ($routeProvider) {
    $routeProvider
        .when("/main", {
            // TODO implement me
            templateUrl: "../views/main.html",
            controller: "mainController"
        })
        .otherwise({redirectTo: '/fahrten'});
});