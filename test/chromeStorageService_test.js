/**
 * Created by sebastian on 5/4/15.
 */

describe('Chrome Storage Service', function () {


    var getSpy, storage, chromeStorageService, promise;
    beforeEach(module('ownsheetApp'));
    getSpy = jasmine.createSpy('getSpy').and.returnValue("passed");
    beforeEach(function () {

        inject(function (_chromeStorageService_) {
            chromeStorageService = _chromeStorageService_;
        });

    });
    it("should have methods get, remove and push", function () {
        expect(chromeStorageService.getFromStorage).toBeDefined();
        expect(chromeStorageService.removeFromStorage).toBeDefined();
        expect(chromeStorageService.pushToStorage).toBeDefined();
    });

    it("should be able to push a single item to storage", function () {
        spyOn(chromeStorageService, "pushToStorage").and.callThrough();
        promise = chromeStorageService.pushToStorage({name: 'git'});
        expect(chromeStorageService.pushToStorage).toHaveBeenCalledWith({name : 'git'});
        promise.then(function(value){
            expect(value).toEqual("Success pushing sheet git");
        });
    });

});






