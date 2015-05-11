/**
 * Created by sebastian on 5/11/15.
 */

var routeParams;
var $scope;
var $controller;
var mainController;

describe('mainController', function () {

    beforeEach(module("ownsheetApp"));
    beforeEach(inject(function (_$rootScope_, _$controller_, _$routeParams_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        routeParams = _$routeParams_;
        $scope = {};

    }));

    it("should populate the scope with sheet name when one is present (in routeParams)", function(){
        routeParams = {
            sheetName: 'git'
        };
        mainController = $controller('mainController', {$scope: $scope, $routeParams: routeParams});
        expect($scope.sheet.name).toBeDefined();
        expect($scope.sheet.name).toEqual('git');
    });

    it("should populate the scope with empty string when none is present (in routeParams)", function(){
        routeParams = {
            sheetName: undefined
        };
        mainController = $controller('mainController', {$scope: $scope, $routeParams: routeParams});
        expect($scope.sheet.name).toBeDefined();
        expect($scope.sheet.name).toEqual('');
    });

    it("should route to view when link is clicked", function(){
        routeParams = {
            sheetName: "git"
        };
        mainController = $controller('mainController', {$scope: $scope, $routeParams: routeParams});
        expect($scope.sheet.name).toEqual('git');
        mainController.goToView();
    });


});