export default function SampleQuestions({
  questions,
  sendMessage,
}: {
  questions: string[];
  sendMessage: (msg: string) => void;
}) {
  return (
    <div className="text-center text-slate-600 space-y-3 text-sm">
      <p>Lets's chat ✨</p>

      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {questions.map((q, i) => (
          <button
            key={i}
            onClick={() => sendMessage(q)}
            className="
              px-2.5 py-1 rounded-md text-xs
              bg-blue-50 text-blue-700 border border-blue-200
              hover:bg-blue-100 transition
            "
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
