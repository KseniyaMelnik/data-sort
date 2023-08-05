import SortAndFilter from "./SortAndFilter";

const sortAndFilterData = (jsonInputValues: string): string => {
  try {
    const { data, condition } = JSON.parse(jsonInputValues);

    if (!(data instanceof Array) || !data.every((item: any) => item instanceof Object)) {
      return `Data must be an array of the following form: 
        [{"name": "John", "email": "john25@mail.com", "age": "30"},{"name": "John", "email": "john1@mail.com", "age": "27"},{"name": "Jane", "email": "jane@mail.com", "age": "27"}]]`;
    }

    if (!(condition instanceof Object)) {
      return `Condition must be an object of the following form: 
        {"include": [{"name": "John"}, {"age": "30"}], "sort_by": ["email"]}`;
    }

    let filteredData: SortAndFilter = new SortAndFilter(data);

    for (let prop in condition) {
      if (
        condition.hasOwnProperty(prop) &&
        (prop === "include" || prop === "exclude" || prop === "sort_by")
      ) {
        if (prop === "include" || prop === "exclude") {
          if (!(condition[prop] instanceof Array) || !condition[prop].every((item: any) => item instanceof Object)) {
            return `The "${prop}" property must be an array of objects.`;
          }
        } else if (prop === "sort_by") {
          if (!(condition[prop] instanceof Array) || !condition[prop].every((item: any) => typeof item === 'string')) {
            return `The "sort_by" property must be an array of strings.`;
          }
        }

        filteredData[prop](condition[prop]);
      } else {
        return `You can only use the following fields for filtering and sorting: "include", "exclude", "sort_by"`;
      }
    }

    const result = {
      result: filteredData.getData,
    };

    return JSON.stringify(result);
  } catch (e) {
    return `Please enter valid json 
      "data": [{"name": "John", "email": "john25@mail.com"},{"name": "John", "email": "john1@mail.com"},{"name": "Jane", "email": "jane@mail.com"}] 
      "condition": { "include": [ { "name": "John"}], "sort_by": [ "email"]}`;
  }
};

export default sortAndFilterData;