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
    bgImage: "https://media.webdesignerdepot.com/spai/q_lossy+ret_img+to_auto/webdesignerdepot-wp.s3.us-east-2.amazonaws.com/2022/11/08105827/featured_ai.png",
  },
  {
    title: "Blog Title Generator",
    description: "Find the perfect, catchy title for your blog posts with our AI-powered generator.",
    Icon: Hash,
    path: "/ai/blog-titles",
    colSpan: "sm:col-span-1",
    rowSpan: "sm:row-span-1",
    bgImage: "https://d1735p3aqhycef.cloudfront.net/topview_blog/image-4ae5a3cd.webp",
  },
  {
    title: "AI Image Generation",
    description: "Create Stunning, High-Resolution Visuals in Seconds with Our Advanced AI Image Generation Tool.",
    Icon: Image,
    path: "/ai/generate-images",
    colSpan: "sm:col-span-2",
    rowSpan: "sm:row-span-1",
    bgImage: "https://img-cdn.tnwcdn.com/image?fit=1280%2C720&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2023%2F11%2Fsolar-otovo-2.jpg&signature=b451670ee996738f876dbbc1ee095b3a",
  },
  {
    title: "Background Removal",
    description: "Effortlessly remove backgrounds from your images with our AI-driven tool.",
    Icon: Eraser,
    path: "/ai/remove-background",
    colSpan: "sm:col-span-1",
    rowSpan: "sm:row-span-1",
    bgImage: "https://a.storyblok.com/f/191576/2400x1260/f6b89b11a3/change_background_color_og_image.webp",
  },
  {
    title: "AIMatrix",
    description: "Elevate your workflow with powerful, intuitive AI tools designed to simplify every step.",
    Icon: Eraser,
    colSpan: "sm:col-span-2",
    rowSpan: "sm:row-span-1",
    bgImage: "https://t4.ftcdn.net/jpg/02/79/74/91/360_F_279749144_wQUWtNbxuaq9Ojm51vs1APn3PAsdFGO1.jpg",
  },
  {
    title: "Object Removal",
    description: "Effortlessly Remove Unwanted Objects from Your Images with Our Smart AI-Powered Tool.",
    Icon: Scissors,
    path: "/ai/remove-object",
    colSpan: "sm:col-span-3",
    rowSpan: "sm:row-span-1",
    bgImage: "https://airbrush.com/_next/static/media/obr-people-before.20956c44.jpg",
  },
  {
    title: "Resume Reviewer",
    description: "Get your resume reviewed by AI to improve your chances of landing your dream job.",
    Icon: FileText,
    path: "/ai/review-resume",
    colSpan: "sm:col-span-1",
    rowSpan: "sm:row-span-1",
    bgImage: "https://cdnwebsite.databox.com/wp-content/uploads/2020/11/02074822/headline-examples.png",
  },
];

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleToolClick = (tool) => {
    if (!user) {
      toast.error(" Please sign in first to use this awesome AI tool! 🚀", {
        style: {
          text: "center",
          borderRadius: "10px",
          padding: "12px",
          whiteSpace: "nowrap",
          maxWidth: "70%",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      });
      return;
    }
    if (tool.path) navigate(tool.path);
  };

  return (
    <section className=" py-10 sm:py-16 px-4 sm:px-10 xl:px-20">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <header className="text-center">
          <h2 className="text-4xl sm:text-5xl font-medium bg-gradient-to-r from-gray-300 via-gray-500 to-gray-800 bg-clip-text text-transparent">
            Explore Tools
          </h2>
          <p className=" mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Discover powerful AI tools in a responsive, modern layout designed to boost your creativity and workflow.
          </p>
        </header>

        <div className="mt-12 sm:mx-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px]">
          {aiToolsData.map((tool, index) => (
            <div
              key={index}
              onClick={() => handleToolClick(tool)}
              className={`relative overflow-hidden p-6 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer ${tool.colSpan} ${tool.rowSpan} ${
                tool.title !== "AIMatrix" ? "hover:scale-[1.03] hover:shadow-2xl" : ""
              }`}
              style={{
                background: tool.bgImage
                  ? `url(${tool.bgImage}) center/cover no-repeat`
                  : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              }}
            >
              {/* Overlay for readability */}
              <div className="absolute inset-0 bg-black/50 rounded-2xl" />

              <div className="relative z-10 flex flex-col justify-between h-full text-white">
                {tool.title !== "AIMatrix" && <tool.Icon className="w-10 h-10 mb-4" />}
                <div>
                  <h3
                    className={`font-bold ${
                      tool.title === "AIMatrix"
                        ? "bg-gradient-to-r from-[#204876] via-[#2b5c98] to-[#2f70bb] bg-clip-text text-transparent text-6xl sm:text-6xl md:text-7xl lg:text-9xl"
                        : "text-xl"
                    }`}
                  >
                    {tool.title}
                  </h3>
                  <p
                    className={`mt-2 ${
                      tool.title === "AIMatrix"
                        ? "text-[16px] sm:text-[16px] max-[1023px]:text-[16px]"
                        : "text-sm max-[1023px]:text-xs"
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
