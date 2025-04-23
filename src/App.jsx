import React, { useState } from "react";
import axios from "axios";

const PredictionForm = () => {
  const [features, setFeatures] = useState([0, 0, 0, 0]); // Example for Iris dataset
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = parseFloat(value);
    setFeatures(updatedFeatures);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://iris-isp.onrender.com/predict",
        {
          features: features,
        }
      );

      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error during prediction:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Machine Learning Prediction</h1>
      <form onSubmit={handleSubmit}>
        {features.map((feature, index) => (
          <div key={index}>
            <label>{`Feature ${index + 1}:`}</label>
            <input
              type="number"
              value={feature}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {prediction !== null && <h2>Prediction: {prediction}</h2>}
    </div>
  );
};

export default PredictionForm;
