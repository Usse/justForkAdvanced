





describe("Math basic: Sum", function() {

  var math;
  beforeEach(function() {
    math = require('../../../src/js/modules/sum.js');
  });

  it("4 + 5 should be 9", function() {
    expect(math.sum(4,5)).toBe(9);
  });

  it("4 + (-5) should be -1", function() {
    expect(math.sum(4,-5)).toBe(-1);
  });

});


describe("Math basic: Sub", function() {

  var math;
  beforeEach(function() {
    math = require('../../../src/js/modules/sum.js');
  });

  it("4 - 5 should be -1", function() {
    expect(math.sub(4,5)).toBe(-1);
  });

  it("4 - (-5) should be 9", function() {
    expect(math.sub(4,-5)).toBe(9);
  });

});
