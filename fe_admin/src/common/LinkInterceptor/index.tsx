import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LinkInterceptor: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      const elementTarget = event.target as Element;
      const target = elementTarget.closest("a");

      // Check if it's a link
      if (target && target.tagName === "A") {
        const href = target.getAttribute("href");

        // Check if the link is external
        if (href && href.startsWith("http")) {
          event.preventDefault(); // Prevent the default behavior of the link
          navigate("/intercept", { state: { interceptedLink: href } }); // Navigate to the intercept page with the intercepted link
        }
      }
    };

    // Attach the event listener to the document
    document.addEventListener("click", handleLinkClick);

    // Cleanup the event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, [navigate]);

  return <>{children}</>;
};

export default LinkInterceptor;
