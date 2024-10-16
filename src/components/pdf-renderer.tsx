"use client";

import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { Toolbar } from "./toolbar-pdf/toolbar";
import { useState } from "react";
import { cn } from "@/lib/utils";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type PdfRendererProps = {
  url: string;
};

export function PdfRenderer({ url }: PdfRendererProps) {
  const { toast } = useToast();
  const { width, ref } = useResizeDetector();

  const [numPages, setNumPages] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [renderedScale, setRenderedScale] = useState<number | null>(null);

  const isLoading = renderedScale !== scale;

  return (
    <div className="flex flex-col gap-4">
      <Toolbar
        onRotate={() => setRotation((prev) => prev + 90)}
        fileUrl={url}
        onZoom={setScale}
        numPages={numPages}
        onPage={setCurrPage}
      />

      <div className="w-full bg-white border border-gray-100 rounded-md shadow flex flex-col items-center py-4">
        <div className="flex-1 w-full max-h-screen ">
          <SimpleBar autoHide={false} className="max-h-[calc(100vh-12rem)]">
            <div ref={ref}>
              <Document
                file={url}
                loading={
                  <div className="flex justify-center">
                    <Loader2 className="my-24 size-6 animate-spin text-blue-500" />
                  </div>
                }
                onLoadError={() => {
                  toast({
                    title: "Error loading PDF",
                    description: "Please try again later.",
                    variant: "destructive",
                  });
                }}
                onLoadSuccess={({ numPages }) => {
                  setNumPages(numPages);
                }}
                className="max-h-full"
              >
                {isLoading && renderedScale && (
                  <Page
                    width={width ? width : 1}
                    pageNumber={currPage}
                    scale={scale}
                    rotate={rotation}
                    key={`@${renderedScale}`}
                  />
                )}

                <Page
                  className={cn(isLoading ? "hidden" : "")}
                  width={width ? width : 1}
                  pageNumber={currPage}
                  scale={scale}
                  rotate={rotation}
                  key={`@${scale}`}
                  loading={
                    <div className="flex justify-center ">
                      <Loader2 className="size-6 animate-spin text-blue-500" />
                    </div>
                  }
                  onRenderSuccess={() => setRenderedScale(scale)}
                />
              </Document>
            </div>
          </SimpleBar>
        </div>
      </div>
    </div>
  );
}
