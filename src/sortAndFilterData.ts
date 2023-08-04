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
      return `Enter valid json ${e}`;
    }
  };

  export default sortAndFilterData