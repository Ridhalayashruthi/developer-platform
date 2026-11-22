"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  FileText,
  Trash2,
  ShieldCheck,
  PenTool,
  Download,
} from "lucide-react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import SignaturePad from "./SignaturePad";
import PdfWorkspace, { SignaturePlacement } from "./PdfWorkspace";

export default function PdfSignerTool() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [placement, setPlacement] = useState<SignaturePlacement>({
    pageNumber: 1,
    xPercent: 0.35,
    yPercent: 0.25,
    widthPercent: 0.25,
    includeDate: false,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }
    setPdfFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setPdfFile(null);
    setSignatureUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDownloadSignedPdf = async () => {
    if (!pdfFile || !signatureUrl) return;
    try {
      setIsExporting(true);

      const existingPdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const pngImageBytes = await fetch(signatureUrl).then((res) =>
        res.arrayBuffer()
      );
      const pngImage = await pdfDoc.embedPng(pngImageBytes);

      const pages = pdfDoc.getPages();
      const targetPage = pages[placement.pageNumber - 1] || pages[0];
      const { width: pageWidth, height: pageHeight } = targetPage.getSize();

      const sigWidth = pageWidth * placement.widthPercent;
      const aspectRatio = pngImage.height / pngImage.width;
      const sigHeight = sigWidth * aspectRatio;

      const x = pageWidth * placement.xPercent;
      const y = pageHeight - pageHeight * placement.yPercent - sigHeight;

      targetPage.drawImage(pngImage, {
        x,
        y,
        width: sigWidth,
        height: sigHeight,
      });

      if (placement.includeDate) {
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const dateLabel = `Signed: ${new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}`;
        targetPage.drawText(dateLabel, {
          x,
          y: Math.max(10, y - 12),
          size: 9,
          font,
          color: rgb(0.15, 0.2, 0.28),
        });
      }

      const signedPdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(signedPdfBytes)], {
        type: "application/pdf",
      });
      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      const baseName = pdfFile.name.replace(/\.pdf$/i, "");
      link.download = `${baseName}_signed.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Failed to export signed PDF:", error);
      alert("Something went wrong while exporting the signed PDF.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-700/60 px-3.5 py-1.5 rounded-full">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        100% Client-Side &amp; Private — Your PDF Never Leaves Your Browser
      </div>

      {!pdfFile ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`min-h-80 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-10 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-violet-500 bg-violet-950/30"
              : "border-slate-700 bg-slate-900/60 hover:border-violet-500 hover:bg-slate-900"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
          />
          <div className="bg-violet-950 border border-violet-700/60 text-violet-400 p-4 rounded-full mb-4">
            <Upload className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Drop your PDF here to start signing
          </h2>
          <p className="text-slate-400 max-w-md mb-6 text-sm">
            Select or drag and drop any PDF contract, offer letter, or invoice.
            Everything renders and embeds locally in browser memory.
          </p>
          <button
            type="button"
            className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-6 py-2.5 rounded-xl shadow-lg transition-colors"
          >
            Choose PDF File
          </button>
        </div>
      ) : (
        <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 truncate">
              <FileText className="w-4 h-4 text-violet-400 shrink-0" />
              <span className="font-medium text-sm text-white truncate">
                {pdfFile.name}
              </span>
              <span className="text-xs text-slate-400">
                ({(pdfFile.size / 1024).toFixed(1)} KB)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShowSignModal(true)}
                className="flex items-center gap-1.5 text-xs font-medium bg-violet-600 hover:bg-violet-500 text-white px-3.5 py-2 rounded-lg transition-colors"
              >
                <PenTool className="w-3.5 h-3.5" />
                {signatureUrl ? "Edit / Redraw Signature" : "Create Signature"}
              </button>

              {signatureUrl && (
                <button
                  type="button"
                  onClick={handleDownloadSignedPdf}
                  disabled={isExporting}
                  className="flex items-center gap-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white px-3.5 py-2 rounded-lg transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  {isExporting ? "Exporting..." : "Download Signed PDF"}
                </button>
              )}

              <button
                type="button"
                onClick={handleRemoveFile}
                className="flex items-center gap-1.5 text-xs font-medium text-red-400 hover:bg-red-950/60 px-3 py-2 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove
              </button>
            </div>
          </div>

          <PdfWorkspace
            pdfFile={pdfFile}
            signatureUrl={signatureUrl}
            placement={placement}
            onPlacementChange={setPlacement}
          />
        </div>
      )}

      {showSignModal && (
        <SignaturePad
          initialSignature={signatureUrl}
          onSave={(dataUrl) => {
            setSignatureUrl(dataUrl);
            setShowSignModal(false);
          }}
          onCancel={() => setShowSignModal(false)}
        />
      )}
    </div>
  );
}
