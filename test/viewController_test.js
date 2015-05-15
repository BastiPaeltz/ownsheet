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
var mdParserService;
var parseSpy;

describe('viewController', function () {

    beforeEach(module("ownsheetApp"));
    beforeEach(inject(function (_$q_, _$rootScope_, _$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $q = _$q_;
        deferred = $q.defer();
        promise = deferred.promise;
        routeParams = {
            sheetName: 'git'
        };

        parseSpy = jasmine.createSpy('parseSpy').and.returnValue('\<p\>my content\<\/p\>');

        mdParserService = {
            parse: parseSpy
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

    it("should be able to distinguish preview and normal view", function () {
        routeParams = "not-imporant/main.html#/preview";
        controller = $controller('viewController', {
            $scope: $scope,
            $routeParams: routeParams,
            chromeStorageService: chromeStorageService,
            mdParserService : mdParserService
        });
        expect($scope.sheet.name).toEqual('preview');
        expect($scope.mode).toEqual('preview');
    });

    it("should call the markdown parser to transform content to HTML", function () {
        controller = $controller('viewController', {
            $scope: $scope,
            $routeParams: routeParams,
            chromeStorageService: chromeStorageService,
            mdParserService : mdParserService
        });
        expect(storageSpy).toHaveBeenCalledWith('git');
        deferred.resolve({
            git: {
                content: 'my content'
            }
        });
        $rootScope.$apply();
        expect(parseSpy).toHaveBeenCalledWith('my content');

    });

    it("should be able to retrieve content for the sheet", function () {
        var sceSpy = jasmine.createSpy('sceSpy').and.returnValue('\<p\>my content\<\/p\>');
        var sce = {
            trustAsHtml : sceSpy
        };
        controller = $controller('viewController', {
            $scope: $scope,
            $routeParams: routeParams,
            chromeStorageService: chromeStorageService,
            mdParserService : mdParserService,
            $sce : sce
        });
        deferred.resolve({
            git: {
                content: 'my content'
            }
        });
        $rootScope.$apply();
        expect(parseSpy).toHaveBeenCalled();
        expect($scope.sheet.content).toEqual('\<p\>my content\<\/p\>');
    });

    it("should act accordingly on an empty sheet (content)", function () {
        controller = $controller('viewController', {
            $scope: $scope,
            $routeParams: routeParams,
            chromeStorageService: chromeStorageService,
            mdParserService : mdParserService
        });
        deferred.resolve({});
        $rootScope.$apply();
        expect($scope.sheet.message).toEqual('No sheet here. Do you want to add one?');
        expect(parseSpy).not.toHaveBeenCalled();
    });

    it("should route (back) to edit based on preview or not", function () {
        var windowSpy = jasmine.createSpy('windowSpy');
        var myWindow = {
            open : windowSpy
        };
        controller = $controller('viewController', {
            $scope: $scope,
            $window: myWindow
        });
        $scope.mode = "preview";
        $scope.sheet.name = "git";
        expect(controller.goToEdit).toBeDefined();
        controller.goToEdit();
        expect(windowSpy).toHaveBeenCalledWith('main.html#/edit/git', "_self")
    });

    it("should route to empty edit on newSheet ng click event", function () {
        var windowSpy = jasmine.createSpy('windowSpy');
        var myWindow = {
            open : windowSpy
        };
        controller = $controller('viewController', {
            $scope: $scope,
            $window: myWindow

        });
        expect(controller.new).toBeDefined();
        controller.new();
        expect(windowSpy).toHaveBeenCalledWith('main.html#/edit', "_self")

    });

});