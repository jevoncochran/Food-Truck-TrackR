import React from "react";
import "../styling/Covid19Alert.scss";

const Covid19Alert = () => {
  return (
    <div className="covid-div">
      <h1 className="covid-title">Help prevent the spread of Covid-19</h1>
      <p className="covid-p">
        Remember to wash your hands before picking up orders and follow social
        distancing guidelines
      </p>
      <a
        href="https://www.cdc.gov/coronavirus/2019-ncov/index.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="covid-button">More information</button>
      </a>
    </div>
  );
};

export default Covid19Alert;
