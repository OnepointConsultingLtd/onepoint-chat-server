import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Userback accessToken="A-oP0EhRGrso4PR7ClnvRv1yNA0" /> */}

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
