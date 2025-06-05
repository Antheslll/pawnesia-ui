interface AuthButtonUIProps {
  buttonText: string;
}

const AuthButtonUI = ({ buttonText }: AuthButtonUIProps) => {
  return (
    <button
      type="submit"
      className="w-[50%] h-[9vh] button-background-color text-white cursor-pointer"
    >
      {buttonText}
    </button>
  );
};

export default AuthButtonUI;
