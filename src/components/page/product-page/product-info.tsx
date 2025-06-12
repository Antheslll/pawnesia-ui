"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import CreateComment from "@/components/comment/comment-overlay/createComment";
import CommentCard from "@/components/comment/commentCard";
import { CommentItem } from "@/types";
import { useState } from "react";

interface ProductInfoProps {
  productName: string;
  productPrice: number;
  productId: string;
  productDescription: string;
  commentData: CommentItem[];
}

const ProductInfo = ({
  productName,
  productPrice,
  productDescription,
  commentData,
  productId,
}: ProductInfoProps) => {
  const [createComment, setCreateComment] = useState(false);
  const handleCommentOverlay = () => {
    setCreateComment(!createComment);
  };

  return (
    <>
      {createComment && (
        <CreateComment
          handleCommentOverlay={handleCommentOverlay}
          productId={productId}
        />
      )}
      <div className="w-full h-full flex pt-[10vh] pb-[40vh] flex-col">
        <div className="w-[90%] h-[50vh] flex flex-col">
          <div className="w-full h-[10vh] grid grid-cols-[2.5fr_1fr]">
            <div>
              <h1 className="text-[20px] poppins-font font-bold">
                {productName}
              </h1>
            </div>
            <div className="flex justify-end">
              <span className="poppins-font text-[20px] font-bold">
                Rp {productPrice.toLocaleString("ID")},-
              </span>
            </div>
          </div>
          <hr />
          <div className="w-full h-[15vh]">
            <p className="nunito-font">{productDescription}</p>
          </div>
        </div>
        <div className="w-[90%] h-[50vh]">
          <div className="w-full h-[8vh] grid grid-cols-[5fr_1fr]">
            <div>
              <h4 className="text-[20px] pl-3 poppins-font font-bold">
                Comment
              </h4>
            </div>
            <span
              className="flex justify-end pr-5 poppins-font font-bold cursor-pointer"
              onClick={handleCommentOverlay}
            >
              {createComment ? "-" : "+"}
            </span>
          </div>
          <hr />
          <div className="w-full h-[70vh] flex flex-col gap-y-5 mt-5 overflow-y-auto overflow-x-hidden max-w-full break-words">
            {commentData?.map((comment: any) => (
              <CommentCard
                key={comment.comment_id}
                rating={comment.rating}
                comment={comment.comments}
                firstName={comment.User.first_name}
                lastName={comment.User.last_name}
                link={comment.link}
                profilePicture={comment.User.profile_picture}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
