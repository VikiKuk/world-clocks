import React, { Component } from "react";

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { name, zone, onRemove } = this.props;
    const { time } = this.state;

    // вычисляем локальное время
    const utc = time.getTime() + time.getTimezoneOffset() * 60000;
    const local = new Date(utc + 3600000 * zone);
    const formatted = local.toLocaleTimeString("ru-RU", { hour12: false });

    return (
      <div className="clock card">
        <div className="clock-header">
          <strong>{name}</strong>
          <button className="remove" onClick={onRemove}>
            ×
          </button>
        </div>
        <div className="time">{formatted}</div>
      </div>
    );
  }
}