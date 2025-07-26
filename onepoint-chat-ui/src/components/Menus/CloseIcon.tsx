import useChatStore from '../../store/chatStore';
import { useShallow } from 'zustand/react/shallow';

export default function CloseIcon() {
  const { toggleSidebar } = useChatStore(
    useShallow(state => ({
      toggleSidebar: state.toggleSidebar,
    }))
  );

  return (
    <button
      onClick={toggleSidebar}
      className="p-2 rounded-md hover:bg-white/10 text-white cursor-pointer"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
