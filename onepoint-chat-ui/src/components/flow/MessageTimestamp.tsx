export default function MessageTimestamp({ timestamp }: { timestamp: Date | string }) {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  return (
    <div className="ml-2 text-xs text-gray-400">
      {date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}
    </div>
  );
}
