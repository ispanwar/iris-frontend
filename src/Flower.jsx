import React, { useState } from "react";
import axios from "axios";
import setosa from "./assets/images/setosa.jpg";
import versicolor from "./assets/images/versicolor.jpg";
import virginica from "./assets/images/virginica.jpg";
const Predict = () => {
  const featureNames = [
    "Sepal Length (cm)",
    "Sepal Width (cm)",
    "Petal Length (cm)",
    "Petal Width (cm)",
  ];
  const predictionImages = {
    0: setosa,
    1: versicolor,
    2: virginica,
  };
  const [features, setFeatures] = useState([0, 0, 0, 0]);
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
    <div className="min-h-screen flex justify-center items-center bg-gray-800">
      <div className="flex flex-col justify-center items-center bg-gray-100 p-4 rounded-lg shadow-lg shadow-gray-500">
        <h1 className="text-3xl font-bold p-2 mb-4">Iris Flower Classifier</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <label>{`${featureNames[index]} `}</label>
              <input
                type="number"
                value={feature}
                onChange={(e) => handleChange(index, e.target.value)}
                className="p-2 border-2 border-gray-300 rounded-lg"
              />
            </div>
          ))}
          <button
            className="bg-green-500 p-4 rounded-lg text-white"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Predict"}
          </button>
        </form>
        {prediction !== null && (
          <>
            <h2 className="text-2xl font-bold p-2 mt-4 text-red-500">
              Prediction:{" "}
              {prediction === 0
                ? "Setosa"
                : prediction === 1
                ? "Versicolor"
                : "Virginica"}
            </h2>
            <img
              src={`${predictionImages[prediction]}`}
              alt={`Iris ${
                prediction === 0
                  ? "Setosa"
                  : prediction === 1
                  ? "Versicolor"
                  : "Virginica"
              }`}
              className="mt-4 w-32 h-32 object-cover rounded-lg shadow-lg shadow-gray-500"
            />
          </>
        )}
      </div>
    </div>
  );
};
export default Predict;
