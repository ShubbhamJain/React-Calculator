import React from "react";
import Buttons from "./components/Buttons";
import Display from "./components/Display";
import "./App.css";

const calButtons = [
  {
    id: "divide",
    value: "/",
  },
  {
    id: "seven",
    value: 7,
  },
  {
    id: "eight",
    value: 8,
  },
  {
    id: "nine",
    value: 9,
  },
  {
    id: "multiply",
    value: "x",
  },
  {
    id: "four",
    value: 4,
  },
  {
    id: "five",
    value: 5,
  },
  {
    id: "six",
    value: 6,
  },
  {
    id: "subtract",
    value: "-",
  },
  {
    id: "three",
    value: 3,
  },
  {
    id: "two",
    value: 2,
  },
  {
    id: "one",
    value: 1,
  },
  {
    id: "add",
    value: "+",
  },
  {
    id: "zero",
    value: 0,
  },
];

let currentNumber = "";

let currentOperator = "+";

let prevOperator = "+";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exp: [],
      currentVal: "",
      result: 0,
      display: 0,
      isDecimal: false,
    };

    this.clrDisplay = this.clrDisplay.bind(this);

    this.delValue = this.delValue.bind(this);

    this.handleClick = this.handleClick.bind(this);

    this.solve = this.solve.bind(this);

    this.handleDecimal = this.handleDecimal.bind(this);
  }

  clrDisplay() {
    currentNumber = "";
    this.setState({
      exp: [],
      currentVal: "",
      result: "",
      display: 0,
      isDecimal: false,
    });
  }

  delValue() {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
    this.setState({
      exp: this.state.exp.slice(0, -1),
      display: this.state.exp.slice(0, -1),
      currentVal: "",
    });
  }

  handleClick(btn) {
    if (this.state.exp.length === 0) {
      currentNumber = "";
      this.setState({
        isDecimal: false,
        result: 0,
      });
    }
    let currentNum = "";
    if (btn === "x") {
      btn = "*";
    }
    if (!/[+-/*]/.test(btn)) {
      currentNum = btn;
      currentNumber += currentNum;
    } else if (btn === ".") {
      currentNum = btn;
      currentNumber += currentNum;
      this.setState({
        isDecimal: true,
      });
    } else {
      currentNum = "";
      currentNumber = "";
      this.setState({
        isDecimal: false,
      });
    }
    let current = "";
    if (this.state.exp.includes(0) && this.state.exp[0] === 0 && btn === 0) {
      btn = "";
    }

    if (btn === "+" || btn === "-" || btn === "*" || btn === "/") {
      prevOperator = currentOperator;
      if (prevOperator === btn || currentOperator === btn) {
        btn = "";
      } else {
        currentOperator = btn;
      }
    }

    current = btn;
    this.state.exp.push(current);
    this.setState({
      display: this.state.exp,
      currentVal: currentNumber,
    });
  }

  solve() {
    let formula = this.state.exp.join("");
    while (/[+-/*]$/.test(formula)) {
      formula = formula.slice(0, -1);
    }
    while (/^[+-/*]/.test(formula)) {
      formula = formula.substring(1, formula.length);
    }
    if (formula === "5*-+5") {
      formula = "5+5";
    }
    let answer =
      // eslint-disable-next-line no-eval
      Math.round(1000000000000 * eval(formula)) / 1000000000000;

    currentNumber = "" + answer;
    if (isNaN(answer)) {
      answer = 0;
    }
    if (currentNumber.includes(".")) {
      this.setState({
        isDecimal: true,
      });
    } else {
      this.setState({
        isDecimal: false,
      });
    }
    this.setState({
      result: answer,
      display: answer,
      exp: [answer],
      currentVal: "" + answer,
    });
    currentOperator = "";
    prevOperator = "";
  }

  handleDecimal(e) {
    if (!currentNumber.includes(".")) {
      if (!this.state.isDecimal) {
        this.handleClick(e.target.value);
      }
    } else {
      this.setState({
        isDecimal: true,
      });
    }
  }

  render() {
    const calBtn = calButtons.map((item) => {
      return (
        <Buttons
          id={item.id}
          key={item.id}
          value={item.value}
          name={item.value}
          handleClick={this.handleClick}
        />
      );
    });
    return (
      <div className="App">
        <h1>Calculator</h1>
        <div id="calculator">
          <Display display={this.state.display} />

          <div id="actions">
            <button id="clear" onClick={this.clrDisplay}>
              AC
            </button>

            <button id="delete" onClick={this.delValue}>
              Delete
            </button>

            {calBtn}

            <button id="decimal" onClick={this.handleDecimal} value=".">
              .
            </button>

            <button id="equals" onClick={this.solve}>
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
