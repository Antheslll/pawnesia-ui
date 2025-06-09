import {
  CameraUpload,
  LinkUpload,
  PictureUpload,
} from "@/svg-assets/comment-icon";

const CreateComment = () => {
  return (
    <div className="fixed w-[100vw] h-[100vh] bg-black/50 flex-centered">
      <div className="w-[65vw] h-[70vh] bg-white">
        <div className="w-full h-[15vh] grid grid-cols-[15%_30%]">
          <div className="flex-centered">
            <div className="w-[4vw] h-[4vw] bg-red-500 bg-cover bg-center rounded-full"></div>
          </div>
          <div className="flex items-center">
            <span className="text-[18px]">Username</span>
          </div>
        </div>
        <div className="w-full h-[40vh]">
          <textarea
            className="w-full h-[35vh] pl-10 pt-5 focus:outline-0"
            placeholder="how was the product? tell us your story..."
          ></textarea>
        </div>
        <div className="w-full h-[15vh] grid grid-cols-2">
          <div></div>
          <div className="w-full h-full grid grid-cols-2">
            <div className="w-full h-full flex-centered flex-row gap-4">
              <div>
                <PictureUpload />
              </div>
              <div>
                <CameraUpload />
              </div>
              <div>
                <LinkUpload />
              </div>
            </div>
            <div className="w-full h-full flex items-center">
              <button className="w-[14vw] h-[8vh] button-background-color poppins-font text-white font-bold text-[18px]">
                POST
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
