import React, { useState, useEffect } from "react";

const App = () => {
  const [timerToAnswer, setTimerToAnswer] = useState(5);
  const [timerToNextQuestion, setTimerToNextQuestion] = useState(5);
  const [countToAnswer, setCountToAnswer] = useState(0);
  const [countToNextQuestion, setCountToNextQuestion] = useState(0);
  const [boolToAnswer, setBoolToAnswer] = useState(false);
  const [boolToNextQuestion, setBoolToNextQuestion] = useState(false);
  const [boolOfTimer, setBoolOfTimer] = useState(false);

  useEffect(() => {
    if (!boolOfTimer) return;
    if (boolToAnswer) {
      let n = timerToAnswer;
      const interval = setInterval(() => {
        n--;
        setCountToAnswer(n);
        if (n === 0) {
          clearInterval(interval);
          setCountToNextQuestion(timerToNextQuestion);
          setBoolToAnswer(false);
          setBoolToNextQuestion(true);
          return () => {
            clearInterval(interval);
          };
        }
        return () => {
          clearInterval(interval);
        };
      }, 1000);
    }
  }, [boolToAnswer]);

  useEffect(() => {
    if (!boolOfTimer) return;
    if (boolToNextQuestion) {
      let n = timerToNextQuestion;
      const interval = setInterval(() => {
        if (!boolOfTimer) clearInterval(interval);
        n--;
        setCountToNextQuestion(n);
        if (n === 0) {
          clearInterval(interval);
          setCountToAnswer(timerToAnswer);
          setBoolToNextQuestion(false);
          setBoolToAnswer(true);
          return () => {
            clearInterval(interval);
          };
        }
        return () => {
          clearInterval(interval);
        };
      }, 1000);
    }
  }, [boolToNextQuestion]);

  const click = () => {
    if (boolOfTimer) {
      setBoolToAnswer(false);
      setBoolOfTimer(false);
      setBoolOfTimer(false);
    } else {
      setCountToAnswer(timerToAnswer);
      setCountToNextQuestion(timerToNextQuestion);
      setBoolToAnswer(true);
      setBoolOfTimer(true);
    }
  };

  const renderTimer = () => {
    if (boolToAnswer) {
      return <span>answer: {countToAnswer}</span>;
    } else if (boolToNextQuestion) {
      return <span>next: {countToNextQuestion}</span>;
    }
  };

  const renderButtonText = boolOfTimer ? "Stop" : "Start";

  return (
    <div>
      <input
        type="number"
        onChange={(e) => {
          setTimerToAnswer(parseInt(e.target.value, 10));
        }}
        value={timerToAnswer}
      />
      <input
        type="number"
        onChange={(e) => {
          setTimerToNextQuestion(parseInt(e.target.value, 10));
        }}
        value={timerToNextQuestion}
      />
      <button onClick={click}>{renderButtonText}</button>
      {renderTimer()}
    </div>
  );
};

export default App;
