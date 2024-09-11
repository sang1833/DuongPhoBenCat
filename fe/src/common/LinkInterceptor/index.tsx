import React, { useState, useEffect, ReactNode } from "react";

interface LinkInterceptorProps {
  children: ReactNode;
}

const LinkInterceptor: React.FC<LinkInterceptorProps> = ({ children }) => {
  const [intercepted, setIntercepted] = useState(false);
  const [interceptedLink, setInterceptedLink] = useState<string | null>(null);

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest("a");

      if (target && target.tagName === "A") {
        const href = target.getAttribute("href");

        // Check if the link is external
        if (href && href.startsWith("http")) {
          event.preventDefault(); // Prevent navigation
          setIntercepted(true); // Set intercepted state
          setInterceptedLink(href); // Store the intercepted link URL
        }
      }
    };

    // Attach the event listener
    document.addEventListener("click", handleLinkClick);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  // Render intercepted page or the original children
  if (intercepted) {
    return (
      <section className="w-full h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md flex flex-col gap-4 text-center justify-center items-center">
          <h1 className="font-bold text-2xl mb-4 text-red-600">Chú ý!</h1>
          <p className="font-semibold text-xl mb-4 text-tailwind">
            Liên kết bạn sắp chuyển đến không được quản lý bởi website Đường phố
            Bến Cát
          </p>
          <button
            className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90  lg:px-4 xl:px-6"
            onClick={() => setIntercepted(false)}
          >
            Quay lại bản đồ
          </button>
          <span
            onClick={() => {
              if (interceptedLink) {
                window.location.href = interceptedLink; // Navigate to the intercepted link
              }
            }}
            className="relative inline-block hover:before:scale-x-0 before:absolute before:h-[2px] before:bg-primary before:bottom-0 before:left-0 before:right-0 before:origin-bottom-right before:transition-transform before:duration-300 before:ease-in-out hover:cursor-pointer font-normal text-graydark"
          >
            {"Tôi hiểu và muốn tiếp tục >>"}
          </span>
        </div>
      </section>
    );
  }

  return <>{children}</>;
};

export default LinkInterceptor;
