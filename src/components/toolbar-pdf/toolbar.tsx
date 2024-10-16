import { RotateCcw } from "lucide-react";
import { Button } from "../ui/button";
import { Pagination } from "./pagination";
import { Zoom } from "./zoom";
import { PdfFullscreen } from "./pdf-fullscreen";

type ToolbarProps = {
  numPages: number;
  onZoom: (zoom: number) => void;
  onRotate: () => void;
  fileUrl: string;
  onPage: (page: number) => void;
};

export function Toolbar({
  numPages,
  onZoom,
  onRotate,
  fileUrl,
  onPage,
}: ToolbarProps) {
  return (
    <div className="h-14 w-full border rounded-md shadow border-zinc-100 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-between px-2">
      <Pagination numPages={numPages} onPage={onPage} />

      <div className="flex items-center gap-4">
        <Zoom onZoom={onZoom} />

        <Button
          onClick={onRotate}
          aria-label="rotate 90 degrees"
          variant="ghost"
          size="icon"
        >
          <RotateCcw className="size-4" />
        </Button>

        <PdfFullscreen url={fileUrl} />
      </div>
    </div>
  );
}
