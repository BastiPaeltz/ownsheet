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
# Second h1 heading\
\
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
        var isHTML = parsedHTML.indexOf('\<strong>');
        var isHTMLSecond = parsedHTML.indexOf('\</h2>');
        expect(isHTML).not.toEqual(-1);
        expect(isHTMLSecond).not.toEqual(-1);
    });

    it("should style h2 headings accordingly", function () {
        var parsedHTML = mdParserService.parse(formMockup);
        var correctH2 = parsedHTML.indexOf("<\/div> \<div class\=\"box\"\> \<h2\>Values\</h2>");
        expect(mdParserService.parse).toHaveBeenCalledWith(formMockup);
        expect(correctH2).not.toEqual(-1);
    });

    it("should ignore h1 headings and its content", function () {
        formMockup = "# Javascript \n\
        this text should not be displayed\n\
        ## Best Practices \n\
        \n\
        * compare with `===` \n";
        var parsedHTML = mdParserService.parse(formMockup);
        var correctH1 = parsedHTML.indexOf("\<div class\=\"hideH1\"\> \<\h1\>Javascript\<\/h1\>");
        expect(mdParserService.parse).toHaveBeenCalledWith(formMockup);
    });

    it("should style the very first h1 or h2 heading differently than the rest", function () {
        var parsedHTML = mdParserService.parse(formMockup);
        var wrongH1 = parsedHTML.indexOf("\</div> \<div class\=\"hideH1\"\> \<\h1\>Javascript\<\/h1\>");
        var correctH2 = parsedHTML.indexOf("<\/div> \<div class\=\"box\"\> \<h2\>Values\</h2>");
        expect(wrongH1).toEqual(-1);
        expect(correctH2).not.toEqual(-1);
        expect(mdParserService.parse).toHaveBeenCalledWith(formMockup);
    });

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

    it("should accept HTML as well and style it accordingly", function () {
        formMockup = "\< h2\ random stuff > My Text \<\/ h2 \>";
        var parsedHTML = mdParserService.parse(formMockup);
        expect(mdParserService.parse).toHaveBeenCalledWith(formMockup);
        expect(parsedHTML).toBeDefined();
        expect(parsedHTML).toEqual("\<div class\=\"box\"\> \<h2\>My Text\</h2>");
    });

});