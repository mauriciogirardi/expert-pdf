import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Expand, Loader2 } from "lucide-react";
import SimpleBar from "simplebar-react";
import { Document, Page } from "react-pdf";
import { useToast } from "@/hooks/use-toast";
import { useResizeDetector } from "react-resize-detector";

type PdfFullscreenProps = {
  url: string;
};

export function PdfFullscreen({ url }: PdfFullscreenProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const { width, ref } = useResizeDetector();
  const { toast } = useToast();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" aria-label="fullscreen">
          <Expand className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl w-full dark:bg-zinc-900 dark:border-zinc-700">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)] mt-6">
          <div ref={ref}>
            <Document
              file={url}
              loading={
                <div className="flex justify-center items-center w-full h-[calc(100vh-10rem)] bg-white dark:bg-zinc-900">
                  <Loader2 className="size-6 animate-spin text-blue-500" />
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
              {new Array(numPages).fill(0).map((_, index) => (
                <Page
                  key={`page-${index + 1}`}
                  width={width ? width : 1}
                  pageNumber={index + 1}
                />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
}
