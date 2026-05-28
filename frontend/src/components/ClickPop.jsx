import { useEffect, useRef } from "react";

/**
 * Soft, Apple-like UI click — short filtered click + a quick mid-low sine tap.
 * Quieter and gentler than the previous firecracker pop.
 */
export default function ClickPop() {
  const ctxRef = useRef(null);

  useEffect(() => {
    const ensureCtx = () => {
      if (!ctxRef.current && typeof window !== "undefined") {
        try {
          const AC = window.AudioContext || window.webkitAudioContext;
          if (AC) ctxRef.current = new AC();
        } catch {
          /* ignore */
        }
      }
      return ctxRef.current;
    };

    const playTap = () => {
      const ctx = ensureCtx();
      if (!ctx) return;
      if (ctx.state === "suspended") ctx.resume();

      const now = ctx.currentTime;

      // 1) soft sine "tap" — warm, low-volume body
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.05);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.05, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      // 2) tiny filtered noise — adds a soft "tick" attack
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.012, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const ng = ctx.createGain();
      ng.gain.setValueAtTime(0.025, now);
      ng.gain.exponentialRampToValueAtTime(0.0005, now + 0.02);

      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 3200;
      bp.Q.value = 1.2;

      osc.connect(gain);
      gain.connect(ctx.destination);
      noise.connect(bp);
      bp.connect(ng);
      ng.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
      noise.start(now);
      noise.stop(now + 0.02);
    };

    const drawTap = (x, y) => {
      const ring = document.createElement("div");
      ring.className = "click-pop";
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      document.body.appendChild(ring);
      setTimeout(() => ring.remove(), 600);
    };

    const onClick = (e) => {
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      playTap();
      drawTap(e.clientX, e.clientY);
    };

    window.addEventListener("click", onClick, { passive: true });
    return () => {
      window.removeEventListener("click", onClick);
      try {
        ctxRef.current?.close();
      } catch {
        /* ignore */
      }
    };
  }, []);

  return null;
}
