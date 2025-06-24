import { migrationCheckoutFetcher } from "@/lib/fetcher/checkout/migrationCheckoutFetcher";
import { cloudFileFetcher } from "@/lib/fetcher/comment/cloudFileFetcher";
import { useState } from "react";

interface CloudResponseTypes {
  detail: string;
  message: string;
  status: string;
}

interface PaymentOverlayProps {
  totalPrice: number;
  paymentMethod: string;
  handleOpenPayment: (bool: boolean) => void;
  orderId: string | undefined;
}
const PaymentOverlay = ({
  totalPrice,
  paymentMethod,
  orderId,
  handleOpenPayment,
}: PaymentOverlayProps) => {
  const [fileLink, setFileLink] = useState("Upload bukti transfer disini");
  const [file, setFile] = useState<File | undefined>();

  const submit = async () => {
    if (!file) {
      return;
    }
    const creatingTransferProof = (await cloudFileFetcher(
      "http://localhost:5000/api/upload/transfer",
      file
    )) as CloudResponseTypes;

    console.log(creatingTransferProof.detail);
    if (orderId) {
      try {
        const migration = await migrationCheckoutFetcher(
          "http://localhost:5000/api/checkout/proof",
          {
            orderId: orderId,
            link: creatingTransferProof.detail,
          }
        );

        if (!migration) {
          throw migration;
        }
        alert("Selamat proses checkout sudah berhasil");
        handleOpenPayment(false);
        return;
      } catch (err) {
        console.error("Error: yang in ", err);
        return err;
      }
    }
  };

  return (
    <div className="w-full h-full bg-black/50 absolute z-40 flex-centered">
      <div className="bg-white p-8 rounded-lg shadow-md w-[70%] ">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h1 className="text-xl font-bold">Pembayaran</h1>
          <span className="text-xl font-semibold">{`Rp ${totalPrice.toLocaleString(
            "ID"
          )} ,-`}</span>
        </div>

        <div className="border-t pt-4 mb-4 text-gray-700">
          <p className="mb-2">
            Payment Method: <span className="font-medium">{paymentMethod}</span>
          </p>

          <label
            className="text-blue-500 cursor-pointer underline"
            htmlFor="upload-image"
            style={{ cursor: "pointer" }}
          >
            <div className="bg-gray-200 h-48 flex flex-col justify-center items-center rounded-md">
              <div className="text-4xl mb-2">🖼️</div>
              {fileLink}
            </div>
          </label>
          <input
            id="upload-image"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setFileLink(file.name);
                setFile(file);
              }
            }}
          />
        </div>
        <button
          onClick={submit}
          className="w-full mt-6 bg-gray-600 text-white font-semibold py-2 rounded hover:bg-gray-700 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PaymentOverlay;
