"use client";

import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download } from "lucide-react";

interface LinkQrCodeProps {
  url: string;
}

export default function LinkQrCode({ url }: LinkQrCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "bvpoptica-links-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-2xl border border-purple-500/20 bg-white p-3 shadow-lg shadow-purple-500/20">
        <QRCodeCanvas
          ref={canvasRef}
          value={url}
          size={168}
          bgColor="#ffffff"
          fgColor="#120339"
          level="M"
          marginSize={1}
        />
      </div>
      <button
        type="button"
        onClick={handleDownload}
        className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-purple-300 transition-colors duration-300 hover:text-white"
      >
        <Download className="h-3.5 w-3.5" />
        Save QR Code
      </button>
    </div>
  );
}
