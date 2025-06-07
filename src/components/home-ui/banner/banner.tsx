interface AuthBannerUIProps {
  image: string;
}

const AuthBannerUI = ({ image }: AuthBannerUIProps) => {
  return (
    <div
      style={{
        backgroundImage: image,
      }}
      className="w-full h-full bg-cover "
    >
      <div className="w-full h-full pl-[5%] pb-[3vh] bg-black/60 flex items-end">
        <div>
          <h1 className="text-white poppins-font font-bold">
            Welcome to
            <br />
            <span className="text-[40px]">Pawnesia</span>
          </h1>
        </div>
      </div>
    </div>
  );
};
export default AuthBannerUI;
