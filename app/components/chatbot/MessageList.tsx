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
  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-3">
      {messages.length === 0 && (
        <SampleQuestions questions={sampleQuestions} sendMessage={sendMessage} />
      )}

      {messages.map((msg, i) => (
        <MessageBubble key={i} msg={msg} />
      ))}

      {loading && (
        <div className="p-2 rounded-lg text-sm bg-white/20 border border-white/10 w-24">
          Typing…
        </div>
      )}
    </div>
  );
}
