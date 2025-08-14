import React, { useState } from 'react';
import { Edit, Sparkles, ChevronDown } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articalLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1200, text: 'Long (1200+ words)' },
  ];

  const [selectedLength, setSelectedLength] = useState(articalLength[0]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [showConfig, setShowConfig] = useState(true); // start open
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const prompt = `Write an article about ${input} in ${selectedLength.text}`;
      const token = await getToken();
      const { data } = await axios.post(
        '/api/ai/generate-article',
        { prompt, length: selectedLength.length },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setContent(data.content);

        // Collapse config only on mobile/tablet after success
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
          setShowConfig(false);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };


  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT COLUMN */}
        <form
          onSubmit={onSubmitHandler}
          className="flex-1 w-full max-w-full p-5 bg-slate-700/10 backdrop-blur-sm rounded-2xl border border-white/10"
        >
          {/* Heading */}
          <div
            className="flex items-center justify-between gap-3 cursor-pointer lg:cursor-default"
            onClick={() => {
              if (window.innerWidth < 1024) setShowConfig(!showConfig);
            }}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 text-[#4A7AFF]" />
              <h1 className="text-xl  font-semibold">Article Configuration</h1>
            </div>
            <div
              className="lg:hidden transition-transform duration-300"
              style={{ transform: `rotate(${showConfig ? 180 : 0}deg)` }}
            >
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>

          {/* Smooth collapsible content */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden lg:overflow-visible lg:max-h-none`}
            style={{
              maxHeight: showConfig ? '1000px' : '0px',
              opacity: showConfig ? 1 : 0,
            }}
          >
            <p className="mt-6 text-sm font-medium">Article Topic</p>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              className="w-full p-2 mt-2 outline-none text-sm rounded-md border border-slate-400 bg-transparent placeholder:text-slate-500 dark:placeholder:text-slate-400"
              placeholder="The future of artificial intelligence is..."
              required
            />


            <p className="m-4 text-sm font-medium ">Article Length</p>
            <div className="mt-3 ml-2 flex gap-3 flex-wrap">
              {articalLength.map((item, index) => (
                <span
                  onClick={() => setSelectedLength(item)}
                  className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition-all duration-300 ease-in-out
    ${selectedLength.text === item.text
                      ? 'border-blue-500 text-blue-400 shadow-md shadow-blue-500/30 scale-105'
                      : 'border-gray-400/40 hover:shadow-md hover:shadow-gray-500/30 hover:scale-105'
                    }`}
                  key={index}
                >
                  {item.text}
                </span>

              ))}
            </div>

            <button
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF]  px-4 py-3 mt-8 text-sm rounded-lg cursor-pointer"
            >
              {loading ? (
                <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
              ) : (
                <Edit className="w-5" />
              )}
              Generate article
            </button>
          </div>
        </form>

        {/* RIGHT COLUMN */}
        <div className="flex-1 gap-4 w-full max-w-full p-5 rounded-2xl flex flex-col bg-slate-700/10 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-3">
            <Edit className="w-5 h-5 text-[#4A7AFF]" />
            <h1 className="text-xl font-semibold">Generated article</h1>
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5">
                <Edit className="w-9 h-9" />
                <p>Enter a topic and click "Generate article" to get started</p>
              </div>
            </div>
          ) : (
            <div className="scrollbar-hide mt-3 h-full overflow-y-scroll text-sm  markdown-body">
              <div className="reset-tw">
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 p-6 bg-slate-700/10 border border-white/10 rounded-xl hidden sm:block">
        <h2 className="text-lg font-bold mb-3">Write High-Quality Articles with AI</h2>
        <p className="text-sm mb-2">
          Our AI article writer helps you create engaging, well-structured, and SEO-friendly content in just minutes — perfect for blogs, websites, and social media.
        </p>
        <p className="text-sm mb-2">
          Simply enter your topic or keywords, and our system will generate a complete article with relevant headings, clear formatting, and a natural flow.
        </p>
        <p className="text-sm">
          Save time, boost productivity, and focus on your ideas while AI handles the heavy lifting of writing.
        </p>
      </div>

    </div>
  );
};

export default WriteArticle;
