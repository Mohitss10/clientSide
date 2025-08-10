import React, { useEffect, useState } from 'react';
import { Gem, Sparkles, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import CreationItem from '../components/CreationItem';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import Community from './Community';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const navigate = useNavigate();

  const [creations, setCreations] = useState([]);
  const [plan, setPlan] = useState('Free');
  const [loading, setLoading] = useState(true);
  const [showRecent, setShowRecent] = useState(false); // default closed


  const tools = [
    { name: "Write Article", path: "/ai/write-article" },
    { name: "Blog Titles", path: "/ai/blog-titles" },
    { name: "Generate Images", path: "/ai/generate-images" },
    { name: "Remove Background", path: "/ai/remove-background" },
    { name: "Remove Object", path: "/ai/remove-object" },
    { name: "Review Resume", path: "/ai/review-resume" },
  ];

  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });
      if (data.success) {
        setCreations(data.creations);
        setPlan(data.plan || 'Free');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className=" min-h-[60vh] border-white/10 lg:min-h-[85vh] sm:mx-auto overflow-y-auto scrollbar-hide border p-4 rounded-xl">

      {/* Card Section */}
      {/* <div className="flex gap-4 overflow-x-auto sm:flex-wrap scrollbar-hide justify-center">
        {/* Total creation card */}
        {/* <div className="flex-shrink-0 flex justify-between items-center w-38 sm:w-55 lg:w-[48%] p-4 sm:p-6 rounded-xl border border-white/10 backdrop-blur-lg shadow-md bg-slate-800/30">
          <div className="text-slate-100">
            <p className="text-sm opacity-80">Total Creation</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg flex justify-center items-center shadow-md">
            <Sparkles className="w-5 text-white" />
          </div>
        </div> */}

        {/* Active plan card */}
        <div className=" flex-shrink-0 flex justify-between items-center w-full lg:w-full p-4 sm:p-6 rounded-xl border border-white/10 backdrop-blur-lg shadow-md bg-slate-800/30">

          <div className="text-slate-100">
            <p className="text-sm opacity-80">Active Plan</p>
            <h2 className="text-xl font-semibold">
              {plan === 'premium' ? 'Premium' : 'Free'}
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg flex justify-center items-center shadow-md">
            <Gem className="w-5 text-white" />
          </div>
        </div>
      {/* </div> */} 

      {/* All Tools Section */}
      {/* All Tools Section - Hidden on laptop and larger */}
      {/* <div className="p-4 rounded-xl block lg:hidden">
        <h2 className="text-lg font-semibold text-slate-200 mb-3">All Tools</h2>
        <div className="flex flex-col gap-3">
          {tools.map(({ name, path }) => (
            <div
              key={path}
              onClick={() => navigate(path)}
              className="cursor-pointer p-3 rounded-lg bg-slate-800/30 text-slate-100 font-medium hover:bg-slate-700 flex items-center justify-between"
            >
              <span>{name}</span>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </div>
          ))}
        </div>
      </div> */}
      <div className='h-[43vh] sm:h-[63vh] mt-5'>
        <Community/>
      </div>
      

      {/* Mobile Only */}
<motion.button
  className="mt-6 px-6 py-3 rounded-xl w-full  text-slate-300 bg-slate-800/30 font-medium shadow-lg hover:shadow-xl transition sm:hidden"
  animate={{
    y: [0, -8, 0, 8, 0],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  Scroll to view more
</motion.button>

{/* Laptop & Above */}
<motion.button
  className="mt-6 px-6 py-3 rounded-xl w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-medium shadow-lg hover:shadow-xl transition hidden lg:block"
  animate={{
    y: [0, -8, 0, 8, 0],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  Scroll to view more
</motion.button>




    </div>
  );
};

export default Dashboard;
