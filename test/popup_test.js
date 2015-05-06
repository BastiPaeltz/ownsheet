/**
 * Created by sebastian on 5/4/15.
 */

describe('popupController', function () {

    beforeEach(module("ownsheetApp"));

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    it("should populate the scope with emptyMessage when no items are returned", function () {
        var $scope = {};
        var chromeStorageService = {
            getFromStorage: function(){
                return {};
            }
        };
        spyOn(chromeStorageService, "getFromStorage");
        var controller = $controller('popupController', { $scope: $scope, chromeStorageService : chromeStorageService});
        expect(chromeStorageService.getFromStorage).toHaveBeenCalledWith(null);
        expect($scope.emptyMessage).toEqual("No sheets added yet.");
        expect($scope.sheets).toBeFalsy()
    });

    it("should populate the scope with sheets when items are returned", function () {
        var $scope = {};
        var chromeStorageService = {
            getFromStorage: function(){
                return {name : 'git'};
            }
        };
        spyOn(chromeStorageService, "getFromStorage").and.returnValue({name : 'git'});
        var controller = $controller('popupController', { $scope: $scope, chromeStorageService : chromeStorageService});
        expect(chromeStorageService.getFromStorage).toHaveBeenCalledWith(null);
        expect($scope.sheets).toEqual([{name : 'git'}]);
        expect($scope.emptyMessage).toBeFalsy();
    });
});