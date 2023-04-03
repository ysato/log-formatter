import React, { useRef, useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const outputTextArea = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const formatVmstatLog = (log: string) => {
    const lines = log.split('\n');
    const parsedLines = lines.map((line) => line.trim().split(/\s+/));

    const maxCharCounts = parsedLines.reduce((maxCounts: number[], line) => {
      line.forEach((item, index) => {
        // eslint-disable-next-line no-param-reassign
        maxCounts[index] = Math.max(item.length, maxCounts[index] || 0);
      });
      return maxCounts;
    }, []);

    const formattedLines = parsedLines.map((line) =>
      line.map((item, index) => item.padStart(maxCharCounts[index], ' ')).join(' '),
    );

    return formattedLines.join('\n');
  };

  const handleButtonClick = () => {
    const formattedLog = formatVmstatLog(inputValue);
    setOutputValue(formattedLog);
    setTimeout(() => {
      if (outputTextArea.current) {
        outputTextArea.current.select();
      }
    }, 0);
  };

  return (
    <div className="app">
      <h2>LOG FORMATTER</h2>
      <div>
        <textarea
          id="inputTextArea"
          value={inputValue}
          onChange={handleInputChange}
          rows={10}
          cols={50}
        />
        <button type="button" onClick={handleButtonClick}>
          Format / Beautify
        </button>
        <textarea
          id="outputTextArea"
          ref={outputTextArea}
          value={outputValue}
          readOnly
          rows={10}
          cols={50}
        />
      </div>
    </div>
  );
}

export default App;
