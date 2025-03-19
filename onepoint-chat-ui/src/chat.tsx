import { AnimatePresence, motion } from "framer-motion";
import FloatingChatMain from "./components/FloatingChat/FloatingChatMain";
import { useChat } from "./hooks/useChat";

interface FloatingChatButtonProps {
  click: () => void;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ click }) => {
  return (
    <button
      onClick={click}
      className="fixed flex items-center justify-center w-10 h-10 text-white transition-all bg-purple-900 rounded-full shadow-lg cursor-pointer hover:scale-110 bottom-4 right-2 hover:bg-purple-600 active:shadow-md"
    >
      <div className="relative flex items-center justify-center w-4 h-4">
        <div className="absolute w-full h-1 transition-all duration-300 rotate-0 bg-white rounded group-hover:rotate-45"></div>
        <div className="absolute w-full h-1 transition-all duration-300 rotate-90 bg-white rounded group-hover:-rotate-45"></div>
      </div>
    </button>
  );
};

const chatVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    x: "20%",
    y: "20%",
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.4,
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    x: "20%",
    y: "20%",
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

function Chat() {
  const { isFloatingOpen, handleFloatingBtn } = useChat();

  return (
    <div className="!bg-gray-900 w-full min-h-screen">
      <h1 className="pt-8 text-4xl text-white">Welcome to onePoint</h1>
      <AnimatePresence>
        {isFloatingOpen && (
          <motion.div
            key="chat-window"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={chatVariants}
            className="!rounded-xl fixed bottom-10 right-8"
          >
            <FloatingChatMain handleFloatingBtn={handleFloatingBtn} />
          </motion.div>
        )}
      </AnimatePresence>
      <FloatingChatButton click={handleFloatingBtn} />
    </div>
  );
}

export default Chat;
