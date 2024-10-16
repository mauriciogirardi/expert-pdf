import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { type KeyboardEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type PaginationProps = {
  numPages: number;
  onPage: (page: number) => void;
};

export function Pagination({ numPages, onPage }: PaginationProps) {
  const [currPage, setCurrPage] = useState(1);

  const schemaPageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPages),
  });

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof schemaPageValidator>>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(schemaPageValidator),
  });

  const handlePreviousPage = () => {
    setCurrPage((prev) => {
      const page = prev - 1 > 1 ? prev - 1 : 1;
      setValue("page", String(page));
      onPage(page);
      return page;
    });
  };

  const handleNextPage = () => {
    if (!numPages) return;
    setCurrPage((prev) => {
      const page = prev + 1 > numPages ? numPages : prev + 1;
      setValue("page", String(page));
      onPage(page);
      return page;
    });
  };

  const handlePageSubmit = ({ page }: z.infer<typeof schemaPageValidator>) => {
    setCurrPage(Number(page));
    setValue("page", page);
    onPage(Number(page));
  };

  const handleKeyDownPage = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit(handlePageSubmit)();
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <Button
        aria-label="previous page"
        variant="ghost"
        size="icon"
        disabled={currPage <= 1}
        onClick={handlePreviousPage}
      >
        <ChevronDown className="size-4" />
      </Button>

      <div className="flex items-center gap-1.5">
        <Input
          className={cn(
            "w-6 h-6 p-0 text-center",
            errors.page && "focus-visible:ring-red-500"
          )}
          {...register("page")}
          onKeyDown={handleKeyDownPage}
        />
        <p className="text-zinc-700 text-sm space-x-1 dark:text-zinc-100">
          <span>/</span>
          <span>{numPages ?? "x"}</span>
        </p>
      </div>

      <Button
        aria-label="next page"
        variant="ghost"
        size="icon"
        onClick={handleNextPage}
        disabled={currPage >= numPages}
      >
        <ChevronUp className="size-4" />
      </Button>
    </div>
  );
}
