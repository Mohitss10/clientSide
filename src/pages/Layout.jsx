import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { SignIn, useUser } from '@clerk/clerk-react';

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="w-full px-6 py-3 bg-slate-950/10 backdrop-blur-lg flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img src={assets.logo} alt="logo" className="w-8" />
          <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            AIMatrix
          </span>
        </div>

        {/* Mobile Menu Icon */}
        <Menu
          onClick={() => setSidebar(true)}
          className="h-6 w-6 text-white sm:hidden cursor-pointer"
        />
      </nav>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <div
          className={`fixed sm:static top-0 left-0 h-full z-50 
          bg-slate-950/90 backdrop-blur-lg transition-transform duration-300 ease-in-out
          ${sidebar ? 'translate-x-0 w-full sm:w-64' : '-translate-x-full sm:translate-x-0 sm:w-64'}`}
        >
          {/* Close Button (Mobile only) */}
          <div className="sm:hidden flex justify-end p-4">
            <X
              onClick={() => setSidebar(false)}
              className="h-7 w-7 text-white cursor-pointer hover:text-red-400 transition-colors"
            />
          </div>

          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto bg-slate-950/10 p-4 scrollbar-hide">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;
