import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Import the CSS file

const App = () => {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/16x16/backend.php');
        setGrid(response.data.grid);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const isOuterCell = (rowIndex, cellIndex) => {
    return rowIndex === 0 || rowIndex === 15 || cellIndex === 0 || cellIndex === 15;
  };

  const isMiddleCell = (rowIndex, cellIndex) => {
    return (
      (rowIndex === 7 && (cellIndex === 7 || cellIndex === 8)) ||
      (rowIndex === 8 && (cellIndex === 7 || cellIndex === 8))
    );
  };

  return (
    <div>
      <h1>16x16 Grid</h1>
      <table className="grid-table">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`grid-cell ${
                    isOuterCell(rowIndex, cellIndex) ? 'outer-cell' : ''
                  } ${isMiddleCell(rowIndex, cellIndex) ? 'middle-cell' : ''}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
