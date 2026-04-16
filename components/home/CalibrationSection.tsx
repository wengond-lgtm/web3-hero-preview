"use client";

import { useRef, useEffect } from "react";
import { useInView } from "@/hooks/useInView";

function CosineResponseChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const W = 420, H = 220;
    c.width = W;
    c.height = H;

    const pad = { t: 20, r: 20, b: 40, l: 50 };
    const cw = W - pad.l - pad.r;
    const ch = H - pad.t - pad.b;

    ctx.clearRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = "rgba(148,163,184,0.08)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const y = pad.t + (ch / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad.l, y);
      ctx.lineTo(W - pad.r, y);
      ctx.stroke();
    }

    // X axis labels (angle)
    ctx.fillStyle = "#4B5563";
    ctx.font = "11px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    [0, 15, 30, 45, 60, 75, 90].forEach((a) => {
      const x = pad.l + (a / 90) * cw;
      ctx.fillText(a + "°", x, H - 12);
    });

    // Y axis labels (%)
    ctx.textAlign = "right";
    [100, 75, 50, 25, 0].forEach((v, i) => {
      ctx.fillText(v + "%", pad.l - 8, pad.t + (ch / 4) * i + 4);
    });

    // Ideal cosine (dashed)
    ctx.beginPath();
    ctx.strokeStyle = "rgba(148,163,184,0.25)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    for (let deg = 0; deg <= 90; deg++) {
      const x = pad.l + (deg / 90) * cw;
      const y = pad.t + ch * (1 - Math.cos((deg * Math.PI) / 180));
      deg === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // XPAR measured response (cyan)
    ctx.beginPath();
    ctx.strokeStyle = "#06B6D4";
    ctx.lineWidth = 2;
    for (let deg = 0; deg <= 85; deg++) {
      const x = pad.l + (deg / 90) * cw;
      const ideal = Math.cos((deg * Math.PI) / 180);
      const noise = Math.sin(deg * 0.15) * 0.015 + Math.cos(deg * 0.08) * 0.01;
      const deviation = deg > 60 ? (deg - 60) * 0.001 : -0.005;
      const y = pad.t + ch * (1 - Math.max(0, ideal + noise + deviation));
      deg === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    // ±5% band at 75°
    const deg75x = pad.l + (75 / 90) * cw;
    const cos75 = Math.cos((75 * Math.PI) / 180);
    const y75top = pad.t + ch * (1 - cos75 * 1.05);
    const y75bot = pad.t + ch * (1 - cos75 * 0.95);
    ctx.fillStyle = "rgba(6,182,212,0.1)";
    ctx.fillRect(deg75x - 12, y75top, 24, y75bot - y75top);
    ctx.strokeStyle = "rgba(6,182,212,0.3)";
    ctx.lineWidth = 0.5;
    ctx.strokeRect(deg75x - 12, y75top, 24, y75bot - y75top);

    // ±5% label
    ctx.fillStyle = "#06B6D4";
    ctx.font = "10px 'JetBrains Mono', monospace";
    ctx.textAlign = "left";
    ctx.fillText("±5%", deg75x + 16, (y75top + y75bot) / 2 + 3);

    // Legend
    ctx.font = "11px 'IBM Plex Sans', sans-serif";
    ctx.fillStyle = "#64748B";
    ctx.textAlign = "left";
    ctx.fillText("— Ideal cosine", pad.l + 10, H - 28);
    ctx.fillStyle = "#06B6D4";
    ctx.fillText("— XPAR response", pad.l + 120, H - 28);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        maxWidth: "420px",
        height: "220px",
        borderRadius: "8px",
      }}
    />
  );
}

const STATS = [
  { value: "NIST", label: "Traceable accuracy" },
  { value: "±5%", label: "@ 75° zenith angle" },
  { value: "SI", label: "Global standards" },
];

export default function CalibrationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, 0.15);

  return (
    <div
      ref={ref}
      style={{
        background: "#070D1A",
        padding: "100px 1.5rem",
        position: "relative",
        borderTop: "1px solid rgba(148,163,184,0.04)",
        borderBottom: "1px solid rgba(148,163,184,0.04)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "64px",
            alignItems: "center",
          }}
          className="calib-grid"
        >
          {/* Left: text content */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                padding: "5px 14px",
                borderRadius: "20px",
                marginBottom: "20px",
                border: "1px solid rgba(234,179,8,0.25)",
                background: "rgba(234,179,8,0.06)",
                fontSize: "11px",
                fontFamily: "'JetBrains Mono', monospace",
                color: "#FCD34D",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              Calibration
            </div>

            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(28px, 3.5vw, 40px)",
                fontWeight: 700,
                color: "#F1F5F9",
                margin: "0 0 20px",
                letterSpacing: "-0.8px",
                lineHeight: 1.15,
              }}
            >
              Trusted{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #EAB308, #FCD34D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Calibration
              </span>{" "}
              System
            </h2>

            <p
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "16px",
                lineHeight: 1.75,
                color: "#94A3B8",
                margin: "0 0 12px",
              }}
            >
              Measurement reliability requires rigorous calibration.
            </p>
            <p
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "15px",
                lineHeight: 1.75,
                color: "#64748B",
                margin: "0 0 32px",
              }}
            >
              XPAR devices are calibrated using a strict calibration process
              comparable to industry-standard systems — every unit is issued a
              unique certificate mapped to its serial number.
            </p>

            {/* Stats row */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {STATS.map((s) => (
                <div
                  key={s.label}
                  style={{
                    flex: 1,
                    minWidth: "80px",
                    padding: "16px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(148,163,184,0.08)",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#FCD34D",
                      marginBottom: "4px",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: "11px",
                      color: "#64748B",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: cosine chart */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(148,163,184,0.08)",
                borderRadius: "16px",
                padding: "32px 28px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#94A3B8",
                  alignSelf: "flex-start",
                  marginBottom: "4px",
                }}
              >
                Cosine response curve
              </div>
              <CosineResponseChart />
              <div
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "12px",
                  color: "#4B5563",
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                Directional response error within ±5% at 75° zenith angle
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
