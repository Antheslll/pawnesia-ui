"use client";
import { useEffect, useState } from "react";
import CommentViewCard from "./commentViewCard";
import { getSellerData } from "@/lib/fetcher/seller/getProductData";
import { CommentItem } from "@/types";

const CommentView = () => {
  const [commentsData, setCommentsData] = useState<CommentItem[] | undefined>();

  useEffect(() => {
    const commentsData = async () => {
      const data = await getSellerData(
        "http://localhost:5000/api/comments/show"
      );
      setCommentsData(data?.data);
    };
    commentsData();
  }, []);

  return (
    <section className="bg-white p-6 rounded-lg shadow h-[70vh]">
      <h2 className="text-lg font-semibold mb-4">Comments</h2>
      <div className="w-full h-[50vh] overflow-y-auto flex flex-col gap-3">
        {commentsData?.map((cData) => (
          <CommentViewCard
            key={cData?.comment_id}
            firstName={cData?.User?.first_name ?? ""}
            lastName={cData?.User?.last_name ?? ""}
            profileUrl={cData?.User?.profile_picture ?? ""}
            content={cData?.comments}
          />
        ))}
      </div>
    </section>
  );
};

export default CommentView;
