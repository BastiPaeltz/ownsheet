/**
 * Created by sebastian on 5/8/15.
 */


/**
 * Created by sebastian on 5/4/15.
 */
var chromeStorageService, spy, deferred;
describe('editControllr', function () {

    beforeEach(module("ownsheetApp"));
    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    it("should populate the scope with sheet content if any is present", function () {
        expect(false).toBeTruthy()
    });

    it("should populate the scope with default content if no sheet content is present", function () {
        expect(false).toBeTruthy()
    });

    it("should route to view template when invoked with just 'view'", function () {
        expect(false).toBeTruthy()
    });

    it("should route to edit template when invoked with 'edit' or 'new'", function () {
        expect(false).toBeTruthy()
    });

    it("should be able to save changes on submit event", function () {
        expect(false).toBeTruthy()
    });

    it("should be able to preview changes on ", function () {
        expect(false).toBeTruthy()
    });
});