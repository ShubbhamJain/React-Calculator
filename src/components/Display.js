import React from "react";

class Display extends React.Component {
  render() {
    return (
      <div id="display" className="display">
        <p>{this.props.display}</p>
      </div>
    );
  }
}

export default Display;
