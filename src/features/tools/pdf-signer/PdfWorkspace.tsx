'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Move,
  ZoomIn,
  ZoomOut,
  Calendar,
} from 'lucide-react';
import type {
  PDFDocumentProxy,
  RenderTask,
} from 'pdfjs-dist/types/src/display/api';

export interface SignaturePlacement {
  pageNumber: number;
  xPercent: number;
  yPercent: number;
  widthPercent: number;
  includeDate: boolean;
}

interface PdfWorkspaceProps {
  pdfFile: File;
  signatureUrl: string | null;
  placement: SignaturePlacement;
  onPlacementChange: (placement: SignaturePlacement) => void;
}

export default function PdfWorkspace({
  pdfFile,
  signatureUrl,
  placement,
  onPlacementChange,
}: PdfWorkspaceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDraggingSig, setIsDraggingSig] = useState(false);
  const [isSelected, setIsSelected] = useState(true);
  const dragOffset = useRef({ x: 0, y: 0 });

  const formattedDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const [prevSignatureUrl, setPrevSignatureUrl] = useState<string | null>(
    signatureUrl
  );
  if (signatureUrl !== prevSignatureUrl) {
    setPrevSignatureUrl(signatureUrl);
    if (signatureUrl) setIsSelected(true);
  }

  useEffect(() => {
    let isMounted = true;
    const loadPdf = async () => {
      try {
        const pdfjsLib = await import('pdfjs-dist/build/pdf.mjs');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        const arrayBuffer = await pdfFile.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({
          data: new Uint8Array(arrayBuffer),
        });
        const pdf = await loadingTask.promise;

        if (isMounted) {
          setPdfDoc(pdf);
          setNumPages(pdf.numPages);
          setCurrentPage(1);
        }
      } catch (err) {
        console.error('Failed to render PDF:', err);
      }
    };
    loadPdf();
    return () => {
      isMounted = false;
    };
  }, [pdfFile]);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;
    let renderTask: RenderTask | null = null;

    const renderPage = async () => {
      const page = await pdfDoc.getPage(currentPage);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      renderTask = page.render({
        canvas,
        canvasContext: context,
        viewport,
      });
      await renderTask.promise;
    };

    renderPage();
    return () => {
      if (renderTask) renderTask.cancel();
    };
  }, [pdfDoc, currentPage]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsSelected(true);
    if ((e.target as HTMLElement).closest('button')) return;
    if (!containerRef.current) return;
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    const sigLeftPx = placement.xPercent * rect.width;
    const sigTopPx = placement.yPercent * rect.height;

    dragOffset.current = {
      x: e.clientX - rect.left - sigLeftPx,
      y: e.clientY - rect.top - sigTopPx,
    };
    setIsDraggingSig(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingSig || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    let newX = (e.clientX - rect.left - dragOffset.current.x) / rect.width;
    let newY = (e.clientY - rect.top - dragOffset.current.y) / rect.height;

    newX = Math.max(0, Math.min(1 - placement.widthPercent, newX));
    newY = Math.max(0, Math.min(0.92, newY));

    onPlacementChange({
      ...placement,
      pageNumber: currentPage,
      xPercent: newX,
      yPercent: newY,
    });
  };

  const handleMouseUp = () => {
    setIsDraggingSig(false);
  };

  const changePage = (delta: number) => {
    const next = Math.max(1, Math.min(numPages, currentPage + delta));
    setCurrentPage(next);
    onPlacementChange({ ...placement, pageNumber: next });
  };

  const adjustSize = (delta: number) => {
    const nextWidth = Math.max(
      0.1,
      Math.min(0.6, Number((placement.widthPercent + delta).toFixed(2)))
    );
    const clampedX = Math.min(1 - nextWidth, placement.xPercent);
    onPlacementChange({
      ...placement,
      widthPercent: nextWidth,
      xPercent: clampedX,
    });
  };

  return (
    <div className='flex-1 flex flex-col bg-slate-950/80'>
      {/* Page Navigation Sub-bar */}
      <div className='bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300'>
        <div className='flex items-center gap-2'>
          <button
            type='button'
            disabled={currentPage <= 1}
            onClick={() => changePage(-1)}
            className='p-1 rounded hover:bg-slate-800 disabled:opacity-40'
          >
            <ChevronLeft className='w-4 h-4' />
          </button>
          <span className='font-medium'>
            Page {currentPage} of {numPages}
          </span>
          <button
            type='button'
            disabled={currentPage >= numPages}
            onClick={() => changePage(1)}
            className='p-1 rounded hover:bg-slate-800 disabled:opacity-40'
          >
            <ChevronRight className='w-4 h-4' />
          </button>
        </div>

        {signatureUrl ? (
          <span className='text-violet-300 font-medium'>
            {isSelected
              ? 'Drag to move • Click outside signature to preview clean look'
              : 'Click signature anytime to resize or reposition'}
          </span>
        ) : (
          <span className='text-slate-400'>
            Click &ldquo;Create Signature&rdquo; above to place your stamp
          </span>
        )}
      </div>

      {/* Scrollable Page Canvas Stage */}
      <div
        className='flex-1 overflow-auto p-6 flex justify-center items-start min-h-130'
        onMouseDown={() => setIsSelected(false)}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          ref={containerRef}
          className='relative shadow-2xl bg-white select-none'
        >
          <canvas ref={canvasRef} className='max-w-full h-auto block' />

          {signatureUrl && placement.pageNumber === currentPage && (
            <div
              onMouseDown={handleMouseDown}
              style={{
                left: `${placement.xPercent * 100}%`,
                top: `${placement.yPercent * 100}%`,
                width: `${placement.widthPercent * 100}%`,
              }}
              className={`absolute rounded-lg p-1.5 cursor-move transition-all ${
                isSelected
                  ? isDraggingSig
                    ? 'border-2 border-violet-600 bg-violet-50/40 shadow-xl'
                    : 'border-2 border-violet-500 border-dashed bg-violet-50/20 hover:bg-violet-50/40'
                  : 'border-2 border-transparent hover:border-violet-300/60'
              }`}
            >
              {isSelected && (
                <div className='absolute -top-8 left-0 bg-slate-900 text-white text-[10px] font-medium px-2 py-1 rounded-md flex items-center gap-1.5 shadow-md whitespace-nowrap z-10 border border-slate-700'>
                  <Move className='w-3 h-3 text-violet-400' />
                  <button
                    type='button'
                    onClick={() => adjustSize(-0.04)}
                    title='Shrink signature'
                    className='hover:bg-slate-700 p-0.5 rounded'
                  >
                    <ZoomOut className='w-3.5 h-3.5' />
                  </button>
                  <button
                    type='button'
                    onClick={() => adjustSize(0.04)}
                    title='Enlarge signature'
                    className='hover:bg-slate-700 p-0.5 rounded'
                  >
                    <ZoomIn className='w-3.5 h-3.5' />
                  </button>
                  <span className='text-slate-600'>|</span>
                  <button
                    type='button'
                    onClick={() =>
                      onPlacementChange({
                        ...placement,
                        includeDate: !placement.includeDate,
                      })
                    }
                    className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors ${
                      placement.includeDate
                        ? 'bg-violet-600 text-white'
                        : 'hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    <Calendar className='w-3 h-3' />
                    Date
                  </button>
                </div>
              )}

              <img
                src={signatureUrl}
                alt='Placed signature'
                draggable={false}
                className='w-full h-auto pointer-events-none'
              />

              {placement.includeDate && (
                <div className='text-[11px] font-mono text-slate-800 text-left pl-1 pt-1 mt-0.5 border-t border-slate-300/80 pointer-events-none'>
                  Signed: {formattedDate}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}