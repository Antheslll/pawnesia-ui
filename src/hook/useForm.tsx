import { ChangeEvent, useState } from "react";

export const useForm = (initialValues: { [key: string]: string }) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value, // update hanya field yang berubah
    }));
  };

  return {
    formValues,
    handleChange,
    setFormValues,
  };
};
