import { memo, useEffect, useState } from "react";

function Calculator({ workouts }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
  }, [number, sets, speed, durationBreak]);

  useEffect(() => {
    document.title = `Your ${number}-exercise workout`;
  }, [number]);

  const mins = Math.floor(duration);
  const seconds = Math.round((duration - mins) * 60);

  function handleInc() {
    setDuration((duration) => Math.floor(duration) + 1);
  }

  function handleDec() {
    setDuration((duration) => (duration > 1 ? Math.ceil(duration) - 1 : 0));
  }

  return (
    <>
      <form>
        <div>
          <label htmlFor="workout">Type of workout</label>
          <select
            id="workout"
            value={number}
            onChange={(e) => setNumber(+e.target.value)}
          >
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sets">How many sets?</label>
          <input
            id="sets"
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label htmlFor="speed">How fast are you?</label>
          <input
            id="speed"
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label htmlFor="breakLength">Break length</label>
          <input
            id="breakLength"
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(Number(e.target.value))}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button aria-label="decreaseTime" onClick={handleDec}>
          –
        </button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button aria-label="increaseTime" onClick={handleInc}>
          +
        </button>
      </section>
    </>
  );
}

export default memo(Calculator);
