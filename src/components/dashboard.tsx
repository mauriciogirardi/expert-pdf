"use client";

import { trpc } from "@/app/_trpc/client";
import { MaxWithWrapper } from "./max-with-wrapper";
import { UploadButton } from "./upload-button";
import { Ghost, Loader2, MessageSquare, Plus, Trash } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import type { UploadStatus } from "@prisma/client";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

type UploadFile = {
  name: string;
  id: string;
  uploadStatus: UploadStatus;
  url: string;
  key: string;
  createdAt: string;
  updatedAt: string;
  userId: string | null;
};

export function Dashboard() {
  const [deletingFileId, setDeletingFileId] = useState<string | null>(null);

  const utils = trpc.useUtils();
  const { data: files, isLoading } = trpc.getUserFiles.useQuery();
  const { isPending, mutate: deleteFile } = trpc.deleteFile.useMutation({
    onMutate: (file) => setDeletingFileId(file.id),
    onSuccess: () => {
      setDeletingFileId(null);
      utils.getUserFiles.invalidate();
    },
    onError: () => setDeletingFileId(null),
  });

  const sortByDate = (data: UploadFile[]) =>
    data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  return (
    <MaxWithWrapper>
      <main className="md:py-10">
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 dark:border-zinc-600 pb-5 sm:flex-row sm:items-center sm:gap-0">
          <h1 className="mb-3 text-xl font-bold">My Files</h1>
          <UploadButton />
        </div>

        {files && files.length !== 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortByDate(files).map((file) => {
              const isDeleteFile = isPending && deletingFileId === file.id;

              return (
                <li
                  key={file.id}
                  className="col-span-1 divide-y divide-gray-200 bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-700 dark:divide-zinc-800 border rounded-xl shadow transition hover:shadow-lg"
                >
                  <Link
                    href={`/dashboard/${file.id}`}
                    className={cn(
                      "flex flex-col gap-2",
                      isDeleteFile && "pointer-events-none"
                    )}
                    aria-disabled={isDeleteFile}
                  >
                    <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                      <div className="size-10 flex-shrink-0 rounded-full  bg-gradient-to-r from-cyan-500 to-blue-500" />

                      <div className="flex-1 truncate">
                        <div className="flex items-center space-x-3">
                          <h3 className="truncate text-lg font-medium">
                            {file.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="text-muted-foreground px-6 mt-4 grid grid-cols-3 place-items-center py-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Plus className="size-4" />
                      {format(new Date(file.createdAt), "MMMM yyyy")}
                    </div>

                    <div className="flex items-center gap-2">
                      <MessageSquare className="size-4" />
                      mocked
                    </div>

                    <div className="ml-auto">
                      <Button
                        aria-label="Delete file PDF"
                        size="icon"
                        variant="destructive"
                        onClick={() => deleteFile({ id: file.id })}
                        disabled={isDeleteFile}
                      >
                        {isDeleteFile ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <Trash className="size-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : isLoading ? (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-32 col-span-1 rounded-xl shadow" />
            <Skeleton className="h-32 col-span-1 rounded-xl shadow" />
            <Skeleton className="h-32 col-span-1 rounded-xl shadow" />
            <Skeleton className="h-32 col-span-1 rounded-xl shadow" />
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center gap-2">
            <Ghost className="size-8" />
            <h3 className="font-semibold text-xl">Pretty empty around here</h3>
            <p className="text-muted-foreground">
              Let's upload your first PDF.
            </p>
          </div>
        )}
      </main>
    </MaxWithWrapper>
  );
}
