import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type ChatInputProps = {
  isDisabled?: boolean;
};

export function ChatInput({ isDisabled }: ChatInputProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 w-full">
      <form className="flex w-full flex-row gap-3">
        <div className="relative flex flex-col w-full flex-grow p-4">
          <div className="relative">
            <Textarea
              disabled={isDisabled}
              placeholder="Enter your question..."
              rows={1}
              maxRows={4}
              autoFocus
              className="resize-none pr-12 text-base py-3 scrollbar-thin"
            />

            <Button
              size="icon"
              aria-label="send message"
              className="absolute bottom-1.5 right-3"
              disabled={isDisabled}
            >
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
