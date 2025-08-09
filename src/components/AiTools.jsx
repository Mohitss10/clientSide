import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { SquarePen, Hash, Image, Eraser, Scissors, FileText } from "lucide-react";

const aiToolsData = [
  {
    title: "AI Article Writer",
    description: "Generate high-quality, engaging articles on any topic with our AI writing technology.",
    Icon: SquarePen,
    path: "/ai/write-article",
    colSpan: "sm:col-span-1",
    rowSpan: "sm:row-span-2",
  },
  {
    title: "Blog Title Generator",
    description: "Find the perfect, catchy title for your blog posts with our AI-powered generator.",
    Icon: Hash,
    path: "/ai/blog-titles",
    colSpan: "sm:col-span-1",
    rowSpan: "sm:row-span-1",
  },
  {
    title: "AI Image Generation",
    description: "Create stunning visuals with our AI image generation tool.",
    Icon: Image,
    path: "/ai/generate-images",
    colSpan: "sm:col-span-2",
    rowSpan: "sm:row-span-1",
  },
  {
    title: "Background Removal",
    description: "Effortlessly remove backgrounds from your images with our AI-driven tool.",
    Icon: Eraser,
    path: "/ai/remove-background",
    colSpan: "sm:col-span-1",
    rowSpan: "sm:row-span-1",
  },
  {
    title: "AIMatrix",
    description: "Elevate your workflow with intuitive AI tools.",
    Icon: Eraser,
    colSpan: "sm:col-span-2",
    rowSpan: "sm:row-span-1",
  },
  {
    title: "Object Removal",
    description: "Remove unwanted objects from your images seamlessly.",
    Icon: Scissors,
    path: "/ai/remove-object",
    colSpan: "sm:col-span-3",
    rowSpan: "sm:row-span-1",
  },
  {
    title: "Resume Reviewer",
    description: "Get your resume reviewed by AI to improve your chances of landing your dream job.",
    Icon: FileText,
    path: "/ai/review-resume",
    colSpan: "sm:col-span-1",
    rowSpan: "sm:row-span-1",
  },
];

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-10 xl:px-20">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <header className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Our AI Tools
          </h2>
          <p className="text-gray-300 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Discover powerful AI tools in a responsive, modern layout designed to boost your creativity and workflow.
          </p>
        </header>

        {/* Tools Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px] md:auto-rows-[250px]">
          {aiToolsData.map((tool, index) => (
            <div
              key={index}
              onClick={() => user && tool.path && navigate(tool.path)}
              className={`relative overflow-hidden p-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl cursor-pointer border border-white/10 ${tool.colSpan} ${tool.rowSpan}`}
              style={{
                background:
                  tool.title === "AIMatrix"
                    ? "linear-gradient(135deg, #c084fc, #ec4899, #3b82f6)"
                    : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-2xl" />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-between h-full">
                {/* Icon */}
                {tool.title !== "AIMatrix" && (
                  <tool.Icon className="text-purple-300 w-10 h-10 mb-4" />
                )}

                {/* Title */}
                <h3
                  className={`font-bold text-white ${
                    tool.title === "AIMatrix" ? "text-4xl sm:text-5xl" : "text-lg"
                  }`}
                >
                  {tool.title}
                </h3>

                {/* Description */}
                <p
                  className={`mt-2 text-gray-300 ${
                    tool.title === "AIMatrix" ? "text-lg sm:text-xl" : "text-sm"
                  }`}
                >
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiTools;
