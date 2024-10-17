"use client";

import { trpc } from "@/app/_trpc/client";
import { ChatInput } from "./chat-input";
import { Messages } from "./messages";
import { Loader2 } from "lucide-react";
import { ChatLoader } from "./chat-loader";

type ChatWrapperProps = {
  fileId: string;
};

export function ChatWrapper({ fileId }: ChatWrapperProps) {
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
    { fileId },
    {
      refetchInterval: ({ state }) => {
        return state.data?.status === "SUCCESS" ||
          state.data?.status === "FAILED"
          ? false
          : 500;
      },
    }
  );

  if (isLoading) {
    return <ChatLoader />;
  }

  // if (data?.status === "PROCESSING") {
  //   return (
  //     <ChatLoader
  //       title="Processing PDF..."
  //       description="This won't take long."
  //     />
  //   );
  // }

  if (data?.status === "FAILED") {
    return (
      <ChatLoader
        type="failed"
        title="Too many pages in PDF"
        description="Your free plan supports up to 5 pages per PDF."
      />
    );
  }

  return (
    <div className="relative min-h-full bg-white rounded-md shadow border border-gray-100 flex-col justify-between gap-2">
      <div className="flex-1 justify-between flex flex-col mb-40 px-4 pt-4">
        <Messages />
      </div>

      <ChatInput />
    </div>
  );
}
