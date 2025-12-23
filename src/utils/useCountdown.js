import { useEffect, useState } from "react";

export default function useCountdown(startSeconds) {
  const [seconds, setSeconds] = useState(startSeconds);

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const reset = () => setSeconds(startSeconds);

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return { minutes, secs, seconds, reset };
}
