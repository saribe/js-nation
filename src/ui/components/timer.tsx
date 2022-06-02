import { useEffect, useRef } from "react";

type Params = {
  progress: string;
  message: string;
  time: number;
  onTimeout?: () => void;
};

const format = (time: number) => (time / 1000).toFixed(1);

const updateTimer = (time: number) => {
  try {
    document.getElementById("time").innerHTML = format(Math.max(time, 0));
  } catch (error) {}
};

export const Timer = ({ progress, time, message, onTimeout }: Params) => {
  const timeStamp = useRef(Date.now());

  useEffect(() => {
    if (!message) return;
    timeStamp.current = Date.now();

    let id = 0;
    const tick = () => {
      id = requestAnimationFrame(() => {
        const t = time + Math.floor(timeStamp.current - Date.now());

        updateTimer(t);

        if (t <= 0) {
          onTimeout();
        } else {
          tick();
        }
      });
    };

    tick();

    return () => cancelAnimationFrame(id);
  }, [message]);

  return (
    <header>
      <div className="App-step" title="progress">
        {progress}
      </div>

      <time id="time" className="App-time">
        {Number(format(time))}
      </time>

      <h3>
        <b>W</b>h<b>o</b> sa<b>i</b>d<b>?</b>
      </h3>

      <p className="App-quote">{message}</p>
    </header>
  );
};
