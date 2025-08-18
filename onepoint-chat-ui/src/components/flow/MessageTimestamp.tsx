export default function MessageTimestamp({ timestamp }: { timestamp: Date | string }) {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;

  return (
    <div className="text-xs text-gray-300 dark:text-gray-300">
      {date.toLocaleString('en-US', {
        month: 'short', // "Aug"
        day: 'numeric', // 9
        year: 'numeric', // 2025
        hour: '2-digit', // 03
      })}
    </div>
  );
}
