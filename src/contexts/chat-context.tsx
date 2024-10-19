import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import {
  type ChangeEvent,
  createContext,
  type ReactNode,
  useState,
} from "react";

type ChatContextData = {
  addMessage: () => void;
  message: string;
  handleINputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
};

type ChatProviderProps = {
  children: ReactNode;
  fieldId: string;
};

export const ChatContext = createContext({} as ChatContextData);

export const ChatProvider = ({ children, fieldId }: ChatProviderProps) => {
  const [message, setMessage] = useState("");

  const { toast } = useToast();

  const { isPending: isLoading, mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      const response = await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({
          fieldId,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      return response.body;
    },
  });

  const handleINputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const addMessage = () => sendMessage({ message });

  return (
    <ChatContext.Provider
      value={{
        addMessage,
        message,
        isLoading,
        handleINputChange,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
