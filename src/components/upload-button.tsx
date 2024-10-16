"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Cloud, File, Loader2, Upload } from "lucide-react";

import Dropzone from "react-dropzone";
import { Progress } from "./ui/progress";
import { useUploadThing } from "@/lib/upload-thing";
import { useToast } from "@/hooks/use-toast";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

const UploadDropzone = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { startUpload } = useUploadThing("pdfUploader");

  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`);
    },
    retry: true,
    retryDelay: 500,
  });

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 500);

    return interval;
  };

  const errorUploading = (interval: NodeJS.Timeout, description: string) => {
    setIsUploading(false);
    setUploadProgress(0);
    clearInterval(interval);
    return toast({
      title: "Something went wrong",
      description,
      variant: "destructive",
    });
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        setIsUploading(true);
        const progressInterval = startSimulatedProgress();

        if (acceptedFile[0].type !== "application/pdf") {
          return errorUploading(progressInterval, "Just accept pdf");
        }

        const res = await startUpload(acceptedFile);

        if (!res) {
          return errorUploading(progressInterval, "Please try again later.");
        }

        const [fileResponse] = res;
        const key = fileResponse?.key;

        if (!key) {
          return errorUploading(progressInterval, "Please try again later.");
        }

        clearInterval(progressInterval);
        setUploadProgress(100);
        startPolling({ key });
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="border h-64 m-4 border-dashed rounded-lg border-gray-300 group hover:border-blue-500"
        >
          <input
            {...getInputProps()}
            type="file"
            className="hidden"
            id="dropzone-file"
          />
          <div className="flex items-center justify-center h-full w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 group-hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Cloud className="size-6 text-zinc-500 mb-2 group-hover:text-blue-500" />
                <p className="mb-2 text-sm text-zinc-700 group-hover:text-blue-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-zinc-500 group-hover:text-blue-500">
                  PDF (up to 4MB)
                </p>
              </div>

              {acceptedFiles?.[0] && (
                <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                  <div className="px-3 py-3 h-full grid place-items-center">
                    <File className="size-4 text-blue-500" />
                  </div>
                  <div className="px-3 py-2 text-sm truncate">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              )}

              {isUploading && (
                <div className="w-full mt-4 max-w-xs mx-auto">
                  <Progress
                    value={uploadProgress}
                    className="h-1 bg-zinc-300"
                    indicatorColor={
                      uploadProgress === 100 ? "bg-green-500" : ""
                    }
                  />
                  {uploadProgress === 100 && (
                    <div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
                      <Loader2 className="animate-spin size-3" />
                      Redirecting...
                    </div>
                  )}
                </div>
              )}
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export function UploadButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          Upload PDF
          <Upload className="size-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-xl">
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  );
}
