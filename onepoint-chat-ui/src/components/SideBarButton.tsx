import useChatStore from '../store/chatStore';
import { useShallow } from 'zustand/react/shallow';

export default function SideBarButton() {
  const { toggleSidebar, isSidebarOpen } = useChatStore(
    useShallow(state => ({
      toggleSidebar: state.toggleSidebar,
      isSidebarOpen: state.isSidebarOpen,
    }))
  );

  if (isSidebarOpen) return null;

  return (
    <div className="!w-fit h-auto pl-3 lg:pl-5 lg:static sticky top-0 !z-50 flex items-center justify-start">
      <div
        className="cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 p-2 rounded-lg transition-all duration-200 group"
        onClick={toggleSidebar}
        title="Toggle sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          data-slot="icon"
          className="size-6 text-blue-600 group-hover:text-indigo-600 transition-colors"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
          />
        </svg>
      </div>
    </div>
  );
}
