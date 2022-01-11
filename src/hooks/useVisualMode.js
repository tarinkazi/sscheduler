import { useState } from "react";

export default function useVisualMode(initial) {
  
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
    setHistory(history.slice(0, history.length-1));
    }
    setHistory([...history, mode]);
  };

  const back = () => {
  
    if (history[history.length-1] !== initial) {
      setHistory([...history.slice(0, history.length-2)]); // react setState is asynchronous
      
    }
  }
  
  return {transition, back, history};

  // const [mode, setMode] = useState(initMode);
  // const [history, setHistory] = useState([initMode]);

  // // saves the mode history and sets the new mode
  // // this allows the back function to recal the last
  // // mode the user was in for exit and cancel buttons.
  // const transition = (newMode, replace = false) => {

  //   if (replace) {
  //     setHistory((prev) => [...prev.slice(0, -1), newMode]);
  //   } else {
  //     setHistory((prev) => [...prev, newMode]);
  //   }

  //   setMode(newMode);
  // }
  
  // // goes back to the last mode user was in.
  // // prevents user from deleting the initial history.
  // const back = () => {
    
  //   setHistory((prev) => {
      
  //     if (prev.length === 1) {
  //       return [...prev];
  //     }

  //     const lastMode = [...prev.slice(0, -1)];
  //     setMode(lastMode[lastMode.length -1]);

  //     return lastMode;

  //   })
  // }

  // return { mode, transition, back }
}

