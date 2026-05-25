import { useEffect, useState } from "react";

export default function LiveClock({ timezone = "Asia/Kolkata", location = "Gurgaon, India" }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(now);

  const [hm, ss] = time.split(/:(\d{2}\s[AP]M)$/);
  const matches = time.match(/^(\d{1,2}:\d{2}):(\d{2})\s([AP]M)$/);
  let mainTime = time;
  let seconds = "";
  let ampm = "";
  if (matches) {
    mainTime = matches[1];
    seconds = matches[2];
    ampm = matches[3];
  }

  return (
    <div data-testid="live-clock" className="text-right">
      <div className="font-mono text-sm tracking-tight text-neutral-900">
        <span>{mainTime}</span>
        <span className="text-orange-500 mx-0.5">:{seconds}</span>
        <span className="text-neutral-500 ml-1">{ampm}</span>
        <span className="text-neutral-400 ml-2 text-xs">IST</span>
      </div>
      <div className="text-xs text-neutral-500 mt-1 flex items-center justify-end gap-1.5">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        {location}
      </div>
    </div>
  );
}
