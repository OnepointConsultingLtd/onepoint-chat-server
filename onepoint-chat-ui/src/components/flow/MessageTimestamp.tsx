type MessageTimestampProps = {
  timestamp: string;
};

export default function MessageTimestamp({ timestamp }: MessageTimestampProps) {
  return (
    <div className="ml-2 text-xs text-gray-400">
      {new Date(timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}
    </div>
  );
}
