import { Component } from "react";

const DEFAULT_COLOR = 'white'
const POSSIBLE_COLORS = [DEFAULT_COLOR, 'red', 'blue', 'yellow'];

/**
 * Maintains a list of color blocks for one cell of a MondrianGrid.
 */
export default class MondrianGridCell extends Component {

  constructor(props) {
    super(props);

    this.state = {
      colors: Array(2).fill(DEFAULT_COLOR),
    }
  }

  componentDidMount = () => {
    this.changeColor();
  }

  /** Randomly changes rectangle color set. */
  changeColor = () => {
    const randomIndex = (list) => Math.floor(Math.random() * list.length);

    // Randomly select colors
    const selected = this.state.colors.map( (current) => {
      const choose = POSSIBLE_COLORS.filter( color => color !== current );
      return choose[randomIndex(choose)];
    });

    // One must be neutral
    selected[randomIndex(selected)] = DEFAULT_COLOR;

    // Trigger render
    this.setState({
      colors: selected,
    });
  }

  render () {
    // Build sub-cells from list of colors
    const rects = this.state.colors.map( (color) =>
      <cell class={color} />
    );

    // Final render
    return (
      <cell
        class={`${this.props.horizontal && "vertical-cell"}`}
        onClick={this.changeColor}
      >
        {rects}
      </cell>
    );
  }
}