import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode)
    if (replace) {
    setHistory([...history.slice(0, history.length-1), newMode]);
    }
    setHistory([...history, newMode]);
  };

  const back = () => {
  
    if (mode !== initial) {
      setMode(history[history.length-2]);
      setHistory([...history.slice(0, history.length-1)]); // react setState is asynchronous
      
    }
  }
  
  return {transition, back, mode};

  
}

