describe("toHaveBeenCalledWith", function() {
  it("passes when the actual was called with matching parameters", function() {
    var util = {
          contains: jasmine.createSpy('delegated-contains').and.returnValue(true)
        },
        matcher = j$.matchers.toHaveBeenCalledWith(util),
        calledSpy = j$.createSpy('called-storageSpy'),
        result;

    calledSpy('a', 'b');
    result = matcher.compare(calledSpy, 'a', 'b');

    expect(result.pass).toBe(true);
    expect(result.message()).toEqual("Expected storageSpy called-storageSpy not to have been called with [ 'a', 'b' ] but it was.");
  });

  it("passes through the custom equality testers", function() {
    var util = {
          contains: jasmine.createSpy('delegated-contains').and.returnValue(true)
        },
        customEqualityTesters = [function() { return true; }],
        matcher = j$.matchers.toHaveBeenCalledWith(util, customEqualityTesters),
        calledSpy = j$.createSpy('called-storageSpy');

    calledSpy('a', 'b');
    matcher.compare(calledSpy, 'a', 'b');

    expect(util.contains).toHaveBeenCalledWith([['a', 'b']], ['a', 'b'], customEqualityTesters);
  });

  it("fails when the actual was not called", function() {
    var util = {
          contains: jasmine.createSpy('delegated-contains').and.returnValue(false)
        },
        matcher = j$.matchers.toHaveBeenCalledWith(util),
        uncalledSpy = j$.createSpy('uncalled storageSpy'),
        result;

    result = matcher.compare(uncalledSpy);
    expect(result.pass).toBe(false);
    expect(result.message()).toEqual("Expected storageSpy uncalled storageSpy to have been called with [  ] but it was never called.");
  });

  it("fails when the actual was called with different parameters", function() {
    var util = {
          contains: jasmine.createSpy('delegated-contains').and.returnValue(false)
        },
        matcher = j$.matchers.toHaveBeenCalledWith(util),
        calledSpy = j$.createSpy('called storageSpy'),
        result;

    calledSpy('a');
    calledSpy('c', 'd');
    result = matcher.compare(calledSpy, 'a', 'b');

    expect(result.pass).toBe(false);
    expect(result.message()).toEqual("Expected storageSpy called storageSpy to have been called with [ 'a', 'b' ] but actual calls were [ 'a' ], [ 'c', 'd' ].");
  });

  it("throws an exception when the actual is not a storageSpy", function() {
    var matcher = j$.matchers.toHaveBeenCalledWith(),
        fn = function() {};

    expect(function() { matcher.compare(fn) }).toThrow(new Error("Expected a storageSpy, but got Function."));
  });
});