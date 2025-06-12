"use client";
import { LinkUpload, PictureUpload } from "@/svg-assets/comment-icon";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import PostButton from "../postButton";

interface CreateCommentProps {
  handleCommentOverlay: () => void;
  productId: string;
}

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  profile_url: string;
  first_name: string; // Tambahkan ini
  last_name?: string; // Optional kalau perlu
  iat?: number;
  exp?: number;
}

const CreateComment = ({
  handleCommentOverlay,
  productId,
}: CreateCommentProps) => {
  // const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [recordComment, setRecordComment] = useState("");
  const [link, setLink] = useState<File | undefined>();
  const [rating, setRating] = useState(5);

  const token = localStorage.getItem("auth_token");
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      setUsername(`${decoded.first_name} ${decoded.last_name}`);
      setProfileUrl(decoded.profile_url);
      setUserId(decoded.userId);
    }
  }, [token]);

  const commentRecord = (value: string) => {
    setRecordComment(value);
  };

  const linkRecord = (file: undefined | File) => {
    setLink(file);
  };

  return (
    <>
      <div
        className="fixed w-[100vw] h-[100vh] bg-black/50 flex-centered z-40 cursor-pointer"
        onClick={handleCommentOverlay}
      >
        <div
          className="w-[65vw] h-[70vh] bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-[15vh] grid grid-cols-[15%_30%]">
            <div className="flex-centered">
              <div
                className="w-[4vw] h-[4vw] bg-cover bg-center rounded-full"
                style={{ backgroundImage: `url(${profileUrl})` }}
              ></div>
            </div>
            <div className="flex items-center">
              <span className="text-[18px]">{username}</span>
            </div>
          </div>
          <div className="w-full h-[40vh]">
            <textarea
              className="w-full h-[35vh] pl-10 pt-5 focus:outline-0"
              placeholder="how was the product? tell us your story..."
              onChange={(e) => commentRecord(e.target.value)}
            ></textarea>
            {link && (
              <p className="text-blue-500 underline pl-10">{link.name}</p>
            )}
          </div>
          <div className="w-full h-[15vh] grid grid-cols-2">
            <div className="flex-centered">
              <input
                type="number"
                className="h-[5vh] border-2"
                placeholder="masukkan angka 1-5"
                onChange={(e) => {
                  setRating(Number(e.target.value));
                }}
              />
            </div>
            <div className="w-full h-full grid grid-cols-2">
              <div className="w-full h-full flex-centered flex-row gap-4">
                <div>
                  <input
                    id="upload-image"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        linkRecord(file);
                      }
                    }}
                  />
                  <label htmlFor="upload-image" style={{ cursor: "pointer" }}>
                    <PictureUpload />
                  </label>
                </div>

                <div>
                  <input
                    id="upload-image"
                    type="file"
                    accept="application/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        linkRecord(file);
                      }
                    }}
                  />
                  <label htmlFor="upload-image" style={{ cursor: "pointer" }}>
                    <LinkUpload />
                  </label>
                </div>
              </div>
              <PostButton
                link={link}
                productId={productId}
                recordComment={recordComment}
                userId={userId}
                rating={rating}
                handleCommentOverlay={handleCommentOverlay}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateComment;
