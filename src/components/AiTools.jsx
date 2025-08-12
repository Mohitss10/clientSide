import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
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
    description: "Elevate your workflow with powerful, intuitive AI tools designed to simplify every step.",
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

  const handleToolClick = (tool) => {
    if (!user) {
      toast.error(" Please sign in first to use this awesome AI tool!🚀", {
        style: {
          text:"center",
          background: "#334155",
          color: "#fff",
          borderRadius: "10px",
          padding: "12px",
          whiteSpace: "nowrap",
          maxWidth: "70%",
          overflow: "hidden",
          textOverflow: "ellipsis"
        },
      });

      return;
    }
    if (tool.path) navigate(tool.path);
  };

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-10 xl:px-20">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <header className="text-center">
          <h2 className="text-4xl sm:text-5xl font-medium bg-gradient-to-r from-gray-300 via-gray-500 to-gray-800 bg-clip-text text-transparent">
            Explore Tools
          </h2>
          <p className="text-gray-300 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Discover powerful AI tools in a responsive, modern layout designed to boost your creativity and workflow.
          </p>
        </header>

        <div className="mt-12 block space-y-4 sm:grid sm:gap-4 sm:space-y-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px]">
          {aiToolsData.map((tool, index) => (
            <div
              key={index}
              onClick={() => handleToolClick(tool)}
              className={`relative overflow-hidden p-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl cursor-pointer border border-white/10 ${tool.colSpan} ${tool.rowSpan}`}
              style={{
                background:
                  tool.title === "AIMatrix"
                    ? "linear-gradient(135deg, #0a192f, #112d4e, #1b3b6f)"
                    : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              }}
            >
              <div className="absolute inset-0 bg-slate-00/50 backdrop-blur-3xl rounded-2xl" />

              <div className="relative z-10 flex flex-col justify-between h-full">
                {tool.title !== "AIMatrix" && (
                  <tool.Icon className="text-purple-300 w-10 h-10 mb-4" />
                )}

                <div>
                  <h3
                    className={`font-bold ${tool.title === "AIMatrix"
                        ? "bg-gradient-to-r from-[#112d4e] via-[#203f64] to-[#112d4e] bg-clip-text text-transparent text-6xl sm:text-6xl md:text-7xl lg:text-8xl"
                        : "text-xl text-slate-300"
                      }`}
                  >
                    {tool.title}
                  </h3>

                  <p
                    className={`mt-2 text-slate-400 ${tool.title === "AIMatrix" ? "text-lg sm:text-xl" : "text-sm"
                      }`}
                  >
                    {tool.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiTools;
