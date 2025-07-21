import useChatStore from '../store/chatStore';

export default function SideBarButton() {
  const { toggleSidebar } = useChatStore();
  return (
    <div className="!w-fit h-auto pl-3 lg:pl-5 lg:static sticky top-0 z-50 flex items-center justify-start">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
        data-slot="icon"
        className="size-7 stroke-[#0369a1] cursor-pointer"
        onClick={toggleSidebar}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
        ></path>
      </svg>
    </div>
  );
}
