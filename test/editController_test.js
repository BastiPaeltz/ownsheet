/**
 * Created by sebastian on 5/8/15.
 */


/**
 * Created by sebastian on 5/4/15.
 */


"use strict";

var editController;
var getSpy;
var setSpy;
var chromeStorageService;
var routeParams;
var $scope;
var $controller;
var $rootScope;
var chromePushSpy;
var deferred;
var $q;
var promise;

describe('editController', function () {

    beforeEach(module("ownsheetApp"));

    beforeEach(inject(function (_$rootScope_, _$q_, _$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $q = _$q_;
        deferred = $q.defer();
        promise = deferred.promise;
        $scope = {};
        routeParams = {
            sheetName: 'git'
        };
        getSpy = jasmine.createSpy('getSpy').and.returnValue(promise);
        setSpy = jasmine.createSpy('setSpy');
        chromePushSpy = jasmine.createSpy('chromePushSpy');
        chromeStorageService = {
            getFromStorage: getSpy,
            pushToStorage: chromePushSpy
        };

    }));

    it("should populate the scope with sheet content if any is present", function () {
        var chromeStorageService = {
            getFromStorage: getSpy
        };
        deferred.resolve({git: {name: 'git', content: 'hello from git!'}});
        editController = $controller('editController', {
            $routeParams: routeParams,
            $scope: $scope,
            chromeStorageService: chromeStorageService
        });
        $rootScope.$apply();
        expect(getSpy).toHaveBeenCalledWith('git');
        expect($scope.sheet.message).toEqual('Edit sheet git');
        expect($scope.content).toEqual('hello from git!');
    });

    it("should populate the scope with default content if no sheet content is present", function () {
        routeParams = {
            sheetName: undefined
        };
        editController = $controller('editController', {
            $routeParams: routeParams,
            $scope: $scope,
            chromeStorageService: chromeStorageService
        });
        expect(getSpy).not.toHaveBeenCalled();
        expect($scope.sheet.message).toEqual('Add new sheet');
        expect($scope.content.length).toBeGreaterThan(20);
    });

    it("should populate the scope with \"nothing here yet\" message if sheet was in route but no content was found", function () {
        deferred.resolve({});
        editController = $controller('editController', {
            $routeParams: routeParams,
            $scope: $scope,
            chromeStorageService: chromeStorageService
        });
        $rootScope.$apply();
        expect(getSpy).toHaveBeenCalled();
        expect($scope.sheet.message).toEqual('You currently have no sheet named git but you can easily add one below.');
        expect($scope.content.length).toBeGreaterThan(20);
    });

    it("should be able to save changes on submit event and redirect to that view.", function () {

        var windowSpy = jasmine.createSpy();

        var window = {
            open: windowSpy
        };

        editController = $controller('editController', {
            $routeParams: routeParams,
            $scope: $scope,
            chromeStorageService: chromeStorageService,
            $window: window
        });
        $scope.content = 'Hello my friends from git.';
        deferred.resolve({'macherie':{content : 'im already defined!'}});
        $rootScope.$apply();
        expect(editController.submit).toBeDefined();
        expect(getSpy).toHaveBeenCalled();
        expect($scope.sheet.name).toEqual('git');
        $rootScope.$apply();
        editController.submit();
        deferred.resolve({'git':{content : 'im already defined!'}});
        $rootScope.$apply();
        expect(chromePushSpy).toHaveBeenCalled();
        expect(windowSpy).toHaveBeenCalledWith('main.html#/view/git');
    });

    it("should be able to reject new sheets which are already defined.", function () {
        routeParams = {
            sheetName: undefined
        };
        var windowSpy = jasmine.createSpy('winSpy');
        var window = {
            open: windowSpy
        };

        editController = $controller('editController', {
            $routeParams: routeParams,
            $scope: $scope,
            chromeStorageService: chromeStorageService,
            $window : window
        });
        $scope.sheet.name = '';
        $scope.sheet.newName = 'macherie';
        deferred.resolve({'git':{content : 'im already defined!'}});
        $rootScope.$apply();
        editController.submit();
        expect(getSpy).toHaveBeenCalledWith('macherie');
        deferred.resolve({'macherie':{content : 'im already defined!'}});
        $rootScope.$apply();
        console.log($scope);
        expect(setSpy).not.toHaveBeenCalled();
        expect($scope.errorMessage).toEqual('sheet with name git already exists! Please try another name.')

    });

    it("should be able to preview changes on preview event", function () {
        expect(false).toBeTruthy()
    });
});