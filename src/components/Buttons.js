import React from "react";

class Buttons extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.value);
  }

  render() {
    return (
      <button
        className="btn"
        id={this.props.id}
        key={this.props.id}
        value={this.props.value}
        onClick={this.handleClick}
      >
        {this.props.value}
      </button>
    );
  }
}

export default Buttons;
