export const draftFinalizeFetcher = async (url: string, data: unknown) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorBody = response.json();
      throw new Error(JSON.stringify(errorBody));
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("error: ", err);
    return err;
  }
};
