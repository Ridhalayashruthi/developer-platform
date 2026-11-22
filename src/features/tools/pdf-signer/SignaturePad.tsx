"use client";

import React, { useRef, useState, useEffect } from "react";
import { Eraser, Check, X, PenTool, Type } from "lucide-react";

interface SignaturePadProps {
  initialSignature?: string | null;
  onSave: (signatureDataUrl: string) => void;
  onCancel: () => void;
}

const INK_COLORS = [
  { label: "Midnight Ink", value: "#0f172a" },
  { label: "Royal Blue", value: "#1d4ed8" },
  { label: "Deep Violet", value: "#6d28d9" },
];

export default function SignaturePad({
  initialSignature,
  onSave,
  onCancel,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<"draw" | "type">("draw");
  const [typedName, setTypedName] = useState("");
  const [inkColor, setInkColor] = useState("#0f172a");
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasInk, setHasInk] = useState(Boolean(initialSignature));

  useEffect(() => {
    if (mode !== "draw") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = inkColor;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (initialSignature) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setHasInk(true);
      };
      img.src = initialSignature;
    }
  }, [initialSignature, mode, inkColor]);

  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = inkColor;
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasInk(true);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (mode === "type") {
      setTypedName("");
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
  };

  const handleSave = () => {
    if (mode === "type") {
      if (!typedName.trim()) return;
      const offscreen = document.createElement("canvas");
      offscreen.width = 500;
      offscreen.height = 180;
      const ctx = offscreen.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, offscreen.width, offscreen.height);
      ctx.fillStyle = inkColor;
      ctx.font = "italic 54px Georgia, 'Times New Roman', serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(typedName.trim(), offscreen.width / 2, offscreen.height / 2);
      onSave(offscreen.toDataURL("image/png"));
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas || !hasInk) return;
    onSave(canvas.toDataURL("image/png"));
  };

  const canSave = mode === "type" ? typedName.trim().length > 0 : hasInk;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 max-w-lg w-full overflow-hidden text-white">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="font-semibold text-lg">
            {initialSignature ? "Edit or Redraw Signature" : "Create Your Signature"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher + Ink Color */}
        <div className="px-5 pt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-lg border border-slate-700 bg-slate-950 p-1 text-xs">
            <button
              type="button"
              onClick={() => setMode("draw")}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition ${
                mode === "draw"
                  ? "bg-violet-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              Draw
            </button>
            <button
              type="button"
              onClick={() => setMode("type")}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition ${
                mode === "type"
                  ? "bg-violet-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              Type
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Ink:</span>
            {INK_COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                title={c.label}
                onClick={() => setInkColor(c.value)}
                style={{ backgroundColor: c.value }}
                className={`w-5 h-5 rounded-full border-2 transition ${
                  inkColor === c.value ? "border-violet-400 scale-110" : "border-slate-500"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-5">
          {mode === "draw" ? (
            <div className="bg-white border-2 border-dashed border-slate-400 rounded-xl overflow-hidden relative">
              <canvas
                ref={canvasRef}
                width={500}
                height={200}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-48 cursor-crosshair touch-none block"
              />
              {!hasInk && (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-slate-400">
                  Sign above using your trackpad, mouse, or touchscreen
                </span>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                placeholder="Type your full name..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder:text-slate-500"
              />
              <div className="bg-white rounded-xl h-36 flex items-center justify-center px-4 overflow-hidden">
                <span
                  style={{
                    color: inkColor,
                    fontFamily: "Georgia, 'Times New Roman', serif",
                  }}
                  className="text-4xl italic select-none truncate"
                >
                  {typedName.trim() || "Your Signature Preview"}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="px-5 py-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={clearCanvas}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Eraser className="w-4 h-4" />
            Clear
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="text-sm font-medium text-slate-300 hover:bg-slate-800 px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!canSave}
              onClick={handleSave}
              className="flex items-center gap-1.5 text-sm font-medium bg-violet-600 hover:bg-violet-500 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Check className="w-4 h-4" />
              Save Signature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}