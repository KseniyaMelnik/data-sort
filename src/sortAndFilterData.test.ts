import sortAndFilterData from "./sortAndFilterData";

describe("sortAndFilterData", () => {
    it("should return filtered and sorted data based on given conditions", () => {
      const result1 = sortAndFilterData(
        '{"data": [{"name": "John", "email": "john25@mail.com"},{"name": "John", "email": "john1@mail.com"},{"name": "Jane", "email": "jane@mail.com"}] , "condition": {"include": [{"name": "John"}], "sort_by": ["email"]}}'
      );
      expect(result1).toEqual(
        '{"result":[{"name":"John","email":"john1@mail.com"},{"name":"John","email":"john25@mail.com"}]}'
      );
  
      const result2 = sortAndFilterData(
        '{"data": [{"name": "John", "email": "john2@mail.com", "age": "30"},{"name": "John", "email": "john1@mail.com", "age": "32"},{"name": "Jane", "email": "jane@mail.com", "age": "19"}] , "condition": {"include": [{"name": "John"}, {"age": "30"}], "sort_by": ["email"]}}'
      );
      expect(result2).toEqual(
        '{"result":[{"name":"John","email":"john2@mail.com","age":"30"}]}'
      );
  
      const result3 = sortAndFilterData(
        '{"data": [{"name": "Jane", "email": "john2@mail.com", "age": "30"},{"name": "John", "email": "john1@mail.com", "age": "32"},{"name": "Jane", "email": "jane@mail.com", "age": "19"}] , "condition": {"include": [{"name": "John"}, {"age": "30"}], "sort_by": ["email"]}}'
      );
      expect(result3).toEqual(
        '{"result":[]}'
      );
  
      const result4 = sortAndFilterData(
        '{"data": [{"name": "John", "email": "john2@mail.com"}, {"name": "John", "email": "john1@mail.com"},{"name": "Jane", "email": "jane@mail.com"}], "condition": {"sort_by": ["name", "email"]} }'
      );
      expect(result4).toEqual(
        '{"result":[{"name":"Jane","email":"jane@mail.com"},{"name":"John","email":"john1@mail.com"},{"name":"John","email":"john2@mail.com"}]}'
      );
  
      const result5 = sortAndFilterData(
        '{"data": [{"name": "John", "email": "john2@mail.com", "age": 35},{"name": "John", "email": "john1@mail.com", "age": 30}, {"name": "Jane", "email": "jane2@mail.com", "age": 27}, {"name": "Jane", "email": "jane2@mail.com", "age": 25},{"name": "Bob", "email": "bob1@mail.com", "age": 40},{"name": "Bob", "email": "bob2@mail.com", "age": 45}],"condition": {"sort_by": ["name", "email", "age"]}}'
      );
      expect(result5).toEqual(
        '{"result":[{"name":"Bob","email":"bob1@mail.com","age":40},{"name":"Bob","email":"bob2@mail.com","age":45},{"name":"Jane","email":"jane2@mail.com","age":25},{"name":"Jane","email":"jane2@mail.com","age":27},{"name":"John","email":"john1@mail.com","age":30},{"name":"John","email":"john2@mail.com","age":35}]}'
      );
  
      const result6 = sortAndFilterData(
        '{"data": [{"user": "mike@mail.com", "rating": 20, "disabled": false},{"user": "greg@mail.com", "rating": 14, "disabled": false},{"user": "john@mail.com", "rating": 25, "disabled": true}],"condition": {"exclude": [{"disabled": true}], "sort_by": ["rating"]}}'
      );
      expect(result6).toEqual(
        '{"result":[{"user":"greg@mail.com","rating":14,"disabled":false},{"user":"mike@mail.com","rating":20,"disabled":false}]}'
      );
    });
});

describe("sortAndFilterData", () => {
  it("should return an error message when data is not an array", () => {
    const jsonInput = `{"data": "not an array", "condition": {}}`;
    const result = sortAndFilterData(jsonInput);
    expect(result).toContain("Data must be an array");
  });

  it("should return an error message when data is not an array of objects", () => {
    const jsonInput = `{"data": [1, 2, 3], "condition": {}}`;
    const result = sortAndFilterData(jsonInput);
    expect(result).toContain("Data must be an array of the following form");
  });

  it("should return an error message when condition is not an object", () => {
    const jsonInput = `{"data": [], "condition": "not an object"}`;
    const result = sortAndFilterData(jsonInput);
    expect(result).toContain("Condition must be an object");
  });

  it("should return an error message when include property is not an array of objects", () => {
    const jsonInput = `{"data": [], "condition": {"include": "not an array"}}`;
    const result = sortAndFilterData(jsonInput);
    expect(result).toContain("The \"include\" property must be an array of objects");
  });

  it("should return an error message when include property contains non-object elements", () => {
    const jsonInput = `{"data": [], "condition": {"include": ["not an object"]}}`;
    const result = sortAndFilterData(jsonInput);
    expect(result).toContain("The \"include\" property must be an array of objects");
  });

  it("should return an error message when exclude property is not an array of objects", () => {
    const jsonInput = `{"data": [], "condition": {"exclude": "not an array"}}`;
    const result = sortAndFilterData(jsonInput);
    expect(result).toContain("The \"exclude\" property must be an array of objects");
  });

  it("should return an error message when exclude property contains non-object elements", () => {
    const jsonInput = `{"data": [], "condition": {"exclude": ["not an object"]}}`;
    const result = sortAndFilterData(jsonInput);
    expect(result).toContain("The \"exclude\" property must be an array of objects");
  });

  it("should return an error message when sort_by property is not an array of strings", () => {
    const jsonInput = `{"data": [], "condition": {"sort_by": "not an array"}}`;
    const result = sortAndFilterData(jsonInput);
    expect(result).toContain("The \"sort_by\" property must be an array of strings");
  });

  it("should return an error message when sort_by property contains non-string elements", () => {
    const jsonInput = `{"data": [], "condition": {"sort_by": [123]}}`;
    const result = sortAndFilterData(jsonInput);
    expect(result).toContain("The \"sort_by\" property must be an array of strings");
  });

  it("should return an error message when an invalid property is used", () => {
    const jsonInput = `{"data": [], "condition": {"invalid_prop": []}}`;
    const result = sortAndFilterData(jsonInput);
    expect(result).toContain("You can only use the following fields for filtering and sorting");
  });

  it("should return an error message for invalid JSON input", () => {
    const jsonInput = `{"data": [], "condition": {"include": []}`;
    const result = sortAndFilterData(jsonInput);
    expect(result).toContain("Please enter valid json");
  });
});
