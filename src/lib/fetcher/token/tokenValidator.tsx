import { UserInfoTypes } from "@/types";
import { userInfoFetcher } from "../user-info/userInfoFetcher";

export const validateToken = async (
  token: string,
  errorHandler: (message: string) => void,
  handleUserdata: (data: UserInfoTypes | null) => void
) => {
  const result = await userInfoFetcher<UserInfoTypes>(
    "http://localhost:5000/api/users/me",
    token,
    errorHandler
  );
  handleUserdata(result);
};
