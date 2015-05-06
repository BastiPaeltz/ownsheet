/**
 * Created by sebastian on 5/4/15.
 */

describe('Chrome Storage Service', function () {


    var mock, chromeStorage, chromeStorageService;
    beforeEach(module('ownsheetApp'));

    beforeEach(function () {
        mock = {
            name: 'my little pony',
            content: 'is awesome'
        };

        chromeStorage = {
            get: jasmine.createSpy("getSpy"),
            set: jasmine.createSpy("setSpy"),
            remove: jasmine.createSpy("removeSpy")

        };

        module(function ($provide) {
            $provide.value('chromeStorage', chromeStorage);
        });

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

    });

});






