import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const useVisitor = () => {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    const fetchVisitorData = async (newId: string | null) => {
      try {
        const response = await axios.post("http://localhost:5208/api/Visitor", {
          visitorId: newId
        });
        console.log(response.data);
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
