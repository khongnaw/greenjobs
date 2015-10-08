
/*global greenjobs, listIndustries*/

describe("listIndustries", function() {
  var testdata = greenjobs.splice(0,1);
  var testdata1 = greenjobs.splice(0,2);
  var testdata2 = greenjobs.splice(0,2);
  testdata1.push({foo:"hi"});
  testdata2.push({Industry:""});
  console.log(testdata);
  console.log(testdata1);
  console.log(testdata2);
  it("Should return the right array of industries given sample set", function() {
    expect(listIndustries(testdata)).toEqual(["Construction"]);
  });

  it("Should throw an error if a record is missing the Industry field", function() {
    expect(function(){listIndustries(testdata1);}).toThrowError("ERROR: missing the Industry field");

  });
  it("Should throw an error if Industry field contains empty string", function() {

    expect(function(){listIndustries(testdata2);}).toThrowError("ERROR: Industry field contains empty string");
  });

});


