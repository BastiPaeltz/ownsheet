/**
 * Created by sebastian on 5/7/15.
 */

describe('Markdown Parser Service', function () {


    var formMockup, mdParserService;
    beforeEach(module('ownsheetApp'));

    beforeEach(function () {

        formMockup = "\
# Javascript \n\
\n\
## Best Practices \n\
\n\
* compare with `===` \n\
* always use semicolons after statements \n\
\n\
\n\
## Values \n\
\n\
* boolean, number, string, array ... \n\
* all values have **properties** \n\
  * use `.` to read a property --> `value.property` \n\
  * use `.` to assign a porperty --> `obj.foo = 123` \n\
  * use `.` to invoke method --> `'hello'.toUpperCase()` \n\
\n\
* primitive values = **immutable** and includes \
**booleans, numbers, strings `undefined` and `null`\n";

        inject(function (_mdParserService_) {
            mdParserService = _mdParserService_;
        });
        spyOn(mdParserService, "parse").and.callThrough();

    });

    it("should parse markdown to html", function () {
        expect(mdParserService.parse).toBeDefined();
        var parsedHTML = mdParserService.parse(formMockup);
        expect(mdParserService.parse).toHaveBeenCalledWith(formMockup);
        var isHTML = parsedHTML.indexOf('<');
        var isHTMLSecond = parsedHTML.indexOf('>');
        expect(isHTML).not.toEqual(-1);
        expect(isHTMLSecond).not.toEqual(-1);
    });

    //it("should style h2 headings accordingly", function () {
    //    var parsedHTML = mdParserService.parse(formMockup);
    //    var correctH2 = parsedHTML.indexOf("\<h2 class=\"box\"\>");
    //    expect(mdParserService.parse).toHaveBeenCalledWith(formMockup);
    //    expect(correctH2).not.toEqual(-1);
    //});
    //
    //it("should ignore h1 headings and its content", function () {
    //    formMockup = "# Javascript \n\
    //    this text should not be displayed\n\
    //    ## Best Practices \n\
    //    \n\
    //    * compare with `===` \n";
    //    var parsedHTML = mdParserService.parse(formMockup);
    //    var correctH1 = parsedHTML.indexOf("\<h1 class=\"hideH1\"\>");
    //    expect(mdParserService.parse).toHaveBeenCalledWith(formMockup);
    //});

    it("should not error out on chinese text", function () {
        formMockup = "###殷公路撰 ## 北戶錄（唐）殷公路撰 ";
        var parsedHTML = mdParserService.parse(formMockup);
        expect(mdParserService.parse).toHaveBeenCalledWith(formMockup);
        var correctH2 = parsedHTML.indexOf("\<h3");
        expect(parsedHTML).toBeDefined();
        expect(correctH2).not.toEqual(-1);
    });

    it("should not error out on an empty sheet", function () {
        formMockup = "";
        var parsedHTML = mdParserService.parse(formMockup);
        expect(mdParserService.parse).toHaveBeenCalledWith(formMockup);
        expect(parsedHTML).toBeDefined();
        expect(parsedHTML).toEqual("");
    });

    //it("should accept HTML as well and style it accordingly", function () {
    //    formMockup = "\< h2\ random stuff > My Text \<\/h2\>";
    //    var parsedHTML = mdParserService.parse(formMockup);
    //    expect(mdParserService.parse).toHaveBeenCalledWith(formMockup);
    //    expect(parsedHTML).toBeDefined();
    //    expect(parsedHTML).toEqual("\<h2\ class=\"box\"> My Text \<\/h2\>");
    //});

});