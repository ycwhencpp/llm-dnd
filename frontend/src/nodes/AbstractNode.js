import React from "react";
import { Handle, Position } from "reactflow";
import { useStore } from "../store";

const nodeStyles = {
  node: {
    background: "#ffffff",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  },
  header: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "5px",
    marginBottom: "5px",
  },
  select: {
    width: "100%",
    padding: "5px",
    marginBottom: "5px",
  },
};

export const AbstractNode = ({ id, data, type, inputs, outputs, children }) => {
  console.log(outputs);
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleInputChange = (field, value) => {
    updateNodeField(id, field, value);
  };

  // Ensure id is a string and replace any characters that might cause issues in selectors
  const safeId = id.toString().replace(/[^a-zA-Z0-9-_]/g, "_");

  return (
    <div style={{ ...nodeStyles.node, ...data.style }}>
      <div style={nodeStyles.header}>{type}</div>
      {inputs &&
        inputs.map((input, index) => (
          <Handle
            key={`input-${index}`}
            type="target"
            position={Position.Left}
            id={`${safeId}-${input}-target`}
            style={{ top: `${((index + 1) * 100) / (inputs.length + 1)}%` }}
          />
        ))}
      {children({ styles: nodeStyles, handleInputChange })}
      {outputs &&
        outputs.map((output, index) => (
          <Handle
            key={`output-${index}`}
            type="source"
            position={Position.Right}
            id={`${safeId}-${output}-source`}
            style={{ top: `${((index + 1) * 100) / (outputs.length + 1)}%` }}
          />
        ))}
    </div>
  );
};
