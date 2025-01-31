import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      size: 4 // Default grid size
    };
  }

  componentDidMount() {
    this.fetchData(this.state.size);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.size !== this.state.size) {
      this.fetchData(this.state.size);
    }
  }

  fetchData = async (gridSize) => {
    try {
      const response = await axios.get(`http://localhost/NxN/backend.php?size=${gridSize}`);
      this.setState({ grid: response.data.grid });
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  isOuterCell = (rowIndex, cellIndex, gridSize) => {
    return rowIndex === 0 || rowIndex === gridSize - 1 || cellIndex === 0 || cellIndex === gridSize - 1;
  };

  isMiddleCell = (rowIndex, cellIndex, gridSize) => {
    const mid = Math.floor(gridSize / 2) - 1;
    return (
      (rowIndex === mid && (cellIndex === mid || cellIndex === mid + 1)) ||
      (rowIndex === mid + 1 && (cellIndex === mid || cellIndex === mid + 1))
    );
  };

  handleSizeChange = (event) => {
    this.setState({ size: Number(event.target.value) });
  };

  render() {
    const { grid, size } = this.state;

    return (
      <div>
        <h1>{size}x{size} Grid</h1>
        <label>Choose Grid Size: </label>
        <select onChange={this.handleSizeChange} value={size}>
          {[...Array(11).keys()].map(n => (n + 1) * 2).map(n => (
            <option key={n} value={n}>{n}x{n}</option>
          ))}
        </select>
        {grid.length > 0 ? (
          <table className="grid-table">
            <tbody>
              {grid.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`grid-cell ${this.isOuterCell(rowIndex, cellIndex, size) ? 'outer-cell' : ''} ${
                        this.isMiddleCell(rowIndex, cellIndex, size) ? 'middle-cell' : ''
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading grid...</p>
        )}
      </div>
    );
  }
}

export default App;