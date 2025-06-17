export const migrationCheckoutFetcher = async (url: string, data: unknown) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(JSON.stringify(errorBody));
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log("error:", err);
    return { success: false, error: err };
  }
};
