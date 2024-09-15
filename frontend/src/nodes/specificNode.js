import React, { useState, useEffect } from "react";
import { AbstractNode } from "./AbstractNode";

export const InputNode = ({ id, data }) => {
  return (
    <AbstractNode id={id} data={data} type="Input" outputs={["value"]}>
      {({ styles, handleInputChange }) => (
        <>
          <input
            style={styles.input}
            value={data.inputName || id.replace("customInput-", "input_")}
            onChange={(e) => handleInputChange("inputName", e.target.value)}
          />
          <select
            style={styles.select}
            value={data.inputType || "Text"}
            onChange={(e) => handleInputChange("inputType", e.target.value)}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </>
      )}
    </AbstractNode>
  );
};

export const OutputNode = ({ id, data }) => {
  return (
    <AbstractNode id={id} data={data} type="Output" inputs={["value"]}>
      {({ styles, handleInputChange }) => (
        <>
          <input
            style={styles.input}
            value={data.outputName || id.replace("customOutput-", "output_")}
            onChange={(e) => handleInputChange("outputName", e.target.value)}
          />
          <select
            style={styles.select}
            value={data.outputType || "Text"}
            onChange={(e) => handleInputChange("outputType", e.target.value)}>
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </>
      )}
    </AbstractNode>
  );
};

export const LLMNode = ({ id, data }) => {
  return (
    <AbstractNode id={id} data={data} type="LLM" inputs={["system", "prompt"]} outputs={["response"]}>
      {() => <p>This is an LLM node.</p>}
    </AbstractNode>
  );
};

export const TextNode = ({ id, data }) => {
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const matches = data.text?.match(/\{\{([^}]+)\}\}/g) || [];
    const newVariables = matches.map((match) => match.slice(2, -2).trim());
    setVariables(newVariables);
  }, [data.text]);

  return (
    <AbstractNode id={id} data={data} type="Text" inputs={variables} outputs={["output"]}>
      {({ styles, handleInputChange }) => (
        <textarea
          value={data.text || "{{input}}"}
          onChange={(e) => handleInputChange("text", e.target.value)}
          style={{
            ...styles.input,
            height: `${Math.max(60, (data.text?.split("\n").length || 1) * 20)}px`,
          }}
        />
      )}
    </AbstractNode>
  );
};
