import React from "react";
import { AbstractNode } from "./AbstractNode";
import DynamicInput from "../DynamicInput";
export const MathNode = ({ id, data }) => {
  return (
    <AbstractNode id={id} data={data} type="Math" inputs={["a", "b"]} outputs={["result"]}>
      {({ styles, handleInputChange }) => (
        <select
          style={styles.select}
          value={data.operation || "add"}
          onChange={(e) => handleInputChange("operation", e.target.value)}>
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </select>
      )}
    </AbstractNode>
  );
};

export const FilterNode = ({ id, data }) => {
  return (
    <AbstractNode id={id} data={data} type="Filter" inputs={["input"]} outputs={["output"]}>
      {({ styles, handleInputChange }) => (
        <DynamicInput
          data={data}
          handleInputChange={handleInputChange}
          placeholder={"Enter Filter Conditions"}
          styles={styles}
        />
      )}
    </AbstractNode>
  );
};

export const ImageProcessingNode = ({ id, data }) => {
  return (
    <AbstractNode id={id} data={data} type="Image Processing" inputs={["image"]} outputs={["processed"]}>
      {({ styles, handleInputChange }) => (
        <select
          style={styles.select}
          value={data.effect || "grayscale"}
          onChange={(e) => handleInputChange("effect", e.target.value)}>
          <option value="grayscale">Grayscale</option>
          <option value="blur">Blur</option>
          <option value="sharpen">Sharpen</option>
        </select>
      )}
    </AbstractNode>
  );
};

export const TimerNode = ({ id, data }) => {
  return (
    <AbstractNode id={id} data={data} type="Timer" inputs={["trigger"]} outputs={["elapsed"]}>
      {({ styles, handleInputChange }) => (
        <input
          style={styles.input}
          type="number"
          placeholder="Interval (ms)"
          value={data.interval || 1000}
          onChange={(e) => handleInputChange("interval", parseInt(e.target.value))}
        />
      )}
    </AbstractNode>
  );
};

export const DataTransformNode = ({ id, data }) => {
  return (
    <AbstractNode id={id} data={data} type="Data Transform" inputs={["input"]} outputs={["output"]}>
      {({ styles, handleInputChange }) => (
        <DynamicInput
          data={data}
          handleInputChange={handleInputChange}
          placeholder="Enter transformation function (JavaScript)"
          styles={styles}
          fieldKey={"transform"}
        />
      )}
    </AbstractNode>
  );
};
