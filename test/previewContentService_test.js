/**
 * Created by sebastian on 5/15/15.
 */
describe('previewContentService', function () {


    var pCS;
    beforeEach(module('ownsheetApp'));
    beforeEach(function () {

        inject(function (_previewContentService_) {
            pcs = _previewContentService_;
        });

    });
    it("should have methods add, get, buffer and getBuffer", function () {
        expect(pcs.add).toBeDefined();
        expect(pcs.buffer).toBeDefined();
        expect(pcs.getBuffer).toBeDefined();
        expect(pcs.get).toBeDefined();
    });
});
