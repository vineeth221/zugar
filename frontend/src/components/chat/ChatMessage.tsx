import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatMessage as ChatMessageType } from "@/types/chat.types";

interface Props {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-center"
      }`}
    >
      <div
        className={`${
          isUser
            ? "max-w-[720px] rounded-[28px] bg-[#f3f4f6] px-5 py-3 text-black"
            : "w-full max-w-[850px] px-2 text-gray-900"
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="mb-5 mt-2 text-[30px] font-bold tracking-[-0.02em] text-gray-950">
                {children}
              </h1>
            ),

            h2: ({ children }) => (
              <h2 className="mb-2 mt-8 text-[22px] font-semibold tracking-[-0.01em] text-gray-950">
                {children}
              </h2>
            ),

            h3: ({ children }) => (
              <h3 className="mb-3 mt-6 text-[18px] font-semibold text-gray-950">
                {children}
              </h3>
            ),

            p: ({ children }) => (
              <p className="mb-2 text-[16px] leading-[1.9] text-gray-900">
                {children}
              </p>
            ),

            ul: ({ children }) => (
              <ul className="mb-5 ml-6 list-disc space-y-2 text-[16px] leading-[1.9] text-gray-900">
                {children}
              </ul>
            ),

            ol: ({ children }) => (
              <ol className="mb-5 ml-6 list-decimal space-y-2 text-[16px] leading-[1.9] text-gray-900">
                {children}
              </ol>
            ),

            li: ({ children }) => (
              <li className="pl-1">{children}</li>
            ),

            strong: ({ children }) => (
              <strong className="font-semibold text-gray-950">
                {children}
              </strong>
            ),

            blockquote: ({ children }) => (
              <blockquote className="my-5 border-l-4 border-[#5b43ff] pl-5 text-[16px] leading-[1.9] text-gray-700">
                {children}
              </blockquote>
            ),

            code: ({ children }) => (
              <code className="rounded-md bg-gray-100 px-1.5 py-1 text-[15px] text-gray-900">
                {children}
              </code>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}