import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton, Breadcrumb, Input, TextArea } from "@components";
import { getSuggestionById } from "@api";
import { ISuggestion } from "@types";

const SuggestDetailPage: React.FC = () => {
  const { suggestionId } = useParams();
  const navigate = useNavigate();

  const [suggestionName, setSuggestionName] = useState<string>("");
  const [suggestionContent, setSuggestionContent] = useState<string>("");

  useEffect(() => {
    async function fetchSuggestion() {
      try {
        const response = await getSuggestionById(suggestionId as string);
        const suggestion = response.data as unknown as ISuggestion;
        setSuggestionName(suggestion.title || "");
        setSuggestionContent(suggestion.content || "");
      } catch (error) {
        console.error("Error fetching suggestion:", error);
      }
    }

    fetchSuggestion();
  }, [suggestionId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton onClick={() => navigate(-1)} />
      <Breadcrumb pageName="Xem phản hồi" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-5.5 p-6.5">
          <div className="flex flex-col gap-6 xl:flex-row">
            <div className="w-full">
              <Input
                title="Tên phản hồi"
                placeholder="Tên phản hồi"
                type="text"
                value={suggestionName}
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <div className="w-full">
              <TextArea
                title="Nội dung phản hồi"
                placeholder="Nội dung phản hồi"
                value={suggestionContent}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestDetailPage;
