import NaiveBayesScatterPlot from "./components/NaiveBayesScatterPlot"; // Correct import path
import { analyzeAndVisualizeData } from "./utils/visualization"; // Ensure this path is correct

// A sample async function to simulate fetching data from a server.
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        { feature1: 1.2, feature2: 3.4, label: "A" },
        { feature1: 2.3, feature2: 4.5, label: "B" },
        { feature1: 3.1, feature2: 1.8, label: "A" },
        { feature1: 4.0, feature2: 2.5, label: "B" },
        { feature1: 5.5, feature2: 3.0, label: "A" },
      ];
      resolve(data); // Use 'data' instead of 'sampleData'
    }, 2000);
  });
};

// Async function to check if our data is in the expected format.
const validateData = async (data) => {
  if (!Array.isArray(data)) {
    console.error("Data is not an array.");
    return false;
  }
  const isValid = data.every((d) => {
    const validEntry = "feature1" in d && "feature2" in d && "label" in d;
    if (!validEntry) {
      console.error("Invalid data entry:", d);
    }
    return validEntry;
  });
  return isValid;
};

// Make sure our visualization function runs asynchronously.
const asyncAnalyzeAndVisualizeData = async (data, svgRef) => {
  analyzeAndVisualizeData(data, svgRef);
};

// Attach fetchData to the window object so that our component can call it by name.
window.fetchData = fetchData;

function App() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Naive Bayes Scatter Plot Visualization</h1>
      <NaiveBayesScatterPlot
        dataLoader="fetchData"  // Pass the name of the async function as a string.
        validateData={validateData}
        analyzeAndVisualizeData={asyncAnalyzeAndVisualizeData}
      />
    </div>
  );
}

export default App;
