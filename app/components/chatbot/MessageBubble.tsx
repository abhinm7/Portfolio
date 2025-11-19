import ReactMarkdown from "react-markdown";

export default function MessageBubble({
  msg,
}: {
  msg: { from: string; text: string };
}) {
  const isUser = msg.from === "user";

  return (
    <div
      className={`p-2.5 rounded-lg text-sm max-w-[80%] ${
        isUser
          ? "bg-blue-500/80 text-white ml-auto"
          : "bg-white/20 backdrop-blur-sm border border-white/10 text-slate-900"
      }`}
    >
      <div className="prose prose-sm max-w-none prose-p:leading-snug prose-li:leading-snug">
        <ReactMarkdown>
          {msg.text}
        </ReactMarkdown>
      </div>
    </div>
  );
}
