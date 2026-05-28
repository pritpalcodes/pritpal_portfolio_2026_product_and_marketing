import { useEffect, useRef } from "react";

/**
 * On any click anywhere in the document:
 *   - emits a short "pop" sound via WebAudio
 *   - draws a small expanding orange ring at the click position
 *   - sprinkles a few tiny dots outward (firecracker feel)
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

    const playPop = () => {
      const ctx = ensureCtx();
      if (!ctx) return;
      if (ctx.state === "suspended") ctx.resume();

      const now = ctx.currentTime;
      // Body of the pop: short triangle burst
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(560, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.09);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.22, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      // High-pass to thin it out and feel "pop" vs "thud"
      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 90;

      osc.connect(hp);
      hp.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);

      // Crackle tail using a quick burst of filtered noise
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const ng = ctx.createGain();
      ng.gain.setValueAtTime(0.08, now);
      ng.gain.exponentialRampToValueAtTime(0.0005, now + 0.08);
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 2200;
      bp.Q.value = 0.8;
      noise.connect(bp);
      bp.connect(ng);
      ng.connect(ctx.destination);
      noise.start(now + 0.005);
      noise.stop(now + 0.09);
    };

    const drawPop = (x, y) => {
      const ring = document.createElement("div");
      ring.className = "click-pop";
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      document.body.appendChild(ring);

      const dots = [];
      const count = 6;
      for (let i = 0; i < count; i++) {
        const dot = document.createElement("div");
        dot.className = "click-pop-dot";
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
        const dist = 18 + Math.random() * 16;
        dot.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
        dot.style.setProperty("--ty", `${Math.sin(angle) * dist}px`);
        document.body.appendChild(dot);
        dots.push(dot);
      }

      setTimeout(() => {
        ring.remove();
        dots.forEach((d) => d.remove());
      }, 750);
    };

    const onClick = (e) => {
      // ignore clicks on form controls so we don't interrupt typing
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      playPop();
      drawPop(e.clientX, e.clientY);
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
