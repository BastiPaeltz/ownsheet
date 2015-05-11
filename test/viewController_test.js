/**
 * Created by sebastian on 5/9/15.
 */


var chromeStorageService;
var spy;
var deferred;
var $controller;
var mdSpy;
var $scope;
var $rootScope;
var $q;

describe('viewController', function () {

    beforeEach(module("ownsheetApp"));
    beforeEach(inject(function (_$q_, _$rootScope_, _$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        deferred = $q.defer();
        promise = deferred.promise;
        mdSpy = jasmine.createSpy('mdSpy').andReturnValue(promise);
        routeParams = {
            sheetName: 'git'
        };

        $scope = {};

        $controller = _$controller_;
        $q = _$q_;
        $rootScope = _$rootScope_;

        storageSpy = jasmine.createSpy('promiseSpy').and.returnValue(promise);
        chromeStorageService = {
            getFromStorage: storageSpy,
        };
    }));

    it("should call the markdown parser to transform content to HTML", function () {
        controller = $controller('viewController', {
            $scope: $scope,
            $routeParams: routeParams,
            chromeStorageService: chromeStorageService
        });
        expect(storageSpy).toHaveBeenCalledWith('git');
        deferred.resolve({
            git: {
                content: 'my content'
            }
        });
        $rootScope.$apply();
        expect(mdSpy).toHaveBeenCalledWith('my content');

    });

    it("should be able to retrieve content for the sheet", function () {
        controller = $controller('viewController', {
            $scope: $scope,
            $routeParams: routeParams,
            chromeStorageService: chromeStorageService
        });
        deferred.resolve({
            git: {
                content: 'my content'
            }
        });
        $rootScope.$apply();
        expect($sheet.content).toEqual('\<p\>my content\<\/p\>');
    });

    it("should act accordingly on an empty sheet (content)", function () {
        controller = $controller('viewController', {
            $scope: $scope,
            $routeParams: routeParams,
            chromeStorageService: chromeStorageService
        });
        deferred.resolve({});
        $rootScope.$apply();
        expect($sheet.message).toEqual('No sheet here. Do you want to add one?');
        expect(mdSpy).not.toHaveBeenCalled();
    });

});