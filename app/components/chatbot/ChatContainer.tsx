import MessageList from "./MessageList";
import InputBar from "./InputBar";
import SampleQuestions from "./SampleQuestions";

export default function ChatContainer({
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
    <div
      className="
      bg-white/10 backdrop-blur-sm rounded-xl
      border border-white/20 shadow-lg
      h-[400px] sm:h-[420px]
      flex flex-col
    "
    >
      <MessageList
        messages={messages}
        loading={loading}
        sampleQuestions={sampleQuestions}
        sendMessage={sendMessage}
      />

      <div className="h-px bg-blue-300/40 w-full"></div>

      <InputBar onSend={sendMessage} />
    </div>
  );
}
