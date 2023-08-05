import sortAndFilterData from './sortAndFilterData';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Data Filtering App</h1>

    <p>Enter an array of filterable objects in the following format:<br>
      <code> [{"name": "John", "email": "john25@mail.com", "age": "30"},{"name": "John", "email": "john1@mail.com", "age": "27"},{"name": "Jane", "email": "jane@mail.com", "age": "27"}]</p>
      </code>
    <div class="text-container">
      <label for="dataInput">Data:</label>
      <textarea id="dataInput" placeholder="Enter data JSON"></textarea>
    </div>

    <p>Enter filtering and sorting conditions in the following format:<br>
      <code>{"include": [{"name": "John"}, {"age": "30"}], "sort_by": ["email"]}
      </code><br>
      You can only use the following fields: <b>"include"</b>, <b>"exclude"</b>, <b>"sort_by"</b>.
    </p>
    <div class="text-container">
      <label for="conditionInput">Condition:</label>
      <textarea id="conditionInput" placeholder="Enter condition JSON"></textarea>  
    </div>

    <button id="filterButton">Filter Data</button>

    <pre class="result" id="result"></pre>
  </div>
`
// Get references to the input fields and the result container
const dataInput = document.getElementById('dataInput') as HTMLInputElement;
const conditionInput = document.getElementById('conditionInput') as HTMLInputElement;
const filterButton = document.getElementById('filterButton');
const resultContainer = document.getElementById('result');

// Add click event listener to the filter button
filterButton!.addEventListener('click', () => {
  // Get the entered data and condition JSON
  const data = dataInput.value;
  const condition = conditionInput.value;

  try {
    // Call filtering function with the data and condition
    if (!data || !condition) {
      throw new Error('Please enter data and condition')
    }
    const filteredData = sortAndFilterData(`{"data": ${data}, "condition": ${condition}}`);

    // Display the filtered data in the result container
    resultContainer!.textContent = filteredData;
  } catch (error) {
    // Display an error message if JSON parsing fails
    resultContainer!.textContent = `${error}`;
  }
});
