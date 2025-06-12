export async function deleteItemFetcher(url: string) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(JSON.stringify(errorResult));
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("error: ", err);
    return err;
  }
}
