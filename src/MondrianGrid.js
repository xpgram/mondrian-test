import { Component } from "react";
import MondrianGridCell from "./MondrianGridCell";

/**
 * Maintains a variable size table of MondrianGridCell elements.
 */
export default class MondrianGrid extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rows: 6,
      cols: 10,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      rows: props.rows || state.rows,
      cols: props.cols || state.cols,
    };
  }

  render() {
    const { rows, cols } = this.state;

    // Returns true if the given coordinates reduce to an odd number.
    const oddPointLocation = (x,y) => (x + y) % 2 === 1;

    // Assemble jsx for grid system
    const content = [];
    for (let y = 0; y < rows; y++) {
      
      const rowContent = [];
      for (let x = 0; x < cols; x++) {
        rowContent.push(
          <MondrianGridCell
            key={`box-${x}-${y}`}
            horizontal={ oddPointLocation(x, y) }
          />
        );
      }

      content.push( <row>{rowContent}</row> );
    }

    // Final render
    return (
      <table>
        {content}
      </table>
    );
  }
}