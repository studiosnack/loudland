import React, { Component, Fragment } from "react";
import BPMCounter from "@nsfmc/bpm-counter";
import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <BPMCounter onBpm={({ bpm, taps }) => this.setState({ bpm, taps })} />
        <p>{this.state.bpm || "tap"}</p>
      </div>
    );
  }
}

export default App;
