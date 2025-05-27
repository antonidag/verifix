import { SolutionModel } from "@/api-client";
import * as React from "react";

interface ChatContext {
  solution?: SolutionModel;
}

interface ChatContextState {
  context: ChatContext | null;
  isOpen: boolean;
}

const chatContextListeners: Array<(state: ChatContextState) => void> = [];

let memoryState: ChatContextState = { context: null, isOpen: false };

function dispatch(action: Partial<ChatContextState>) {
  memoryState = { ...memoryState, ...action };
  chatContextListeners.forEach((listener) => {
    listener(memoryState);
  });
}

export function openChatWithContext(context: ChatContext) {
  dispatch({ context, isOpen: true });
}
export function openChat() {
  dispatch({ isOpen: true });
}

export function closeChatContext() {
  dispatch({ context: null, isOpen: false });
}

export function useChatContext() {
  const [state, setState] = React.useState<ChatContextState>(memoryState);

  React.useEffect(() => {
    chatContextListeners.push(setState);
    return () => {
      const index = chatContextListeners.indexOf(setState);
      if (index > -1) {
        chatContextListeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    openChatWithContext,
    closeChatContext,
  };
}
