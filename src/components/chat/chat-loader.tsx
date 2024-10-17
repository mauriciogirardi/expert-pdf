import { ChevronLeft, Loader2, XCircle } from "lucide-react";
import { ChatInput } from "./chat-input";
import Link from "next/link";
import { Button } from "../ui/button";

type ChatLoaderProps = {
  title?: string;
  description?: string;
  type?: "failed" | "loader";
};

export function ChatLoader({
  description = "We're preparing PDF.",
  title = "Loading...",
  type = "loader",
}: ChatLoaderProps) {
  return (
    <div className="relative h-[calc(100vh-6.9rem)] bg-zinc-50 dark:bg-zinc-900 flex rounded-md shadow border border-gray-100 dark:border-zinc-700 flex-col justify-between gap-2">
      <div className="flex-1 flex justify-center items-center flex-col mb-28">
        <div className="flex flex-col items-center gap-2">
          {type === "loader" ? (
            <Loader2 className="size-8 animate-spin text-blue-500" />
          ) : (
            <XCircle className="size-8 text-red-500" />
          )}
          <h3 className="font-semibold text-xl">{title}</h3>
          <p className="text-zinc-500 text-sm">{description}</p>
          {type === "failed" && (
            <Button asChild className="mr-6" variant="link">
              <Link href="/dashboard" className="flex items-center">
                <ChevronLeft className="size-4 mr-1.5" />
                Back
              </Link>
            </Button>
          )}
        </div>
      </div>
      {type === "loader" && <ChatInput isDisabled />}
    </div>
  );
}
