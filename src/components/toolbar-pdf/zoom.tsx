import { ChevronDown, Contact, Search } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";

const scales = [
  { label: "100%", scale: 1 },
  { label: "150%", scale: 1.5 },
  { label: "200%", scale: 2 },
  { label: "250%", scale: 2.5 },
];

type ZoomProps = {
  onZoom?: (scale: number) => void;
};

export function Zoom({ onZoom }: ZoomProps) {
  const [scale, setScale] = useState(1);

  const handleZoom = (scale: number) => {
    setScale(scale);
    onZoom?.(scale);
  };

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-max flex items-center gap-1"
          aria-label="zoom"
        >
          <Search className="size-4 shrink-0" />
          {scale * 100}%
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="dark:bg-zinc-900 dark:border-zinc-700"
      >
        {scales.map(({ label, scale }) => (
          <DropdownMenuItem key={scale} onSelect={() => handleZoom(scale)}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
