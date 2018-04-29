"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let BPMCounter =
/*#__PURE__*/
function (_Component) {
  function BPMCounter(...args) {
    var _temp, _this;

    _classCallCheck(this, BPMCounter);

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, _getPrototypeOf(BPMCounter).call(this, ...args)), _defineProperty(_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      taps: [],
      bpm: undefined
    }), "recordTap", () => {
      const now = Date.now();

      _this.setState(prev => {
        const taps = [...prev.taps, now].filter(ts => now - ts < _this.props.resetTime).slice(-1 * _this.props.samples);
        const deltas = taps.map((e, i, a) => {
          return i === 0 ? 0 : e - a[i - 1];
        });

        if (deltas.length > 1) {
          const bpm = Math.floor(60000 / (deltas.reduce((a, b) => a + b, 0) / (deltas.length - 1)));
          _this.props.onBpm && _this.props.onBpm({
            bpm,
            taps
          });
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
    }), _temp));
  }

  _createClass(BPMCounter, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("button", {
        className: this.props.className || undefined,
        onClick: this.recordTap
      }, this.props.label);
    }
  }]);

  _inherits(BPMCounter, _Component);

  return BPMCounter;
}(_react.Component);

exports.default = BPMCounter;

_defineProperty(BPMCounter, "defaultProps", {
  samples: 5,
  resetTime: 5000,
  label: "tap for bpm"
});
