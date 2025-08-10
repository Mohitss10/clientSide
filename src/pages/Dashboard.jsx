import React, { useEffect, useState } from 'react';
import { Gem, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import CreationItem from '../components/CreationItem';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";

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
    <div className="h-[87vh] lg:min-h-[70vh] w-full md:w-[70vw] lg:w-[80vw] border border-b-0 sm:border-b border-white/10 p-4 sm:p-2 bg-slate-700/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl sm:mx-auto space-y-6">

      {/* Card Section */}
      <div className="flex gap-4 overflow-x-auto sm:flex-wrap scrollbar-hide">
        {/* Total creation card */}
        <div className="flex-shrink-0 flex justify-between items-center w-41 sm:w-55 lg:w-[48%] p-4 sm:p-6 rounded-xl border border-white/10 backdrop-blur-lg shadow-md bg-slate-800/30">
          <div className="text-slate-100">
            <p className="text-sm opacity-80">Total Creation</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg flex justify-center items-center shadow-md">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>

        {/* Active plan card */}
        <div className="flex-shrink-0 flex justify-between items-center w-40 sm:w-56 lg:w-[48%] p-4 sm:p-6 rounded-xl border border-white/10 backdrop-blur-lg shadow-md bg-slate-800/30">
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
      </div>

      {/* All Tools Section */}
      <div className="bg-slate-700/10 p-4 rounded-xl">
        <h2 className="text-lg font-semibold text-slate-200 mb-3">All Tools</h2>
        <div className="flex flex-col gap-3">
          {tools.map(({ name, path }) => (
            <div
              key={path}
              onClick={() => navigate(path)}
              className="cursor-pointer p-3 rounded-lg bg-slate-800/30 text-slate-100 font-medium hover:bg-slate-700"
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Creations */}
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-11 w-11 border-4 border-purple-500 border-t-transparent"></div>
        </div>
      ) : (
        <>
          {/* Toggle header */}
          {/* <div
            className="flex items-center justify-between cursor-pointer px-3 sm:px-4 md:px-6 border-b border-white/10 pb-2"
            onClick={() => setShowRecent(!showRecent)}
          >
            <p className="text-lg font-semibold text-slate-300">
              Recent Creations
            </p>
            {showRecent ? (
              <ChevronUp className="text-slate-300" />
            ) : (
              <ChevronDown className="text-slate-300" />
            )}
          </div> */}

          {/* Smooth open/close */}
          {/* <AnimatePresence>
            {showRecent && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="space-y-3 text-slate-100 border border-white/10 rounded-xl bg-black/30 backdrop-blur-sm mt-3 
                          h-[50vh] sm:h-[40vh] md:h-[55.7vh] overflow-y-auto p-3 sm:p-4 md:mx-4 scrollbar-hide">
                  {creations.map((item) => (
                    <CreationItem key={item.id} item={item} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence> */}
        </>
      )}

    </div>
  );
};

export default Dashboard;
