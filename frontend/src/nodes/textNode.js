import React, { useState, useEffect } from "react";
import { Handle, Position } from "reactflow";

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "");
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const matches = text.match(/\{\{([^}]+)\}\}/g) || [];
    const newVariables = matches.map((match) => match.slice(2, -2).trim());
    setVariables(newVariables);
  }, [text]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div
      style={{
        width: `${Math.max(200, text.length * 8)}px`,
        minHeight: "80px",
        border: "1px solid black",
        padding: "10px",
      }}>
      <div>
        <span>Text</span>
      </div>
      <div>
        <textarea
          value={text}
          onChange={handleTextChange}
          style={{
            width: "100%",
            height: `${Math.max(60, text.split("\n").length * 20)}px`,
          }}
        />
      </div>
      {variables.map((variable, index) => (
        <Handle
          key={index}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{ top: `${((index + 1) * 100) / (variables.length + 1)}%` }}
        />
      ))}
      <Handle type="source" position={Position.Right} id={`${id}-output`} />
    </div>
  );
};
