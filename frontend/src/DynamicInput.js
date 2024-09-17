import { useRef } from "react";
const DynamicInput = ({ data, handleInputChange, placeholder, styles, fieldKey, defaultValue = "" }) => {
  const textareaRef = useRef(null);
  const autoGrow = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <textarea
      defaultValue={defaultValue}
      ref={textareaRef}
      style={{
        ...styles.input,
        overflow: "hidden",
        resize: "none",
      }}
      placeholder={placeholder}
      value={data[fieldKey]}
      onChange={(e) => {
        handleInputChange(fieldKey, e.target.value);
        autoGrow(e);
      }}
    />
  );
};

export default DynamicInput;
