import { useEffect, useState } from "react";

interface ReceiverInfoProps {
  handleReceiverData: (
    name: string,
    phoneNumber1: string,
    phoneNumber2: string,
    address: string
  ) => void;
}

const ReceiverInfo = ({ handleReceiverData }: ReceiverInfoProps) => {
  const [name, setName] = useState("");
  const [phoneNumber1, setPhoneNumber1] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      handleReceiverData(name, phoneNumber1, phoneNumber2, address);
    }, 500);

    return () => clearTimeout(timer);
  }, [name, phoneNumber1, phoneNumber2, address, handleReceiverData]);

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold underline mb-2">Receiver Info</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full border px-4 py-2 rounded"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number 1"
          className="w-full border px-4 py-2 rounded"
          onChange={(e) => setPhoneNumber1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number 2"
          className="w-full border px-4 py-2 rounded"
          onChange={(e) => setPhoneNumber2(e.target.value)}
        />
      </div>
      <input
        type="text"
        placeholder="Address"
        className="w-full border px-4 py-2 rounded"
        onChange={(e) => setAddress(e.target.value)}
      />
    </div>
  );
};

export default ReceiverInfo;
