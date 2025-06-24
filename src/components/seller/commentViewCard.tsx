/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";

interface CommentViewCardProps {
  firstName: string;
  lastName: string;
  content: string;
  profileUrl: string;
}

const CommentViewCard = ({
  firstName,
  lastName,
  content,
  profileUrl,
}: CommentViewCardProps) => {
  return (
    <div className="flex items-start gap-4 bg-gray-100 p-4 rounded">
      <img
        src={profileUrl}
        alt="user"
        width={100}
        height={100}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <p className="font-medium">{`${firstName} ${lastName}`}</p>
        <p className="text-gray-600 text-sm">{content}</p>
      </div>
      <button className="text-gray-400 hover:text-gray-700">view</button>
    </div>
  );
};

export default CommentViewCard;
