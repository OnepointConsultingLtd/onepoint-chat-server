import FloatingChatMain from './components/FloatingChat/FloatingChatMain';

export function FloatingChatButton({ click }: { click: () => void }) {
  return (
    <button
      onClick={click}
      className="fixed flex items-center justify-center w-10 h-10 text-white transition-all bg-blue-500 rounded-full shadow-lg cursor-pointer hover:scale-110 bottom-4 right-2 hover:bg-purple-600 active:shadow-md"
    >
      <div className="relative flex items-center justify-center w-4 h-4">
        <div className="absolute w-full h-1 transition-all duration-300 rotate-0 bg-white rounded group-hover:rotate-45"></div>
        <div className="absolute w-full h-1 transition-all duration-300 rotate-90 bg-white rounded group-hover:-rotate-45"></div>
      </div>
    </button>
  );
}

export default function Chat() {
  return <FloatingChatMain handleSubmit={() => {}} />;
}
