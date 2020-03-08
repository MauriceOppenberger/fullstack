import React, { useState, useEffect } from "react";

const Loading = () => {
  const [text, updateText] = useState("Fetching Data");

  useEffect(() => {
    const id = setTimeout(() => {
      updateText(prevState => {
        return text === "Fetching Data..." ? "Fetching Data" : `${prevState}.`;
      });
    }, 300);
    return () => clearTimeout(id);
  }, [text]);

  return (
    <div>
      <h2>{text}</h2>
    </div>
  );
};
export default Loading;
