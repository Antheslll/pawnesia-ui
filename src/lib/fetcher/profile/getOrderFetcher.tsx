export const getOrderFetcher = async (url: string, token: string | null) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(JSON.stringify(errorResult));
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error: ", err);
    return err;
  }
};
