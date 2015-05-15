/**
 * Created by sebastian on 5/15/15.
 */

/**
 * Created by sebastian on 5/15/15.
 */

var controller;
describe('generalController', function () {


    beforeEach(module('ownsheetApp'));
    beforeEach(function () {

        inject(function (_controller_) {
            controller = _controller__;
        });

    });
    it("should route to chrome website when like/share is clicked", function () {
        var windowSpy = jasmine.createSpy('windowSpy');
        var myWindow = {
            open: windowSpy
        };
        expect(windowSpy).toHaveBeenCalledWith('www.google.com');
    });

    it("should be able to process the colors from the user input", function () {
        expect(true).toBeFalsy()
    });

    it("should be able to process font size from user input", function () {
        expect(true).toBeFalsy()
    });

    it("should be able to process exporting to file", function () {
        expect(true).toBeFalsy()
    });

    it("should be able to process importing from file", function () {
        var importSpy = jasmine.createSpy('importSpy');
        var importService = {
            import: importSpy
        };
        expect(importSpy).toHaveBeenCalled();
    });
});
