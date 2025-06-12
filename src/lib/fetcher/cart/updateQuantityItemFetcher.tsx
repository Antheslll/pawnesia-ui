export async function updateQuantityItemFetcher(url: string, data: unknown) {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(JSON.stringify(errorResult));
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error("error: ", err);
    return err;
  }
}
