import SortAndFilter from "./SortAndFilter";

const sortAndFilterData = (jsonInputValues: string): string => {
    try {
      const { data, condition } = JSON.parse(jsonInputValues);
  
      let filteredData = new SortAndFilter(data);
  
      for (let prop in condition) {
        if (condition.hasOwnProperty(prop)) {
            //@ts-ignore
          filteredData[prop](condition[prop]);
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

  export default sortAndFilterData