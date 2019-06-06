import React from "react";

import "./TextInput.scss";

const TextInput = ({ label, flex, ...props }) => {
  const style = {};

  if (flex) style.flex = flex;

  return (
    <div className="TextInput" style={style}>
      {label && <span className="TextInput--label">{label}</span>}
      <input {...props} />
    </div>
  );
};

export default TextInput;
