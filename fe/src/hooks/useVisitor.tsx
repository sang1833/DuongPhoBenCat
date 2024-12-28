import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { trackVisitor } from "@/apis/function";

const useVisitor = () => {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    const fetchVisitorData = async (newId: string | null) => {
      try {
        const response = trackVisitor(newId);
        console.log(response);
      } catch (error) {
        console.error("Error fetching visitor data:", error);
      }
    };

    if (hasFetchedRef.current) return;

    const id = localStorage.getItem("visitorId");
    if (id) {
      fetchVisitorData(id);
    } else {
      const newId = generateVisitorId();
      localStorage.setItem("visitorId", newId);
      setVisitorId(newId);

      fetchVisitorData(visitorId);
    }

    hasFetchedRef.current = true;
  }, []);

  const generateVisitorId = () => {
    return uuidv4();
  };

  return visitorId;
};

export default useVisitor;
