import { useRef, useState, useEffect } from 'react';
import { Message } from '../../type/types';

type EditMessageProps = {
  message: Message;
  onSave: (newText: string) => void;
  onCancel: () => void;
};

export default function EditMessage({ message, onSave, onCancel }: EditMessageProps) {
  const [editText, setEditText] = useState(message.text);
  const editInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setTimeout(() => {
      editInputRef.current?.focus();
    }, 100);
  }, []);

  const handleSave = () => {
    if (editText.trim() && editText !== message.text) {
      onSave(editText);
    }
  };

  const handleCancel = () => {
    setEditText(message.text);
    onCancel();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="p-4 border-b border-gray-100">
      <textarea
        ref={editInputRef}
        value={editText}
        onChange={e => setEditText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-3 border border-[#636565] dark:border-[#fafffe] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#9a19ff] focus:border-[#9a19ff] mb-3"
        placeholder="Edit your message..."
        rows={Math.max(2, editText.split('\n').length)}
        style={{ minHeight: '60px' }}
      />
      {/* Edit controls positioned at the bottom */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={handleCancel}
          className="px-3 py-1.5 rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200 text-sm font-medium"
          title="Cancel edit"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-3 py-1.5 rounded-md cursor-pointer bg-[#9a19ff] hover:bg-[#9a19ff] text-white transition-all duration-200 text-sm font-medium"
          title="Save changes"
        >
          Save
        </button>
      </div>
      <div className="mt-2 text-xs text-gray-500">Press Enter to save, Escape to cancel</div>
    </div>
  );
}
