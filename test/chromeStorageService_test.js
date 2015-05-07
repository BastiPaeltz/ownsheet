/**
 * Created by sebastian on 5/4/15.
 */

describe('Chrome Storage Service', function () {


    var chromeStorageService, deferred, rootScope, sheet, result;
    beforeEach(module('ownsheetApp'));
    sheet = {
        name: 'git',
        content: 'CVS'
    };
    beforeEach(function () {

        inject(function (_$q_, _chromeStorageService_, _$rootScope_) {
            deferred = _$q_.defer();
            rootScope = _$rootScope_;
            chromeStorageService = _chromeStorageService_;
        });

    });

    it("should have methods get, remove and push", function () {
        expect(chromeStorageService.getFromStorage).toBeDefined();
        expect(chromeStorageService.removeFromStorage).toBeDefined();
        expect(chromeStorageService.pushToStorage).toBeDefined();
    });

    it("should be able to push a single item to storage", function () {
        spyOn(chromeStorageService, 'pushToStorage').and.returnValue(deferred.promise);
        result = chromeStorageService.pushToStorage(sheet);
        expect(chromeStorageService.pushToStorage).toHaveBeenCalledWith(sheet);
        expect(result).toBe(deferred.promise);

    });

    it("should be able to get a single item from storage asybchronously", function () {
        spyOn(chromeStorageService, 'getFromStorage').and.returnValue(deferred.promise);
        result = chromeStorageService.getFromStorage(sheet.name);
        expect(chromeStorageService.getFromStorage).toHaveBeenCalledWith(sheet.name);
        expect(result).toBe(deferred.promise);
    });

    it("should be able to get all items from storage", function () {
        spyOn(chromeStorageService, 'getFromStorage').and.returnValue(deferred.promise);
        result = chromeStorageService.getFromStorage(null);
        expect(chromeStorageService.getFromStorage).toHaveBeenCalledWith(null);
        expect(result).toBe(deferred.promise);
    });

    it("should be able to remove an item from storage", function () {
        spyOn(chromeStorageService, 'removeFromStorage').and.returnValue(deferred.promise);
        result = chromeStorageService.removeFromStorage(sheet.name);
        expect(chromeStorageService.removeFromStorage).toHaveBeenCalledWith(sheet.name);
        expect(result).toBe(deferred.promise);
    });

});






