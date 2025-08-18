export default function ErrorCard({ title, message }: { title: string; message: string }) {
  return (
    <div
      className="bg-red-50 border border-red-400 text-red-700 px-6 py-4 rounded flex flex-col items-center justify-center gap-2 mb-4 max-w-2xl mx-auto mt-6 shadow"
      role="alert"
    >
      <span className="text-6xl mb-2">❌</span>
      <div className="text-center">
        <div className="font-bold text-xl mb-2">{title}</div>
        <div className="text-base">{message}</div>
      </div>
    </div>
  );
}
