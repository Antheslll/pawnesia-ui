import AuthInputUI from "./input";

interface InputAreaProps {
  isInputPage: number;
  formValues: { [key: string]: string };
  checkedHandle: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputArea = ({
  isInputPage,
  onChange,
  formValues,
  checkedHandle,
}: InputAreaProps) => {
  if (isInputPage === 1) {
    return (
      <>
        <AuthInputUI
          value={formValues.email}
          onChange={onChange}
          name="email"
          type="email"
          placeholder="Email"
          min={1}
          max={255}
        />
        <AuthInputUI
          value={formValues.password}
          onChange={onChange}
          name="password"
          type="password"
          placeholder="Password"
          min={6}
          max={255}
        />
      </>
    );
  } else if (isInputPage === 2) {
    return (
      <>
        <AuthInputUI
          value={formValues.firstName}
          onChange={onChange}
          name="firstName"
          type="text"
          placeholder="First Name"
          min={3}
          max={20}
        />
        <AuthInputUI
          value={formValues.lastName}
          onChange={onChange}
          name="lastName"
          type="text"
          placeholder="Last Name"
          min={3}
          max={20}
        />
      </>
    );
  } else if (isInputPage === 3) {
    return (
      <>
        <AuthInputUI
          value={formValues.phoneNumber}
          onChange={onChange}
          name="phoneNumber"
          type="tel"
          placeholder="Phone Number"
          min={7}
          max={15}
        />
        <AuthInputUI
          value={formValues.address}
          onChange={onChange}
          name="address"
          type="text"
          placeholder="Address"
          min={0}
          max={255}
        />
        <div className="w-[70%] flex-centered gap-[3%]">
          <input name="checkbox" type="checkbox" onChange={checkedHandle} />{" "}
          <span className="nunito-font gray-blue-text-color text-[11px] underline">
            I trust Pawnesia to save and manage my personal data
          </span>
        </div>
      </>
    );
  }
};

export default InputArea;
