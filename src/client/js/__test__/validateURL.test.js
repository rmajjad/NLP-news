const { isValidURL } = require("../validateURL");

describe("urlValidity", () => {
  test("test if strings are false urls", () => {
    expect(isValidURL("hello I am Rama")).toBeFalsy(); 
  });

  test("expect empty string to be falsy", () => {
    expect(isValidURL("")).toBeFalsy();
  });
});
