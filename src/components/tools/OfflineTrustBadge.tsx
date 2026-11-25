"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, WifiOff } from "lucide-react";

export default function OfflineTrustBadge() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const updateStatus = () => setIsOffline(!navigator.onLine);
    updateStatus();
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  return (
    <div
      className={`rounded-xl border px-4 py-3 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition-colors ${
        isOffline
          ? "border-emerald-500/50 bg-emerald-950/35 text-emerald-200"
          : "border-violet-500/25 bg-slate-900/80 text-slate-300"
      }`}
    >
      <div className="flex items-start sm:items-center gap-2.5">
        {isOffline ? (
          <WifiOff className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
        ) : (
          <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0 mt-0.5 sm:mt-0" />
        )}
        <p className="leading-relaxed">
          {isOffline ? (
            <>
              <strong className="text-emerald-300 font-semibold">
                Offline Mode Verified:
              </strong>{" "}
              Your Wi-Fi is off and this tool is running 100% locally in your
              browser.
            </>
          ) : (
            <>
              <strong className="text-white font-semibold">
                Zero-Upload Privacy Proof:
              </strong>{" "}
              Turn off your Wi-Fi or switch on Airplane Mode to test this tool
              offline—nothing ever leaves your browser.
            </>
          )}
        </p>
      </div>

      <span className="self-start sm:self-center shrink-0 whitespace-nowrap rounded-full border border-violet-500/30 bg-violet-950/50 px-3 py-1 font-mono text-[11px] font-medium text-violet-300">
        100% Client-Side
      </span>
    </div>
  );
}