import React, { Component } from "react";
import Clock from "./components/Clock";
import "./index.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clocks: [],
      name: "",
      zone: "",
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleZoneChange = (e) => {
    this.setState({ zone: e.target.value });
  };

  addClock = () => {
    const { name, zone, clocks } = this.state;
    if (!name || isNaN(zone)) return;

    const newClock = {
      id: Date.now(),
      name,
      zone: Number(zone),
    };

    this.setState({
      clocks: [...clocks, newClock],
      name: "",
      zone: "",
    });
  };

  removeClock = (id) => {
    this.setState((prev) => ({
      clocks: prev.clocks.filter((c) => c.id !== id),
    }));
  };

  render() {
    const { name, zone, clocks } = this.state;

    return (
      <div className="app">
        <h1>Мировые часы</h1>

        <div className="inputs">
          <div>
            <label>Название</label>
            <input
              value={name}
              onChange={this.handleNameChange}
              placeholder="Moscow"
            />
          </div>

          <div>
            <label>Временная зона</label>
            <input
              value={zone}
              onChange={this.handleZoneChange}
              placeholder="+3"
            />
          </div>

          <button onClick={this.addClock}>Добавить</button>
        </div>

        <div className="clocks">
          {clocks.map((clock) => (
            <Clock
              key={clock.id}
              name={clock.name}
              zone={clock.zone}
              onRemove={() => this.removeClock(clock.id)}
            />
          ))}
        </div>
      </div>
    );
  }
}