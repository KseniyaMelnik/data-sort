class SortAndFilter {
    private data: any[];
  
    constructor(data: any[]) {
      this.data = data;
    }
  
    public include(array: { [key: string]: any }[]): void {
      const entries = array.map((el) => Object.entries(el)[0]);
      for (let entry of entries) {
        this.data = this.data.filter((el) => el[entry[0]] === entry[1]);
      }
    }
  
    public exclude(array: { [key: string]: any }[]): void {
      const entries = array.map((el) => Object.entries(el)[0]);
      for (let entry of entries) {
        this.data = this.data.filter((el) => el[entry[0]] !== entry[1]);
      }
    }
  
    private byFields(keys: string[]): (a: any, b: any) => number {
      return (a, b) => {
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const valueA = a.hasOwnProperty(key) ? a[key] : undefined;
          const valueB = b.hasOwnProperty(key) ? b[key] : undefined;
  
          if (valueA < valueB) {
            return -1;
          } else if (valueA > valueB) {
            return 1;
          }
        }
  
        return 0;
      };
    }
  
    public sort_by(keys: string[]): void {
      this.data.sort(this.byFields(keys));
    }
  
    public get getData(): any[] {
      return this.data;
    }
  }

  export default SortAndFilter