import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddAlbum from './pages/AddAlbum';
import ListAlbum from './pages/ListAlbum';
import AddSong from './pages/AddSong';
import ListSong from './pages/ListSong';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export const url = 'https://tune-out-backend.onrender.com';

const App = () => {
  return (
    <div className="flex items-start min-h-screen">
      <ToastContainer />
      <Sidebar />

      <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
        <Navbar />
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
            <Route path="/" element={<Navigate to="/list-song" />} />
            <Route path="/add-song" element={<AddSong />} />
            <Route path="/add-album" element={<AddAlbum />} />
            <Route path="/list-album" element={<ListAlbum />} />
            <Route path="/list-song" element={<ListSong />} />
            <Route path="*" element={<h2 className="text-center text-red-500 mt-10">Page Not Found</h2>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
