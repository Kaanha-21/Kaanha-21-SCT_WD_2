import React, { useState, useRef } from "react";
import "./styles.css";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const start = () => {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    setLaps([time, ...laps]);
  };

  const formatTime = (ms) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `${m}:${s.toString().padStart(2, "0")}.${cs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="page">
      <div className={`card ${running ? "pulse" : ""}`}>
        <h1 className="title">⏱ Dark Stopwatch</h1>

        <div className="time">{formatTime(time)}</div>

        <div className="buttons single-row">
          {!running ? (
            <button className="btn start" onClick={start}>
              Start
            </button>
          ) : (
            <button className="btn pause" onClick={pause}>
              Pause
            </button>
          )}

          <button className="btn reset" onClick={reset}>
            Reset
          </button>

          <button className="btn lap" onClick={lap} disabled={!running}>
            Lap
          </button>
        </div>

        <div className="lap-header">Laps ({laps.length})</div>

        <div className="laps">
          {laps.length === 0 && (
            <p className="hint">Start the stopwatch to record laps</p>
          )}

          {laps.map((lapTime, i) => (
            <div key={i} className={`lap-item ${i === 0 ? "latest" : ""}`}>
              <span>Lap {laps.length - i}</span>
              <span>{formatTime(lapTime)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
