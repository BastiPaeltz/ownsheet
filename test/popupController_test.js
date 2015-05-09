/**
 * Created by sebastian on 5/4/15.
 */
var chromeStorageService, spy, deferred;
describe('popupController', function () {

    beforeEach(module("ownsheetApp"));
    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    it("should populate the scope with emptyMessage when no items are returned", function () {
        expect(false).toBeTruthy()
    });

    it("should populate the scope with sheets when items are returned", function () {
        expect(false).toBeTruthy()
    });

    it("should route to empty edit.html when add new sheet is clicked", function () {
        expect(false).toBeTruthy()
    });

    it("should route to populated edit.html when an item is clicked", function () {
        expect(false).toBeTruthy()
    });

    it("should route to populated edit.html when an item is clicked", function () {
        expect(false).toBeTruthy()
    });
});