import React, { useEffect, useRef, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const NaiveBayesScatterPlot = ({ dataLoader, validateData, analyzeAndVisualizeData }) => {
  const svgRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const displayError = (userMessage, devMessage) => {
    console.error(devMessage);
    setError(userMessage);
    setLoading(false);
  };

  useEffect(() => {
    const initializeComponent = async () => {
      try {
        if (typeof dataLoader !== "string" || !window[dataLoader] || typeof window[dataLoader] !== "function") {
          throw new Error("dataLoader must be a string referencing an asynchronous function.");
        }

        if (typeof validateData !== "function" || Object.prototype.toString.call(validateData) !== "[object AsyncFunction]") {
          throw new Error("validateData must be an asynchronous function.");
        }

        if (typeof analyzeAndVisualizeData !== "function" || Object.prototype.toString.call(analyzeAndVisualizeData) !== "[object AsyncFunction]") {
          throw new Error("analyzeAndVisualizeData must be an asynchronous function.");
        }

        const rawDataPromise = window[dataLoader]();

        if (!(rawDataPromise instanceof Promise)) {
          throw new Error("dataLoader must return a valid Promise.");
        }

        const rawData = await rawDataPromise;

        if (!rawData) {
          throw new Error("No data returned from dataLoader.");
        }

        if (!(await validateData(rawData))) {
          throw new Error("Data validation failed.");
        }

        setData(rawData);
        setError(null);
      } catch (err) {
        displayError("An error occurred while loading or validating data.", err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeComponent();
  }, [dataLoader, validateData, analyzeAndVisualizeData]);

  useEffect(() => {
    if (!loading && !error && data.length > 0 && svgRef.current) {
      analyzeAndVisualizeData(data, svgRef);
    }
  }, [loading, error, data, analyzeAndVisualizeData]);

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Naive Bayes Scatter Plot
      </Typography>
      {loading && (
        <div style={{ width: "100%", marginTop: "20px" }}>
          <LinearProgress />
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            Loading data...
          </Typography>
        </div>
      )}
      {error && (
        <Alert severity="error" style={{ margin: "20px auto", width: "fit-content" }}>
          {error}
        </Alert>
      )}
      <svg ref={svgRef} width={500} height={500} style={{ display: "block", margin: "0 auto" }} />
    </Paper>
  );
};

export default NaiveBayesScatterPlot;
