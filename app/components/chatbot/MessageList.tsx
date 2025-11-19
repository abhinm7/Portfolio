import MessageBubble from "./MessageBubble";
import SampleQuestions from "./SampleQuestions";

export default function MessageList({
  messages,
  loading,
  sampleQuestions,
  sendMessage,
}: {
  messages: { from: string; text: string }[];
  loading: boolean;
  sampleQuestions: string[];
  sendMessage: (msg: string) => void;
}) {
  const isEmpty = messages.length === 0;

  return (
    <div
      className={`
        flex-1 p-4 overflow-y-auto space-y-3
        ${isEmpty ? "flex flex-col justify-center items-center" : ""}
      `}
    >
      {isEmpty && (
        <SampleQuestions
          questions={sampleQuestions}
          sendMessage={sendMessage}
        />
      )}

      {!isEmpty &&
        messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}

      {loading && (
        <div className="flex items-center gap-1 bg-white/20 border border-white/10 px-3 py-2 w-fit rounded-lg animate-pulse">
          <div className="w-2 h-2 rounded-full bg-slate-700/70 animate-bounce"></div>
          <div className="w-2 h-2 rounded-full bg-slate-700/60 animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-2 h-2 rounded-full bg-slate-700/50 animate-bounce [animation-delay:0.4s]"></div>
        </div>
      )}

    </div>
  );
}
