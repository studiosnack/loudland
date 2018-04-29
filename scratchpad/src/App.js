import React, { Component, Fragment } from "react";
import BPMCounter from "@nsfmc/bpm-counter";
import "./App.css";
import range from "lodash/range";

class App extends Component {
  state = {};
  rafOn = false;
  startTime = undefined;

  tempoInMs = () => {
    if (this.state.bpm) {
      return 60000 / this.state.bpm;
    } else {
      return 500;
    }
  };

  render() {
    return (
      <div className="App">
        <BPMCounter onBpm={({ bpm, taps }) => this.setState({ bpm, taps })} />
        <p>{this.state.bpm || "tap"}</p>

        <button onClick={this.startTimer}>start</button>
        <button onClick={this.stopTimer}>stop</button>

        <div>
          {range(4).map(i => (
            <div
              key={i}
            >
              {range(4).map(j => 
                <span
                  key={j}
                  style={{ color: (i*4 + j) === this.state.step ? "red" : "black", width: 30, height:30, display: 'inline-block' }}
                >{i*4 + j + 1}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  onFrame = ts => {
    if (!this.rafOn) {
      return;
    }
    if (!this.startTime) {
      this.startTime = ts;
      this.setState({ step: 0 });
      console.log();
    }
    if (this.startTime + this.tempoInMs() < ts) {
      this.setState(({ step }) => ({ step: (step + 1) % 16 }));
      this.startTime = ts;
    }
    window.requestAnimationFrame(this.onFrame);
  };

  startTimer = () => {
    this.rafOn = true;
    window.requestAnimationFrame(this.onFrame);
  };
  stopTimer = () => {
    this.rafOn = false;
    this.startTime = undefined;
  };
}

export default App;
