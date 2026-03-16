import { FiShare2 } from 'react-icons/fi';

export default function SharedConversationBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-[#9a19ff]/10 via-[#9a19ff]/15 to-[#9a19ff]/10 dark:from-[#9a19ff]/20 dark:via-[#9a19ff]/25 dark:to-[#9a19ff]/20 border-b border-[#9a19ff]/30 dark:border-[#9a19ff]/40">
      <div className="flex items-center gap-3 px-6 py-3">
        <div className="p-2 rounded-full bg-[#9a19ff]/20 dark:bg-[#9a19ff]/30">
          <FiShare2 className="w-4 h-4 text-[#9a19ff] dark:text-[#9a19ff]" />
        </div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
          This is a shared Osca conversation — start typing to begin your own.
        </p>
      </div>
    </div>
  );
}
