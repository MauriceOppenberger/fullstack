import React, { useState, useEffect } from "react";

const Loading = () => {
  const [text, updateText] = useState("Fetching Data");

  useEffect(() => {
    setTimeout(() => {
      updateText(prevState => {
        return text === "Fetching Data..." ? "Fetching Data" : `${prevState}.`;
      });
    }, 300);
  }, [text]);

  return (
    <div>
      <h2>{text}</h2>
    </div>
  );
};
export default Loading;
