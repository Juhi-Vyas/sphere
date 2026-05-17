import { useEffect, useState } from "react";
import { TimerIcon } from "lucide-react";

function SessionTimer({ startedAt, endedAt }) {

  const [time, setTime] = useState("00:00");

  useEffect(() => {

    if (!startedAt) {
      setTime("00:00");
      return;
    }

    const interval = setInterval(() => {

      const start = new Date(startedAt).getTime();

      if (isNaN(start)) {
        setTime("00:00");
        return;
      }

      const end = endedAt
        ? new Date(endedAt).getTime()
        : Date.now();

      const diff = Math.max(
        0,
        Math.floor((end - start) / 1000)
      );

      const hours = Math.floor(diff / 3600);

      const minutes = Math.floor(
        (diff % 3600) / 60
      );

      const seconds = diff % 60;

      const formatted =
        hours > 0
          ? `${String(hours).padStart(2, "0")}:${String(
              minutes
            ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
          : `${String(minutes).padStart(2, "0")}:${String(
              seconds
            ).padStart(2, "0")}`;

      setTime(formatted);

    }, 1000);

    return () => clearInterval(interval);

  }, [startedAt, endedAt]);

  return (

    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 shadow-sm">

      <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />

      <TimerIcon className="w-3.5 h-3.5 text-orange-500" />

      <span className="font-bold text-xs text-orange-600 tracking-wide">

        {time}

      </span>

    </div>

  );

}

export default SessionTimer;