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
        <div className="p-2 rounded-lg text-sm bg-white/20 border border-white/10 w-24">
          Typing…
        </div>
      )}
    </div>
  );
}
