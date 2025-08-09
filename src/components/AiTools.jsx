import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { SquarePen, Hash, Image, Eraser, Scissors, FileText } from "lucide-react";

const aiToolsData = [
  {
    title: "AI Article Writer",
    description:
      "Generate high-quality, engaging articles on any topic with our AI writing technology.",
    Icon: SquarePen,
    path: "/ai/write-article",
  },
  {
    title: "Blog Title Generator",
    description:
      "Find the perfect, catchy title for your blog posts with our AI-powered generator.",
    Icon: Hash,
    path: "/ai/blog-titles",
  },
  {
    title: "AI Image Generation",
    description: "Create stunning visuals with our AI image generation tool.",
    Icon: Image,
    path: "/ai/generate-images",
  },
  {
    title: "Background Removal",
    description:
      "Effortlessly remove backgrounds from your images with our AI-driven tool.",
    Icon: Eraser,
    path: "/ai/remove-background",
  },
  {
    title: "AIMatrix",
    description: "Elevate your workflow with intuitive AI tools.",
    Icon: null, // No icon for AIMatrix
    path: null,
    special: true,
  },
  {
    title: "Object Removal",
    description:
      "Remove unwanted objects from your images seamlessly.",
    Icon: Scissors,
    path: "/ai/remove-object",
  },
  {
    title: "Resume Reviewer",
    description:
      "Get your resume reviewed by AI to improve your chances of landing your dream job.",
    Icon: FileText,
    path: "/ai/review-resume",
  },
];

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleClick = (path) => {
    if (path && user) {
      navigate(path);
    }
  };

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-10 xl:px-20 ">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <header className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Our AI Tools
          </h2>
          <p className="text-gray-300 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Discover powerful AI tools in a responsive, modern layout designed
            to boost your creativity and workflow.
          </p>
        </header>

        {/* Desktop Grid / Mobile Stack */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[250px] sm:auto-rows-[200px]">
          {aiToolsData.map((tool, index) => {
            const isSpecial = tool.special;
            return (
              <div
                key={index}
                onClick={() => handleClick(tool.path)}
                className={`relative overflow-hidden p-6 rounded-2xl shadow-lg border border-white/10 cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl 
                  ${isSpecial ? "sm:col-span-2 lg:col-span-2" : ""}
                  sm:h-auto h-[180px] sm:h-[200px]`}
                style={{
                  background: isSpecial
                    ? "linear-gradient(135deg, #c084fc, #ec4899, #3b82f6)"
                    : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                }}
              >
                {/* Overlay */}
                {!isSpecial && (
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-2xl" />
                )}

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center h-full">
                  {!isSpecial && tool.Icon && (
                    <tool.Icon className="text-purple-300 w-10 h-10 mb-4" />
                  )}
                  <h3
                    className={`font-bold text-white ${
                      isSpecial ? "text-3xl sm:text-4xl" : "text-lg"
                    }`}
                  >
                    {tool.title}
                  </h3>
                  <p
                    className={`mt-2 text-gray-300 ${
                      isSpecial ? "text-lg sm:text-xl" : "text-sm"
                    }`}
                  >
                    {tool.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AiTools;
