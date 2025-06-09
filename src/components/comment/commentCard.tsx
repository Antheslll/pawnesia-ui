import { StarIcon } from "@/svg-assets/star-icon";

interface CommentCardTypes {
  rating: number;
  comment: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

const CommentCard = ({
  firstName,
  lastName,
  profilePicture,
  rating,
  comment,
}: CommentCardTypes) => {
  return (
    <div className="w-[95%] min-h-[50vh] bg-white flex flex-col">
      <div className="w-full h-[10vh]  grid grid-cols-[15%_30%_65%]">
        <div className="flex-centered">
          <div
            className="w-[3vw] h-[3vw] bg-cover bg-center rounded-full"
            style={{ backgroundImage: `url(${profilePicture})` }}
          ></div>
        </div>
        <div className="flex items-center">
          <span>{`${firstName} ${lastName}`}</span>
        </div>
        <div className="flex items-center flex-row gap-1">
          {[...Array(rating)].map((_, index) => (
            <StarIcon key={index} />
          ))}
        </div>
      </div>
      <div className="w-full h-[15vh] pl-5 pr-5">
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;
