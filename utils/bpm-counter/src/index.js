import React, { Component } from "react";

export default class BPMCounter extends Component {
  state = {
    taps: [],
    bpm: undefined
  };

  static defaultProps = {
    samples: 5,
    resetTime: 5_000,
    label: "tap for bpm"
  };

  render() {
    return (
      <button
        className={this.props.className || undefined}
        onClick={this.recordTap}
      >
        {this.props.label}
      </button>
    );
  }

  recordTap = () => {
    const now = Date.now();
    this.setState(prev => {
      const taps = [...prev.taps, now]
        .filter(ts => now - ts < this.props.resetTime)
        .slice(-1 * this.props.samples);
      const deltas = taps.map((e, i, a) => {
        return i === 0 ? 0 : e - a[i - 1];
      });

      if (deltas.length > 1) {
        const bpm = Math.floor(
          60_000 / (deltas.reduce((a, b) => a + b, 0) / (deltas.length - 1) )
        );
        this.props.onBpm && this.props.onBpm({ bpm, taps });

        return {
          bpm,
          taps
        };
      } else {
        return {
          bpm: undefined,
          taps
        };
      }
    });
  };
}
