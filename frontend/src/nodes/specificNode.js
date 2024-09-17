import React, { useState, useEffect } from "react";
import { AbstractNode } from "./AbstractNode";
import DynamicInput from "../DynamicInput";

import { Handle, Position } from "reactflow";

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

// export const TextNode = ({ id, data }) => {
//   const [variables, setVariables] = useState([]);

//   useEffect(() => {
//     const matches = data.text?.match(/\{\{([^}]+)\}\}/g) || [];
//     const newVariables = matches.map((match) => match.slice(2, -2).trim());
//     setVariables(newVariables);
//   }, [data.text]);

//   return (
//     <AbstractNode id={id} data={data} type="Text" inputs={variables} outputs={["output"]}>
//       {({ styles, handleInputChange }) => (
//         <DynamicInput
//           data={data}
//           handleInputChange={handleInputChange}
//           placeholder="{{input}}"
//           defaultValue="{{input}}"
//           styles={styles}
//           fieldKey={"text"}
//         />
//       )}
//     </AbstractNode>
//   );
// };

export const TextNode = ({ id, data }) => {
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const extractVariables = (text) => {
      const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
      const matches = text.match(regex) || [];
      return [...new Set(matches.map((match) => match.slice(2, -2).trim()))];
    };

    const newVariables = extractVariables(data.text || "");
    setVariables(newVariables);
  }, [data.text]);

  return (
    <AbstractNode id={id} data={data} type="Text" outputs={["output"]}>
      {({ styles, handleInputChange }) => (
        <>
          {variables.map((variable, index) => (
            <Handle
              key={`input-${variable}`}
              type="target"
              position={Position.Left}
              id={`${id}-${variable}-input`}
              style={{ top: `${((index + 1) * 100) / (variables.length + 1)}%` }}
            />
          ))}
          <DynamicInput
            data={data}
            handleInputChange={handleInputChange}
            placeholder="Enter text with {{variables}}"
            defaultValue=""
            styles={styles}
            fieldKey="text"
          />
          <Handle type="source" position={Position.Right} id={`${id}-output`} />
        </>
      )}
    </AbstractNode>
  );
};
