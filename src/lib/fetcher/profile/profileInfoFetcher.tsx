export const profileInfoFetcher = async (url: string, token: unknown) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(JSON.stringify(errorResult.message));
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.log("Error: ", err);
    return err;
  }
};
