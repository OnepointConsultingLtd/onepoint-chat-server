import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./index.tsx";
import Chat from "./chat.tsx";
import { ChatProvider } from "./context/ChatProvider";

createRoot(document.getElementById("root")!).render(
  <ChatProvider>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
    ,
  </ChatProvider>,
);
