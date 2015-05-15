/**
 * Created by sebastian on 5/4/15.
 */

"use strict";

var popupController;
var storageItemsMock;
var storageSpy;
var $scope;
var $q;
var deferred;
var promise;
var returnedValue;
var $rootScope;
var chromeRemoveSpy;

describe('popupController', function () {

    beforeEach(module("ownsheetApp"));
    beforeEach(inject(function (_$rootScope_, _$q_, _$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $q = _$q_;
        $rootScope = _$rootScope_;

        deferred = $q.defer();
        promise = deferred.promise;

        $scope = {};

        storageSpy = jasmine.createSpy('promiseSpy').and.returnValue(promise);
        chromeRemoveSpy = jasmine.createSpy('chrRemoveSpy');
        chromeStorageService = {
            getFromStorage: storageSpy,
            removeFromStorage: chromeRemoveSpy
        };

        promise.then(function (value) {
            returnedValue = value;
        });

        storageItemsMock = {
            git: {
                name: 'git',
                content: 'hello world'
            },

            json: {
                name: 'json',
                content: 'hello from json'
            }
        };

    }));

    it("should populate the scope with emptyMessage when no items are returned", function () {
        popupController = $controller('popupController', {$scope: $scope, chromeStorageService: chromeStorageService});
        deferred.resolve({});
        expect(storageSpy).toHaveBeenCalledWith(null);
        $rootScope.$apply();
        expect($scope.sheets).toBeFalsy();
        expect(returnedValue).toEqual({});
        expect($scope.message).toBe("No sheets added yet.");
    });

    it("should populate the scope with sheets when items are returned", function () {
        popupController = $controller('popupController', {$scope: $scope, chromeStorageService: chromeStorageService});
        deferred.resolve(storageItemsMock);
        expect(storageSpy).toHaveBeenCalledWith(null);
        $rootScope.$apply();
        expect(returnedValue).not.toBeFalsy();
        expect($scope.message).toBeFalsy();
        expect($scope.sheets.length).toEqual(2);
    });

    it("should route to empty edit.html when add new sheet is clicked", function () {
        var windowSpy = jasmine.createSpy('windowSpy');
        var myWindow = {
            open: windowSpy
        };
        popupController = $controller('popupController', {$scope: $scope, $window: myWindow});
        expect(popupController.newSheet).toBeDefined();
        popupController.newSheet();
        expect(windowSpy).toHaveBeenCalledWith('main.html#/edit');
    });

    it("should route to 'general' when explore button is clicked", function () {
        var windowSpy = jasmine.createSpy('windowSpy');
        var myWindow = {
            open: windowSpy
        };
        popupController = $controller('popupController', {$scope: $scope, $window: myWindow});
        expect(popupController.goToGeneral).toBeDefined();
        popupController.goToGeneral();
        expect(windowSpy).toHaveBeenCalledWith('main.html#/general');
    });


    it("should route to populated edit template when edit item is clicked", function () {
        var windowSpy = jasmine.createSpy('windowSpy');
        var myWindow = {
            open: windowSpy
        };
        popupController = $controller('popupController', {$scope: $scope, $window: myWindow});
        expect(popupController.editSheet).toBeDefined();
        popupController.editSheet('git');
        expect(windowSpy).toHaveBeenCalledWith('main.html#/edit/git');
    });

    it("should route to populated view template when an item name is clicked", function () {
        var windowSpy = jasmine.createSpy('windowSpy');
        var myWindow = {
            open: windowSpy
        };
        popupController = $controller('popupController', {$scope: $scope, $window: myWindow});
        expect(popupController.goToSheet).toBeDefined();
        popupController.goToSheet('git');
        expect(windowSpy).toHaveBeenCalledWith('main.html#/view/git');
    });

    it("should remove items from storage and scope when del is clicked.", function () {
        var confirmSpy = jasmine.createSpy('confirmSpy').and.returnValue('yes');
        var myWindow = {
            confirm: confirmSpy
        };
        popupController = $controller('popupController', {
            $scope: $scope,
            chromeStorageService: chromeStorageService,
            $window: myWindow
        });
        expect(popupController.removeSheet).toBeDefined();
        deferred.resolve(storageItemsMock);
        $rootScope.$apply();
        expect($scope.sheets.indexOf('git')).not.toEqual(-1);
        popupController.removeSheet('git');
        expect(confirmSpy).toHaveBeenCalled();
        expect(chromeRemoveSpy).toHaveBeenCalledWith('git');
        expect($scope.sheets.indexOf('git')).toEqual(-1);
        expect($scope.sheets.indexOf('json')).not.toEqual(-1);
    });

    it("When last sheet is removed, empty-message should be displayed", function () {
        var confirmSpy = jasmine.createSpy('confirmSpy').and.returnValue('yes');
        var myWindow = {
            confirm: confirmSpy
        };
        popupController = $controller('popupController', {
            $scope: $scope,
            chromeStorageService: chromeStorageService,
            $window: myWindow
        });
        expect(popupController.removeSheet).toBeDefined();
        deferred.resolve({git : {}});
        $rootScope.$apply();
        expect($scope.sheets.indexOf('git')).not.toEqual(-1);
        popupController.removeSheet('git');
        expect(chromeRemoveSpy).toHaveBeenCalledWith('git');
        expect($scope.sheets.indexOf('git')).toEqual(-1);
        expect($scope.message).toEqual('No sheets added yet.')
    });
});