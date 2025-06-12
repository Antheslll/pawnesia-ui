"use client";
import { cloudFileFetcher } from "@/lib/fetcher/comment/cloudFileFetcher";
import { commentPostDBFetcher } from "@/lib/fetcher/comment/commentPostDBFetcher";

interface PostButtonProps {
  link: File | undefined;
  productId: string;
  userId: string;
  rating: number;
  handleCommentOverlay: () => void;
  recordComment: string;
}

interface CloudResponseTypes {
  detail: string;
  message: string;
  status: string;
}

const postCommentFile = async (
  link: File | undefined
): Promise<CloudResponseTypes | undefined> => {
  if (!link) {
    return;
  }
  const creatingComment = (await cloudFileFetcher(
    "http://localhost:5000/api/upload/cloud",
    link
  )) as CloudResponseTypes;

  return creatingComment;
};

const PostButton = ({
  link,
  productId,
  userId,
  recordComment,
  rating,
  handleCommentOverlay,
}: PostButtonProps) => {
  const postComment = async () => {
    try {
      const postingan = await postCommentFile(link);
      const linkCloud = postingan?.detail;

      if (linkCloud) {
        const payload = {
          userId: userId,
          productId: productId,
          comment: recordComment,
          rating: rating,
          link: linkCloud,
        };

        const postToDBComment = await commentPostDBFetcher(
          "http://localhost:5000/api/comments/create",
          payload
        );
        window.location.reload();
        return postToDBComment;
      }

      return;
    } catch (err) {
      console.error("Terjadi kesalahan saat upload: ", err);
    }
  };

  return (
    <div className="w-full h-full flex items-center">
      <button
        className="w-[14vw] h-[8vh] button-background-color poppins-font text-white font-bold text-[18px] cursor-pointer"
        onClick={() => {
          postComment();
          handleCommentOverlay();
        }}
      >
        POST
      </button>
    </div>
  );
};

export default PostButton;
