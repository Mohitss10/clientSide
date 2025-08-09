import React, { useState } from 'react';
import { FileText, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [showConfig, setShowConfig] = useState(false); // Mobile toggle

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('Please upload a PDF resume');

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('resume', file);

      const { data } = await axios.post('/api/ai/resume-review', formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        setAnalysis(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[90vh] lg:min-h-[85vh] w-full md:w-[85vw] lg:w-[82vw] sm:mx-auto overflow-x-hidden">
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Left Column */}
        <form
          onSubmit={onSubmitHandler}
          className="flex-1 flex flex-col w-full max-w-full p-5 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10"
        >
          {/* Heading + Toggle */}
          <div
            className="flex items-center justify-between gap-3 cursor-pointer lg:cursor-default"
            onClick={() => setShowConfig(!showConfig)}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 text-[#00DA83]" />
              <h1 className="text-xl text-white font-semibold">Resume Review</h1>
            </div>
            <div className="lg:hidden">
              {showConfig ? (
                <ChevronUp className="w-5 h-5 text-white transition-transform duration-300" />
              ) : (
                <ChevronDown className="w-5 h-5 text-white transition-transform duration-300" />
              )}
            </div>
          </div>

          {/* Form Content with smooth toggle */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out lg:max-h-none ${
              showConfig ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0 lg:opacity-100 lg:max-h-none'
            } lg:mt-6`}
          >
            <p className="text-sm font-medium text-white/90">Upload Resume</p>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              accept="application/pdf"
              className="w-full p-2 mt-2 outline-none text-sm rounded-md border border-white/10 bg-transparent text-white placeholder:text-white/40"
              required
            />
            <p className="text-xs text-white/50 font-light mt-1">
              Supports PDF resume only.
            </p>

            <button
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-3 mt-8 text-sm rounded-lg cursor-pointer"
            >
              {loading ? (
                <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
              ) : (
                <FileText className="w-5" />
              )}
              Review Resume
            </button>
          </div>
        </form>

        {/* Right Column */}
        <div className="flex-1 w-full max-w-full p-5 rounded-2xl flex flex-col bg-black/40 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-5 h-5 text-[#00DA83]" />
            <h1 className="text-xl text-white font-semibold">Analysis Result</h1>
          </div>

          {!analysis ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <FileText className="w-9 h-9" />
                <p>Upload a resume and click "Review Resume" to get started</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 scrollbar-hide  overflow-y-auto max-h-[65vh] pr-2 text-sm text-white/80 whitespace-pre-wrap">
              <Markdown>{analysis}</Markdown>
            </div>
          )}
        </div>

      </div>
      <div className="mt-12 p-6 bg-black/30 border border-white/10 rounded-xl text-white">
      <h2 className="text-lg font-bold mb-3">Get Your Resume Reviewed by AI</h2>
      <p className="text-sm text-white/80 mb-2">
        Our AI-powered resume reviewer analyzes your resume for structure, formatting, keywords, and impact — helping you stand out in competitive job markets.
      </p>
      <p className="text-sm text-white/80 mb-2">
        Simply upload your resume, and our system will highlight strengths, point out weaknesses, and suggest improvements based on industry best practices.
      </p>
      <p className="text-sm text-white/80">
        Whether you're a fresher or an experienced professional, you’ll get actionable tips to make your resume shine and increase your chances of landing interviews.
      </p>
    </div>
    </div>
  );
};

export default ReviewResume;
