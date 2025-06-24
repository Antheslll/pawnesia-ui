export const sendNewProfileFetcher = async (
  url: string,
  data: unknown,
  token: string | null
) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log(response);
      const errorResult = response.json();
      throw new Error(JSON.stringify(errorResult));
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log("Error: ", err);
    return err;
  }
};
