import { useShallow } from 'zustand/react/shallow';
import { nameDescription, siteName } from '../lib/constants';
import useChatStore from '../store/chatStore';
import QuestionItem from './QuestionItem';
import initialQuestions from '../lib/initialQuestions';
import CloseIcon from './Menus/CloseIcon';

type SidebarProps = {
  sendMessageToServer: (text: string) => void;
};

export default function Sidebar({ sendMessageToServer }: SidebarProps) {
  const { isSidebarOpen, toggleSidebar } = useChatStore(
    useShallow(state => ({
      isSidebarOpen: state.isSidebarOpen,
      toggleSidebar: state.toggleSidebar,
    }))
  );

  return (
    <div className="h-screen lg:!sticky top-0 z-[120]">
      <div className="flex flex-col h-screen">
        <div
          className={`${isSidebarOpen ? '!w-full opacity-100' : '!w-0 opacity-0'} h-screen transition-all duration-300 lg:bg-transparent fixed inset-0 bg-black/60 backdrop-blur-sm z-[85] lg:!relative`}
          onClick={toggleSidebar}
        >
          <div
            className={`fixed inset-y-0 ${
              isSidebarOpen ? 'block left-0 w-[300px] lg:!w-[385px]' : '-left-[1180px] w-0 hidden'
            } transition-all duration-300 bg-white shadow-2xl lg:!shadow-xl lg:!relative z-50 flex flex-col h-full animate-fade-in`}
            onClick={e => e.stopPropagation()}
          >
            {/* Mobile Header */}
            <div className="border-b border-gray-200 lg:!hidden !block bg-gradient-to-r from-blue-500 to-indigo-600">
              <div className="flex items-center justify-between px-5 h-16">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-blue-500"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  </div>
                  <h1 className="text-lg font-semibold text-white">{siteName}</h1>
                </div>
                <CloseIcon />
              </div>
            </div>

            {/* Desktop Header */}
            <div className="border-b border-gray-200 hidden lg:!flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-600 p-2">
              <div className="flex items-center px-5 h-14">
                <div className="flex items-center">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center mr-3 shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-blue-500"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-white">{siteName}</h1>
                    <p className="text-xs text-blue-100">{nameDescription}</p>
                  </div>
                </div>
              </div>
              <CloseIcon />
            </div>

            {/* Questions Section */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-indigo-50/70 to-white">
              <div className="p-5">
                <h2 className="mb-5 text-xl font-semibold text-left text-gray-800">
                  How can I help you today?
                </h2>
                <div className="space-y-3">
                  {initialQuestions.map((question, index) => (
                    <QuestionItem
                      key={index}
                      question={question}
                      sendMessageToServer={sendMessageToServer}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Powered by{' '}
                  <span className="font-medium text-indigo-600">
                    <a href="https://www.onepointltd.com/">Onepoint</a>
                  </span>
                </p>
                <div className="flex space-x-2">
                  <button className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
