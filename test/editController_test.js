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
var localStorageService;
var chromeStorageService;
var routeParams;
var $scope;
var $controller;

describe('editController', function () {

    beforeEach(module("ownsheetApp"));
    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;

        $scope = {};
        routeParams = {
            sheetName: 'git'
        };
        getSpy = jasmine.createSpy('getSpy').and.returnValue('Hello from git.');
        setSpy = jasmine.createSpy('setSpy');

        localStorageService = {
            get: getSpy,
            set: setSpy
        };

    }));

    it("should populate the scope with sheet content if any is present", function () {
        editController = $controller('editController', {
            $routeParams: routeParams,
            $scope: $scope,
            localStorageService: localStorageService
        });
        expect(getSpy).toHaveBeenCalledWith('git');
        expect($scope.sheet.name).toEqual('git');
        expect($scope.content).toEqual('Hello from git.');
    });

    it("should populate the scope with default content if no sheet content is present", function () {
        routeParams = {
            sheetName: undefined
        };
        editController = $controller('editController', {
            $routeParams: routeParams,
            $scope: $scope,
            localStorageService: localStorageService
        });
        expect(getSpy).not.toHaveBeenCalled();
        expect($scope.sheet.name).toEqual('Add new sheet');
        expect($scope.content.length).toBeGreaterThan(20);
    });

    it("should route to view template of same sheet", function () {
        expect(false).toBeTruthy()
    });

    it("should be able to save changes on submit event", function () {
        var chromePushSpy = jasmine.createSpy();
        var windowSpy = jasmine.createSpy();

        var window = {
            open : windowSpy
        };

        chromeStorageService = {
            pushToStorage: chromePushSpy
        };

        editController = $controller('editController', {
            $routeParams: routeParams,
            $scope: $scope,
            localStorageService: localStorageService,
            chromeStorageService: chromeStorageService,
            $window: window
        });

        $scope = {
            sheet : {
                name : 'git'
            },
            content : 'Hello my friends from git'
        };
        expect(editController.submit).toBeDefined();
        editController.submit();
        expect(setSpy).toHaveBeenCalledWith("git", "Hello from git.");
        expect(chromePushSpy).toHaveBeenCalledWith("git", "Hello from git.");
        expect(windowSpy).toHaveBeenCalledWith('main.html#/view/git');
    });

    it("should be able to preview changes on preview event", function () {
        expect(false).toBeTruthy()
    });
});